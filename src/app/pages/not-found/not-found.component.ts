/**
 * * Title: not-found.component.ts
 * Author: James Pinson 
 * Date: 09/25/21
 * Description: This is the component ts file for the 404 page.
 */

//This is the import statements. 
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})

//Here we export the not found component. 
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
