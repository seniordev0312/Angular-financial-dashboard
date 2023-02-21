import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-basket',
  templateUrl: './import-basket.component.html',
  styleUrls: ['./import-basket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportBasketComponent implements OnInit {
  constructor() {}

  checkList = [
    {
      state: true,
      content: 'MGW196389',
    },
    {
      state: true,
      content: 'MGW196389',
    },
    {
      state: true,
      content: 'MGW196389',
    },
    {
      state: true,
      content: 'MGW196389',
    },
    {
      state: true,
      content: 'MGW196389',
    },
    {
      state: true,
      content: 'MGW196389',
    },
    {
      state: true,
      content: 'MGW196389',
    },
    {
      state: false,
      content: 'MGW196389',
    },
    {
      state: true,
      content: 'MGW196389',
    },
  ];

  ngOnInit(): void {}
}
