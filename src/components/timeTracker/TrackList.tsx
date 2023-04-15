import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material"
import { blueGrey } from '@mui/material/colors';
import { Track } from "../../shared/types"
import { formatdddMMMDD, formatHHmm, getDateTime, getDuration } from "../../utils/date";

type Props = {
    values: Track[]
}

export default function TrackList(props: Props) {
    return (
        <>
            {
                props.values.map((track: Track) => {
                    const endTime = getDateTime(track.date, track.end_time);
                    const startTime = getDateTime(track.date, track.start_time);
                    const duration = getDuration(endTime, startTime);
                    return (
                        <Card key={track.id} sx={{ marginTop: 2 }}>
                            <CardHeader
                                title={formatdddMMMDD(track.date)}
                                titleTypographyProps={{ variant: 'subtitle2' }}
                                action={
                                    <Typography sx={{ fontSize: 14 }}>{`Total ${duration.format('H:mm')}`}</Typography>
                                }
                                sx={{ paddingY: 1, bgcolor: blueGrey[100] }}>
                            </CardHeader>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {track.description}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {`${formatHHmm(startTime)} - ${formatHHmm(endTime)}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    );
                })
            }
        </>
    )
}

