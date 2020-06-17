import { Component, OnInit } from '@angular/core';
import CartItem from 'src/app/models/CartItem';
import { CartService } from 'src/app/services/cartService/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cart: CartItem[] = JSON.parse(localStorage.getItem('Cartitems')) || [];
  title = 'myMovieshop';
  numberOfItemsInCart: number;

  constructor(private cartService: CartService) {}
  getNumberOfItemsIncart() {
    this.cartService.showNumberOfItemsInCart(this.numberOfItemsInCart);
  }
  ngOnInit(): void {
    this.cartService.itemsInCart.subscribe((items: number) => {
      this.numberOfItemsInCart = items;
    });
    this.getNumberOfItemsIncart();
  }
}
