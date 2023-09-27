import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from '../product.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit , OnDestroy{
  [x: string]: any;

  selectedCategory : any [] =[]
  allSelectedCategory:any[]=[]
  cat:any;
  mySubscription: any;
  
  public searchVal = "";

    constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService : ProductService) {
      let products :Observable<any>;
      this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });

     route.params.subscribe((params) => {
      if(params['searchTerm'])
         products = this.productService.getAllCatBySearchTerm(params['searchTerm']);
      else
          this.productService.getCategory();
      
      products.subscribe((products) => {
        this.selectedCategory = products;
      })   
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // console.log(params);
      this.cat = params['category'];
      console.log(this.cat);
      this.selectedCategory=this.productService.getCategory(this.cat);
      this.allSelectedCategory = this.selectedCategory
      // console.log(this.selectedCategory);
    })   
   
  }

  ngOnDestroy(): void {
      if(this.mySubscription){
        this.mySubscription.unsubscribe();
      }
  }
  
  searchAllProducts(searchVal:string){
    if(searchVal == ""){
      this.selectedCategory = this.allSelectedCategory;
   }else{
     this.selectedCategory = this.allSelectedCategory.filter((item) =>{
        if(item.name.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase())){
            return item;
        }
     })}
  }

}

