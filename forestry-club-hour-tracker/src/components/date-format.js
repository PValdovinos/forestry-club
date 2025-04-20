
//Helper function to 
function pad(value) {
    if(value > 9){
        return value;
    }
    else {
        return '0' + value;
    }
}

export function jsDateToSqlDate(date) {
    const sqlDate ='' + date.getUTCFullYear() + '-' +
            pad(date.getUTCMonth() + 1) + '-' +
            pad(date.getUTCDate())      + ' ' +
            pad(date.getUTCHours())     + ':' +
            pad(date.getUTCMinutes())   + ':' +
            pad(date.getUTCSeconds());
    return sqlDate;
}