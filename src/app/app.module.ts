import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { SliderComponent } from './slider/slider.component';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from '@coreui/angular';
import { ProductComponent } from './product/product.component';
import { AllProductsComponent } from './all-products/all-products.component';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {register} from 'swiper/element/bundle';
import { SearchComponent } from './search/search.component';
import { SearchInCategoriesComponent } from './search-in-categories/search-in-categories.component';
register();
// import {MatIconModule} from '@angular/material/icons'
// import {FaIconLibrary} from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    SliderComponent,
    HomeComponent,
    ProductComponent,
    AllProductsComponent,
    ProductDetailsComponent,
    ProductCategoryComponent,
    LoginComponent,
    PageNotFoundComponent,
    SearchComponent,
    SearchInCategoriesComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {  }









