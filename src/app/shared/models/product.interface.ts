/**
 * * Title: invoice.ts
 * Author: Larry Ohaka
 * Date: 09/29/21
 * Description: invoice model
 */

export interface Product {
    id: number;
    title: string;
    price: number;
    checked: boolean;
}