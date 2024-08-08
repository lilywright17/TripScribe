import React, { useState, useRef } from "react";
import { UploadSimple } from '@phosphor-icons/react';
import "./addTrip.css";

export const AddTripImgUpload = ({ images, setImages }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState("");
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
        let errorMessage = "";

        if (images.length + files.length > 4) {
            setError("You can only upload up to 4 images.");
            return;
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileType = file.type.split('/')[1].toLowerCase();
            const fileSize = file.size / 1024 / 1024; // size in MB

            if (!['jpeg', 'png'].includes(fileType)) {
                errorMessage = "Only JPEG and PNG formats are allowed.";
                continue;
            }

            if (fileSize > 10) {
                errorMessage = "Each image must be less than 10MB.";
                continue;
            }

            if (!images.some((e) => e.name === file.name)) {
                newImages.push({
                    name: file.name,
                    url: URL.createObjectURL(file),
                });
            }
        }

        if (newImages.length > 0) {
            setImages((prevImages) => [...prevImages, ...newImages]);
            setError(""); // Clear any previous errors
        } else {
            setError(errorMessage);
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

    return (
        <div className='cardImgUpload'>
            <div className='dragArea' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                {isDragging ? (
                    <span className='selectImg'>Drop images here</span>
                ) : (
                    <>
                        <div className='iconArea'>
                            <UploadSimple size={32} weight='bold' />
                        </div>
                        <br/>
                        Drag & Drop image(s) here or {" "}
                        <span className='selectImg' role='button' onClick={selectFiles}>
                            Browse  
                        </span> 
                    </>
                )}
                <input 
                    name='file' 
                    type='file' 
                    className='fileImg' 
                    multiple 
                    ref={fileInputRef} 
                    onChange={onFileSelect}   
                />
            </div>
            {error && <div className="error">{error}</div>}
            <div className='containerImg'>
                {images && images.map((image, index) => (
                    <div className='image' key={index}>
                        <span className='deleteImg' onClick={() => deleteImage(index)}>&times;</span>
                        <img src={image.url} alt={image.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};
