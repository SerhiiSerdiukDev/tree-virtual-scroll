import { ArrayDataSource } from '@angular/cdk/collections';
import { CdkTree, CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface TopicFlatNode {
  id: string;
  name: string;
  expandable: boolean;
  level: number;
  expanded?: boolean;
}

const DATA: TopicFlatNode[] = [
  {
    id: '1',
    name: 'Fruit',
    expandable: true,
    level: 0,
    expanded: false,
  },
  {
    id: '2',
    name: 'Apple',
    expandable: false,
    level: 1,
  },
  {
    id: '3',
    name: 'Banana',
    expandable: false,
    level: 1,
  },
  {
    id: '4',
    name: 'Vegetables',
    expandable: true,
    level: 0,
    expanded: false,
  },
  {
    id: '5',
    name: 'Tomato',
    expandable: false,
    level: 1,
  },
  {
    id: '6',
    name: 'Carrot',
    expandable: false,
    level: 1,
  },
];

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [CommonModule, CdkTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent {
  @ViewChild(CdkTree)
  // @ts-ignore
  tree: CdkTree<TopicFlatNode>;

  levelAccessor = (dataNode: TopicFlatNode) => dataNode.level;

  dataSource = new ArrayDataSource(DATA);

  hasChild = (_: number, node: TopicFlatNode) => node.expandable;

  getParentNode(node: TopicFlatNode) {
    const nodeIndex = DATA.indexOf(node);

    // Determine the node's parent by finding the first preceding node that's
    // one level shallower.
    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (DATA[i].level === node.level - 1) {
        return DATA[i];
      }
    }

    return null;
  }

  shouldRender(node: TopicFlatNode): boolean {
    // This node should render if it is a root node or if all of its ancestors are expanded.
    const parent = this.getParentNode(node);
    return (
      !parent || (!!this.tree?.isExpanded(parent) && this.shouldRender(parent))
    );
  }
}
