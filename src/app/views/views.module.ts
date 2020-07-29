import { AuthService } from "./../core/auth.service";
import { MatCardModule } from "@angular/material/card";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "../app-routing.module";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegisterComponent } from "./register/register/register.component";
import { ShopsComponent } from "./shops/shops.component";
import { ProductsComponent } from "./products/products.component";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatTableModule } from '@angular/material/table'  
import { MatInputModule } from '@angular/material/input' 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
MatFormFieldModule,
MatToolbarModule,
MatIconModule,
MatButtonModule,
MatTableModule,
MatInputModule,
MatCardModule,
MatSelectModule,
MatOptionModule,
  ],
  declarations: [
    LoginComponent,
    ProductsComponent,
    RegisterComponent,
    ShopsComponent,
  ],
  exports: [
    LoginComponent,
    MatCardModule,
    RegisterComponent,
    ProductsComponent,
  ],
  providers: [AuthService],
})
export class ViewsModule {}
