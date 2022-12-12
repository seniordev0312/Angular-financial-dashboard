import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogMode } from '@root/shared/models/enums/dialog-mode.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-add-new-entity',
  templateUrl: './add-new-entity.component.html',
  styleUrls: ['./add-new-entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewEntityComponent implements OnInit {
  mode: DialogMode = DialogMode.Add;
  data1: TreeNode[];

  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.mode = DialogMode.Edit;
        //todo wait fetch api
      }
      else {
      }
    });

    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: `${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesManagement}`,
          translationKey: 'Entity Management'
        },
        {
          route: `${ApplicationRoutes.EntitiesListManagement}/${ApplicationRoutes.Add}`,
          translationKey: 'Define New Entity'
        }
      ],
    });

    this.data1 = [{
      label: 'CEO',
      type: 'entity',
      styleClass: 'p-person',
      expanded: true,
      data: { name: 'Walter White', 'avatar': 'walter.jpg' },
      children: [
        {
          label: 'CFO',
          type: 'section',
          styleClass: 'p-person',
          expanded: true,
          data: { name: 'Saul Goodman', 'avatar': 'saul.jpg' },
        },
      ]
    }];
  }

  onSave(): void {
  }


  onCancel(): void {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesListManagement}`]);
  }


  isCreateMode() {
    return this.mode === DialogMode.Add;
  }

  isUpdateMode() {
    return this.mode === DialogMode.Edit;
  }
}