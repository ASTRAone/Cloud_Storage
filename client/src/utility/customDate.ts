import moment from 'moment';

export const customDate = (date: string) => {
  return moment(date).format('DD.MM.YYYY');
};
