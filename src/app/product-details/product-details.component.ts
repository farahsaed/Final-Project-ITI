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
    let id = this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductByID(id).subscribe({next:data=>{
      console.log(data);
      this.selectedProduct=data;
      this.category = this.selectedProduct.type;
      this.selectedCategory = this.productService.getCategory(this.category)
    }});
  }
  
  ngOnDestroy(): void {
    if(this.mySubscription){
      this.mySubscription.unsubscribe();
    }
}

}