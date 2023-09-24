import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit , OnDestroy{

  selectedCategory : any [] =[]
  allSelectedCategory:any[]=[]
  cat:any;
  mySubscription: any;

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
  

}

