import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "../../core/data.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ["product"];
  shop: string = "";
  listado = [];
  formProduct = new FormControl("", [Validators.required]);

  constructor(
    public dataService: DataService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.shop = this.route.snapshot.paramMap.get("shop");
    this.loadData();
  }
  private loadData() {
    console.log("llamamos al servicio con a tienda:" + this.shop);
    this.dataService
      .getProductsListData$("beatlm@gmail.com", this.shop)
      .subscribe(this.showData.bind(this), this.catchError.bind(this));
  }
  private showData(value) {
    this.listado = value;
  }
  private catchError(err) {
    console.log(err);
    this.listado = [{ product: "No se han podido cargar los productos :'(" }];
  }
  public login() {
    this.router.navigate(["/shops"]);
  }

  public addProduct() {
    this.dataService
      .addProductToList$(this.formProduct.value, this.shop, "beatlm@gmail.com")
      .subscribe(this.showData.bind(this), this.catchError.bind(this));
    this.formProduct.reset();
  }
  public delete(product) {
    console.log("Se ha deslizado:"+product);
    this.dataService
    .deleteProductFromList$(product, this.shop, "beatlm@gmail.com")
    .subscribe(this.showData.bind(this), this.catchError.bind(this));
  }


}
