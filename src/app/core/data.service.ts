import { Observable, of, BehaviorSubject } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private productsList$ = new BehaviorSubject<Array<string>>([]);
  private shopsList$ = new BehaviorSubject<Array<string>>([]);
  private productos: String[];
  constructor(public firestore: AngularFirestore) {}

  //Devuelve los productos para un usuario y tienda
  getProductsListData$(userMail, shop): Observable<any> {
    let dataSource = [];
    this.firestore
      .collection("shoppinglist")
      .ref.where("shared", "array-contains", userMail)
      .where("shop", "==", shop)
      .get()
      .then(
        (res) => {
          res.forEach((doc) => {
            for (let elemento of doc.data().products) {
              dataSource.push({ product: elemento });
            }
            console.log("DATASOURCE");
            console.log(dataSource);
            this.productsList$.next(dataSource);
          });
        },
        (err) => {
          console.log("Ha ocurrido un error \n" + err);
          console.log(dataSource);
        }
      );
    this.productsList$.next(dataSource);
    return of(this.productsList$);
  }

  //Crea una tienda nueva
  addProductsList$(userMail, shop): void {
    this.firestore
      .collection("shoppinglist")
      .add({ shop: shop, shared: [userMail], products: [] });



      
  }

  addProductToList$(
    product: String,
    shop: String,
    userMail: String
  ): Observable<any> {
    console.log("Llamamos al servicio para añadir el producto:" + product);
    //Obtenemos el id del documento
    this.firestore
      .collection("shoppinglist")
      .ref.where("shared", "array-contains", userMail)
      .where("shop", "==", shop)
      .get()
      .then(
        (res) => {
          res.forEach((doc) => {
            this.productos = doc.data().products;
            this.productos.push(product);

            this.firestore
              .collection("shoppinglist")
              .doc<any>(doc.id)
              .update({ products: this.productos });
            return this.getProductsListData$(userMail, shop);
          });
        },
        (err) => {
          console.log("Ha ocurrido un error \n" + err);
        }
      );
    return this.getProductsListData$(userMail, shop);
  }

  //Devuelve el nombre de las tiendas para las que el usuario tiene tiendas
  getShopListData$(userMail): Observable<any> {
    let dataSource = [];
    this.firestore
      .collection("shoppinglist")
      .ref.where("shared", "array-contains", userMail)
      .get()
      .then(
        (res) => {
          res.forEach((doc) => {
            console.log("Leemos: "+doc.data().shop)
            dataSource.push({ shop: doc.data().shop });
          });
          this.shopsList$.next(dataSource);
        },
        (err) => {
          console.log("Ha ocurrido un error \n" + err);
          console.log(dataSource);
        }
      );
    return of(this.shopsList$);
  }

  //Borra un producto de la lista

  deleteProductFromList$(
    product: String,
    shop: String,
    userMail: String
  ): Observable<any> {
    console.log("Llamamos al servicio para eliminar el producto:" + product);
    //Obtenemos el id del documento
    this.firestore
      .collection("shoppinglist")
      .ref.where("shared", "array-contains", userMail)
      .where("shop", "==", shop)
      .get()
      .then(
        (res) => {
          res.forEach((doc) => {
            this.productos = doc.data().products;

            const index: number = this.productos.indexOf(product);
            if (index !== -1) {
              this.productos.splice(index, 1);
            }

            this.firestore
              .collection("shoppinglist")
              .doc<any>(doc.id)
              .update({ products: this.productos });
            return this.getProductsListData$(userMail, shop);
          });
        },
        (err) => {
          console.log("Ha ocurrido un error \n" + err);
        }
      );
    return this.getProductsListData$(userMail, shop);
  }
}
