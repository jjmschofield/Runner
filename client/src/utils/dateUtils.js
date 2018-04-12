import { format } from 'date-fns';

export function toStandardDateFormat(date) {
  return format(date, 'ddd Do MMM YYYY');
}
