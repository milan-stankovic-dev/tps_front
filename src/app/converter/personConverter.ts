import { PersonDisplay } from "../domain/PersonDisplay";
import { PersonSave } from "../domain/PersonSave";

export function personDisplayToSave(personDisplay:PersonDisplay):PersonSave{
    return {
        id: personDisplay.id,
        firstName: personDisplay.firstName,
        lastName: personDisplay.lastName,
        dOB: personDisplay.dOB,
        birthCityCode: personDisplay.cityOfBirthPTBR,
        residenceCityCode: personDisplay.cityOfResidencePTBR
    };
}