import { PersonSave } from "../domain/PersonSave";
import { PERSON_DISPLAY } from "../test-data/persons";
import { personDisplayToSave } from "./personConverter";

fdescribe('PersonConverter', () => {
    it('Should convert person types correctly', () => {
        const personSave: PersonSave = personDisplayToSave(
            PERSON_DISPLAY
        );
        expect(personSave.id).toEqual(PERSON_DISPLAY.id);
        expect(personSave.firstName).toEqual(PERSON_DISPLAY.firstName);
        expect(personSave.lastName).toEqual(PERSON_DISPLAY.lastName);
        expect(personSave.heightInCm).toEqual(PERSON_DISPLAY.heightInCm);
        expect(personSave.dOB).toEqual(PERSON_DISPLAY.dOB);
        expect(personSave.birthCityCode)
        .toEqual(PERSON_DISPLAY.cityOfBirthPPTBR);
        expect(personSave.residenceCityCode)
        .toEqual(PERSON_DISPLAY.cityOfResidencePPTBR);
    });
});