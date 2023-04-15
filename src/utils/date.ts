import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const getKey = (date: any) => dayjs(date).startOf('week').valueOf()
export const getGroupKey = (date: string) => `${dayjs(parseInt(date)).startOf('week').format('MMM DD')} - ${dayjs(parseInt(date)).endOf('week').format('MMM DD')}`

export const getCurrentDate = () => dayjs(new Date())
export const getCurrentTimeHHmm = () => dayjs(dayjs(), 'HH:mm')
export const formatMMDDYYYY = (date: Dayjs) => dayjs(date).format('MM-DD-YYYY')
export const formatHHmm = (date: Dayjs) => dayjs(date).format('HH:mm')
export const formatHmm = (date: number) => dayjs(date).format('H:mm')
export const formatdddMMMDD = (date: string) => dayjs(date).format('ddd, MMM DD')
export const getDateTime = (date: string, time: string) => dayjs(`${date} ${time}`)
export const getDuration = (endTime: Dayjs, startTime: Dayjs) => dayjs.duration(endTime.diff(startTime));

export const validateDate = (value: Dayjs | null) => {
    if (value === null) {
        return 'Date is required';
    }
    if (!value.format('DDMMYYYY').match(/^\d{8}$/g)) {
        return 'Invalid date format';
    }
    return true;
}

export const validateTime = (value: Dayjs | null, type: string) => {
    if (value === null) {
        return `${type} is required`;
    }
    if (!value.format('HH:mm').match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/g)) {
        return 'Invalid time format';
    }
    return true;
}

const padTo2Digits = (number: number) => {
    return number.toString().padStart(2, '0');
}

export const convertMsToHM = (milliseconds: number) => {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = seconds >= 30 ? minutes + 1 : minutes;
    minutes = minutes % 60;
    hours = hours % 24;

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
}

