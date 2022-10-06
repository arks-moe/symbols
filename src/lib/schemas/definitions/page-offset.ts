import * as yup from 'yup';

const pageOffset = yup.number().integer().moreThan(-1);

export default pageOffset;
