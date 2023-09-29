import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-search-in-categories',
  templateUrl: './search-in-categories.component.html',
  styleUrls: ['./search-in-categories.component.css']
})
export class SearchInCategoriesComponent {
  searchTerm: String = "";
  cat:any;
  constructor(private route: ActivatedRoute, public router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['searchTerm'])
        this.searchTerm = params['searchTerm'];
    })
    this.route.queryParams.subscribe(params => {
      // console.log(params);
      this.cat = params['category'];
      // console.log(this.cat);
      // this.selectedCategory=this.productService.getCategory(this.cat);
      // this.allSelectedCategory = this.selectedCategory
      // console.log(this.selectedCategory);
    })   
  }

  // search():void{
  //   if(this.searchTerm)
  //   this.router.navigateByUrl('/search/' + this.searchTerm);
  // }
  searchInCat(searchTerm:string):void{
    if(searchTerm)
    this.router.navigateByUrl('/productCategory/'+ this.cat+ '/' + searchTerm);
  }

}
