import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';

export const routes = [
  {
      text: 'Timesheet',
      icon: <PendingActionsIcon />,
      link: 'timesheet'
  },
  {
      text: 'Time Tracker',
      icon: <AccessTimeIcon />,
      link: 'time-tracker'
  },
  {
      text: 'Calendar',
      icon: <DateRangeIcon />,
      link: 'calendar'
  }
]