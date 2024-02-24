import { PersonDisplay } from "../domain/PersonDisplay";
import { PersonSave } from "../domain/PersonSave";

export function personDisplayToSave(personDisplay:PersonDisplay):PersonSave{
    return {
        id: personDisplay.id,
        firstName: personDisplay.firstName,
        lastName: personDisplay.lastName,
        heightInCm: personDisplay.heightInCm,
        dOB: personDisplay.dOB,
        birthCityCode: personDisplay.cityOfBirthPPTBR,
        residenceCityCode: personDisplay.cityOfResidencePPTBR
    };
}