export class TableSettings {
  enableActions: boolean;
  enablePaging: boolean;
  enableCustomizingColumns: boolean;
  enableExport: boolean;
  enableTrash: boolean;
  pageSize: number;
  cssClasses: string;
  showChangeTableSize: boolean;
  isLocalPaging: boolean;
  enableFilter: boolean;
  hasNextPage?: boolean;
  haxPreviousPage?: boolean;
  actionsMode?: 'menu' | 'inline';
  hasSlideAction?: boolean;
  slideActionProperty?: string;
  isRowsSelectionAvailable?: boolean;
  dataKey: string;
  constructor(data: any) {
    if (!data) {
      return;
    }
    this.slideActionProperty = data.slideActionProperty;
    this.hasSlideAction = data.hasSlideAction ?? false;
    this.enableActions = data?.enableActions ?? true;
    this.enableCustomizingColumns = data?.enableCustomizingColumns ?? true;
    this.enablePaging = data?.enablePaging ?? true;
    this.enableTrash = data?.enableTrash ?? false;
    this.enableExport = data?.enableExport ?? true;
    this.actionsMode = data?.actionsMode ?? 'menu';
    this.pageSize = data?.pageSize ?? 10;
    this.cssClasses = data?.cssClasses ?? '';
    this.showChangeTableSize = data?.showChangeTableSize ?? true;
    this.isLocalPaging = data?.isLocalPaging ?? true;
    this.enableFilter = data?.enableFilter ?? true;
    this.hasNextPage = data?.hasNextPage ?? true;
    this.haxPreviousPage = data?.haxPreviousPage ?? true;
    this.isRowsSelectionAvailable = data?.isRowsSelectionAvailable ?? false;
    this.dataKey = data.dataKey ?? 'id';
  }
}
