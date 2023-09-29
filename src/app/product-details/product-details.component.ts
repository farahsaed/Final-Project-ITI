import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  category :any;
  selectedProduct:any;
  selectedCategory :any
  allSelectedCategory:any[]=[]
  mySubscription: any;
  ps:ProductService;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService : ProductService) {
    //   let products :Observable<any>;
      this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
    this.ps=productService;
  }
  ngOnInit():void{
    let id = this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductByID(id).subscribe({next:data=>{
      this.selectedProduct=data;
      this.category = data.type;
      console.log(this.category);
      
      this.selectedCategory = this.productService.getCategory(this.category).subscribe(products=>{
        console.log(products);
        this.selectedCategory=products
      })
    }});
  }
  
  ngOnDestroy(): void {
    if(this.mySubscription){
      this.mySubscription.unsubscribe();
    }
}
cart(id:any){
  this.ps.addToCart(id);
  console.log(id);
  console.log(this.ps.CartItems);
  // alert(`"${this.selectedProduct.name}" has been added to the cart.`);
}
}