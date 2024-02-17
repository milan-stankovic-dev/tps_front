import { AbstractControl } from "@angular/forms";

export function dateValidator(control: AbstractControl):{[key: string]: any} | null {
    const datePattern:RegExp =
     /^(19[5-9][0-9]|200[0-5])-(0[1-9]|1[0-2]])-(0[1-9]|[12][0-9]|3[01])$/;

     if(control.value && !datePattern.test(control.value)){
        return {'invalidDate': {value: control.value}};
     }
     return null;
}