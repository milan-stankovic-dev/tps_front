import { AbstractControl } from "@angular/forms";
import { DATE_PATTERN } from "../pattern/regexPatterns";

export function dateValidator(control: AbstractControl):{[key: string]: any} | null {
    const datePattern:RegExp = DATE_PATTERN;
    
     if(control.value && !datePattern.test(control.value)){
        return {'invalidDate': {value: control.value}};
     }
     return null;
}