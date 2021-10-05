/**
 * * Title: invoice.component.ts
 * Author: Larry Ohaka
 * Date: 10/1/21
 * Description: Input Properties
 */

 import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice } from '../models/invoice'

 @Component({
   selector: 'app-invoice-summary-dialog',
   templateUrl: './invoice-summary-dialog.component.html',
   styleUrls: ['./invoice-summary-dialog.component.css'],
 })
 export class InvoiceSummaryDialogComponent implements OnInit {
   //Local variables for the items
  invoice: Invoice;
  username: string;
  orderDate: string;
  total: number;
  labor: number;
  parts: number;
//return the data
   constructor(private dialogRef: MatDialogRef<InvoiceSummaryDialogComponent>, @Inject(MAT_DIALOG_DATA) data)  {
     this.invoice = data.invoice;
     // invoice model values
    console.log(`Parts amount: ${this.invoice.partsAmount}`)
    console.log(`Labor amount: ${this.invoice.getLaborAmount()}`)
//Show the amount
    this.username = this.invoice.getUsername();
    this.orderDate = this.invoice.getOrderDate();
    this.parts = this.invoice.partsAmount;
    this.labor  = this.invoice.getLaborAmount();
    this.total = this.invoice.getTotal();
   }
 
   ngOnInit(): void {}
 }
 
