function convertSecondsToMinutes(seconds: any) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const suffix =
    remainingSeconds === 0 ? "" : remainingSeconds < 10 ? "s" : "m";

  return `${minutes}:${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}${suffix}`;
}

export default convertSecondsToMinutes;
