
import moment from 'moment';

export const formatDate = (timeVal) => {
    timeVal = moment(timeVal).toDate();
    let date = timeVal.getDate();
    let time = timeVal.getHours() + ':' + timeVal.getMinutes();
    let month = timeVal.getMonth() + 1;
    let now = new Date();
    let dateString = `${time} ${date},Thg ${month}`;

    if (date === now.getDate() && month === now.getMonth() + 1) {
        const timeDifference = Math.floor((now - timeVal) / (1000 * 60));
        let hours = Math.floor(timeDifference / 60); // Giờ
        let minutes = timeDifference % 60;
        if (hours > 0) {
            dateString = `${hours} tiếng trước`
        } else {
            dateString = `${minutes} phút trước`;
        }
    }
    return dateString
}