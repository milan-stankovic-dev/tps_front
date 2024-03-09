import { AbstractControl, FormControl } from "@angular/forms";
import { dateValidator } from "./date.validator";

fdescribe('DateValidator', () => {
    it('Invalid date 1', () => {
        const control: AbstractControl = 
        new FormControl('invalid date input');
        const result = dateValidator(control);

        expect(result).toBeTruthy();
        
        const errorContent = result ? 
            result['invalidDate'] : null;

        expect(errorContent).toBeTruthy();
        expect(errorContent.value).toEqual('invalid date input');
    });

    it('Invalid date 2', () => {
        const control: AbstractControl = 
        new FormControl('2000-20-20');
        const result = dateValidator(control);

        expect(result).toBeTruthy();
        
        const errorContent = result ? 
            result['invalidDate'] : null;

        expect(errorContent).toBeTruthy();
        console.log(errorContent.value);
        expect(errorContent.value).toEqual('2000-20-20');
    });

    it('Valid date 1', () => {
        const control: AbstractControl = 
        new FormControl('1997-02-12');
        const result = dateValidator(control);

        expect(result).toBeFalsy();
    });

    it('Valid date 1', () => {
        const control: AbstractControl = 
        new FormControl('1997-02-12');
        const result = dateValidator(control);

        expect(result).toBeFalsy();
    });

    it('Valid date 2', () => {
        const control: AbstractControl = 
        new FormControl('2000-02-29');
        const result = dateValidator(control);

        expect(result).toBeFalsy();
    });

    it('Valid date 3', () => {
        const control: AbstractControl = 
        new FormControl('1990-10-12');
        const result = dateValidator(control);

        expect(result).toBeFalsy();
    });

    it('Valid date 4', () => {
        const control: AbstractControl = 
        new FormControl('1967-07-31');
        const result = dateValidator(control);

        expect(result).toBeFalsy();
    });
});