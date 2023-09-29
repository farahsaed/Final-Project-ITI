import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor() { }

  ngOnInit(): void {
    this.slides[0] = {
      src: 'https://img.freepik.com/free-photo/clipboard-stethoscope_23-2148519763.jpg?w=996&t=st=1695343545~exp=1695344145~hmac=ca6d5343b7fd9a8d545de53fc5a0b7f523dde3e2a05949265790254b450a49af',
      title:"Welcome To Our Pharmacy",
      subtitle:"Your health comes first"
    };
    this.slides[1] = {
      src: 'https://applebypharmacy.com/wp-content/uploads/2021/09/Pharmacist_Behind_Counter-1024x683.jpg',
    }
    this.slides[2] = {
      src: 'https://lluh.org/sites/lluh.org/files/images/infographics/sunscreen/infgr-snscrn-main.jpg',
    }
  }
}
