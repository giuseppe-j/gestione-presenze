import { Dayjs } from 'dayjs';
export type Track = {
    id: string;
    description: string;
    start_time: string;
    end_time: string;
    date: string;
    user_id: string;
};

export type FormFields = {
    description: string;
    date: Dayjs;
    start_time: Dayjs;
    end_time: Dayjs;
};