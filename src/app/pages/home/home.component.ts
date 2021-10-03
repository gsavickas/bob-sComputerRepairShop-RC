/**
 * * Title: home.component.ts
 * Author: Larry Ohaka
 * Date: 08/18/21
 * Description: Navigation and Layout
 */

import { Component, OnInit } from '@angular/core';
import { InvoiceSummaryDialogComponent } from './../../shared/invoice-summary-dialog/invoice-summary-dialog.component';
import { Product } from './../../shared/models/product.interface';
import { InvoiceService } from './../..//shared/services/invoice.service';
import {ProductService } from './../../shared/services/product.service';
import {Router } from '@angular/router'
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { LineItem } from '../../shared/models/line-item.interface';
import { Message } from 'primeng/api/message';
import { MatDialog } from '@angular/material/dialog';

import { Invoice } from './../../shared/models/invoice';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  username: string;
  products: Product[];
  lineItems: LineItem[];
  invoice: Invoice;
  errorMessage: Message[];
  successMessage: Message[];

  constructor(private cookieService: CookieService, private fb: FormBuilder, private router: Router, private productService: ProductService, private invoiceService: InvoiceService, private dialogRef: MatDialog) { 

    this.username = this.cookieService.get('sessionuser');

    this.products = this.productService.getProducts();

    this.invoice = new Invoice(this.username);

    this.lineItems = [];

    console.log(this.products);
  }

  ngOnInit(): void {
  }


  generateInvoice() {
    console.log('generateInvoice() this.invoice')
    console.log(this.invoice);

    console.log('generateInvoice() this.products')
    console.log(this.products);

    for (let product of this.products) {
      if (product.checked){
        this.lineItems.push(product);
      }
    }

    if(this.lineItems.length > 0){
      this.invoice.setLineItems(this.lineItems);

      console.log('lineItems.length > 0; this.invoice');
      console.log(this.invoice);

      const dialogRef = this.dialogRef.open(InvoiceSummaryDialogComponent, {
        data: {
          invoice: this.invoice
        },
        disableClose: true,
        width: '800px'
      });


      dialogRef.afterClosed(). subscribe(result => {
        if (result === 'confirm') {
          this.invoiceService.createInvoice(this.username, this.invoice).subscribe(res => {
            console.log('Invoice created');
            this.reloadProducts();
            this.clearLineItems();
            this.invoice.clear();
            this.successMessage = [
              { severity: 'success', summary: "Success", detail: "Your order has been processed successfully!"}
            ]
          })
        }else {
          console.log('order canceled');
          this.reloadProducts();
          this.clearLineItems();
          this.invoice.clear();
        }
      })
    }else {
      this.errorMessage = [
        { severity: 'error', summary: 'Error', detail: 'You must select at least one service.'}
      ]
    }
  }

  reloadProducts() {
    for (let product of this.products) {
      product.checked = false;
    }
  }

  clearLineItems() {
    this.lineItems = [];
  }

}
