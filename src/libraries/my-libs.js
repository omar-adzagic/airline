import moment from 'moment'

// Moment.js
export const convertToMysqlDateFormat = stringDate => {
   const dateMomentObject = moment(stringDate, "DD/MM/YYYY");
   const dateObject = dateMomentObject.toDate();
   return moment(dateObject).format('YYYY-MM-DD');
};
export const convertToDateFormat = (date, format) => {
   // const dateMomentObject = moment(stringDate, "YYYY-MM-DD");
   // const dateObject = date.toDate();
   // console.log(dateObject);
   return moment(date).format(format);
};
export const convertToDateTimeFormat = (stringDate, format) => {
   const dateMomentObject = moment(stringDate, "YY-MM-DD hh:mm:ss");
   const dateObject = dateMomentObject.toDate();
   return moment(dateObject).format(format);
};