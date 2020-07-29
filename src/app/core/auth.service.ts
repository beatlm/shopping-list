import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { EmailValidator } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.signInWithPopup(provider).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  register(email,password) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          (res) => {
            resolve(res);
          },
          (err) => reject(err)
        );
    });
  }

  login$(email:string, password:string) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          (res) => {
            resolve(res);
          },
          (err) => reject(err)
        );
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }
}
