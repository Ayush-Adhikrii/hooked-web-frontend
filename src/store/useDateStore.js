// utils/dateUtils.js

export const parseISOToDate = (isoString) => {
    if (!isoString) return null;
    return new Date(isoString.split("T")[0]); // Ensures only date part is used
};

export const formatDateForInput = (date) => {
    if (!date) return "";
    return date.toISOString().split("T")[0]; // Extracts `YYYY-MM-DD`
};

export const getStarSign = (date) => {
    if (!date) return "";

    // Ensure 'date' is a Date object
    const parsedDate = date instanceof Date ? date : new Date(date);
    const month = parsedDate.getMonth() + 1;
    const day = parsedDate.getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";

    return "";
};


export const getAge = (date) => {
    if (!date) return "";
    const parsedDate = date instanceof Date ? date : new Date(date);
    const diff = Date.now() - parsedDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
