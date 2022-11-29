export interface GroupProperty {
    property: string;
    type: 'text' | 'lang' | 'labels';
    cssClasses?: (data?: any) => string;
    icon?: string;
    iconCssClass?: string;
    hasToolTip: boolean;
    toolTipText?: string;
}
