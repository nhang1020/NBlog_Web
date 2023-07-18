
import moment from 'moment';

export const formatDateVi = (timeVal) => {
    timeVal = moment(timeVal).toDate();
    let date = timeVal.getDate();

    let month = timeVal.getMonth() + 1;
    let now = new Date();
    let dateString = ``;

    if (date === now.getDate() && month === now.getMonth() + 1) {
        const timeDifference = Math.floor((now - timeVal) / (1000 * 60));
        let hours = Math.floor(timeDifference / 60); // Giờ
        let minutes = timeDifference % 60;
        if (hours > 0) {
            dateString = `${hours} tiếng trước`
        } else {
            dateString = `${minutes} phút trước`;
        }
    } else {
        let time = timeVal.getHours().toString().padStart(2, '0') + ':' + timeVal.getMinutes().toString().padStart(2, '0');
        dateString = `${time} - ${date} tháng ${month}`;
    }
    return dateString
}

export const formatDateEn = (timeVal) => {
    timeVal = moment(timeVal).toDate();
    let date = timeVal.getDate();

    let month = timeVal.getMonth() + 1;
    let now = new Date();
    let dateString = ``;


    if (date === now.getDate() && month === now.getMonth() + 1) {
        const timeDifference = Math.floor((now - timeVal) / (1000 * 60));
        let hours = Math.floor(timeDifference / 60); // Giờ
        let minutes = timeDifference % 60;
        if (hours > 0) {
            dateString = `${hours} hours ago`
        } else {
            dateString = `${minutes} minutes ago`;
        }
    } else {
        month = moment().month(month - 1);
        let time = timeVal.getHours().toString().padStart(2, '0') + ':' + timeVal.getMinutes().toString().padStart(2, '0');
        dateString = `${time} - ${month.format("MMMM")} ${date} `;
    }
    return dateString
}