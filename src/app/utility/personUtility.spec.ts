import { calculateAgeInMonths } from "./personUtility";

fdescribe('PersonUtility', () => {
    it('Calculates age in months wrong pattern', () => {
        expect(() => calculateAgeInMonths('wrong-pattern'))
        .toThrowError('Datum rođenja nije u odgovarajućem formatu.');
    });

    it('Calculates age in months 1', () => {
        const result: number = calculateAgeInMonths('2000-01-01');
        expect(result).toBeGreaterThanOrEqual(290);
    });

    it('Calculates age in months 2', () => {
        const result: number = calculateAgeInMonths('1970-10-23');
        expect(result).toBeGreaterThanOrEqual(640);
    });
    it('Calculates age in months 3', () => {
        const result: number = calculateAgeInMonths('1984-02-10');
        expect(result).toBeGreaterThanOrEqual(480);
    });
})