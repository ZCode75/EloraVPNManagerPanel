import { MoreVert, NotificationsNone, PeopleAlt } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, IconButton, InputAdornment, TextField, Toolbar } from '@mui/material';
import Avatar from 'components/avatar';
import Menu from 'components/menu';
import MenuIcon from '@mui/icons-material/Menu';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { stringAvatar } from 'utils';

const Header = ({ user, drawerWidth, setOpenDraweMobile }) => {
  const menuRef = useRef();
  const mobileMenuRef = useRef();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <Menu
        ref={menuRef}
        items={[
          {
            id: 1,
            name: 'Logout',
            icon: 'logout',
            color: 'red',
            onClick: handleLogout
          }
        ]}
      />
      <Menu
        ref={mobileMenuRef}
        items={[
          {
            id: 1,
            name: 'Notifications',
            icon: 'notifications',
            color: 'primary',
            onClick: () => alert()
          },
          {
            id: 1,
            name: 'Profile',
            icon: 'person',
            color: 'primary',
            onClick: () => alert()
          }
        ]}
      />
      <AppBar
        position="fixed"
        sx={(theme) => ({
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          zIndex: theme.zIndex.drawer - 1,
          background: '#f4f6f8',
          boxShadow: 'none',
          color: 'black',
          border: 'none'
        })}
      >
        <Toolbar>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: 'none' } }}
              size="large"
              onClick={() => {
                setOpenDraweMobile((res) => !res);
              }}
            >
              <MenuIcon color="secondary" />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <TextField
              size="small"
              fullWidth={false}
              placeholder="Search"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
            <IconButton size="large">
              <PeopleAlt color="secondary" />
            </IconButton>
            <IconButton size="large">
              <NotificationsNone color="secondary" />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              onClick={(e) => mobileMenuRef.current.changeStatus(e)}
            >
              <MoreVert color="secondary" />
            </IconButton>
          </Box>
          <IconButton disableRipple onClick={(e) => menuRef.current.changeStatus(e)}>
            <Avatar {...stringAvatar(user?.name)} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
