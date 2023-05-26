import moment from 'moment';

import { mounths } from './contants';

export const customDate = (date: string) => {
  return {
    fullDate: moment(date).format('DD.MM.YYYY'),
    day: moment(date).format('DD'),
    mounth: mounths[moment(date).month() + 1],
    time: moment(date).format('HH:MM'),
  };
};
