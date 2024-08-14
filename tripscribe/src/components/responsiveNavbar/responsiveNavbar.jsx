import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'; 
import AddBoxIcon from '@mui/icons-material/AddBox';
import MapIcon from '@mui/icons-material/Map'; 
import PersonIcon from '@mui/icons-material/Person'; 

const pages = ['Add Trip', 'My Trips', 'Map View'];
const pageLinks = {
  'My Trips': '/mytrips',
  'Add Trip': '/addtrip',
  'Map View': '/map',
};
const settings = ['Profile', 'Logout'];
const settingsLinks = {
  'Profile': '/userprofile',
  'Logout': '/logout',
};

export const ResponsiveNavbar = () => {
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

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: '#476a6f' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/mytrips"
              sx={{
                mr: 20,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              TRIPSCRIBE
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="navigation menu"
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
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to={pageLinks[page]}>
                    <Typography textAlign="center" sx={{ textDecoration: 'none', color: 'inherit' }}>
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/mytrips"
              sx={{
                mr: 4,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              TRIPSCRIBE
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  component={Link}
                  to={pageLinks[page]} 
                  onClick={handleCloseNavMenu}
                  sx={{ 
                    my: 2, 
                    color: 'white', 
                    display: 'flex',
                    alignItems: 'center',
                    mx: 2, 
                    fontSize: '1.2rem', 
                  }}
                >
                  {page === 'My Trips' && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <WorkOutlineIcon sx={{ mr: 1 }} />
                      <Typography variant="body1" sx={{ color: 'inherit', fontSize: '1.2rem' }}>
                        {page}
                      </Typography>
                    </Box>
                  )}
                  {page === 'Add Trip' && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AddBoxIcon sx={{ mr: 1 }} />
                      <Typography variant="body1" sx={{ color: 'inherit', fontSize: '1.2rem' }}>
                        {page}
                      </Typography>
                    </Box>
                  )}
                  {page === 'Map View' && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <MapIcon sx={{ mr: 1 }} />
                      <Typography variant="body1" sx={{ color: 'inherit', fontSize: '1.2rem' }}>
                        {page}
                      </Typography>
                    </Box>
                  )}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, ml: 'auto' }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'white' }}>
                  <PersonIcon />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar-user"
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu} component={Link} to={settingsLinks[setting]}>
                    <Typography textAlign="center" sx={{ textDecoration: 'none', color: 'inherit' }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Placeholder div to prevent content from being hidden under the fixed navbar */}
      <div style={{ marginTop: '64px' }}></div>
    </>
  );
}
