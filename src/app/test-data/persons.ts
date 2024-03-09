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
        cityOfBirthPPTBR: 11_000,
        cityOfResidenceName: 'Beograd',
        cityOfResidencePPTBR: 11_000
    },
    {
        id: 2,
        firstName: 'Sara',
        lastName : 'Jovanović',
        heightInCm: 167,
        dOB: new Date(2002,2,4),
        ageInMonths: 180,
        cityOfBirthName: 'Niš',
        cityOfBirthPPTBR: 18_000,
        cityOfResidenceName: 'Beograd',
        cityOfResidencePPTBR: 11_000
    },
    {
        id: 3,
        firstName: 'Svetozar',
        lastName : 'Krstić',
        heightInCm: 180,
        dOB: new Date(1999,12,26),
        ageInMonths: 200,
        cityOfBirthName: 'Niš',
        cityOfBirthPPTBR: 18_000,
        cityOfResidenceName: 'Beograd',
        cityOfResidencePPTBR: 11_000
    }
];

export const PERSON_SAVE: PersonSave = {
    id: null,
    firstName: 'Simonida',
    lastName: 'Zarić',
    heightInCm: 163,
    dOB: new Date(2001,10,10),
    birthCityCode: 19_000,
    residenceCityCode: 19_000
}

export const PERSON_UPDATE: PersonSave = {
    id: 1,
    firstName: 'Sara',
    lastName: 'Perić',
    heightInCm: 165,
    dOB: new Date(2002,10,10),
    birthCityCode: 19_000,
    residenceCityCode: 19_000
}

export const ADULTS: PersonDisplay[] = PERSONS;

export const SMEDEREVCI : PersonDisplay[] = [
    {
        id: 7,
        firstName: 'Stefan',
        lastName : 'Đorđević',
        heightInCm: 170,
        dOB: new Date(1960,10,12),
        ageInMonths: 430,
        cityOfBirthName: 'Smederevo',
        cityOfBirthPPTBR: 11_300,
        cityOfResidenceName: 'Smederevo',
        cityOfResidencePPTBR: 11_300
    },
    {
        id: 10,
        firstName: 'Marija',
        lastName : 'Počuča',
        heightInCm: 165,
        dOB: new Date(2003,9,23),
        ageInMonths: 170,
        cityOfBirthName: 'Smederevo',
        cityOfBirthPPTBR: 11_300,
        cityOfResidenceName: 'Beograd',
        cityOfResidencePPTBR: 11_000
    }
];

export const MAX_HEIGHT: number = 192;
export const AVERAGE_AGE_YEARS: number = 27.2;

export const PERSON_DISPLAY: PersonDisplay = {
    id: 12,
    firstName: 'Jovana',
    lastName : 'Sarić',
    heightInCm: 170,
    dOB: new Date(2000,2,12),
    ageInMonths: 260,
    cityOfBirthName: 'Niš',
    cityOfBirthPPTBR: 18_000,
    cityOfResidenceName: 'Beograd',
    cityOfResidencePPTBR: 11_000
}