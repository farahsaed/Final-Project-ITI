import { Component} from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent{
  allProducts: any[] = []; 
  allProdData:any[] = [];
  searchedProds : any[] = []
  totalProducts: number = 20;
  pageSize = 5;
  currentPage:number=1;

  public searchVal = "";

  constructor(private productService:ProductService ,private route: ActivatedRoute){
   
  }
    ngOnInit(): void {
      // let products :Observable<any>;
      this.route.params.subscribe((params) => {
        if(params['searchTerm'])
            this.productService.searchAllProducts(params['searchTerm']).subscribe({
               next: (data) => {
                  this.allProducts = data
               }
          });
        else
           this.productService.getAllProducts(this.currentPage,this.pageSize).subscribe({
            next: (data) => {
              console.log(data);
              this.allProducts = data.products;
              this.totalProducts=data.totalProducts;
            },
          });
        
       
      })
     }
     changePage(pageData:PageEvent){
      this.currentPage=pageData.pageIndex+1;
      this.pageSize=pageData.pageSize;    
      this.productService.getAllProducts(this.currentPage ,this.pageSize).subscribe({
        next: (data) => {
          console.log(data);
          this.allProducts = data.products;
          this.totalProducts=data.totalProducts;
        },
      });
      
    }
    }   
  
   


