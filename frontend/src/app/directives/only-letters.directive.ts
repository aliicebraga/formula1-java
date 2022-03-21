import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { CustomValidationService } from '../services/custom-validation.service';

@Directive({
  selector: '[appOnlyLetters]',
  providers: [{ provide: NG_VALIDATORS, useExisting: OnlyLettersDirective, multi: true }]
})
export class OnlyLettersDirective implements Validator {

  constructor(private customValidator: CustomValidationService) { }

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.customValidator.letterPatternValidator()(control);
  }
}
