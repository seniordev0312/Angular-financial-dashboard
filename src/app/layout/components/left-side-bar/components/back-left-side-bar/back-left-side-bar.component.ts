import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-left-side-bar',
  templateUrl: './back-left-side-bar.component.html',
  styleUrls: ['./back-left-side-bar.component.scss'],
  animations: [
    trigger('fadeSlideInOut', [
      state('in', style({
        'max-height': '100%', 'opacity': '1', 'visibility': 'visible'
      })),
      state('out', style({
        'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
      })),
      transition('in => out', [group([
        animate('400ms ease-in-out', style({
          'opacity': '0'
        })),
        animate('600ms ease-in-out', style({
          'max-height': '0px'
        })),
        animate('700ms ease-in-out', style({
          'visibility': 'hidden'
        }))
      ]
      )]),
      transition('out => in', [group([
        animate('2000ms ease-in-out', style({
          'visibility': 'visible'
        })),
        animate('2000ms ease-in-out', style({
          'max-height': '100%'
        })),
        animate('2000ms ease-in-out', style({
          'opacity': '1'
        }))
      ]
      )])
    ])
  ],
})
export class BackLeftSideBarComponent implements OnInit {

  @Output() flip: EventEmitter<any> =
    new EventEmitter<any>();
  animationState: string = 'out';
  extended: boolean = true;
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  flipCard(): void {
    this.flip.emit();
    this.animationState = 'out';
  }

  navigate(url: string) {
    this.route.navigate([url]);
  }

  openAndClose(_url: string) {
    const size = !this.extended ? '40vh' : '10vh';
    const marginLeftValue = !this.extended ? '384px' : '10vh';
    document.documentElement.style.setProperty('--sideNavSize', size);
    document.documentElement.style.setProperty('--marginLeftValue', marginLeftValue);
    this.extended = !this.extended;
    console.log(this.extended, size);
  }
}
