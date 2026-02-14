function getFirstWeekday(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function getFirstMonday(year: number, month: number){
    const temp_date = new Date(year, month, 1);
    let dayMonday = 1;
    while (temp_date.getDay() != 1)
        dayMonday ++;
    return dayMonday;
}

function dbDate(date: string, timeStr: string | undefined){
    let [hours, minutes] = ["00", "00"];
    let [month, day, year] = date.split("-");
    year = "20"+year;
    if (timeStr != undefined){
        const [time, modifier] = timeStr.split(" ");
        [hours, minutes] = time.split(":");
        if (modifier === "PM" && hours !== "12") {
            hours = String(Number(hours) + 12);
            }
        if (modifier === "AM") {
            if (hours === "12")
                hours = "00";
            else if (Number(hours) < 10){
                hours = "0" + hours;
            }
        }
    }
    const temp_date = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00Z`)

    // const temp_date =  new Date( 
    //     Number(year), 
    //     Number(month) - 1, 
    //     Number(day), 
    //     Number(hours) , 
    //     Number(minutes)
    // );
    return new Date(temp_date.toLocaleString("en-US", {timeZone: "America/Chicago"}))
}



function getMaxDays(year: number, month: number){
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
    return dayOfMonth;
}

function getGridRows(year: number, month: number, startDay: number){
    const dayOfMonth = getMaxDays(year, month);
    return Math.ceil((startDay+dayOfMonth)/7);
}

function formatDate(theDate: string){
    const dateArray = theDate.split(/-/);
    const formattedDate = `${dateArray[0].search(/0/) == 0 ? dateArray[0][1]: dateArray[0]}/${dateArray[1]}`;
    return formattedDate;
}

function change24to12Format(the_date: Date){
    let formatHours = the_date.getUTCHours();
    let modifier = "AM";
    if (formatHours > 12){
        formatHours -= 12;
        modifier = "PM";
    }

    return `${formatHours}:${the_date.getMinutes() < 10 ? "0": ""}${the_date.getMinutes()} ${modifier}`
}

function dbDateChange(the_date: Date){
    let temp_month = the_date.getUTCMonth() + 1;
    let temp_day = the_date.getUTCDate();
    let month, day;
    if (temp_month < 10){
        month = "0" + temp_month.toString();
    }
    else {
        month = temp_month.toString();
    }
    if (temp_day < 10){
        day = "0" + temp_day.toString();
    }
    else {
        day = temp_day.toString();
    }
    let year = (the_date.getUTCFullYear()).toString().substring(2);
    return `${month}-${day}-${year}`;
}

export {getFirstWeekday, getMaxDays, getGridRows, formatDate, getFirstMonday, dbDate, change24to12Format, dbDateChange};