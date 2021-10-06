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
import {Router } from '@angular/router';
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
//fields
  form: FormGroup;
  username: string;
  products: Product[];
  lineItems: LineItem[];
  invoice: Invoice;
  errorMessages: Message[];
  successMessages: Message[];

//calls functions
  constructor(private cookieService: CookieService, private fb: FormBuilder, private router: Router, private productService: ProductService, private invoiceService: InvoiceService, private dialogRef: MatDialog) { 

    this.username = this.cookieService.get('sessionuser');

    this.products = this.productService.getProducts();

    this.invoice = new Invoice(this.username);
//Line item will be an empty array
    this.lineItems = [];

    console.log(this.products);
  }

  ngOnInit(): void {
  }


  generateInvoice() {
    console.log('generateInvoice() this.invoice');
    console.log(this.invoice);

    console.log('generateInvoice() this.products');
    console.log(this.products);
//Loops over all the products and uses the ones that have been checked
    for (let product of this.products) {
      if (product.checked){
        this.lineItems.push(product);
      }
    }
//if they select items
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
            this.successMessages = [
              { severity: 'success', summary: "Success", detail: "Your order has been processed successfully!"}
            ]
          })
          //reloads products when canceled
          
        }else {
          console.log('order canceled');
          this.reloadProducts();
          this.clearLineItems();
          this.invoice.clear();
        }
      })
      //otherwise if they dont select item order will be canceled
    }else {
      this.errorMessages = [
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
