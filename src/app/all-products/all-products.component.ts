import { Component , Input} from '@angular/core';
import { ProductService } from '../product.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  template:`<app-header></app-header>`,
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent{
  allProducts:any[] = []; 
  allProdData:any[] = [];
  @Input() products!: AllProductsComponent;

  search!: HeaderComponent;
  private searchVal = "";
  set searchValue(searchVal:string){
     this.searchVal = searchVal;
     this.searchAllProducts(searchVal)
  } 
  constructor(private productService:ProductService){}
    ngOnInit(): void {
       this.allProducts = this.productService.getAllProducts() ;
       this.allProdData = this.allProducts;
       this.search = new HeaderComponent(this.productService);
    }   
    searchAllProducts(searchVal:string){
      if(searchVal == ""){
        this.allProducts = this.allProdData;
     }else{
       this.allProducts = this.allProducts.filter((item) =>{
          if(item.name.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase())){
              return item;
          }
       })}
    }
  
}

