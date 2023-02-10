import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-wiretransfer',
  templateUrl: './edit-wiretransfer.component.html',
  styleUrls: ['./edit-wiretransfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditWiretransferComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
