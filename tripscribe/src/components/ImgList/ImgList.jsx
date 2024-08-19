import React, { lazy, useState } from "react";
import { ImageList, ImageListItem, Grid, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./ImgList.css";


export const ImgList = () => {

    return (
        <>
        <Grid container
            justifyContent="center"
            alighItems="center"
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
        img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
        title: 'Bed',
      },
      {
        img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
        title: 'Books',
      },
      {
        img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
        title: 'Sink',
      },
      {
        img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
        title: 'Kitchen',
      }

    ];