import { SimplePerson } from "./Person";

export const byName = (a: SimplePerson, b: SimplePerson) =>
  (a.name || 0) > (b.name || 0) ? 1 : -1;
