/**
 * * Title: services.component.ts
 * Author: Larry Ohaka
 * Date: 7/25/21
 * Description: Input Properties
 */

 import { Component, OnInit } from '@angular/core';
 import { IService } from '../service.interface';
 import { ServicesService } from '../services.service';
 import { InvoiceComponent } from '../invoice/invoice.component';
 import { MatDialog } from '@angular/material/dialog';

 @Component({
   selector: 'app-services',
   templateUrl: './services.component.html',
   styleUrls: ['./services.component.css'],
 })
 export class ServicesComponent implements OnInit {
   services: Array<IService>; // services array
   parts: number; // parts tally
   hours: number; // hours tally
   total: number; // total parts & hours
   totalWithService: number; // hourly rate

   // get services from services.service
   constructor(
     private servicesService: ServicesService,
     private dialog: MatDialog
   ) {
     this.services = servicesService.getServices();
   }

   // clear checkboxes
   clearCheckboxes(): void {
     this.services.forEach((service: IService) => {
       service.checked = false;
     });
   }

   // clear inputs
   clearInputs(): void {
     this.parts = 0;
     this.hours = 0;
   }

   // calculate total cost of services
   calculateTotalServices(): number {
     let totalServices = 0;
     this.services.forEach((service: IService) => {
       if (service.checked) {
         totalServices += service.price;
       }
     });
     return totalServices;
   }

   // calculate total parts & hours
   calculatePartsAndHours() {
     const { parts, hours } = this;
     let total = 0;

     if (!!hours) {
       total = this.totalWithService = hours * 50;
     }

     if (!!parts) {
       total = +parts + total;
     }

     this.services.forEach((service) => {
       if (service.checked) {
         total = total + service.price;
       }
     });

     if (!!total) {
       this.total = total;
       this.showInvoice();
     }
   }

   ngOnInit(): void {}

   // display invoice modal
   showInvoice() {
     const { services, parts, hours, total, totalWithService } = this;

     const dialogRef = this.dialog.open(InvoiceComponent, {
       data: {
         services: services.filter((service) => service.checked), parts, hours, total, totalWithService,
       },
       disableClose: true,
       width: '800px',
     });

     // subscribe to dialog state
     dialogRef.afterClosed().subscribe((result) => {
       if (result === 'confirm') {
         this.clearInputs();
         this.clearCheckboxes();
       }
     });
   }
 }
