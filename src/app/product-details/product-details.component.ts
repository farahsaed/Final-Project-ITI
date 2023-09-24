import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  category :any;
  selectedProduct:any;
  selectedCategory : any [] =[]
  allSelectedCategory:any[]=[]
  mySubscription: any;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router){
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });

  }
  ngOnInit():void{
    let id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.selectedProduct = this.productService.getProductById(id);
    this.category = this.selectedProduct.type;
    this.selectedCategory=this.productService.getCategory(this.category);
      this.allSelectedCategory = this.selectedCategory
      console.log(id);
      
  }
  
  ngOnDestroy(): void {
    if(this.mySubscription){
      this.mySubscription.unsubscribe();
    }
}


}