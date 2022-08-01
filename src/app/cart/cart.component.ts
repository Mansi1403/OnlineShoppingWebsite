import { Component, OnInit } from '@angular/core';
import { CartApiService } from '../Service/cart-api.service';
import { faCoffee,faPencil ,faTrashAlt,faUserPen,faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products:any=[];
  allProducts:any=0;


  faCoffee = faCoffee;
  faPencil=faPencil;
  faTrashAlt=faTrashAlt;
  faUserPen=faUserPen
  faSearch=faSearch


  constructor(private cartApi:CartApiService) { }

  ngOnInit(): void {
    this.cartApi.getProductData().subscribe(res=>{
      this.products=res;
      this.allProducts=this.cartApi.getTotalAmount();
    })
  }
  removeProduct(item:any){
    this.cartApi.removeCartData(item);
  }
  removeAllProduct(){
    this.cartApi.removeAllCart();
  }

}
