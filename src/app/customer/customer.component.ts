import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { ApiService } from '../services/app.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';

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
export class CustomerComponent implements OnInit {
  displayedColumns: string[] = ['customerId', 'customerName', 'email', 'contactNo', 'lastOrderDate', 'edit', 'delete'];
  dataSource: Customer[] = [];
  // roles: any[] = [];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  selection = new SelectionModel<Customer>(true, []);
  // totalUsers: number = 0;
  // totalRoles: number = 0;

  constructor(public dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getCustomers().subscribe(
      (customers) => {
        this.dataSource = customers;
        // Save the fetched data to local storage
        // localStorage.setItem('custData', JSON.stringify(this.dataSource));
      },
      (error) => {
        console.error('Failed to fetch customers:', error);
      }
    );
  }

  onAddCustomerClick() {
    const dialogRef: MatDialogRef<CustomerDialogComponent> = this.dialog.open(CustomerDialogComponent, {
      width: '500px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.customerId = this.dataSource.length + 1;
  
        this.apiService.addCustomer(result).subscribe(customer => {
          this.dataSource.push(customer);
          this.dataSource = [...this.dataSource]; // Refresh the data source to trigger change detection
  
          // localStorage.setItem('custData', JSON.stringify(this.dataSource));
        });
      }
    });
  }
  
  

  onEditCustomerClick(customer: Customer): void {
    const dialogRef: MatDialogRef<CustomerDialogComponent> = this.dialog.open(CustomerDialogComponent, {
      width: '500px',
      data: { ...customer }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.editCustomer(result).subscribe(updatedCustomer => {
          this.editCustomer(updatedCustomer);
        });
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
    for (const customerId of selectedCustomerIds) {
      this.apiService.deleteCustomer(customerId).subscribe(() => {
        this.dataSource = this.dataSource.filter((customer) => customer.customerId !== customerId);
        this.selection.clear();

        // localStorage.setItem('custData', JSON.stringify(this.dataSource));
      
        
      }, (error) => {
        console.error('Failed to delete customer with ID:', customerId);
      });
    }
  }

  private editCustomer(customer: Customer): void {
    const existingCustomerIndex = this.dataSource.findIndex((item) => item.customerId === customer.customerId);

    if (existingCustomerIndex >= 0) {
      this.dataSource[existingCustomerIndex] = customer;
      this.dataSource = [...this.dataSource];

      // localStorage.setItem('custData', JSON.stringify(this.dataSource));
      
    }
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.forEach((row) => this.selection.select(row));
  }

}
