import { Alignment } from './enum/column-alignment.enum';
import { TableColumnFilter } from './table-column-filter.model';

export interface TableColumn {
  translationKey: string;
  property: string;
  type:
    | 'text'
    | 'number'
    | 'array'
    | 'bool'
    | 'icon'
    | 'dropDown'
    | 'image'
    | 'badge'
    | 'progress'
    | 'checkbox'
    | 'button';
  cssClasses?: (data?: any) => string;
  dataCssClasses?: (data?: any) => string;
  enableSort: boolean;
  hasFilter: boolean;
  visible: boolean;
  filter?: TableColumnFilter;
  action?: (data?: any) => void;
  displayInFilterList: boolean;
  selectOptionsList?: any[];
  canCopyText?: boolean;
  contentVisible?: boolean;
  iconCssClass?: string;
  editable?: boolean;
  svgIcon?: string;
  hasToolTip: boolean;
  toolTipText?: (data?: any) => any;
  showText: boolean;
  alignment?: Alignment;
}
