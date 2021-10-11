/**
 * * Title: delete-record-dialog
 * Author: Grayton Savickas
 * Date: 08/18/21
 * Description: dialog for deleting a record
 */


import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-record-dialog',
  templateUrl: './delete-record-dialog.component.html',
  styleUrls: ['./delete-record-dialog.component.css']
})
export class DeleteRecordDialogComponent implements OnInit {
  recordId: string;
  dialogHeader: string;
  dialogBody: string;

  // provide the recordId, dialogHeader and the dialogBody from the MatDialog form
  constructor(private dialogRef: MatDialogRef<DeleteRecordDialogComponent>, @Inject(MAT_DIALOG_DATA) data) { 
    this.recordId = data.recordId;
    this.dialogHeader = data.dialogHeader;
    this.dialogBody = data.dialogBody;
  }

  ngOnInit(): void {
  }

}
