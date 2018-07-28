const secondsToMinutes = (numSeconds: number) => {
  let timeString = '';
  let minutesString = '';
  let secondsString = '';

  const minutes = Math.floor(numSeconds / 60);
  const seconds = Math.floor(numSeconds - (minutes * 60));

  if (seconds < 10) {
    secondsString += '0';
  }

  minutesString += minutes;
  secondsString += seconds;

  timeString = `${minutesString}:${secondsString}`;
  return timeString;
};

export { secondsToMinutes };
