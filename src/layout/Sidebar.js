import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Divider,
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@mui/material';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import { memo, useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import CustomAvatar from '../components/avatar';
import { stringAvatar } from '../utils';
import Header from './Header';
import Item from './Item.js';
import MenuConfig from './MenuConfig';

let drawerWidth = 220;
const color = '#7635dc';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const XsDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}));

const FireNav = styled(List)({
  '& .MuiListItemButton-root': {
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: 'rgb(99, 115, 129)'
  },

  '& .Mui-selected': {
    color
  },
  '& .MuiTouchRipple-root': {
    color
  },

  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
    color: 'inherit'
  },
  '& .MuiListItemText-root': {
    color: 'inherit'
  }
});

const Sidebar = (props) => {
  const { window } = props;

  const [open, setOpen] = useState(true);
  const [fix, setFix] = useState(true);
  const [openDraweMobile, setOpenDraweMobile] = useState(false);

  const handleDrawerClose = () => {
    setOpen(true);
    setFix(!fix);
  };

  const [permissions] = useState();
  // !!localStorage.getItem(`${config.perfix}permissions`)
  //   ? JSON.parse(localStorage.getItem(`${config.perfix}permissions`))
  //   : null
  const [menu, setMenu] = useState([]);
  const [user] = useState({ name: 'Elora Admin', username: 'Elora' });
  // !!localStorage.getItem(`${config.perfix}user`)
  //   ? JSON.parse(localStorage.getItem(`${config.perfix}user`))
  //   : null

  const findItemNested = useCallback((arr, per) => {
    return arr
      .map((item) => {
        return { ...item };
      })
      .filter((item) => {
        if ('submenu' in item) {
          item.submenu = findItemNested(item.submenu, per);
        }
        return per?.includes(item?.permission);
      });
  }, []);

  useEffect(() => {
    setMenu(MenuConfig.aside.items);
  }, [findItemNested, permissions]);

  const drawer = (
    <>
      <DrawerHeader sx={{ display: { xs: 'none', md: 'flex' } }}>
        <IconButton onClick={handleDrawerClose}>{open && <ChevronRightIcon />}</IconButton>
      </DrawerHeader>
      <FireNav>
        <ListItemButton selected>
          <ListItemIcon>
            <CustomAvatar {...stringAvatar(user?.name)} />
          </ListItemIcon>
          <ListItemText primary={user?.name} secondary={user?.username} />
        </ListItemButton>
      </FireNav>
      <FireNav
        component="nav"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <Divider />
          </ListSubheader>
        }
      >
        {menu.map(({ page, icon, title, submenu }, idx) => (
          <Item
            key={idx}
            page={page}
            title={title}
            icon={icon}
            openDrawer={open}
            submenu={submenu}
            color={color}
          />
        ))}
      </FireNav>
    </>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: 'flex', height: '100%' }}>
        <Header user={user} drawerWidth={drawerWidth} setOpenDraweMobile={setOpenDraweMobile} />

        <XsDrawer
          onMouseOver={() => !fix && setOpen(true)}
          onMouseLeave={() => !fix && setOpen(false)}
          open={open}
          onClose={handleDrawerClose}
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box'
            }
          }}
        >
          {drawer}
        </XsDrawer>

        <Drawer
          container={container}
          variant="temporary"
          open={openDraweMobile}
          onClose={() => setOpenDraweMobile(false)}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>

        <Box
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 1,
            p: { lg: 3, sm: 0 }
          }}
        >
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default memo(Sidebar);
