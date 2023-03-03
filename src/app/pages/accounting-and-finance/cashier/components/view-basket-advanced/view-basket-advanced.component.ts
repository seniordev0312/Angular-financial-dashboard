import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  ChangeDetectorRef,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { AdvancePaymentModel } from '@root/pages/accounting-and-finance/accounts-payable/model/advance-payment.model';

@Component({
  selector: 'app-view-basket-advanced',
  templateUrl: './view-basket-advanced.component.html',
  styleUrls: ['./view-basket-advanced.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewBasketAdvancedComponent implements OnInit {
  @Input() status: number;
  @Output() statusChange = new EventEmitter<number>();
  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<AdvancePaymentModel>;
  paymentlist: AdvancePaymentModel[] = [];
  constructor(private cdr: ChangeDetectorRef) {}
  paymentStatus: number;

  emitchanges() {
    this.statusChange.emit(this.paymentStatus);
    console.log('done');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngOnInit(): void {
    console.log(this.paymentStatus);
    // this.paymentStatusChange.emit(this.paymentStatus);
    this.paymentlist = [
      {
        ein: 0o21234567,
        datapaid: '09/01/2022',
        totalremaining: 10000.0,
        currency: 'USD',
        custome: 0.0,
      },
      {
        ein: 0o21234567,
        datapaid: '09/01/2022',
        totalremaining: 10000.0,
        currency: 'USD',
        custome: 0.0,
      },
      {
        ein: 0o21234567,
        datapaid: '09/01/2022',
        totalremaining: 10000.0,
        currency: 'USD',
        custome: 0.0,
      },
    ];
    console.log(this.paymentStatus);

    this.tableConfiguration.data = this.paymentlist;
    this.tableConfiguration.dataCount = this.paymentlist.length;
    this.cdr.detectChanges();
    this.table.refresh();
  }

  tableColumns: TableColumn[] = [
    {
      translationKey: 'EIN',
      property: 'ein',
      type: 'text',
      svgIcon: '',
      cssClasses: () => '',
      dataCssClasses: () => 'underline text-accent',
      enableSort: true,
      hasFilter: true,
      visible: true,
      displayInFilterList: false,
      hasToolTip: false,
      showText: true,
      filter: {
        filterType: TableColumnFilterDataType.Text,
      },
    },
    {
      translationKey: 'Data Paid',
      property: 'datapaid',
      type: 'text',
      cssClasses: () => '',
      dataCssClasses: () => '',
      enableSort: true,
      hasFilter: true,
      visible: true,
      displayInFilterList: true,
      hasToolTip: false,
      showText: true,
      filter: {
        filterType: TableColumnFilterDataType.Date,
      },
    },
    {
      translationKey: 'Total Remaining',
      property: 'totalremaining',
      type: 'text',
      cssClasses: () => '',
      dataCssClasses: () => '',
      enableSort: true,
      hasFilter: true,
      visible: true,
      displayInFilterList: true,
      hasToolTip: false,
      showText: true,
      filter: {
        filterType: TableColumnFilterDataType.Text,
      },
    },
    {
      translationKey: 'Currency',
      property: 'currency',
      type: 'text',
      cssClasses: () => '',
      dataCssClasses: () => '',
      enableSort: true,
      hasFilter: true,
      visible: true,
      displayInFilterList: true,
      hasToolTip: false,
      showText: true,
      filter: {
        filterType: TableColumnFilterDataType.Text,
      },
    },
    {
      translationKey: 'Custome',
      property: 'custome',
      type: 'number',
      cssClasses: () => '',
      dataCssClasses: () => '',
      enableSort: true,
      hasFilter: true,
      editable: true,
      visible: true,
      displayInFilterList: true,
      hasToolTip: false,
      showText: true,
      filter: {
        filterType: TableColumnFilterDataType.Text,
      },
    },
  ];

  pageSize = 15;

  tableSettings = new TableSettings({
    actionsMode: 'inline',
    pageSize: this.pageSize,
    isLocalPaging: true,
    isRowSelectable: true,
  });

  tableConfiguration: TableConfiguration<AdvancePaymentModel> = {
    tableRowsActionsList: [],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };
}
