import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../customer/customer.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-dialog',
  templateUrl:'./customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.scss']
})
export class CustomerDialogComponent implements OnInit {
  customerForm!: FormGroup;
  isEditMode = false;
  
  constructor(
    public dialogRef: MatDialogRef<CustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    private fb: FormBuilder, private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data;
    this.initForm();
  }

  private initForm(): void {
    this.customerForm = this.fb.group({
      customerId: new FormControl(this.data?.customerId || 0),
      customerName: new FormControl(this.data?.customerName || '', Validators.required),
      email: new FormControl(this.data?.email || '', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      contactNo: new FormControl(this.data?.contactNo || '', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      lastOrderDate: new FormControl(this.data?.lastOrderDate ? new Date(this.data.lastOrderDate) : new Date(), Validators.required)
    });
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onFormSubmit() {
    if (this.customerForm.valid) {
      const customerData: Customer = this.customerForm.value;
      console.log(customerData);
      this.dialogRef.close(customerData);
      this.snackBar.open('Customer data saved successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    } else {
      // Show an error message if the form is invalid
      this.snackBar.open('Please fill in all required fields correctly!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }
}
