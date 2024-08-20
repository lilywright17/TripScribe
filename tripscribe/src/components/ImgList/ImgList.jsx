import React from "react";
import { ImageList, ImageListItem, Grid, Box } from "@mui/material";
import "./ImgList.css";


export const ImgList = () => {

    return (
        <>
        <Grid container
            justifyContent="center"
            alignItems="center"
            padding="20px"> 
        <Box sx={{ width: 500, height: "auto"}}>
        <p className="editPhotosTag">Edit your photos</p>
        <ImageList variant="masonry"
            cols={4}
            gap={8}
        >
            {
                itemData.map(item => (
                    <ImageListItem key={item.img}>
                        <img srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            alt={item.title}
                            loading='lazy' //images only load if needed
                        />
                    </ImageListItem>
                ))
            }
        </ImageList>
        </Box>
        </Grid>
        </>

    )
}

const itemData = [
      {
        img: 'https://images.unsplash.com/photo-1519262229618-980405fda403',
        title: 'St Pauls Cathedral',
      },    
      {
        img: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be',
        title: 'Tower Bridge',
      },
      {
        img: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383',
        title: 'Big Ben',
      },
      {
        img: 'https://images.unsplash.com/photo-1515508866870-7aa2a950a492',
        title: 'The Shard',
      },


    ];