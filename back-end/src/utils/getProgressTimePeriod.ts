import { START_SHORT_GAME_PERIOD, PROGRESS_SHORT_GAME_PERIOD } from "../constants/periodTime";

const startShortGamePeriod = START_SHORT_GAME_PERIOD.split(',').map(Number);
const progressShortGamePeriod = PROGRESS_SHORT_GAME_PERIOD.split(',').map(Number);

const createDateWithHour = (hour: number, isNextDay?: boolean) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  return new Date(year, month, isNextDay ? day + 1 : day, hour, 0, 0, 0);
}

export const getActiveGameTimePeriod = () => {
  const now = new Date();
  const hours = now.getHours();

  // 0 - 4
  if (hours >= startShortGamePeriod[0] && hours < progressShortGamePeriod[0]) {
    return true;
  }

  // 8 - 12
  if (hours >= startShortGamePeriod[1] && hours < progressShortGamePeriod[1]) {
    return true;
  }

  // 16 - 20
  if (hours >= startShortGamePeriod[2] && hours < progressShortGamePeriod[2]) {
    return true;
  }

  return false;
}

export const getGameTimePeriod = () => {
  const now = new Date();
  const hours = now.getHours();

  // 0 - 8
  if (hours >= startShortGamePeriod[0] && hours < startShortGamePeriod[1]) {
    return {
      start: createDateWithHour(startShortGamePeriod[0]),
      progress: createDateWithHour(progressShortGamePeriod[0]),
      end: createDateWithHour(startShortGamePeriod[1]),
    }
  }

  // 8 - 16
  if (hours >= startShortGamePeriod[1] && hours < startShortGamePeriod[2]) {
    return {
      start: createDateWithHour(startShortGamePeriod[1]),
      progress: createDateWithHour(progressShortGamePeriod[1]),
      end: createDateWithHour(startShortGamePeriod[2]),
    }
  }

  // 16 - 00
  if (hours >= startShortGamePeriod[2]) {
    return {
      start: createDateWithHour(startShortGamePeriod[2]),
      progress: createDateWithHour(progressShortGamePeriod[2]),
      end: createDateWithHour(startShortGamePeriod[0], true),
    }
  }
}
