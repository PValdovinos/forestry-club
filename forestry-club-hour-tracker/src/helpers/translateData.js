import { POINTS_FACTOR } from "../projectVariables.js"

export const translateMemberHours = data => {
    if (!data) return [];
    return data.map(entry => ({
        id: entry.submission_id,
        date: entry.date_worked ? new Date(entry.date_worked).toLocaleDateString() : "N/A",
        hours: entry.hours ?? 0,
        points: (entry.hours ?? 0) * POINTS_FACTOR
    }));
}

export const translateClubMembers = data => {
    if(data) {
        return data.map(element => ({
            "id": element.user_id,
            "email": element.email,
            "name": element.fname + " " + element.lname,
            "hours": element.hours ? element.hours : 0,
            "points": element.hours * POINTS_FACTOR
        }))
    }
    else {
        return []
    }
}

export const translateMemberData = data => {
    if (data) {
        return data.map(element => {
            let userStatus = "Accepted";
            if (!element.accepted) {
                userStatus = "Rejected";
            }
            if (element.under_review) {
                userStatus = "Pending";
            }
            return {
                id: element.submission_id,
                date: element.date_worked,
                hours: element.hours ? element.hours : 0,
                status: userStatus
            };
        });
    } else {
        return [];
    }
}