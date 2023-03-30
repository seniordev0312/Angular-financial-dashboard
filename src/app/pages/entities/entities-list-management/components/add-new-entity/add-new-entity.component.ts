import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { DialogMode } from '@root/shared/models/enums/dialog-mode.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { TreeNode } from 'primeng/api';
import { EntityFormGroup } from '../../form-groups/entity-form-group.service';
import { EntitiesListService } from '../../services/entities-list.service';
import { EntitiesListRepository } from '../../store/entities-list.repository';
import { entityDetails$ } from '../../store/entities-list.store';

@Component({
  selector: 'app-add-new-entity',
  templateUrl: './add-new-entity.component.html',
  styleUrls: ['./add-new-entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewEntityComponent extends BaseComponent implements OnInit {
  mode: DialogMode = DialogMode.Add;
  entityCardFg: FormGroup;

  data: TreeNode[] = [{
    label: '',
    type: 'entity',
    expanded: true,
    data: {},
    children: []
  }];

  selectedEntity: TreeNode = this.data[0];

  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    private entityFormGroup: EntityFormGroup,
    private cdr: ChangeDetectorRef,
    private entitiesListService: EntitiesListService,
    private entitiesListRepository: EntitiesListRepository,
    private layoutService: LayoutService) { super(); }

  ngOnInit(): void {
    this.entitiesListRepository.updateIsCreateEntityValid(null);
    this.entityCardFg = this.entityFormGroup.getFormGroup();
    this.selectedEntity = this.data[0];
    this.subscriptions.add(this.activeRoute.paramMap.subscribe(params => {
      if (params.get('code')) {
        this.mode = DialogMode.Edit;
        this.entitiesListService.getEntityDetails(params.get('code'));
      }
      else {
      }
    }));

    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: `${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesManagement}`,
          translationKey: 'Entity Management'
        },
        {
          route: `${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesListManagement}`,
          translationKey: 'Manage Entity'
        },
        {
          route: `${ApplicationRoutes.EntitiesListManagement}/${ApplicationRoutes.Add}`,
          translationKey: 'Define New Entity'
        }
      ],
    });

    this.subscriptions.add(entityDetails$.subscribe(entityDetails => {
      if (!this.isEmpty(entityDetails)) {
        this.selectedEntity = {
          ... this.selectedEntity,
          data: { name: entityDetails.entityName, code: entityDetails.entityCode }
        }
        this.entityCardFg.patchValue({ name: entityDetails.entityName, code: entityDetails.entityCode });

        this.selectedEntity.children.splice(0, this.selectedEntity.children.length);


        entityDetails.sections?.forEach(section => {
          this.selectedEntity.children.push({
            label: '',
            type: 'section',
            expanded: true,
            data: section,
          })
        });

        this.cdr.detectChanges();
      }
    }));
  }

  onSave(): void {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesListManagement}`]);
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