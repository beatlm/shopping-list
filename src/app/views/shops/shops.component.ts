import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/core/data.service";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-shops",
  templateUrl: "./shops.component.html",
  styleUrls: ["./shops.component.css"],
})
export class ShopsComponent implements OnInit {
  displayedColumns: string[] = ["shop"];

  public listado: Array<string> = new Array();

  formShop = new FormControl("", [Validators.required]);

  constructor(public dataService: DataService, public router: Router) {}

  ngOnInit() {
    this.loadData();
  }
  private loadData() {
    this.dataService
      .getShopListData$("beatlm@gmail.com")
      .subscribe(this.showData.bind(this), this.catchError.bind(this));
  }
  private showData(value) {
    console.log("VALUE ");
    console.log(value);
    this.listado = value;

  }
  private catchError(err) {
    console.log(err);
    //this.listado=["No se han podido cargar las tiendas " ];
  }
  public addShop() {
    this.dataService.addProductsList$("beatlm@gmail.com", this.formShop.value);
  }
}
