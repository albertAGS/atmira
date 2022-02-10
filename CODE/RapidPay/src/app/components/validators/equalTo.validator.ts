import { ValidatorFn, FormGroup } from '@angular/forms';

export function equalToValidator(controlNames): ValidatorFn {
  return (g: FormGroup) => {
    if (controlNames) {
      if (g.get(controlNames[0]).value === g.get(controlNames[1]).value) {
        return null;
      } else {
        return { 'equalTo': true };
      }
    }
  };
}
