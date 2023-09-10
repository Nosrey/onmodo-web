import React, { useState } from 'react';
import styles from './ImgUploader.module.css';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div className={styles.imageUploader}>
      <label htmlFor="image-input" className={styles.imageInputLabel} >
        {/* Mostrar la previsualización de la imagen */}
        {selectedImage ? (
          <div className={styles.imagePreview}>
            <img src={selectedImage} alt="Preview" />
          </div>
        ) : (
          <div className={styles.imagePlaceholder}>Selecciona una imagen</div>
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
