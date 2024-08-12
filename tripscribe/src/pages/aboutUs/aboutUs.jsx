import React from "react";
import './aboutUs.css';
import linkedInLogo from './linkedInLogo.png';
import githubLogo from './githubLogo.png';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

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
        emoji: "🤠"
    },
    {
        id:2,
        firstName: "Krystal",
        lastName: "Lake",
        info: "Hi, I'm Krystal. I love traveling because it lets me experience different cultures and meet new people. Exploring new places, whether it's nature or historic sites, broadens my perspective and adds excitement to my life. Traveling offers both adventure and relaxation, helping me grow personally and appreciate the world’s beauty.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sample_User_Icon.png/100px-Sample_User_Icon.png",
        emoji: "💎"
    },
    {
        id:3,
        firstName: "Mediha",
        lastName: "Mustafova",
        info: "Hi, I'm Mediha. I recently escaped the busy life of London and moved to Essex. Growing up in the countryside, I love spending time in nature, having picnics, and gardening. When I travel I never miss an opportunity to visit the local botanical garden, try the local cuisine and gather cooking inspirations.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sample_User_Icon.png/100px-Sample_User_Icon.png",
        emoji: "🐣"
    },
    {
        id:4,
        firstName: "Victoria",
        lastName: "Proano",
        info: "¡Hola mundo! I live in Madrid with my beloved dog, Llum. I enjoy traveling, discovering new cuisines, and meeting diverse cultures. I prefer the countryside for its nature and fresh air, but if I am visiting a city, I love exploring its museums and libraries.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sample_User_Icon.png/100px-Sample_User_Icon.png",
        emoji: "🎃"
    },
    {
        id:5,
        firstName: "Marta",
        lastName: "Walters",
        info: "Hi, I'm Marta. I live in London with my two kids and a husband. I’ve always loved travelling and having kids didn’t stop me from exploring the world. When my daughter was one we went on a sabbatical to South America! I love learning about new cultures, tasting local dishes and observing the flora and fauna.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sample_User_Icon.png/100px-Sample_User_Icon.png",
        emoji: "🐙"
    },
    {
        id:6,
        firstName: "Katie",
        lastName: "Williams",
        info: "Hi, I'm Katie! I live in the a quiet little town in the North West of England! I love to travel, bake and decorate my house with my latest lego builds! I can often be found out on a walk in the countryside with friends or curled up on the sofa with a good book!",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sample_User_Icon.png/100px-Sample_User_Icon.png",
        emoji: "🧁"
    },
    {
        id:7,
        firstName: "Lily",
        lastName: "Wright",
        info: "Hi I'm Lily, I live in Manchester with my 2 cats Dotty and Teddy. I love travelling and experiencing new cultures, and have spent time backpacking around Europe and Asia, as well as living in Australia for 3 years. When I'm not working or travelling, I enjoy knitting, reading, eating out with friends, and yoga.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sample_User_Icon.png/100px-Sample_User_Icon.png",
        emoji: "🌸"
    }
];

export const AboutUs = () => {
  return (
    <>
      <div className="aboutUs">
        <h1 className="aboutUsTitle">About Us</h1>
        <p className="aboutUsText">
          Welcome to TripScribe, your go-to travel diary app! Here's a little info about each member of our team!
        </p>
      </div>
      <Box sx={{ flexGrow: 1 }} className="aboutUsContainer">
      <Grid container spacing={8} alignItems="stretch">
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
                    <img className="linkedInIcon" src={linkedInLogo} alt="LinkedIn" />
                    <img className="githubIcon" src={githubLogo} alt="GitHub" />
                </div>
            </Item>
        </Grid>
    ))}
</Grid>

    </Box>
    </>
  );
};
