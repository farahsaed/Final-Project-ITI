import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { PaymentComponent } from './payment/payment.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [

  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  {path:'search/:searchTerm', component:AllProductsComponent},
  {path: 'login' , component:LoginComponent},
  { path: '', component: HomeComponent },
  { path: 'products', component: AllProductsComponent },
  { path: 'productDetails/:id', component: ProductDetailsComponent },
  { path: 'productCategory', component: ProductCategoryComponent},
  { path: 'productCategory/:searchCat/:searchTerm', component: ProductCategoryComponent},

  {path:'cart',component:ShoppingCartComponent},
  {path:'payment',component:PaymentComponent},

  { path: 'addProduct',component:AddProductComponent},
  { path: 'editProduct/:id',component:EditproductComponent},
   // {path:'**' , component:PageNotFoundComponent}


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


