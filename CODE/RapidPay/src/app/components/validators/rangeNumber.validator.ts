import { ValidatorFn, FormGroup } from '@angular/forms';

export function rangeNumberValidator(controlNames: string[], form?: FormGroup): ValidatorFn {
  return (form: FormGroup) => {
    if (controlNames) {
      if (form.get(controlNames[0])?.value <= form.get(controlNames[1]).value) {
        return { 'range': false };
      } else {
        return { 'range': true };
      }
    }
  };
}
