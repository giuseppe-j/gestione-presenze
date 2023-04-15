import { useEffect, useState } from "react";
import { addTrack, getTracks } from "../../supabaseClient";
import { Track } from "../../shared/types";
import { getCookie } from "../../utils/utils";
import TrackGroups from "./TrackGroups";
import AddTrack from "./AddTrack";
import { getGroupKey, getDateTime, getDuration, getKey } from "../../utils/date";
import dayjs, { Dayjs } from "dayjs";

export interface Group {
    tracks: Track[];
    total: number;
}

export default function TimeTracker() {
    const [userId, setUserId] = useState<string | null>('');
    const [trackGroups, setTracksGroups] = useState<Record<string, Group>>({});

    useEffect(() => {
        const user = getCookie('user');
        const userFormat = user && JSON.parse(user);
        setUserId(userFormat.id);
    }, [userId]);

    useEffect(() => {
        const fetchFromDB = async () => {
            if (userId) {
                const { tracks } = await getTracks(userId);
                const trackGroups = buildTrackGroups(tracks);
                setTracksGroups(trackGroups);
            }
        };
        fetchFromDB();
    }, [userId]);

    const addToGroup = (track: Track) => {
        const groupKey = getDateTime(track.date, track.start_time).valueOf();
        const key = getKey(groupKey);
        const group = trackGroups[key] || {};
        if (!group.tracks) {
            group.tracks = [];
        }
        group.tracks.push(track);
        group.total = getWeekTotal(group.tracks);
        setTracksGroups({ ...trackGroups, [key]: group });
    }

    const getWeekTotal = (tracks: Track[]) => {
        return tracks.reduce<number>((prev, curr) => {
            const endTime = getDateTime(curr.date, curr.end_time);
            const startTime = getDateTime(curr.date, curr.start_time);
            const duration = getDuration(endTime, startTime).asMilliseconds();
            return prev + duration;
        }, 0);
    }

    const buildTrackGroups = (tracks: Track[]) => {
        return tracks.reduce((prev: Record<string, Group>, curr: Track) => {
            const groupKey = getDateTime(curr.date, curr.start_time).valueOf();
            const key = getKey(groupKey);
            const group = prev[key] || {};
            if (!group.tracks) {
                group.tracks = [];
            }
            group.tracks.push(curr);
            group.total = getWeekTotal(group.tracks);
            return { ...prev, [key]: group };
        }, {});
    }

    const handleAddTrack = async (track: Track) => {
        try {
            await addTrack(track);
            addToGroup(track);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <AddTrack addTrack={handleAddTrack} />
            <TrackGroups trackGroups={trackGroups} />
        </>
    )
}