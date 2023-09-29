import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';
import { User } from '../models/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  users:User[]=[];
  products:ProductService;
  constructor(ps :ProductService,private auth:AuthService) {
   this.products=ps;
  }

  ngOnInit(): void {
  }
  login(form: any) {
    this.auth.getUsers().subscribe({
      next:(data)=>{
      console.log(data);
      }
    })
  }
  signup(form:any){
    this.auth.addUser(form);
  }
}