import { DATE_PATTERN } from "../pattern/regexPatterns";

export function calculateAgeInMonths(birthDate: string):number{
    if(!DATE_PATTERN.test(birthDate)){
        throw new Error('Datum rođenja nije u odgovarajućem formatu.');
    }

    const todaysDate:Date = new Date();
    const birthDateObj:Date = new Date(birthDate);
    const todaysDateDays:number = convertDateToDays(todaysDate);
    const birthDateDays:number = convertDateToDays(birthDateObj);

    return Math.floor((todaysDateDays - birthDateDays)/ 30);
}

function convertDateToDays(date:Date):number{
    const years:number = date.getFullYear();
    const months:number = date.getMonth() + 1;
    const days:number = date.getDate();

    return years * 365 + months * 30.44 + days;
}

