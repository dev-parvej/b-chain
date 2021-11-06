export const pick = (obj: any, props: Array<string>): any => {
  return Object.keys(obj)
    .filter((key) => props.includes(key))
    .reduce((result: { [key: string]: any }, key): any => {
      result[key] = getProperty(obj, key);
      return result;
    }, {});
};

export const getProperty = <T>(o: T, propertyName: string): any => {
  if (o) {
    return o[propertyName as keyof T];
  }
  return null;
};

export const isAnyPropertyExist = (obj: any, props: Array<string>): number =>
  props.filter((key) => getProperty(obj, key)).length;

export const hasAnyProperty = (obj: any): number => {
  return Object.keys(obj).filter((key) => getProperty(obj, key)).length;
};

export const fillObject = <T>(
  model: T,
  attrs: Partial<T> | { [p: string]: unknown } = {},
): T => {
  Object.keys(attrs).forEach((attr) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    model[attr] = attrs[attr];
  });
  return model;
};

export const valueOrNull = (data_source: unknown) => {
  return data_source ? data_source : null;
};

export const arrayHasIndex = (array: Array<unknown>, index: number): boolean =>
    // eslint-disable-next-line no-prototype-builtins
  Array.isArray(array) && array.hasOwnProperty(index);

