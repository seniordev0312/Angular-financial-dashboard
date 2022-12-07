import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogMode } from '@root/shared/models/enums/dialog-mode.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ElementFormGroup } from '../../form-groups/element-form-group.service';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddElementComponent implements OnInit {

  fg: FormGroup;
  mode: DialogMode = DialogMode.Add;

  constructor(private elementFormGroup: ElementFormGroup,
    private layoutService: LayoutService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.mode = DialogMode.Edit;
        //todo wait fetch api
        this.fg = this.elementFormGroup.getFormGroup();
      }
      else {
        this.fg = this.elementFormGroup.getFormGroup();
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
