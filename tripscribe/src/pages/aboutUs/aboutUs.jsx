import React from "react";
import linkedInLogo from './linkedInLogo.png';
import githubLogo from './githubLogo.png';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import './aboutUs.css';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const usData = [
    {
        id:1,
        firstName: "Precious",
        lastName: "Joveres",
        info: "Hey, I'm Precious from Littlehampton, UK. When I was younger I was able to road-trip around the US and Europe, as well as visit Hong Kong and the Philippines, my home country. Now that I'm older, I'm hoping to collect a tattoo from every country I visit!",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sample_User_Icon.png/100px-Sample_User_Icon.png",
        emoji: "🤠",
        linkedInUrl: "https://www.linkedin.com/in/precious-joveres-2965a1231/",
        githubUrl: "https://github.com/atepem"
    },
    {
        id:2,
        firstName: "Krystal",
        lastName: "Lake",
        info: "Hi, I'm Krystal. I love traveling because it lets me experience different cultures and meet new people. Exploring new places, whether it's nature or historic sites, broadens my perspective and adds excitement to my life. Traveling offers both adventure and relaxation, helping me grow personally and appreciate the world’s beauty.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sample_User_Icon.png/100px-Sample_User_Icon.png",
        emoji: "💎",
        linkedInUrl: "https://www.linkedin.com/in/krystal-lake/",
        githubUrl: "https://github.com/klake10"
    },
    {
        id:3,
        firstName: "Mediha",
        lastName: "Mustafova",
        info: "Hi, I'm Mediha. I recently escaped the busy life of London and moved to Essex. Growing up in the countryside, I love spending time in nature, having picnics, and gardening. When I travel I never miss an opportunity to visit the local botanical garden, try the local cuisine and gather cooking inspirations.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sample_User_Icon.png/100px-Sample_User_Icon.png",
        emoji: "🐣",
        linkedInUrl: "https://www.linkedin.com/in/mediha-mustafova-0a803296/",
        githubUrl: "https://github.com/MedihaMustafova"
    },
    {
        id:4,
        firstName: "Victoria",
        lastName: "Proaño",
        info: "¡Hola mundo! I live in Madrid with my beloved dog, Llum. I enjoy traveling, discovering new cuisines, and meeting diverse cultures. I prefer the countryside for its nature and fresh air, but if I am visiting a city, I love exploring its museums and libraries.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sample_User_Icon.png/100px-Sample_User_Icon.png",
        emoji: "🎃",
        linkedInUrl: "https://www.linkedin.com/in/victoriapbravo",
        githubUrl: "https://github.com/th4lesvic"
    },
    {
        id:5,
        firstName: "Marta",
        lastName: "Walters",
        info: "Hi, I'm Marta. I live in London with my two kids and a husband. I’ve always loved travelling and having kids didn’t stop me from exploring the world. When my daughter was one we went on a sabbatical to South America! I love learning about new cultures, tasting local dishes and observing the flora and fauna.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sample_User_Icon.png/100px-Sample_User_Icon.png",
        emoji: "🐙",
        linkedInUrl: "https://www.linkedin.com/in/marta-walters-692268296/",
        githubUrl: "https://github.com/MartaWCodes"
    },
    {
        id:6,
        firstName: "Katie",
        lastName: "Williams",
        info: "Hi, I'm Katie! I live in the a quiet little town in the North West of England! I love to travel, bake and decorate my house with my latest lego builds! I can often be found out on a walk in the countryside with friends or curled up on the sofa with a good book!",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sample_User_Icon.png/100px-Sample_User_Icon.png",
        emoji: "🧁",
        linkedInUrl: "https://www.linkedin.com/in/katie-williams-b9652946/",
        githubUrl: "https://github.com/Katie-W-22"
    },
    {
        id:7,
        firstName: "Lily",
        lastName: "Wright",
        info: "Hi I'm Lily, I live in Manchester with my 2 cats Dotty and Teddy. I love travelling and experiencing new cultures, and have spent time backpacking around Europe and Asia, as well as living in Australia for 3 years. When I'm not working or travelling, I enjoy knitting, reading, eating out with friends, and yoga.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sample_User_Icon.png/100px-Sample_User_Icon.png",
        emoji: "🌸",
        linkedInUrl: "https://www.linkedin.com/in/lily-wright-893283104/",
        githubUrl: "https://github.com/lilywright17"
    }
];

export const AboutUs = () => {
  return (
    <>
      <div className="aboutUs">
        <h1 className="aboutUsTitle">About Us</h1>
        <h2>Welcome to TRIPSCRIBE - Your new travel diary app! </h2>
        <p className="aboutUsText">
          <p>The Tripscribe application is designed to provide users with a personalised and organised way to 
          document and visualise their travel experiences.
          </p>
          <p>To access the app's features, users must first register and log in. 
          The application includes several key features that allow users to manage their travel records effectively:
          </p>
          <ul>
            <li>Trip Management -  The app allows users to view, edit, and delete their trips, 
                making it easy to manage their travel history!
            </li>
            <li>Map View - provides a visual representation of all the locations users have visited.
            </li>
            <li>User Profile - view your profile details, including their name and email address.
            </li>
          </ul>
          <br></br>
          <p>Here's a little info about each member of our development team!
          </p>
        </p>
      </div>
    <Box 
        sx={{ flexGrow: 1 }} 
        className="aboutUsContainer"
    >
        <Grid 
        container spacing={6} 
        alignItems="stretch"
        >
        {usData.map((user) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                <Item className="userCard">
                    <img
                        className="teamMemberImage"
                        src={user.imageUrl}
                        alt={`photo of ${user.firstName}`}
                    />
                    <h2>{user.emoji} {user.firstName}</h2>
                    <h3>{user.lastName}</h3>
                    <p>{user.info}</p>
                    <div className="socialsContainer">
                        <a 
                            href={user.linkedInUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <img 
                                className="linkedInIcon" 
                                src={linkedInLogo} 
                                alt="LinkedIn" 
                            />
                        </a>
                        <a 
                            href={user.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <img 
                            className="githubIcon" 
                            src={githubLogo} 
                            alt="GitHub" 
                        />
                        </a>
                    </div>
                </Item>
            </Grid>
        ))}
        </Grid>
    </Box>
    </>
  );
};
