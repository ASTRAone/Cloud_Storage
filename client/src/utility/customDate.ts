import moment from 'moment';

import { mounths } from './contants';

export const customDate = (date: string) => {
  return {
    fullDate: moment(date).format('DD.MM.YYYY'),
    day: moment(date).format('DD'),
    mounth: mounths[moment(date).month() + 1],
  };
};

export const customTime = (date: string) => {
  return moment(date).format('HH:MM');
};
