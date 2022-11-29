export class TableRowAction<T> {
    translationKey: string;
    cssClasses: string;
    iconName: string;
    action: (data: T) => void;
    alwaysShow: boolean;
    showConditionProperty?: string;
    isIconButton: boolean;
}
