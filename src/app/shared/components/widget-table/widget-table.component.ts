/* eslint-disable @angular-eslint/no-output-on-prefix */
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { PagingConfig } from '@root/shared/models/table/page-configuration.model';
import { Clipboard } from '@angular/cdk/clipboard';
import { Table } from 'primeng/table';
import {
    DateTableColumnFilterType,
    NumericTableColumnFilterType,
    TextTableColumnFilterType,
} from '@root/shared/statics/primeng-filters-statics';
import {
    getDataType,
    getFilterValue,
    getType,
} from '@root/shared/statics/table-filters';
import { BaseComponent } from '../base-component/base-component';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { Filter } from '@root/shared/models/table/filter.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { SortItem } from '@root/shared/models/table/table-sort.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ObjectDataCompareTransformer } from '@root/shared/transformers/object-data-transformer.service';

@Component({
    selector: 'app-widget-table',
    templateUrl: './widget-table.component.html',
    styleUrls: ['./widget-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetTableComponent<T> extends BaseComponent implements OnInit {
    @Input() tableConfiguration: TableConfiguration<T>;
    @Output() onPaging = new EventEmitter<PagingConfig>();
    @Output() onSort = new EventEmitter<SortItem>();
    @Output() onFilter = new EventEmitter<Filter[]>();
    @Output() onFilterCleared = new EventEmitter<any>();
    @ViewChild('dt', { static: true }) dataTable: Table;

    filterData: Filter[] = [];
    isSliderChangeConfirmed: boolean;
    // emptyPage: EmptyPage = {
    //     showAddButton: false,
    //     buttonText: null,
    //     showImage: true,
    //     subTitle: null,
    //     title: 'general.noDataFound',
    // };
    pageSize = 50;
    currentPageIndex = 0;
    isSpinning$: Observable<boolean>;
    data: T[];
    textMatchModeOptions = TextTableColumnFilterType;
    numericMatchModeOptions = NumericTableColumnFilterType;
    dateTableColumnFilterType = DateTableColumnFilterType;
    isDesktop$ = this.layoutService.isDesktop$;
    isMobile$ = this.layoutService.isMobile$;

    constructor(
        private primengConfig: PrimeNGConfig,
        private clipboard: Clipboard,
        private layoutService: LayoutService,
        private objectDataCompareTransformer: ObjectDataCompareTransformer,
        private cdr: ChangeDetectorRef
    ) {
        super();
    }

    get totalRecords() {
        if (this.tableConfiguration.settings.isLocalPaging) {
            return this.tableConfiguration?.dataCount;
        } else if (this.tableConfiguration.settings.hasNextPage) {
            return (this.currentPageIndex + 1) * this.tableConfiguration.settings.pageSize + 1;
        } else if (!this.tableConfiguration.settings.hasNextPage && this.tableConfiguration.settings.haxPreviousPage) {
            return (this.currentPageIndex + 1) * this.tableConfiguration.settings.pageSize;
        }
        return this.tableConfiguration?.settings.pageSize;
    }

    ngOnInit() {
        this.pageSize = this.tableConfiguration.settings.pageSize;
        this.primengConfig.ripple = true;
    }

    refresh(): void {
        this.data = [...this.tableConfiguration?.data];
        this.cdr.detectChanges();
    }

    copyText(text: any) {
        this.clipboard.copy(text);
    }

    containerClass(action: any, row: any[]): string {
        if (action.alwaysShow || row[action.showConditionProperty]) {
            return 'pb-2';
        } else {
            return 'pb-0';
        }
    }

    onLazyLoad(event: any) {
        if (event.first > 0 || this.currentPageIndex > 0 || event.rows !== this.pageSize) {
            if (event.sortField) {
                this.onSort.emit({ sortOrder: event.sortOrder, sortField: event.sortField });
            } else if (event.rows !== this.pageSize) {
                this.onPaging.emit({ isNextPage: null, pageSize: event.rows });
            } else {
                if (!this.tableConfiguration.settings.isLocalPaging) {
                    if (event.first / event.rows + 1 <= this.currentPageIndex) {
                        // previous button clicked
                        this.onPaging.emit({ isNextPage: false, pageSize: this.pageSize });
                    } else {
                        // next button clicked
                        this.onPaging.emit({ isNextPage: true, pageSize: this.pageSize });
                    }
                }
            }
            this.currentPageIndex = event.first / event.rows;
            this.pageSize = event.rows;
        }
    }

    toggleColumnVisibility(column: TableColumn, event: Event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        column.visible = !column.visible;
    }

    clearFilters(table: Table) {
        table.clear();
        this.onFilterCleared.emit(true);
        this.filterData = [];
        this.dataTable.filters = {};
    }

    onFilterChanged(data: any) {
        if (!this.tableConfiguration.settings.isLocalPaging) {
            const filters: Filter[] = [];
            Object.keys(data).forEach((key: string) => {
                if (
                    (!Array.isArray(data[key][0].value) && data[key][0].value !== null && data[key][0].value !== '') ||
                    (Array.isArray(data[key][0].value) && data[key][0].value.length > 0)
                ) {
                    filters.push({
                        value1: getFilterValue(data[key][0]),
                        type: getType(data[key][0]),
                        dataType: getDataType(data[key][0].value),
                        property: key,
                    });
                }
            });
            const temp = this.objectDataCompareTransformer.transformBothSids(filters, this.filterData);
            if (!this.isEmpty(temp)) {
                this.onFilter.emit(filters);
                this.currentPageIndex = 0;
                this.filterData = filters;
            }
        }
    }

}
