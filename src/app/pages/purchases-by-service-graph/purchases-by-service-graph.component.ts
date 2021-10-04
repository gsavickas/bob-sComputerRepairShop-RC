/**
 * * Title: register.component.ts
 * Author: Grayton Savickas
 * Date: 10/3/21
 * Description: Purchases by the services page
 */

import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/shared/services/invoice.service';

@Component({
  selector: 'app-purchases-by-service-graph',
  templateUrl: './purchases-by-service-graph.component.html',
  styleUrls: ['./purchases-by-service-graph.component.css']
})
export class PurchasesByServiceGraphComponent implements OnInit {

  // variables
  purchases: any;
  data: any;
  itemCount = [];
  labels = [];

  constructor(private invoiceService: InvoiceService) {
    // This calls for the purchases-graph API

    this.invoiceService.findPurchasesByServiceGraph().subscribe(res =>{
      // map the response data with the purchases variable
      this.purchases = res['data'];

      // loop over the purchases to split out the services and item count
      for (const item of this.purchases){
        this.labels.push(item._ide.title);
        this.itemCount.push(item.count);
      }

      // this builds an object literal that is for the primeng bar graph
      this.data = {
        labels: this.labels,
        datasets: [
          {
            backgroundColor: [
              '#ED0A3F',
              '#FF8833',
              '#5FA777',
              '#0066CC',
              '#6B3FA0',
              '#AF593E',
              '#6CDAE7'
            ],
            hoverBackgroundColor: [
              '#ED0A3F',
              '#FF8833',
              '#5FA777',
              '#0066CC',
              '#6B3FA0',
              '#AF593E',
              '#6CDAE7'
            ],
            data: this.itemCount
          },
        ]
      };

      // This verifies the data object's structure matches primeng's expected format
      console.log('Data object');
      console.log(this.data);
    })
  }

  ngOnInit(): void {
  }

}
