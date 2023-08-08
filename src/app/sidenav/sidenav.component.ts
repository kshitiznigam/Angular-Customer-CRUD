
import { MatDrawer } from '@angular/material/sidenav';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { MatTreeFlatDataSource } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Router } from '@angular/router'; // Import Router from @angular/router

interface TreeNode {
  name: string;
  icon: string;
  children?: TreeNode[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  icon: string;
  level: number;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Input() dataSource!: MatTreeFlatDataSource<TreeNode, FlatNode>;
  @Input() treeControl!: FlatTreeControl<FlatNode>;
  @Input() isOpened!: boolean;
  @Input() drawer?: MatDrawer;

  @Output() openCustomersTable = new EventEmitter<void>();

  constructor(private router: Router) {} // Inject the Router service

  onCustomersClick(): void {
    // Navigate to the CustomerComponent when clicking on "Customers" link
    this.router.navigate(['/customers']);
  }

  selectedMenu: string = '';
  hasChild = (_: number, node: FlatNode) => node.expandable;

  menuClicked(node: FlatNode): void {
    if (this.selectedMenu === node.name) {
      this.selectedMenu = '';
    } else {
      this.selectedMenu = node.name;
    }
  }

  ngOnInit() {
    // Initialize anything required during component initialization.
  }
}
