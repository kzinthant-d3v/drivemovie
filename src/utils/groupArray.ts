export const groupArray = <T>(
  arr: Array<T>,
  groupCount: number
): Array<Array<T>> => {
  const res = [];

  let a: Array<T> = [];
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    a.push(arr[i]);
    count++;
    if (count === groupCount || i === arr.length - 1) {
      res.push(a);
      a = [];
      count = 0;
    }
  }

  return res;
};
