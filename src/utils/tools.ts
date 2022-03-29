import dayjs from 'dayjs';
import slugify from 'slugify';
import intersection from 'lodash/intersection';
import includes from 'lodash/includes';

export const go = (url: string) => window.open(url, '_blank');

export const fmtIssues = (num: number, nlen: number) => `#` + `${num}`.padStart(nlen, '0');

export const fmtDate = (date: Date) => dayjs(date).format('YYYY/MM/DD');

export const fmtURI = (uri: string, isSlugify: boolean = false) =>
  isSlugify ? slugify(uri, { lower: true, remove: /[*+~.()'"!:@]/g }) : uri.toLocaleLowerCase().replace(/ /g, '+');

export const fmtLabelsCategory = (list: any[], category: string[], level: string[]): Record<string, any[]> => {
  let re = reLevel(level);
  let obj: any = {};
  list.forEach((i: any) => {
    const key: any = intersection(category, i.labels.map((j: any) => j.name))?.[0];

    if (key) {
      if (!obj[key]) obj[key] = { level: [], list: [] };

      i.labels.map((j: any) => {
        let _key3 = getLevel(j?.description, level);
        if (re.test(j.description)) {
          if (!includes(obj[key].level, _key3)) {
            obj[key].level.push(_key3);
          }
        }
        j.level = _key3;
        return j;
      });
      const _level: any = [];
      i.labels.forEach((j: any) => {
        if (j.level && !includes(_level, j.level)) _level.push(j.level);
      });
      i.level = _level;
      obj[key].list.push(i);
    }
  });

  return obj;
};

export const reLevel = (level: string[]): RegExp => new RegExp(`^${level?.map((i: any) => `(${i})`).join('|')}`, 'ig');

export const getLevel = (txt: string, level: string[]): string => {
  let re = new RegExp(`^(${level?.map(i => `(${i})`).join('|')})`, 'ig');
  return (txt.match(re)?.[0] || '').trim().toLocaleUpperCase();
}

export const getScrollPosition = (el: any = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});
