/**
 * * Title: invoice.component.ts
 * Author: Larry Ohaka
 * Date: 9/28/21
 * Description: Input Properties
 */

import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { IService } from '../service.interface';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  services: Array<IService>; // services array
  today: Date; // today's date
  parts: number; // parts
  hours: number; // hours
  total: number; // total
  totalWithService: number; // hourly rate

  constructor(  private dialogRef: MatDialogRef<InvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    // invoice modal values
    const { services, today, parts, hours, total, totalWithService } = data;
    this.services = services;
    this.today = new Date();
    this.parts = parseFloat(parts);
    this.hours = parseFloat(hours);
    this.total = parseFloat(total);
    this.totalWithService = parseFloat(totalWithService);
  }

  ngOnInit(): void {
  }

}
