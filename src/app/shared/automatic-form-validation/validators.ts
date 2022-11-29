import { FormGroup, ValidatorFn, FormControl } from '@angular/forms';
import {
  phoneRegex,
  urlRegex,
  englishLetterRegex,
  passportNumberRegex,
  trackingNumberRegex,
} from '@root/shared/settings/common.settings';

export const validateMinMaxValues = (min: number, max: number): boolean => {
  if (max && min && max < min) {
    return false;
  } else {
    return true;
  }
};

export const validateTime = (start: string, end: string): boolean => {
  if (
    Date.parse('01/01/2011 ' + start + ':00') >=
    Date.parse('01/01/2011 ' + end + ':00')
  ) {
    return false;
  } else {
    return true;
  }
};

export const dateRangeValidation =
  (): ValidatorFn => (formGroup: FormGroup) => {
    const startDate = formGroup.get('startDate');
    const startDateValue = startDate.value;
    const endDate = formGroup.get('endDate');
    const endDateValue = endDate.value;
    const isDateValid = validateDate(endDateValue, startDateValue);
    return isDateValid ? null : { InvalidDateRange: formGroup.invalid };
  };

export const urlValidator = (control: FormControl) => {
  if (control.value.length === 0) {
    return null;
  }
  const isUrlValid = validateUrlHelper(control.value);
  return isUrlValid ? null : { InvalidUrl: true };
};

export const validateUrlHelper = (value: string): boolean =>
  urlRegex.test(value);

export const PhoneValidator = (control: FormControl) => {
  if (control.value?.length === 0) {
    return null;
  }
  const isPhoneValid = validatePhoneNumberHelper(control.value);
  return isPhoneValid ? null : { InvalidPhone: true };
};

export const validatePhoneNumberHelper = (value: string): boolean =>
  phoneRegex.test(value);

export const onlyEnglishLetterValidator = (control: FormControl) => {
  const value = control?.value || '';
  if (value.length > 0 && !englishLetterRegex.test(value)) {
    return {
      onlyEnglishLetter: true,
    };
  } else {
    return null;
  }
};

export const validateDate = (
  firstDate: string,
  secondDate: string
): boolean => {
  if (
    firstDate &&
    secondDate &&
    Date.parse(firstDate) <= Date.parse(secondDate)
  ) {
    return false;
  } else {
    return true;
  }
};

export const passportNumberAndTrackingNumberValidator = (
  control: FormControl
) => {
  const value = control?.value || '';
  if (
    value.length > 0 &&
    !(passportNumberRegex.test(value) || trackingNumberRegex.test(value))
  ) {
    return {
      InvalidPassportNumberOrTrackingNumber: true,
    };
  } else {
    return null;
  }
};

export const dateOfBirthValidator = (control: FormControl) => {
  const dateOfBirthValue = control.value;
  const endDate = new Date();
  const maximumDateValue = endDate.toString();
  const isDateValid = validateDate(maximumDateValue, dateOfBirthValue);
  return isDateValid
    ? null
    : {
        InvalidDateOfBirth: true,
      };
};
