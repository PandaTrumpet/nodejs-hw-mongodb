import { contactTypeList } from '../constans/contactTypeList.js';

const parseBoolean = (value) => {
  if (typeof value !== 'string') return;
  if (!['true', 'false'].includes(value)) return;
  const parseValue = Boolean(value);
  return parseValue;
};
const parseFilterContactsParams = ({ type, isFavourite }) => {
  const parsedType = contactTypeList.includes(type) ? type : null;
  const parsedIsFavourite = parseBoolean(isFavourite);
  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};

export default parseFilterContactsParams;
