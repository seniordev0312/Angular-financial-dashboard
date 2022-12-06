import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogMode } from '@root/shared/models/enums/dialog-mode.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { EntitySourceTypeFormGroup } from '../../form-groups/entity-source-form-group.service';

@Component({
  selector: 'app-add-entity-source',
  templateUrl: './add-entity-source.component.html',
  styleUrls: ['./add-entity-source.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEntitySourceComponent implements OnInit {

  fg: FormGroup;
  mode: DialogMode = DialogMode.Add;
  constructor(
    private entitySourceTypeFormGroup: EntitySourceTypeFormGroup,
    private activeRoute: ActivatedRoute,
    private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.mode = DialogMode.Edit;
        //todo wait fetch api
        this.fg = this.entitySourceTypeFormGroup.getFormGroup();
      }
      else {
        this.fg = this.entitySourceTypeFormGroup.getFormGroup();
      }
    });
  }

  onSave(): void {
    this.layoutService.closeRightSideNav();
  }


  onClose(): void {
    this.layoutService.closeRightSideNav();
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  isCreateMode() {
    return this.mode === DialogMode.Add;
  }

  isUpdateMode() {
    return this.mode === DialogMode.Edit;
  }
}