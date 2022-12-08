import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseListItem } from '@root/shared/models/select-list-with-chips/base-list-item.model';
import { LayoutService } from '@root/shared/services/layout.service';

import { ModuleElementTypesFormGroup } from '../../form-groups/module-element-type-form-group.service';
import { AddUserRoleFormGroup } from '../../form-groups/add-user-role-form-group.service';

@Component({
  selector: 'app-add-user-role',
  templateUrl: './add-user-role.component.html',
  styleUrls: ['./add-user-role.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserRoleComponent implements OnInit {

  fg: FormGroup;
  moduleList: BaseListItem[] = [
    {
      id: '0',
      name: 'Administrator',
      secondaryList: [
        {
          id: '0',
          name: 'Access System Setup'
        },
        {
          id: '1',
          name: 'Edit System Setup'
        },
        {
          id: '2',
          name: 'Delete System Setup'
        },

        {
          id: '3',
          name: 'Add System Setup'
        },
      ]
    },
    {
      id: '1',
      name: 'Entity Management',
      secondaryList: [
        {
          id: '0',
          name: 'Access Entity Management'
        },
        {
          id: '1',
          name: 'Edit Entity Management'
        },
        {
          id: '2',
          name: 'Delete Entity Management'
        },

        {
          id: '3',
          name: 'Add Entity Management'
        },
      ]
    },
    {
      id: '2',
      name: 'Accounting',
      secondaryList: [
        {
          id: '0',
          name: 'Access Accounting'
        },
        {
          id: '1',
          name: 'Edit Accounting'
        },
        {
          id: '2',
          name: 'Delete Accounting'
        },

        {
          id: '3',
          name: 'Add Accounting'
        },
      ]
    },
  ]

  constructor(
    private layoutService: LayoutService,
    private moduleElementTypesFormGroup: ModuleElementTypesFormGroup,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        // this.mode = DialogMode.Edit;
        //todo wait fetch api
        this.fg = this.moduleElementTypesFormGroup.getFormGroup();
      }
      else {
        this.fg = this.moduleElementTypesFormGroup.getFormGroup();
      }
    });
  }

  onSave(): void {
    this.layoutService.closeRightSideNav();
  }

  onCancel(): void {
    this.layoutService.closeRightSideNav();
  }

  onNewUserRoleAdded(): void {
    console.log();
  }
}
