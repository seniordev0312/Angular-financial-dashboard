import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from '@angular/core';
@Component({
  selector: 'app-policy-status',
  templateUrl: './policy-status.component.html',
  styleUrls: ['./policy-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyStatusComponent implements OnInit {
  @Input() step?: any;

  constructor() {
  }

  ngOnInit(): void {
    
  }
}
