import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  params: Params;
  productaDetailsData: any;
  errorMessage: string = '';
  id: any;
  itemsInCart: any = [];
  buttonTitle: string = 'Checkout';
  navLink: string = '/checkout';
  isCheckoutBtnDisabled: boolean = false;
  backNavTitle: string = 'Back to List';
  backNavLink: string = '/list';
  checkoutListCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productDetails: ProductsService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((paramsId) => {
      console.log(paramsId)
      this.id = paramsId.id;
    });

    this.productDetails.getProductDetails(this.id).subscribe((results: any) => {
      this.productaDetailsData = results;
      this.spinner.hide();
    }, (err) => {
      this.errorMessage = err;
      this.spinner.hide();
    });
  }

  addToCart(): void {
    this.itemsInCart = [...this.itemsInCart, this.productaDetailsData];
    this.isCheckoutBtnDisabled = this.itemsInCart.length > 0 ? false : true;
    localStorage.setItem('products', JSON.stringify(this.itemsInCart));
    this.checkoutListCount = this.itemsInCart.length;
  }

}
