import { Request } from 'express';
import { extname } from 'path';

export const randomNumberGenerator = (limit: number) => {
  let number = 0;
  for (let i = 0; i < limit; i++) {
    number = number * 10 + Math.floor(Math.random() * 10 + 1);
  }
  return number;
};

export const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: CallableFunction,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'));
  }
  callback(null, true);
};

export const editFileName = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
