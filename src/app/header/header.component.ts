import { Component, OnInit , Input , inject} from '@angular/core';
import { ProductService } from '../product.service';
import { AllProductsComponent } from '../all-products/all-products.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // template:`<app-all-products *ngFor="let products of filteredList" [products] = "products"></app-all-products>`,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  appTitle:string='Netflix'
  menu_icon_variable: boolean = false;
  menuVariable: boolean = false;
  private searchVal = "";
  allProducts :any[] = []
  allCategories=[
    {
      "type" : 'Tablet'
    },{
      "type": 'Capsule',
    },{
      "type": 'Skincare',
    },{
      "type": 'Haircare',
    },{
      "type": 'Injection',
    },{
      "type": 'Drops',
    },
    {
      "type": 'Makeup',
    }
  ]
  constructor(private serv:ProductService , public router : Router) { 
      // this.allProducts = this.serv.getAllProducts()
  }

  ngOnInit(): void {
    // this.serv.getAllProducts();
  }
  openMenu() {
    this.menuVariable =! this.menuVariable;
    this.menu_icon_variable =! this.menu_icon_variable;
  }

}




