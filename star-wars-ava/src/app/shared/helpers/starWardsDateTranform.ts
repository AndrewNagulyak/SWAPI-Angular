export function starWardsDateTranform(date: string, type): string {
  if (type === 'from') {
    return date.includes('BBY') ? '-' + date.replace('BBY', '') : date.replace('ABY', '');
  } else {
    return +date > 0 ? date + 'ABY' : date + 'BBY';
  }

}
