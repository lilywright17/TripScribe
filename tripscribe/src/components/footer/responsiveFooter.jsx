import * as React from 'react';
import { useNavigate } from 'react-router-dom'; 
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import InfoIcon from '@mui/icons-material/Info';
import { FacebookLogo, XLogo, LinkedinLogo, InstagramLogo } from '@phosphor-icons/react';
import { Box } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';

export default function ResponsiveFooter() {
  const [value, setValue] = React.useState('about');
  const navigate = useNavigate();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md')); 

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 'about':
        navigate('/aboutus'); 
        break;
      case 'facebook':
        window.location.href = 'https://www.facebook.com'; 
        break;
      case 'instagram':
        window.location.href = 'https://www.instagram.com'; 
        break;
      case 'twitter':
        window.location.href = 'https://twitter.com'; 
        break;
      case 'linkedin':
        window.location.href = 'https://www.linkedin.com'; 
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}> 
      <BottomNavigation
        sx={{ width: '100%' }} 
        value={value}
        onChange={handleChange}
        style={{ backgroundColor: '#476a6f' }}  
      >
        <BottomNavigationAction
          label="About Us"
          value="about"
          icon={<InfoIcon fontSize={isLargeScreen ? 'medium' : 'small'} />} 
          style={{ color: 'white' }}
        />
        <BottomNavigationAction
          label="Facebook"
          value="facebook"
          icon={<FacebookLogo size={isLargeScreen ? 32 : 24} />} 
          style={{ color: 'white' }}
        />
        <BottomNavigationAction
          label="Instagram"
          value="instagram"
          icon={<InstagramLogo size={isLargeScreen ? 32 : 24} />} 
          style={{ color: 'white' }}
        />
        <BottomNavigationAction
          label="Twitter"
          value="twitter"
          icon={<XLogo size={isLargeScreen ? 32 : 24} />} 
          style={{ color: 'white' }}
        />
        <BottomNavigationAction
          label="LinkedIn"
          value="linkedin"
          icon={<LinkedinLogo size={isLargeScreen ? 32 : 24} />} 
          style={{ color: 'white' }}
        />
        <p style={{ color: 'white' }}>© 2024 Team-5</p>

      </BottomNavigation>
      
    </Box>
  );
}
