import dayjs from 'dayjs';
import slugify from 'slugify';

export const go = (url: string) => window.open(url, '_blank');

export const fmtIssues = (num: number, nlen: number) => `#` + `${num}`.padStart(nlen, '0');

export const fmtDate = (date: Date) => dayjs(date).format('YYYY/MM/DD');

export const fmtURI = (uri: string, isSlugify: boolean = false) =>
  isSlugify ? slugify(uri, { lower: true, remove: /[*+~.()'"!:@]/g }) : uri.toLocaleLowerCase().replace(/ /g, '+');