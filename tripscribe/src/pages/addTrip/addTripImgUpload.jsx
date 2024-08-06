import "./addTrip.css";
import uploadIcon from './iconUpload.svg';
import React, { useState, useRef } from "react";

export const AddTripImgUpload = () => {
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null); 

    const selectFiles = () => {
        fileInputRef.current.click();
    };

    const onFileSelect = (event) => {
        const files = event.target.files;
        handleFiles(files);
      };
    
    const handleFiles = (files) => {
        const newImages = [];
        for (let i = 0; i < files.length; i++) {
        if (files[i].type.split('/')[0] !== 'image') continue;
        if (!images.some((e) => e.name === files[i].name)) {
            newImages.push({
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
            });
        }
        }
        if (newImages.length > 0) {
        setImages((prevImages) => [...prevImages, ...newImages]);
        }
    }; 

    const deleteImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const onDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "copy";
    };
    
      const onDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
    };
    
      const onDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        handleFiles(files);
    };
    
    const uploadImages = () => {
        console.log('Images: ', images);
    };

    return (
        <>
           <div className='cardImgUpload'>
            <div className='dragArea' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                {isDragging ? (
                    <span className='selectImg'>Drop images here</span>
                ) : (
                <>
                <div className='iconArea'>
                    <img src={uploadIcon} alt="Upload Icon"/>
                </div>
                <br/>
                      Drag & Drop image(s) here or {" "}
                    <span className='selectImg' role='button' onClick={selectFiles}>
                      Browse  
                    </span> 
                </>
                )}
                <input name='file' 
                type='file' 
                className='fileImg' 
                multiple 
                ref={fileInputRef} 
                onChange={onFileSelect}   
                />
            </div>
            <div className='containerImg'>
                {images.map((images,index) =>(
                <div className='image' key={index}>
                    <span className='deleteImg' onClick={() => deleteImage(index)}>&times;</span>
                    <img src={images.url} alt={images.name}/>
                </div>
                ))}

                
            </div>
            <button type='button' onClick={uploadImages}>
                Upload image(s)
            </button>
           </div> 
        </>
    );
}