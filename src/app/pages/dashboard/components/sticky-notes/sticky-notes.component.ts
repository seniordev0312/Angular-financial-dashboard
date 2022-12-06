import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { authService } from '@root/auth/auth.service';

@Component({
  selector: 'app-sticky-notes',
  templateUrl: './sticky-notes.component.html',
  styleUrls: ['./sticky-notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyNotesComponent implements OnInit {
  items: any[] = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  constructor(private _authService: authService) { }

  ngOnInit(): void {
  }

  addStickyNote(): void {
    this._authService.doLogin().subscribe((result: any) => {
      console.log(result);
    })
  }
}
