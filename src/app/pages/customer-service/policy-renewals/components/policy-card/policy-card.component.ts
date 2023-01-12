import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { PolicyCard } from './models/policy-card.model';

@Component({
  selector: 'app-policy-card',
  templateUrl: './policy-card.component.html',
  styleUrls: ['./policy-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyCardComponent implements OnInit {
  @Input() card?: PolicyCard;

  constructor() {}

  ngOnInit(): void {}
}
