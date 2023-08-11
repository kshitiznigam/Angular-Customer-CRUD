import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { ApiService } from '../services/app.service';

export interface Customer {
  [x: string]: any;
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
  roles: any[] = [];

  selection = new SelectionModel<Customer>(true, []);
  totalUsers: number = 0;
  totalRoles: number = 0;

  pieChartSeries: number[] = [];
  barChartSeries: number[] = [];


  constructor(public dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {
    const storedDataJson = localStorage.getItem('custData');
    if (storedDataJson) {
      this.dataSource = JSON.parse(storedDataJson);
    }

    this.roles = [
      { id: 1, name: 'Role 1' },
      { id: 2, name: 'Role 2' },
      // Add more role objects as needed
    ];

    this.calculateTotalUsers();
    this.calculateTotalRoles();
    // this.updateCharts();
  }

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

        localStorage.setItem('custData', JSON.stringify(this.dataSource));
        this.apiService.addCustomer(result).subscribe(customer => {
          this.dataSource.push(customer);
          // this.dataSource = [...this.dataSource];
          this.calculateTotalUsers();
          // this.updateCharts();
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

        localStorage.setItem('custData', JSON.stringify(this.dataSource));
        this.calculateTotalUsers();
        // this.updateCharts();
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

      localStorage.setItem('custData', JSON.stringify(this.dataSource));
      this.calculateTotalUsers();
      // this.updateCharts();
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

  calculateTotalUsers(): void {
    this.totalUsers = this.dataSource.length;
  }

  calculateTotalRoles(): void {
    this.totalRoles = this.dataSource.length;
  }

  // generateChartData(): { category: string; value: number }[] {
  //   const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June','Jul','Aug','Sep','Oct','Nov','Dec'];

  //   const chartData: { category: string; value: number }[] = [];

  //   for (const category of categories) {
  //     const count = this.dataSource.filter(customer => {
  //       const startDate = new Date(category);
  //       const endDate = new Date(startDate);
  //       endDate.setMonth(endDate.getMonth() + 1);
  
  //       return (
  //         customer.lastOrderDate >= startDate &&
  //         customer.lastOrderDate < endDate
  //       );
  //     }).length;
  
  //     chartData.push({ category, value: count });
  //   }
  
  //   return chartData;
  // }

  // updateCharts(): void {
  //   const chartData = this.generateChartData();

  //   this.pieChartSeries = chartData.map(data => data.value);
  //   this.barChartSeries = chartData.map(data => data.value);
  // }
}
