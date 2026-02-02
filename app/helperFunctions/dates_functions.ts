function getFirstWeekday(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function getGridRows(year: number, month: number, startDay: number){
    const months_with_30 = [3,5,8,10]; //April, June, September, November
    let dayOfMonth = 0;
    if (months_with_30.includes(month)){
        dayOfMonth = 30;
    }
    else if (month == 1) {
        if (year % 100 === 0) {
            if (year % 400 === 0 && year % 4 === 0)
                dayOfMonth = 29;
            else
                dayOfMonth = 28;
        }
        else if (year % 4 === 0) {
            dayOfMonth = 29;
        }
        else 
            dayOfMonth = 28;
    }
    else {
        dayOfMonth = 31;
    }
    return {maxDays: dayOfMonth, gridRows: Math.ceil((startDay+dayOfMonth)/7)};
}

function formatDate(theDate: string){
    const dateArray = theDate.split(/-/);
    const formattedDate = `${dateArray[1].search(/0/) == 0 ? dateArray[1][1]: dateArray[1]}/${dateArray[2]}`;
    return formattedDate;
}

export {getFirstWeekday, getGridRows, formatDate};