import { Component } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dataSource: MatTreeFlatDataSource<TreeNode, FlatNode>;
  treeControl: FlatTreeControl<FlatNode>;
  isOpened: boolean = false;

  
  // Sample data for demonstration
  treeData: TreeNode[] = [
    {
      name: 'Node 1',
      icon: 'home',
      children: [
        { name: 'Child 1', icon: 'child_care' },
        { name: 'Child 2', icon: 'child_care' }
      ]
    },
    {
      name: 'Node 2',
      icon: 'work',
      children: [
        { name: 'Child 3', icon: 'child_care' },
        { name: 'Child 4', icon: 'child_care' }
      ]
    }
    // Add more nodes as needed
  ];

  constructor() {
    this.treeControl = new FlatTreeControl<FlatNode>(
      node => node.level,
      node => node.expandable
    );

    const treeFlattener = new MatTreeFlattener<TreeNode, FlatNode>(
      (node: TreeNode, level: number) => ({
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        icon: node.icon,
        level: level
      }),
      node => node.level,
      node => node.expandable,
      node => node.children
    );

    this.dataSource = new MatTreeFlatDataSource(this.treeControl, treeFlattener);
    this.dataSource.data = this.treeData;
  }
}
