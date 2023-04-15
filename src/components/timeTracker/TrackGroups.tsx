import { Box, Grid } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { Track } from "../../shared/types";
import { convertMsToHM, formatHmm, getDateTime, getGroupKey, getKey } from "../../utils/date";
import { Group } from "./TimeTracker";
import TrackList from "./TrackList";

type Props = {
    trackGroups: Record<string, Group>
}

const sortTracks = (tracks: Track[]) => {
    return tracks.sort((a: any, b: any) => dayjs(getDateTime(b.date, b.start_time)).valueOf() - dayjs(getDateTime(a.date, a.start_time)).valueOf());
}

export default function TrackGroups(props: Props) {
    return (
        <>
            {
                Object.entries(props.trackGroups)
                    .reverse()
                    .map(([key, value]) => {
                        return (
                            <React.Fragment key={key}>
                                <Box sx={{ marginTop: 5 }}>
                                    <Grid container sx={{ justifyContent: 'space-between' }}>
                                        <Grid >
                                            {getGroupKey(key)}
                                        </Grid>
                                        <Grid>
                                            {`${convertMsToHM(value.total)}`}
                                        </Grid>
                                    </Grid>
                                    <TrackList key={key} values={sortTracks(value.tracks)} />
                                </Box>
                            </React.Fragment>
                        )
                    })
            }
        </>
    )
}