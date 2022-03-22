import dayjs from "dayjs";

export const go = (url: string) => window.open(url, '_blank');

export const fmtIssues = (num: number, nlen: number) => `#` + `${num}`.padStart(nlen, '0');

export const fmtDate = (date: Date) => dayjs(date).format('YYYY/MM/DD');