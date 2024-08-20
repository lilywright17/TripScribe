import React, { lazy, useState } from "react";
import { ImageList, ImageListItem, Grid, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
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
        img: 'https://images.unsplash.com/photo-1519262229618-980405fda403?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'St Pauls Cathedral',
      },    
      {
        img: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Tower Bridge',
      },
      {
        img: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Big Ben',
      },
      {
        img: 'https://images.unsplash.com/photo-1515508866870-7aa2a950a492?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'The Shard',
      },


    ];