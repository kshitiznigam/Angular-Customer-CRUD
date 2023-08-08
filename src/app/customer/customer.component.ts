import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';

export interface Customer {
  customerId: number;
  customerName: string;
  email: string;
  contactNo: string;
  lastOrderDate: Date;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  displayedColumns: string[] = ['customerId', 'customerName', 'email', 'contactNo', 'lastOrderDate', 'edit', 'delete'];
  dataSource: Customer[] = [
    { customerId: 1, customerName: 'John Doe', email: 'john@example.com', contactNo: '123-456-7890', lastOrderDate: new Date('2023-07-22') },
    { customerId: 2, customerName: 'Jane Smith', email: 'jane@example.com', contactNo: '987-654-3210', lastOrderDate: new Date('2023-07-20') },

  ];

  selection = new SelectionModel<Customer>(true, []);

  constructor(public dialog: MatDialog) {}

  onAddCustomerClick() {
    const dialogRef: MatDialogRef<CustomerDialogComponent> = this.dialog.open(CustomerDialogComponent, {
      width: '500px',
      data: {} 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.customerId = this.dataSource.length + 1;
        this.dataSource.push(result);
        this.dataSource = [...this.dataSource];
      }
    });
  }

  onEditCustomerClick(customer: Customer): void {
    const dialogRef: MatDialogRef<CustomerDialogComponent> = this.dialog.open(CustomerDialogComponent, {
      width: '500px',
      data: { ...customer } // Pass the customer object as data to the dialog to pre-fill the form
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Call the editCustomer function to update the existing customer details
        this.editCustomer(result);
      }
    });
  }

  toggleCustomerSelection(customer: Customer): void {
    this.selection.toggle(customer);
  }

  onDeleteSelectedCustomers() {
    const selectedCustomers = this.selection.selected;
    if (selectedCustomers.length === 0) {
      return;
    }

    const dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialog.open(
      
      ConfirmationDialogComponent,
      {
        width: '250px',
        data: 'Are you sure you want to delete the selected customers?'
      }
    
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSelectedCustomers();
      }
    });
  }

  deleteSelectedCustomers() {
  
    const selectedCustomerIds = this.selection.selected.map((customer) => customer.customerId);
    this.dataSource = this.dataSource.filter((customer) => !selectedCustomerIds.includes(customer.customerId));
    this.selection.clear();
    
  }

  private editCustomer(customer: Customer): void {
    const existingCustomerIndex = this.dataSource.findIndex((item) => item.customerId === customer.customerId);

    if (existingCustomerIndex >= 0) {
      this.dataSource[existingCustomerIndex] = customer;
      this.dataSource = [...this.dataSource];
    }
  }

  // Helper methods for checkbox selection
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.forEach((row) => this.selection.select(row));
  }
}
