import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { DialogMode } from '@root/shared/models/enums/dialog-mode.model';
import { ConfirmationDialogService } from '@root/shared/notifications/services/dialog-confirmation.service';
import { LayoutService } from '@root/shared/services/layout.service';
import { take } from 'rxjs';
import { SectionFormGroup } from '../../form-groups/section-form-group.service';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSectionComponent extends BaseComponent implements OnInit {

  fg: FormGroup;
  mode: DialogMode = DialogMode.Add;

  constructor(private sectionFormGroup: SectionFormGroup,
    private layoutService: LayoutService,
    private confirmationDialogService: ConfirmationDialogService,
    private activeRoute: ActivatedRoute) { super(); }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.mode = DialogMode.Edit;
        //todo wait fetch api
        this.fg = this.sectionFormGroup.getFormGroup();
      }
      else {
        this.fg = this.sectionFormGroup.getFormGroup();
      }
    })
  }

  onSave(): void {
    this.layoutService.closeRightSideNav();
  }


  onClose(): void {
    this.layoutService.closeRightSideNav();
  }

  onSectionDeleted(): void {
    this.confirmationDialogService.open({
      description: 'Are you sure you want to delete this section?',
      title: 'Delete Section',
      icon: 'error_outline',
      cancelText: 'Cancel',
      confirmText: 'Confirm',
      actionButtonsColor: 'warn',
      iconCssClasses: 'text-warn',
    });

    this.subscriptions.add(
      this.confirmationDialogService.confirmed().pipe(take(1)).subscribe((isConfirmed) => {
        if (isConfirmed) { }
      }));
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
