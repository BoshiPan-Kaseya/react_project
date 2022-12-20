const dateFormat = (date) => {
    const dateToFormat = new Date(date);
    const YY = dateToFormat.getFullYear();
    const MM = dateToFormat.getMonth() + 1;
    const DD = dateToFormat.getDate();
    return [YY, MM, DD].join('-');
}

export default dateFormat;