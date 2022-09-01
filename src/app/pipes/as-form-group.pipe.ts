import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'asFormGroup'
})
export class AsFormGroupPipe implements PipeTransform {

  transform(value: AbstractControl): FormGroup {
    return value as FormGroup
  }

}
