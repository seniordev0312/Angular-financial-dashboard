import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { PolicyCard } from '../policy-card/models/policy-card.model';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-policy-sort',
  templateUrl: './policy-sort.component.html',
  styleUrls: ['./policy-sort.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicySortComponent implements OnInit {
  @Input() sortingArray!: PolicyCard[];
  flag = 0;//descending order is the initial state
  @Output() sortingArrayChange = new EventEmitter<PolicyCard[]>();

  constructor() {}

  sortOptionsList: BaseListItem[] = [
    { id: 0, value: ' Date Created' },
    { id: 1, value: 'Date Modified' },
    { id: 2, value: 'User' },
    { id: 3, value: 'CST Channel' }
  ];
  sortOptions: FormControl = new FormControl({ id: -1, value: '' });
  selectedSortOption: any;
  
  ngOnInit(): void {
    this.descending(1);
  }
  
  /* clicked() {
    this.flag=1;
    if (this.flag % 2 === 0) {
      this.arrow_up = true;
      this.ascending(this.selectedSortOption)
    }
    else {
      this.arrow_up = false;
      this.descending(this.selectedSortOption);
    }
  }
  clicked2() {
    this.flag=2;
    if (this.flag % 2 === 0) {
      this.arrow_up = true;
      this.ascending(this.selectedSortOption)
    }
    else {
      this.arrow_up = false;
      this.descending(this.selectedSortOption);
    }
  } */
  
  onChangeSortingOption(event: Event) {
    this.selectedSortOption = event;
  }

  ascending(option: any) {
    this.flag = 1;
    switch (option) {
      case 0: {
        this.sortingArray.sort((a, b) =>
          a.dateCreated > b.dateCreated ? 1 : -1
        );
        this.sortingArrayChange.emit(this.sortingArray);
        break;
      }
      case 1: {
        this.sortingArray.sort((a, b) =>
          a.dateModified > b.dateModified ? 1 : -1
        );
          this.sortingArrayChange.emit(this.sortingArray);
          break;
        
      }
      case 2: {
        this.sortingArray.sort((a, b) =>
          a.entityName.toLowerCase() > b.entityName.toLowerCase() ? 1 : -1
        );
        this.sortingArrayChange.emit(this.sortingArray);
        break;
      }
      case 3: {
        this.sortingArray.sort((a, b) =>
          a.primaryCommunicationChannelId > b.primaryCommunicationChannelId ? 1 : -1
        );
        this.sortingArrayChange.emit(this.sortingArray);
        break;
      }
      default: break;
    }
  }

  descending(option: any) {
    this.flag = 0;
    switch (option) {
      case 0: {
        this.sortingArray.sort((a, b) =>
        a.dateCreated > b.dateCreated ? -1 : 1
        );
        this.sortingArrayChange.emit(this.sortingArray);
        break;
      }
      case 1: {
        this.sortingArray.sort((a, b) =>
        a.dateModified > b.dateModified ? -1 : 1
        );
        this.sortingArrayChange.emit(this.sortingArray);
        break;
      }
        
      case 2: {
        this.sortingArray.sort((a, b) =>
        a.entityName.toLowerCase() > b.entityName.toLowerCase() ? -1 : 1
        );
        this.sortingArrayChange.emit(this.sortingArray);
        break;
      }
      case 3: {
        this.sortingArray.sort((a, b) =>
        a.primaryCommunicationChannelId > b.primaryCommunicationChannelId ? -1 : 1
        );
        this.sortingArrayChange.emit(this.sortingArray);
        break;
      }
      default:
        break;
    }
  }

  returnToInitialState() {
    this.flag = 0;
    this.sortingArrayChange.emit(this.sortingArray);
  }
  
}
