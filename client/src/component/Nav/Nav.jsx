import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ToggleOff from '@mui/icons-material/ToggleOff';
import ToggleOn from '@mui/icons-material/ToggleOn';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { CUSTOMER_PATH, DASHBOARD_PATH, ORDER_PATH } from '../../config';
// import { useAuth0 } from '@auth0/auth0-react';

function Nav({ mode, handleMode }) {
  // const auth0 = useAuth0();
  // const { loginWithRedirect, logout, user: auth0User } = auth0;
  const { user, logout: CustomLogout } = useAuth();
  const nagivate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const settings = [
    // { title: auth0User?.name || 'Profile', func: () => {} },
    { title: 'Account', func: () => {} },
    { title: 'Dashboard', func: () => {} },
    {
      title: 'Logout Auth0',
      func: () =>
        logout({ logoutParams: { returnTo: window.location.origin } }),
    },
    {
      title: 'Logout ',
      func: CustomLogout,
    },
  ];
  const pages = [
    {
      title: 'Customer',
      func: () => nagivate(`${DASHBOARD_PATH}/${CUSTOMER_PATH}`),
    },
    { title: 'Order', func: () => nagivate(`${DASHBOARD_PATH}/${ORDER_PATH}`) },
  ];
  // <button onClick={() => loginWithRedirect()}>Log In</button>
  const authPages = [
    // { title: 'login Auth0', func: loginWithRedirect },
    { title: 'login', func: () => nagivate('/login') },
    { title: 'signup', func: () => nagivate('/signup') },
  ];
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {user?.id
                ? pages.map(({ title, func }) => (
                    <MenuItem key={title} onClick={func}>
                      <Typography textAlign="center">{title}</Typography>
                    </MenuItem>
                  ))
                : authPages.map(({ title, func }) => (
                    <MenuItem key={title} onClick={func}>
                      <Typography textAlign="center">{title}</Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {user?.id ? (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map(({ title, func }) => (
                <Button
                  key={title}
                  onClick={func}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {title}
                </Button>
              ))}
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              {authPages.map(({ title, func }) => (
                <Button
                  key={title}
                  onClick={func}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {title}
                </Button>
              ))}
            </Box>
          )}
          <Button
            endIcon={mode === 'light' ? <ToggleOn /> : <ToggleOff />}
            onClick={() => handleMode()}
            sx={{
              flexGrow: 0,
              display: { xs: 'none', md: 'flex', color: 'white' },
              marginRight: 2,
              ':focus': {
                border: 0,
                outline: 'none',
              },
            }}
            variant="text"
          >
            {mode}
          </Button>
          {user?.id ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      // auth0User?.picture ||
                      `https://mui.com/static/images/avatar/2.jpg`
                    }
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map(({ title, func }) => (
                  <MenuItem key={title} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={func}>
                      {title}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <></>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Nav;
