import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-system-setup',
  templateUrl: './system-setup.component.html',
  styleUrls: ['./system-setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemSetupComponent implements OnInit {

  constructor(private route: Router) { }
  SystemSetupComp = false;
  ngOnInit(): void {
    this.SystemSetupComp = false;
  }

  onItemClick(page: string) {
    this.SystemSetupComp = true;
    this.route.navigate([`system-setup/${page}`]);
  }

}
