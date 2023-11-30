import React, { useEffect, useState } from 'react';
import styles from './ImgUploader.module.css';
import placeholder from '../../assets/image/download.png';
import { useLocation } from 'react-router-dom';

const ImageUploader = ({uploadPhoto, photo, cleanImageInput, setCleanImageInput, disabled}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ableToChangePhoto, setAbleToChangePhoto] = useState(true);
  const [file, setFile] = useState(null);
  const location = useLocation();

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setSelectedImage(imageUrl);
      setFile(imageFile)
    }
  };

  useEffect(() => {
    if (file !== null) {
      uploadPhoto({target:{value:file , name:"imgProfile"}})
    }
  }, [file])
  
  useEffect(() => {
    if (photo && typeof photo === 'string') {
      setSelectedImage(photo);
    }
  }, [photo])
  
  useEffect(() => {
    if(location.pathname !== '/crear-cuenta') setAbleToChangePhoto(!disabled)
  },[disabled])
  
  useEffect(() => {
    if(cleanImageInput){
      const fileInput = document.getElementById('image-input');
      fileInput.value = null;
      setSelectedImage(null);
      setFile(null);
      setCleanImageInput(false);
    }
  },[cleanImageInput])

  return (
    <div className={styles.imageUploader}>
      <label htmlFor="image-input" className={styles.imageInputLabel} style={{cursor: ableToChangePhoto ? 'pointer' : 'default'}} >
        {/* Mostrar la previsualización de la imagen */}
        {selectedImage ? (
          <div className={styles.imagePreview}>
            <img src={selectedImage} className={styles.image} alt="Preview" />
          </div>
        ) : (
            <div className={styles.imgContainerPlaceholer}>
            <img src={placeholder} className={styles.imagePlaceholder} alt='' />
          </div>
        )}

        {/* Input oculto para seleccionar la imagen */}
        {
          ableToChangePhoto && 
          <input
            type="file"
            id="image-input"
            accept="image/*"
            onChange={handleImageChange}
          />
        }
        
      </label>
    </div>
  );
};

export default ImageUploader;
