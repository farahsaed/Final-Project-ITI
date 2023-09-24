import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  // allCategories[]:any = []
  allCategories=[
    {
      "type" : 'Tablet'
    },{
      "type": 'Capsule',
    },{
      "type": 'Skincare',
    },{
      "type": 'Haircare',
    },{
      "type": 'Injection',
    },{
      "type": 'Drops',
    },
    {
      "type": 'Makeup',
    }
  ]
  constructor(private prodServ:ProductService){}
   ngOnInit(){
       
   }
}
