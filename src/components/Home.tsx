import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar } from './AppBar';
import { AppList } from './AppList';
import { AppToolbar } from './AppToolbar';
import { AppDrawer, AppDrawerHeader } from './drawer';

export default function Home() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <AppToolbar open={open} setOpen={setOpen} />
      </AppBar>
      <AppDrawer variant="permanent" open={open}>
        <AppDrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </AppDrawerHeader>
        <Divider />
        <AppList open={open} />
        <Divider />
      </AppDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppDrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
