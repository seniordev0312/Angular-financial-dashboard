import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogMode } from '@root/shared/models/enums/dialog-mode.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { DocumentTypeFormGroup } from '../../form-groups/add-document-type-form-group.service';

@Component({
  selector: 'app-add-document-type',
  templateUrl: './add-document-type.component.html',
  styleUrls: ['./add-document-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddDocumentTypeComponent implements OnInit {

  fg: FormGroup;
  mode: DialogMode = DialogMode.Add;

  constructor(private documentTypeFormGroup: DocumentTypeFormGroup,
    private layoutService: LayoutService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.mode = DialogMode.Edit;
        //todo wait fetch api
        this.fg = this.documentTypeFormGroup.getFormGroup();
      }
      else {
        this.fg = this.documentTypeFormGroup.getFormGroup();
      }
    })
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
}
