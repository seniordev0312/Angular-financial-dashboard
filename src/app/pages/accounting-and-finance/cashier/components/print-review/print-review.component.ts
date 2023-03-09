import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-review',
  templateUrl: './print-review.component.html',
  styleUrls: ['./print-review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrintReviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
