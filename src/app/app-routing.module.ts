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

const routes: Routes = [

  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  {path: 'login' , component:LoginComponent},
  { path: '', component: HomeComponent },
  { path: 'products', component: AllProductsComponent },
  { path: 'productDetails/:id', component: ProductDetailsComponent },
  { path: 'productCategory', component: ProductCategoryComponent},
 // {path:'**' , component:PageNotFoundComponent}


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


