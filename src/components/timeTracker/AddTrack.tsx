import { Box, Button } from "@mui/material"
import { Dayjs } from 'dayjs';
import { v4 as uuid } from 'uuid';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller, useForm } from "react-hook-form";
import * as Constants from "../../shared/constants";
import { FormFields, Track } from "../../shared/types";
import { getCookie } from "../../utils/utils";
import { formatHHmm, formatMMDDYYYY, getCurrentDate, getCurrentTimeHHmm, validateDate, validateTime } from "../../utils/date";

const locale = 'it';

type Props = {
    addTrack: (track: Track) => void
}

// Initial form values
const defaultValues: FormFields = {
    description: '',
    date: getCurrentDate(),
    start_time: getCurrentTimeHHmm(),
    end_time: getCurrentTimeHHmm(),
};

// Validation rules
const validationRules = {
    description: {
        required: 'Description is required',
    },
    date: {
        validate: (val: Dayjs | null) => validateDate(val),
    },
    start_time: {
        validate: (val: Dayjs | null) => validateTime(val, 'Start time'),
    },
    end_time: {
        validate: (val: Dayjs | null) => validateTime(val, 'End time'),
    },
};

export default function AddTrack(props: Props) {
    const { control, handleSubmit } = useForm<FormFields>({
        defaultValues,
        mode: 'onChange',
    });

    const onSubmit = async (formData: FormFields) => {
        const user = getCookie('user');
        const userFormat = user && JSON.parse(user);
        const endTime = formatHHmm(formData.end_time);
        const startTime = formatHHmm(formData.start_time);
        const date = formatMMDDYYYY(formData.date);

        const track = {
            id: uuid(),
            description: formData.description,
            start_time: startTime,
            end_time: endTime,
            date,
            user_id: userFormat && userFormat.id,
        }
        props.addTrack(track);
    }

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <Controller
                        name="description"
                        control={control}
                        rules={validationRules.description}
                        render={({ field, fieldState }) => (
                            <TextField fullWidth id="description outlined-size-small"
                                {...field}
                                type="text"
                                size="small"
                                label="What have you worked on?"
                                variant="outlined"
                                error={!!fieldState.error?.message}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controller
                        name="start_time"
                        control={control}
                        rules={validationRules.start_time}
                        render={({ field, fieldState }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                <TimePicker
                                    {...field}
                                    label="Start time"
                                    inputFormat="HH:mm"
                                    renderInput={(params) =>
                                        <TextField
                                            id="outlined-size-small"
                                            size="small"
                                            {...params}
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    }
                                    onChange={(start_time) => field.onChange(start_time)}
                                />
                            </LocalizationProvider>
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controller
                        name="end_time"
                        control={control}
                        rules={validationRules.end_time}
                        render={({ field, fieldState }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                <TimePicker
                                    {...field}
                                    label="End time"
                                    inputFormat="HH:mm"
                                    renderInput={(params) =>
                                        <TextField
                                            id="outlined-size-small"
                                            size="small"
                                            {...params}
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    }
                                    onChange={(end_time) => field.onChange(end_time)}
                                />
                            </LocalizationProvider>
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Controller
                        name="date"
                        control={control}
                        rules={validationRules.date}
                        render={({ field, fieldState }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                                <DesktopDatePicker
                                    {...field}
                                    label="Date"
                                    inputFormat="DD/MM/YYYY"
                                    renderInput={(params) =>
                                        <TextField
                                            id="outlined-size-small"
                                            size="small"
                                            {...params}
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    }
                                    onChange={(date) => field.onChange(date)}
                                />
                            </LocalizationProvider>
                        )}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                    >
                        {Constants.ADD}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}