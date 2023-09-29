import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  allProducts:any[] = []; 
  allProdData:any[] = []
  constructor(private productService:ProductService){}
    ngOnInit(): void {
      this.productService.getHighRatedProduct().subscribe({next:data=>{
        this.allProducts = data
       }}) ;
       this.allProdData = this.allProducts;

    }   
}
