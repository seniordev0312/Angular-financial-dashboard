import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {

  @Output() trigger = new EventEmitter<void>();
  @Input() classes: string;
  @Input() text: string;
  @Input() icon: string;
  @Input() isDisabled = false;


  onClick() {
    this.trigger.emit();
  }
}
