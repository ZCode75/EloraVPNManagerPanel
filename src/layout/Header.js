import { MoreVert, NotificationsNone, PeopleAlt } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, IconButton, InputBase, Paper, Toolbar } from '@mui/material';
import Avatar from 'components/avatar';
import Button from 'components/button';
import Menu from 'components/menu';
import Modal from 'components/modal_v2';
import useUsers from 'hooks/useUsers';
import { debounce } from 'lodash';
import UserInfo from 'pages/components/user_info';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { stringAvatar } from 'utils';

const Header = ({ user, drawerWidth, setOpenDraweMobile }) => {
  const menuRef = useRef();
  const mobileMenuRef = useRef();
  const showInfoRef = useRef();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  const { getUsers, users, isLoading = isLoadingUsers } = useUsers();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    if (search.length > 0) getUsers(search);
    return () => {};
  }, [search]);

  const handleChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const debouncedResults = useMemo(() => debounce(handleChange, 500), [handleChange]);

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
      <Modal
        keepMounted
        ref={showInfoRef}
        maxWidth="sm"
        fullWidth={false}
        popup
        dialogActions={
          <Button size="small" onClick={() => showInfoRef.current.close()}>
            Close
          </Button>
        }
        sx={{
          p: 1,
          m: 0
        }}
      >
        <Box display={'flex'} flexDirection={'column'} height={'100%'}>
          <Paper
            component="div"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 400,
              boxShadow: 'none',
              borderBottom: '1px solid #e5e5e5',
              bgcolor: 'background.default',
              mb: 2
            }}
          >
            <InputBase
              sx={{ flex: 1, p: 2, fontSize: 15 }}
              label="Search..."
              onChange={debouncedResults}
              placeholder="Search users..."
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Box height={300} overflow={'auto'}>
            {users.map((user) => (
              <Box key={user.id}>
                <UserInfo user={user} />
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
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
            <IconButton size="large" onClick={() => showInfoRef.current.open()}>
              <SearchIcon />
            </IconButton>
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
