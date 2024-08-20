import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import InfoIcon from '@mui/icons-material/Info';
import { FacebookLogo, XLogo, LinkedinLogo, InstagramLogo } from '@phosphor-icons/react';
import { Box } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';

export const ResponsiveFooter = () => {
  const [value, setValue] = React.useState('about');
  const navigate = useNavigate();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 'about') {
      navigate('/aboutus');
    }
  };

  const handleLinkClick = (url) => {
    window.open(url, '_blank');
  }; 

  return (
    <Box sx={{ bottom: 0, left: 0, width: '100%' }}>
      <BottomNavigation
        sx={{ width: '100%' }}
        value={value}
        onChange={handleChange}
        style={{ backgroundColor: '#476a6f', justifyContent: 'space-between' }} 
      >
        <BottomNavigationAction
          label="About Us"
          value="about"
          icon={<InfoIcon fontSize={isLargeScreen ? 'medium' : 'small'} />}
          style={{ color: 'white', marginRight: isLargeScreen ? '32px' : '16px' }} 
        />

        <Box sx={{ display: 'flex', gap: isLargeScreen ? 2 : 1 }}>
          <BottomNavigationAction
            label="Facebook"
            value="facebook"
            icon={<FacebookLogo size={isLargeScreen ? 32 : 24} />}
            style={{ color: 'white' }}
            onClick={() => handleLinkClick('https://www.facebook.com')}
          />
          <BottomNavigationAction
            label="Instagram"
            value="instagram"
            icon={<InstagramLogo size={isLargeScreen ? 32 : 24} />}
            style={{ color: 'white' }}
            onClick={() => handleLinkClick('https://www.instagram.com')}
          />
          <BottomNavigationAction
            label="Twitter"
            value="twitter"
            icon={<XLogo size={isLargeScreen ? 32 : 24} />}
            style={{ color: 'white' }}
            onClick={() => handleLinkClick('https://twitter.com')}
          />
          <BottomNavigationAction
            label="LinkedIn"
            value="linkedin"
            icon={<LinkedinLogo size={isLargeScreen ? 32 : 24} />}
            style={{ color: 'white' }}
            onClick={() => handleLinkClick('https://www.linkedin.com')}
          />
        </Box>

        <p style={{ color: 'white', marginLeft: isLargeScreen ? '32px' : '16px', marginRight: '8px' }}>© 2024 Team5</p>
      </BottomNavigation>
    </Box>
  );
}
