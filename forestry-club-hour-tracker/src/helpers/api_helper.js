/**
 * takes a user record and returns a formatted name
 * @param {*} record One element from the user array (via API call)
 * @returns formatted string in the form "Firstname Lastname", i.e., "John Doe"
 */
function userToFirstLast(record) {
    if (!record) return "ERROR";
    return `${record.fname} ${record.lname}`;
}