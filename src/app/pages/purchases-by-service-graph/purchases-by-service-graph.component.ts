/**
 * * Title: register.component.ts
 * Author: Grayton Savickas
 * Date: 10/3/21
 * Description: Purchases by the services page
 */

import { Component, OnInit } from '@angular/core';
import { InvoiceService } from './../../shared/services/invoice.service';

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
        this.labels.push(item._id.title);
        this.itemCount.push(item.count);
      }

      // this builds an object literal that is for the primeng bar graph
      this.data = {
        labels: this.labels,
        datasets: [
          {
            backgroundColor: [
              '#009BFF',
              '#278172',
              '#C2D8E3',
              '#E1B212',
              '#008BC8',
              '#51C2F4',
              '#151159'
            ],
            hoverBackgroundColor: [
              '#009BFF',
              '#278172',
              '#C2D8E3',
              '#E1B212',
              '#008BC8',
              '#51C2F4',
              '#151159'
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

  ngOnInit() {
  }

}
