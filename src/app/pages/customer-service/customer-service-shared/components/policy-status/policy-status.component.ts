import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { PolicyStatus } from './models/policy-status.model';

@Component({
  selector: 'app-policy-status',
  templateUrl: './policy-status.component.html',
  styleUrls: ['./policy-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyStatusComponent implements OnInit {
  @Input() step?: PolicyStatus;

  constructor() {}

  ngOnInit(): void {}
}
