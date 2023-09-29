import { Component , Input} from '@angular/core';
import { ProductService } from '../product.service';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent{
  allProducts: any[] = []; 
  allProdData:any[] = [];
  searchedProds : any[] = []
  search!: HeaderComponent;
  public searchVal = "";

  constructor(private productService:ProductService ,private route: ActivatedRoute){
    let products :Observable<any>;
    route.params.subscribe((params) => {
      if(params['searchTerm'])
         products = this.productService.searchAllProducts(params['searchTerm']);
      else
         products = this.productService.getAllProducts();
      
      products.subscribe((products) => {
        this.allProducts = products;
      })   
    })
  }
    ngOnInit(): void {
      
     }
    }   
  
   


