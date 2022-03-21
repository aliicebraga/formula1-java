import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { CustomValidationService } from '../services/custom-validation.service';

@Directive({
  selector: '[appOnlyNumbers]',
  providers: [{ provide: NG_VALIDATORS, useExisting: OnlyNumbersDirective, multi: true }]
})
export class OnlyNumbersDirective implements Validator {

  constructor(private customValidator: CustomValidationService) { }

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.customValidator.numberPatternValidator()(control);
  }

}
