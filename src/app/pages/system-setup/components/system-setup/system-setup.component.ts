import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UiService } from '@root/shared/services/ui.service';

@Component({
  selector: 'app-system-setup',
  templateUrl: './system-setup.component.html',
  styleUrls: ['./system-setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemSetupComponent implements OnInit {

  constructor(private uiService: UiService, private route: Router) { }
  SystemSetupComp = false;
  ngOnInit(): void {
    this.uiService.toggleUpdateContentHeader({ paths: ['System Setup'] });
  }

  onItemClick(page: string, paths: string[]) {
    this.SystemSetupComp = true;
    this.route.navigate([`system-setup/${page}`]);
    this.uiService.toggleUpdateContentHeader({ paths: paths });
  }

}
