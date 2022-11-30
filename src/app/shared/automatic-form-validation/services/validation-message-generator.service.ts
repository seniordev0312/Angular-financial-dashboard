import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface LengthParams {
  actualLength?: number;
  requiredLength?: number;
}

interface NumberSizeParams {
  actual?: number;
  max?: number;
  min?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ValidationErrorMappingService {
  errorMessages: any;
  constructor(public translate: TranslateService) {
    this.errorMessages = {
      required: () => this.translate.instant('validation.required'),
      minlength: ({ actualLength, requiredLength }: LengthParams) =>
        this.translate.instant('validation.minlength', {
          actualLength,
          requiredLength,
        }),
      maxlength: ({ actualLength, requiredLength }: LengthParams) =>
        this.translate.instant('validation.maxlength', {
          actualLength,
          requiredLength,
        }),
      max: ({ actual, max }: NumberSizeParams) =>
        this.translate.instant('validation.max', { actual, max }),
      min: ({ actual, min }: NumberSizeParams) =>
        this.translate.instant('validation.min', { actual, min }),
      email: () => this.translate.instant('validation.email'),
      InvalidDateRange: () =>
        this.translate.instant('validation.InvalidDateRange'),
      InvalidUrl: () => this.translate.instant('validation.InvalidUrl'),
      InvalidPhone: () => this.translate.instant('validation.InvalidPhone'),
      onlyEnglishLetter: () =>
        this.translate.instant('validation.onlyEnglishLetter'),
      InvalidPassportNumberOrTrackingNumber: () =>
        this.translate.instant(
          'validation.InvalidPassportNumberOrTrackingNumber'
        ),
      InvalidPhoneNumberRegexValidator: () =>
        this.translate.instant('validation.InvalidPhoneNumberRegexValidator'),
      InvalidDateOfBirth: () =>
        this.translate.instant('validation.InvalidDateOfBirth'),
    };
  }
}
