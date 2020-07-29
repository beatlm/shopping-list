import { Router } from '@angular/router';
import { AuthService } from "./../../core/auth.service";
import { Component, OnInit } from "@angular/core";

import { Validators, FormControl } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
 hide = false;
  email = new FormControl("", [Validators.required, Validators.email]);
  password = new FormControl("", [Validators.minLength(8)]);

  getErrorMessage() {
    return this.email.hasError("required")
      ? "Por favor introduce un email"
      : this.email.hasError("email")
      ? "El email introducido es incorrecto"
      : "";
  }
  getErrorMessagePassword() {
    return this.password.hasError("minlength")
      ? "La contraseña debe tener al menos 8 caracteres"
      : "otro error";
  }
  constructor(private router: Router, private authService:AuthService) {}

  ngOnInit() {}
  login() {
    this.authService.login$(this.email.value, this.password.value).then(res => {
      this.router.navigate(['/shops']);
    }, err => {
      console.log('Ha ocurrido un error \n'+err);
    });

  }
}
