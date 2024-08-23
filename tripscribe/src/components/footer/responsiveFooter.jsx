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
    <Box sx={{ position: 'relative', mt: 'auto', width: '100%' }}>
      <BottomNavigation
        sx={{ 
          width: '100%', 
          backgroundColor: '#476a6f', 
          justifyContent: 'space-between',
          }}
        value={value}
        onChange={handleChange}
      >
        <Box 
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}
          onClick={()=> handleChange(null, 'about')}> 
          <InfoIcon 
            fontSize={isLargeScreen ? 'medium' : 'small'} 
            style={{ marginLeft: '8px', color: 'white' }} /> 
          <span style={{ color: 'white', marginLeft: '3px' }}>About Us</span>
        </Box> 

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '8px', marginRight: isLargeScreen ? '32px' : '8px' }}>
          <BottomNavigationAction
            label="Facebook"
            value="facebook"
            icon={<FacebookLogo size={isLargeScreen ? 32 : 24} />}
            style={{ color: 'white', minWidth: 'auto', padding: 0, margin: 0 }}
            onClick={() => handleLinkClick('https://www.facebook.com')}
          />
          <BottomNavigationAction
            label="Instagram"
            value="instagram"
            icon={<InstagramLogo size={isLargeScreen ? 32 : 24} />}
            style={{ color: 'white', minWidth: 'auto', padding: 0, margin: 0 }}
            onClick={() => handleLinkClick('https://www.instagram.com')}
          />
          <BottomNavigationAction
            label="Twitter"
            value="twitter"
            icon={<XLogo size={isLargeScreen ? 32 : 24} />}
            style={{ color: 'white', minWidth: 'auto', padding: 0, margin: 0 }}
            onClick={() => handleLinkClick('https://twitter.com')}
          />
          <BottomNavigationAction
            label="LinkedIn"
            value="linkedin"
            icon={<LinkedinLogo size={isLargeScreen ? 32 : 24} />}
            style={{ color: 'white', minWidth: 'auto', padding: 0, margin: 0 }}
            onClick={() => handleLinkClick('https://www.linkedin.com')}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: isLargeScreen ? 'right' : 'center', }}>
        <p style={{ color: 'white', padding: '0px', marginRight: '8px' }}>© 2024 Team5</p>
        </Box>
      </BottomNavigation>
    </Box>
  );
}
