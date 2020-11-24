import moment from 'moment';
import Swal from 'sweetalert2';

export const swalNotification = (type, message) => {
   switch(type) {
      case "success":
         return Swal.fire({
            icon: type,
            title: "Uspjeh!",
            text: message,
            showConfirmButton: false,
            timer: 2000
         });
      case "success-confirm":
         return Swal.fire({
            icon: "success",
            title: "Uspjeh!",
            text: message,
            showConfirmButton: true,
            confirmButtonText: "U redu"
         });
      case "error":
         return Swal.fire({
            icon: type,
            title: "Nevalidna akcija!",
            text: message,
            showConfirmButton: true,
            confirmButtonText: 'U redu',
            confirmButtonColor: '#138496'
         });
   }
};

export const checkIfNotEmpty = (value) => value !== null && value !== undefined && value !== '';
export const checkIfEmpty = (value) => !checkIfNotEmpty(value);

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