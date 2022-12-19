import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { DialogMode } from '@root/shared/models/enums/dialog-mode.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { DocumentTypeFormGroup } from '../../form-groups/add-document-type-form-group.service';
import { EntitiesDocumentsListService } from '../../services/entities-documents-list.service';
import { documentDetails$ } from '../../store/entities-kyc-document.store';

@Component({
  selector: 'app-add-document-type',
  templateUrl: './add-document-type.component.html',
  styleUrls: ['./add-document-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AddDocumentTypeComponent extends BaseComponent implements OnInit {

  fg: FormGroup;
  mode: DialogMode = DialogMode.Add;

  constructor(private documentTypeFormGroup: DocumentTypeFormGroup,
    private layoutService: LayoutService,
    private router: Router,
    private entitiesDocumentsListService: EntitiesDocumentsListService,
    private activeRoute: ActivatedRoute) { super(); }

  ngOnInit(): void {
    this.subscriptions.add(this.activeRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.mode = DialogMode.Edit;
        this.entitiesDocumentsListService.getDocumentDetails(params.get('id'));
      }
      else {
        this.fg = this.documentTypeFormGroup.getFormGroup();
      }
    }));

    this.subscriptions.add(documentDetails$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.fg = this.documentTypeFormGroup.getFormGroup(data);
      }
    }))
  }

  onSave(): void {
    if (this.fg.valid) {
      const data = this.documentTypeFormGroup.getValueFromFormGroup(this.fg);
      if (this.isCreateMode()) {
        this.entitiesDocumentsListService.addDocument(data);
      }
      else {
        this.entitiesDocumentsListService.editDocument(data);
      }
      this.fg.reset();
      this.layoutService.closeRightSideNav();
    }
  }


  onClose(): void {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesKYCDocumentTypesManagement}`, {
      outlets: { sidenav: null },
    }], { skipLocationChange: true });
    this.layoutService.closeRightSideNav();
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  isCreateMode() {
    return this.mode === DialogMode.Add;
  }
}
