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
      this.cat = params['category'];
   
    })   
  }

  searchInCat(searchTerm:string , category:string = ""):void{
    if(searchTerm)
    this.router.navigate(['/productCategory/'+ searchTerm] , {queryParams:{category: this.cat}});

  }

}
