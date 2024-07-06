import bcrypt from 'bcrypt';
export const hashValue = (value) => bcrypt.hash(value, 10); // функция хешированиЯ
