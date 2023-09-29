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

  selectedCategory : any
  allSelectedCategory:any[]=[]
  selectCat:any 
  cat:any;
  searchParam:any
  mySubscription: any;
  products:any
  public searchVal = "";

    constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService : ProductService) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
  
    this.route.queryParams.subscribe(params=>{
      console.log(params);
      this.cat = params['category']
      console.log(this.cat);
    })
  
  this.route.params.subscribe((params) => {
    console.log(params);
   this.searchParam = params['searchTerm']
      console.log(this.searchParam)
      if(params['searchTerm']){
        this.selectedCategory = this.productService.getAllCatBySearchTerm(this.cat , params['searchTerm']).subscribe({
           next: (data) => {
            console.log(this.cat);
            
              this.selectedCategory = data
              console.log(data);
           
           }}) } else{
            this.productService.getCategory(this.cat).subscribe(products=>{
              console.log(products);
              this.selectedCategory = products
          
            })
            
           }
    })
  
  };

  

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