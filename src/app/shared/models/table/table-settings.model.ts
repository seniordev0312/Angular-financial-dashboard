export class TableSettings {
    enableActions: boolean;
    enablePaging: boolean;
    enableExport: boolean;
    pageSize: number;
    cssClasses: string;
    showChangeTableSize: boolean;
    isLocalPaging: boolean;
    isGropingMode?: boolean;
    enableFilter: boolean;
    hasNextPage?: boolean;
    groupingProperty?: any;
    enableGropingActions?: boolean;
    groupingHeaderProperties?: any;
    haxPreviousPage?: boolean;
    actionsMode?: 'menu' | 'inline';

    constructor(data: any) {
        if (!data) {
            return;
        }
        this.enableActions = data?.enableActions ?? true;
        this.enablePaging = data?.enablePaging ?? true;
        this.enableExport = data?.enableExport ?? true;
        this.actionsMode = data?.actionsMode ?? 'menu';
        this.pageSize = data?.pageSize ?? 10;
        this.cssClasses = data?.cssClasses ?? '';
        this.showChangeTableSize = data?.showChangeTableSize ?? true;
        this.isLocalPaging = data?.isLocalPaging ?? true;
        this.enableFilter = data?.enableFilter ?? true;
        this.hasNextPage = data?.hasNextPage ?? true;
        this.haxPreviousPage = data?.haxPreviousPage ?? true;
    }
}
