import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { TreeNode } from 'primeng/api';
import { CompanyStructureService } from '../../services/company-structure.service';
@Component({
  selector: 'app-company-structure',
  templateUrl: './company-structure.component.html',
  styleUrls: ['./company-structure.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyStructureComponent extends BaseComponent implements OnInit {
  treeNode: TreeNode[];
  constructor(
    private layoutService: LayoutService,
    private companyStructureService: CompanyStructureService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.companyStructureService.addBranch$.subscribe((data) => {
        if (data) {
          if (data.level === 2) {
            this.treeNode[0].children.push({
              type: 'branch',
              expanded: true,
              data: { name: data.name, level: data.level, parentId: data.parentId, id: data.id },
              children: [],
            })
          } else {
            this.addNodeToTreeNode(
              this.treeNode[0],
              {
                type: 'branch',
                expanded: true,
                data: { name: data.name, level: data.level++, parentId: data.parentId },
                children: [],
              })
          }
        }
      })
    );

    this.subscriptions.add(
      this.companyStructureService.addDepartment$.subscribe((data) => {
        if (data) {
          if (data.level === 2) {
            this.treeNode[0].children.push({
              type: 'department',
              expanded: true,
              data: { name: data.name, level: data.level, parentId: data.parentId, id: data.id },
              children: [],
            })
          } else {
            this.addNodeToTreeNode(
              this.treeNode[0],
              {
                type: 'department',
                expanded: true,
                data: { name: data.name, level: data.level++, parentId: data.parentId },
                children: [],
              })
          }
        }
      })
    );

    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.SystemSetup,
          translationKey: 'system-setup.system-setup'
        },
        {
          route: ApplicationRoutes.CompanyStructure,
          translationKey: 'system-setup.company-structure'
        }
      ],
    });

    // this.subscriptions.add(
    //   treeNode$.subscribe((data) => {
    //     if (data) {
    //       console.log('treeNode$', this.treeNode);
    //       this.treeNode = data;
    //     }
    //   })
    // );

    this.treeNode = [
      {
        type: 'company',
        expanded: true,
        data: { name: 'Company Name', level: 1, id: 3, parentId: 0 },
        children: []
      }
    ];
  }
  addNodeToTreeNode(nodes: TreeNode, node: TreeNode) {
    nodes.children.forEach((item) => {
      if (item.data.id === node.data.parentId) {
        item.children.push(node);
      } else {
        this.addNodeToTreeNode(item, node)
      }
    })
    // return this.addNodeToTreeNode()
  }

}
