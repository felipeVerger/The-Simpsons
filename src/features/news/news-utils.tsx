/**
 * It takes a string and returns a string with the first letter of each word capitalized.
 * @param {string} title - string - This is the title that we want to capitalize.
 * @returns A function that takes a string and returns a string.
 */
export const capitalize = (title: string): string => {
  return title
    .split(" ")
    .map((string) => string.charAt(0).toUpperCase() + string.slice(1))
    .join(" ");
};

/**
 * Get the time difference between the current time and the time of the news article, and return the
 * difference in minutes.
 * @param {Date} fechaNoticia - Date =&gt; The date of the news
 * @returns The number of minutes between the current time and the time of the news.
 */
export const getTime = (fechaNoticia: Date): number => {
  const time = new Date();
  const minutosTranscurridos = Math.floor(
    (time.getTime() - fechaNoticia.getTime()) / 60000
  );
  return minutosTranscurridos;
};
