import React, { useEffect, useState } from 'react';
import styles from './ImgUploader.module.css';
import placeholder from '../../assets/image/download.png';

const ImageUploader = ({uploadPhoto}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const [file, setFile] = useState(null);

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
  

  return (
    <div className={styles.imageUploader}>
      <label htmlFor="image-input" className={styles.imageInputLabel} >
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
        <input
          type="file"
          id="image-input"
          accept="image/*"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
