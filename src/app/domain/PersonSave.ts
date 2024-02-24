export interface PersonSave{
    id: number|null,
    firstName: string,
    lastName: string,
    heightInCm: number,
    dOB: Date,
    birthCityCode: number,
    residenceCityCode: number
}