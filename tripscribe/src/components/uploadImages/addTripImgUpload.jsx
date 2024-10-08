import React, { useState, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { UploadSimple } from '@phosphor-icons/react';
import './addTripImgUpload.css';

export const AddTripImgUpload = ({ images, setImages }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0); 
    const [isUploading, setIsUploading] = useState(false); 
    const fileInputRef = useRef(null); 

    const selectFiles = () => {
        fileInputRef.current.click();
    };

    const onFileSelect = async (event) => {
        const files = event.target.files;
        await handleFiles(files);
    };

    const getUserIdFromToken = () => {
        const token = sessionStorage.getItem('token');

        if (!token) return null;

        try {
            const decoded = jwtDecode(token);
            return decoded.userID;  
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    const handleFiles = async (files) => {
        if (images.length + files.length > 4) {
            setError('You can only upload up to 4 images.');
            return;
        }

        const token = sessionStorage.getItem('token'); 
        if (!token) {
            setError('Authentication token is missing. Please log in again.');
            return;
        }

        const userID = getUserIdFromToken(); 

        if (!userID) {
            setError('Unable to retrieve user information. Please log in again.');
            return;
        }

        setIsUploading(true);
        setUploadProgress(0); 

        const uploadPromises = Array.from(files).map(async (file, index) => {
            const compressedFile = await compressImage(file);
            const { fileType, base64 } = await processFile(compressedFile);
            if (!fileType || !base64) return;

            const uploadedImage = await uploadImage(base64, token, userID, file.name);

            setUploadProgress(((index + 1) / files.length) * 100);

            return uploadedImage;
        });

        try {
            const uploadedImages = await Promise.all(uploadPromises);
            const successfulUploads = uploadedImages.filter(Boolean);
            setImages((prevImages) => [...prevImages, ...successfulUploads]);
            setError("");
        } catch (error) {
            console.error('Error uploading images:', error);
            setError("Error uploading images. Please try again.");
        } finally {
            setIsUploading(false); 
        }
    };

    const compressImage = async (file) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920, 
            useWebWorker: true,
        };
        try {
            const compressedFile = await imageCompression(file, options);
            return compressedFile;
        } catch (error) {
            console.error('Error compressing the image', error);
            setError('Error compressing the image. Please try again.');
            throw error;
        }
    };    

    const processFile = async (file) => {
        const fileType = file.type.split('/')[1].toLowerCase();
        const fileSize = file.size / 1024 / 1024; 

        if (!['jpeg', 'png'].includes(fileType)) {
            setError('Only JPEG and PNG formats are allowed.');
            return {};
        }

        if (fileSize > 10) {
            setError('Each image must be less than 10MB.');
            return {};
        }

        try {
            const base64 = await convertToBase64(file);
            return { fileType, base64 };
        } catch (error) {
            console.error('Error converting file to base64:', error);
            return {};
        }
    };

    const uploadImage = async (base64, token, userID, fileName) => {
        try {
            const response = await axios.post('http://localhost:8000/api/uploadImages', 
                { images: [base64], userID },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    }
                }
            );
            const secureUrl = response.data.urls[0];
            if (secureUrl) {
                return { name: fileName, url: secureUrl };
            }
        } catch (err) {
            console.error('Error uploading image:', err);
            setError('Error uploading image. Please try again.');
            return null;
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                resolve(reader.result);
            };

            reader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const deleteImage = (index) => {
        setImages((prevImages) => {
            return prevImages.filter((_, i) => i !== index);
        });
    };

    const onDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = 'copy';
    };

    const onDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const onDrop = async (event) => {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        await handleFiles(files);
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

            {isUploading && (
                <Box sx={{ width: '100%', mt: 2 }}>
                    <LinearProgress variant="determinate" value={uploadProgress} />
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        {Math.round(uploadProgress)}%
                    </div>
                </Box>
            )} 

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