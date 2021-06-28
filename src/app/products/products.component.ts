import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ProductsService } from '../services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

// export type Product = {
//   price : string;
//   name: string;
//   brand: string;
//   id: number;
//   image: string;
// };

export class ProductsComponent implements OnInit {
  title = 'app-pagination';
  data: any = []; // Product[]
  displayedData: any = [];
  errorMessage: string = '';
  itemsPerPage: number = 30;
  allPages: number = 0;
  itemsInCart: any = [];
  buttonTitle: string = 'Checkout';
  navLink: string = '/checkout';
  backNavTitle: string = '';
  isCheckoutBtnDisabled: boolean = true;
  checkoutListCount: number = 0;

  constructor(
    private productsListService: ProductsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.productsListService.getProducts().subscribe((results: any) => {
      this.data = results;
      this.spinner.hide();
      this.onPageChange();
      this.allPages = Math.ceil(this.data.length / this.itemsPerPage);
    }, (err) => {
      this.errorMessage = err;
      this.spinner.hide();
    })
  }

  onPageChange(page: number = 1): void {
    const startItem = (page - 1) * this.itemsPerPage;
    const endItem = page * this.itemsPerPage;
    this.displayedData = this.data.slice(startItem, endItem);
  }

  addToCart(product: any): void {
    this.itemsInCart = [...this.itemsInCart, product];
    this.isCheckoutBtnDisabled = this.itemsInCart.length > 0 ? false : true;
    localStorage.setItem('products', JSON.stringify(this.itemsInCart))
    this.checkoutListCount = this.itemsInCart.length;
    this.toastr.success('Added to cart');
  }
}
