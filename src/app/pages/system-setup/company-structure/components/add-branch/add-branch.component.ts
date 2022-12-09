import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '@root/shared/services/layout.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBranchComponent implements OnInit {

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
