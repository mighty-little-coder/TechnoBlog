// Sets date for 'date_created' column
module.exports = {
  format_date: (date) => {
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    const timeString = date.toLocaleTimeString(undefined, timeOptions);

    const dateOptions = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    };
    const dateString = date.toLocaleDateString(undefined, dateOptions);

    return `${timeString} ${dateString}`;
  },
};