/**
 * * Title: invoice.service.ts
 * Author: Larry Ohaka
 * Date: 09/29/21
 * Description: invoice service
 */

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Invoice } from '../models/invoice'

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {
    constructor(private http: HttpClient) {}
//This sends the invoice to the database
    createInvoice(userName: string, invoice: Invoice): Observable<any> {
        return this.http.post(`/api/invoices/${userName}`, {
            userName: userName,
            lineItems: invoice.getLineItems(),
            partsAmount: invoice.partsAmount,
            laborAmount: invoice.getLaborAmount(),
            lineItemTotal: invoice.getLineItemTotal(),
            total: invoice.getTotal()
        })
    }

    findPurchasesByServiceGraph(): Observable<any> {
        return this.http.get(`/api/invoices/purchases-graph`)
    }
}