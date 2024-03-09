import { PersonDisplay } from "../domain/PersonDisplay";
import { PersonSave } from "../domain/PersonSave";

export const PERSONS: PersonDisplay[] = [
    {
        id: 1,
        firstName: 'Marko',
        lastName : 'Marković',
        heightInCm: 190,
        dOB: new Date(2000,1,1),
        ageInMonths: 260,
        cityOfBirthName: 'Beograd',
        cityOfBirthPPTBR: 11000,
        cityOfResidenceName: 'Beograd',
        cityOfResidencePPTBR: 11000
    },
    {
        id: 2,
        firstName: 'Sara',
        lastName : 'Jovanović',
        heightInCm: 167,
        dOB: new Date(2002,2,4),
        ageInMonths: 180,
        cityOfBirthName: 'Niš',
        cityOfBirthPPTBR: 18000,
        cityOfResidenceName: 'Beograd',
        cityOfResidencePPTBR: 11000
    },
    {
        id: 3,
        firstName: 'Svetozar',
        lastName : 'Krstić',
        heightInCm: 180,
        dOB: new Date(1999,12,26),
        ageInMonths: 200,
        cityOfBirthName: 'Niš',
        cityOfBirthPPTBR: 18000,
        cityOfResidenceName: 'Beograd',
        cityOfResidencePPTBR: 11000
    }
];

export const PERSON_SAVE: PersonSave = {
    id: null,
    firstName: 'Simonida',
    lastName: 'Zarić',
    heightInCm: 163,
    dOB: new Date(2001,10,10),
    birthCityCode: 19000,
    residenceCityCode: 19000
}

export const PERSON_UPDATE: PersonSave = {
    id: 1,
    firstName: 'Sara',
    lastName: 'Perić',
    heightInCm: 165,
    dOB: new Date(2002,10,10),
    birthCityCode: 19000,
    residenceCityCode: 19000
}