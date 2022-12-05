import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LayoutService } from '@root/shared/services/layout.service';
import { RelationshipTypesFormGroup } from '../../form-groups/relationship-types-form-group.service';

@Component({
  selector: 'app-add-relationship-type',
  templateUrl: './add-relationship-type.component.html',
  styleUrls: ['./add-relationship-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRelationshipTypeComponent implements OnInit {
  fg: FormGroup;
  constructor(private relationshipTypesFormGroup: RelationshipTypesFormGroup,
    private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.fg = this.relationshipTypesFormGroup.getFormGroup();
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

}
