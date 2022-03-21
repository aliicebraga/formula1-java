import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor() { }

  numberPatternValidator(): ValidatorFn {
    return (control: AbstractControl): { (key: string): any } => {
      if (!control.value) {
        return null as any;
      }
      const regex = new RegExp(/^(?!,$)[\d,.]+$/);
      const valid = regex.test(control.value);
      return valid ? null as any : { notAllNumbers: true };
    };
  }

  letterPatternValidator(): ValidatorFn {
    return (control: AbstractControl): { (key: string): any } => {
      if (!control.value) {
        return null as any;
      }
      const regex = new RegExp(/^(?!À-Ö)[A-Za-z\',\-àáâãçèéêẽíôõóúû ]*$/);
      const valid = regex.test(control.value);
      return valid ? null as any : { notAllLetters: true };
    };
  }
}
