import { AGE, BIRTHDAY, NEXT_BIRTHDAY } from "../constants/constants";

export const sortBy = (type: string, isAscending: boolean, a: any, b: any) => {
  if (type === BIRTHDAY) {
    const daysA = getBirthdayDifference(a.birthdate) || -1;
    const daysB = getBirthdayDifference(b.birthdate) || -1;
    console.log({ daysA });
    console.log({ daysB });
    return isAscending ? daysA - daysB : daysB - daysA;
  }
  if (type === NEXT_BIRTHDAY) {
    const daysA = getDaysUntilBirthDate(a.birthdate) || 1000000;
    const daysB = getDaysUntilBirthDate(b.birthdate) || 1000000;
    return isAscending ? daysA - daysB : daysB - daysA;
  }
  if (type === AGE) {
    const ageA = getDaysAlive(a.birthdate) || 1000000;
    const ageB = getDaysAlive(b.birthdate) || 1000000;
    return isAscending ? ageA - ageB : ageB - ageA;
  }
  const t = type.toLowerCase();
  const result = (a[t] || 0) > (b[t] || 0);

  if (isAscending) {
    return result ? 1 : -1;
  }
  return result ? -1 : 1;
};

export const getAge = (birthdate: string) => {
  const now = new Date();
  const then = new Date(birthdate);

  const diff = Math.abs(Number(now) - Number(then));
  const years = diff / (1000 * 60 * 60 * 24 * 365);
  return years < 1 ? Math.floor(years * 100) / 100 : Math.floor(years);
};

export const getDaysAlive = (birthdate: string) => {
  const now = new Date();
  const then = new Date(birthdate);

  const diff = Math.abs(Number(now) - Number(then));
  const years = Math.floor(diff / (1000 * 60 * 60 * 24));
  return years;
};

export const getDaysUntilBirthDate = (birthdate: string) => {
  const now = new Date();
  let then = new Date(`${now.getFullYear()}${birthdate.slice(4)}`);
  if (then < now) {
    then = new Date(`${now.getFullYear() + 1}${birthdate.slice(4)}`);
  }
  const diff = Math.abs(Number(now) - Number(then));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days;
};

export const getBirthdayDifference = (birthdate: string) => {
  const now = new Date();
  now.setMonth(0);
  now.setDate(1);
  const then = new Date(`${now.getFullYear()}${birthdate.slice(4)}`);
  const diff = Math.abs(Number(now) - Number(then));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days;
};
