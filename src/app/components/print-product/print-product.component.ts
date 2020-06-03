import { Component, OnInit, Input } from '@angular/core';
import Movie from 'src/app/models/Movie';

@Component({
  selector: 'app-print-product',
  templateUrl: './print-product.component.html',
  styleUrls: ['./print-product.component.scss'],
})
export class PrintProductComponent implements OnInit {
  constructor() {}
  @Input() movie: Movie;

  addToCart() {}

  ngOnInit(): void {}
}
