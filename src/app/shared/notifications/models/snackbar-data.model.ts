export enum SnackbarStatusEnum {
    SUCCESS = 'success',
    INFO = 'info',
    ERROR = 'danger',
    WARNING = 'warning',
    NOTIFICATION = 'idle',
}

export interface SnackbarData {
    message: string;
    status: SnackbarStatusEnum;
    action: string;
}
