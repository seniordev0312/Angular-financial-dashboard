import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { EntityFormGroup } from '../../form-groups/entity-form-group.service';

@Component({
  selector: 'app-entity-card',
  templateUrl: './entity-card.component.html',
  styleUrls: ['./entity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityCardComponent implements OnInit {
  fg: FormGroup;

  constructor(private entityFormGroup: EntityFormGroup,
    private layoutService: LayoutService,
    private router: Router) { }

  ngOnInit(): void {
    this.fg = this.entityFormGroup.getFormGroup();
  }

  onSectionAdded() {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesListManagement}`, {
      outlets: { sidenav: ApplicationRoutes.EntitiesSection },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

}
