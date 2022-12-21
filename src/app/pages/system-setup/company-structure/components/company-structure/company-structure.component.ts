import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { TreeNode } from 'primeng/api';
import { AddGroup } from '../../models/add-group.model';
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
    private cdr: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.companyStructureService.addBranch$.subscribe((data) => {
        if (data) {
          this.addNodeToTreeNode(
            this.treeNode[0],
            {
              type: 'branch',
              expanded: true,
              data: { name: data.name, parentId: data.parentId, id: data.id, groups: [] },
              children: [],
            });
          this.cdr.detectChanges();
        }
        this.cdr.detectChanges();
      })
    );

    this.subscriptions.add(
      this.companyStructureService.addGroup$.subscribe((data) => {
        if (data) {
          this.addGroup(this.treeNode[0], data);
          console.log(this.treeNode);
        }
        this.cdr.detectChanges();
      }));

    this.subscriptions.add(
      this.companyStructureService.addDepartment$.subscribe((data) => {
        if (data) {
          this.addNodeToTreeNode(
            this.treeNode[0],
            {
              type: 'department',
              expanded: true,
              data: { name: data.name, parentId: data.parentId, id: data.id, groups: [] },
              children: [],
            });
        }
        this.cdr.detectChanges();
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

    this.treeNode = [
      {
        type: 'company',
        expanded: true,
        data: {
          name: 'Company Name', id: 3, parentId: 0, groups: [
            {
              name: 'G1',
              id: 6309,
              parentId: 3,
              users: [
                {
                  id: '121-21-2121-2',
                  displayName: 'Batata'
                }
              ]
            }
          ]
        },
        children: [
          {
            type: 'branch',
            expanded: true,
            data: {
              name: 'B1', id: 324, parentId: 3, groups: [[
                {
                  name: 'G2',
                  id: 131,
                  parentId: 324,
                  users: [
                    {
                      id: '121-21-2121-2',
                      displayName: 'Batata'
                    }
                  ]
                }
              ]]
            },
            children: []
          },
          {
            type: 'branch',
            expanded: true,
            data: {
              name: 'Company Name', id: 4516, parentId: 3, groups: []
            },
            children: [
              {
                type: 'department',
                expanded: true,
                data: {
                  name: 'Company Name', id: 4421, parentId: 4516, groups: []
                },
                children: []
              }
            ]
          },
          {
            type: 'department',
            expanded: true,
            data: {
              name: 'Company Name', id: 4401, parentId: 3, groups: []
            },
            children: []
          }
        ]
      }
    ];
  }
  addGroup(nodes: TreeNode, data: AddGroup) {
    if (Number(data.parentId) === nodes.data.id) {
      let index = nodes.data.groups.findIndex((e: any) => Number(e.id) === Number(data.id));
      if (index === -1) {
        nodes.data.groups.push({ name: data.name, id: data.id, parentId: data.parentId });
        return
      } else {
        nodes.data.groups[index] = data;
        return
      }
    }
    nodes.children.forEach((item) => {
      if (item.data.id === data.parentId) {
        let index = item.data.groups.findIndex((e: any) => Number(e.id) === Number(data.id));
        if (index === -1) {
          item.data.groups.push({ name: data.name, id: data.id, parentId: data.parentId });
          return
        } else {
          nodes.data.groups[index] = data;
          return
        }
      } else {
        return this.addGroup(item, data)
      }
    });
    this.cdr.detectChanges();
  }

  addNodeToTreeNode(nodes: TreeNode, node: TreeNode) {
    if (Number(node.data.parentId) === nodes.data.id) {
      nodes.children.push(node);
      return
    }
    nodes.children.forEach((item) => {
      if (item.data.id === node.data.parentId) {
        item.children.push(node);
        return
      } else {
        return this.addNodeToTreeNode(item, node)
      }
    });
    this.cdr.detectChanges();
  }

  onCopyBranch(data: any) {
    this.copyBranch(this.treeNode[0], {
      type: 'branch',
      expanded: true,
      data: { name: data.data.name, parentId: data.data.parentId, id: data.data.id, groups: [] },
      children: [],
    });
  }

  copyBranch(nodes: TreeNode, branchData: any) {
    if (Number(branchData.data.parentId) === nodes.data.id) {
      branchData.data.name = branchData.data.name + ' - Copy';
      nodes.children.map((node: TreeNode) => {
        if (node.data.id === branchData.data.id) {
          branchData.data.id = Math.floor(Math.random() * 10000);
          branchData.children = node.children;
          this.saveCopiedBranch(branchData);
        }
      })
      return
    }
    this.cdr.detectChanges();
  }

  saveCopiedBranch(node: TreeNode) {
    console.log(this.treeNode);
    this.companyStructureService.addBranch({ name: node.data.name, parentId: node.data.parentId, id: node.data.id });
    console.log(node.children);
    node.children.map((value: TreeNode) => {
      if (value.type === 'department') {
        this.companyStructureService.addDepartment({ name: value.data.name, parentId: node.data.id, id: Math.floor(Math.random() * 10000) })
      }
    })
  }
}
