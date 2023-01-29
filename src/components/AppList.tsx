import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Link } from 'react-router-dom';
import { routes } from '../routes';

type IProps = { open: boolean };

export const AppList: React.FC<IProps> = ({ open }) => (
  <List>
    {routes.map((route, index) => (
      <ListItem key={index} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          component={Link}
          to={route.link}
          sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
        >
          <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
            {route.icon}
          </ListItemIcon>
          <ListItemText primary={route.text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
);
