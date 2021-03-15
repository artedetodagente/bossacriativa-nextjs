export const date = new Date();
export const year = date.getFullYear();
export const month = date.getMonth() + 1;
export const day = date.getDate();
export const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];
export const getISODateString = (stringDateInput) => {
  const stringDate = stringDateInput || '1/1/1970';
  const [d, m, y] = stringDate.split(' ')[0].split('/');
  return `${y}-${m}-${d}`;
};
