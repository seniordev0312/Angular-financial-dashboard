import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { DialogMode } from '@root/shared/models/enums/dialog-mode.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { EntitySourceTypeFormGroup } from '../../form-groups/entity-source-form-group.service';
import { EntitiesSourcesListService } from '../../services/entities-sources-list.service';
import { entitiesSourceDetails$ } from '../../store/entities-sources.store';

@Component({
  selector: 'app-add-entity-source',
  templateUrl: './add-entity-source.component.html',
  styleUrls: ['./add-entity-source.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEntitySourceComponent extends BaseComponent implements OnInit {

  fg: FormGroup;
  mode: DialogMode = DialogMode.Add;
  constructor(
    private entitySourceTypeFormGroup: EntitySourceTypeFormGroup,
    private activeRoute: ActivatedRoute,
    private entitiesSourcesListService: EntitiesSourcesListService,
    private cdr: ChangeDetectorRef,
    private layoutService: LayoutService) { super(); }

  ngOnInit(): void {
    this.subscriptions.add(this.activeRoute.params.subscribe(params => {
      if (params.id) {
        this.mode = DialogMode.Edit;
        this.entitiesSourcesListService.getSourceDetails(params.id)
      }
      else {
        this.fg = this.entitySourceTypeFormGroup.getFormGroup();
      }
    }));

    this.subscriptions.add(entitiesSourceDetails$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.fg = this.entitySourceTypeFormGroup.getFormGroup(data);
        this.cdr.detectChanges();
      }
    }))
  }

  onSave(): void {
    if (this.fg.valid) {
      const data = this.entitySourceTypeFormGroup.getValueFromFormGroup(this.fg);
      if (this.isCreateMode()) {
        delete data.entitySourceId;
        this.entitiesSourcesListService.addSource(data);
      }
      else {
        this.entitiesSourcesListService.editSource(data);
      }
      this.fg.reset();
      this.layoutService.closeRightSideNav();
    }
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