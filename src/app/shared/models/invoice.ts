/**
 * * Title: invoice.ts
 * Author: Larry Ohaka
 * Date: 09/29/21
 * Description: invoice model
 */

import { LineItem } from './line-item.interface';

export class Invoice {
    private username: string;
    private lineItems: LineItem[]
    private orderDate: string;
    private LABOR_RATE: number = 50;

    partsAmount: number;
    laborHours: number;

    constructor(username?: string, partsAmount?: number, laborHours?: number) {
        this.username = username || '';
        this.partsAmount = partsAmount || 0;
        this.laborHours = laborHours || 0;
        this.orderDate = new Date().toLocaleDateString()
        this.lineItems = [];
    }

    // return the userName
    getUsername(): string {
        return this.username;
    }

    // return the lineItems
    setLineItems(lineItems: LineItem[]): void {
        this.lineItems = lineItems;
    }

    // return the the result of getLineItems
    getLineItems(): LineItem[] {
       return this.lineItems;
    }

    // return the LineItemTotal
    getLineItemTotal(): number {
        let total = 0;
        for (let lineItem of this.lineItems) {
            total += lineItem.price;
        }

        return Number(total);
    }

    // Find the getLaborAmount
    getLaborAmount(): number {
        return Number(this.laborHours) * Number(this.LABOR_RATE);
    }
    
    // provide the OrderData
    getOrderDate(): string {
        return this.orderDate;
    }

    // provide the total
    getTotal(): number {
        return Number(this.partsAmount) + Number(this.getLaborAmount()) + Number(this.getLineItemTotal());
    }

    // clear the invoice
    clear() {
        this.partsAmount = 0;
        this.laborHours = 0;
        this.lineItems = [];
    }
    }

