function FormatDate(timestamp) {
  const date = new Date(parseInt(timestamp, 10));
  return new Intl.DateTimeFormat("lt-LT", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

export default FormatDate;
