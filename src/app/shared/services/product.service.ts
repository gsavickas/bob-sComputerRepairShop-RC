/**
 * * Title: product.service.ts
 * Author: Larry Ohaka
 * Date: 09/29/21
 * Description: Product service 
 */

import { Injectable } from '@angular/core';
//import { url } from 'inspector';
import { Product } from '../models/product.interface';



@Injectable({
    providedIn: 'root'
})

export class ProductService {

    products: Product[];
//Constructor list that displays the product.interface
    constructor() {
        this.products = [
            {
              
                id: 100,
                title: 'Software Update',
                price: 39.99,
                image: '../../../assets/BCRS_icons-05.png',
                checked: false,
            
            },
            {
                id: 101,
                title: 'RAM Upgrade',
                image: '../../../assets/BCRS_icons-06.png',
                price: 39.99,
                checked: false
            },
            {
                id: 102,
                title: 'Disk Cleanup',
                image: '../../../assets/BCRS_icons-07.png',
                price: 129.99,
                checked: false
            },
            {
                id: 103,
                title: 'Keyboard Cleaning',
                image: '../../../assets/BCRS_icons-08.png',
                price: 49.99,
                checked: false
            },
            {
                id: 104,
                title: 'Spyware Removal',
                image: '../../../assets/BCRS_icons-09.png',
                price: 89.99,
                checked: false
            },
            {
                id: 105,
                title: 'Password Reset',
                image: '../../../assets/BCRS_icons-10.png',
                price: 45.99,
                checked: false
            },
            {
                id: 106,
                title: 'PC Tuneup',
                image: '../../../assets/BCRS_icons-11.png',
                price: 45.00,
                checked: false
            },
        ]
    }
//returns list of products
    getProducts(): Product[] {
        return this.products;
    }
}