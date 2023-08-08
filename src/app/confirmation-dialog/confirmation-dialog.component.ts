import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  @Output() confirmDeletion: EventEmitter<boolean> = new EventEmitter<boolean>(); 

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancelClick(): void {
    this.confirmDeletion.emit(false); 
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.confirmDeletion.emit(true); // Emit true when the user confirms the deletion
    this.dialogRef.close(true);
  }
}
