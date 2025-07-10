export const dateOrdinal = (dom: number) => {
    if (dom == 31 || dom == 21 || dom == 1) return dom + "st";
    else if (dom == 22 || dom == 2) return dom + "nd";
    else if (dom == 23 || dom == 3) return dom + "rd";
    else return dom + "th";
};

export const formatDateWithMonAndYear = (dateStr: string) => {
    var date = new Date(dateStr);
    var monthAndYear = date.toLocaleDateString("en-NZ", { month: 'short', year: '2-digit' });
    return dateOrdinal(date.getDate()) + " " + monthAndYear;
}
  
export const formatDateWithDayAndMon = (dateStr: string) => {
    var date = new Date(dateStr);
    var month = date.toLocaleDateString("en-NZ", { month: 'short' });
    var day = dateOrdinal(date.getDate());
    return day + " " + month;
}