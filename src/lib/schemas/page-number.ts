import * as yup from 'yup';

const pageNumber = yup.number().integer().moreThan(0);

export default pageNumber;
