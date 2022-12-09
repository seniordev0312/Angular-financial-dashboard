import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '@root/shared/services/layout.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddDepartmentComponent implements OnInit {

  constructor(
    private layoutService: LayoutService) { }

  ngOnInit(): void {
  }

  onSave(): void {
    this.layoutService.closeRightSideNav();
  }

  onCancel(): void {
    this.layoutService.closeRightSideNav();
  }

}
