import moment from 'moment';

export const calcDateDiff = (date1: Date, date2: Date): string => {
  const now = moment(date1);
  const end = moment(date2);
  const years = now.diff(end, 'year');
  end.add(years, 'years');

  const months = now.diff(end, 'months');
  end.add(months, 'months');

  const days = now.diff(end, 'days');

  const handleWords = (word: string, number: number) => {
    if (number > 1) {
      if (word === 'mês') return `${number} meses e`;
      if (word === 'ano') return `${number} ${word}s,`;
      if (word === 'dia') return `${number} ${word}s`;
    } if (number === 1) {
      if (word === 'mês') return `${number} ${word} e`;
      if (word === 'ano') return `${number} ${word},`;
      if (word === 'dia') return `${number} ${word}`;
    }
    return '';
  };

  return `${handleWords('ano', years)} ${handleWords('mês', months)} ${handleWords('dia', days)}`;
};
