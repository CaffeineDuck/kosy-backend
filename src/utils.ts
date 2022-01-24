export const randomNumberGenerator = (limit: number) => {
  let number = 0;
  for (let i = 0; i < limit; i++) {
    number = number * 10 + Math.floor(Math.random() * 10 + 1);
  }
  return number;
};
