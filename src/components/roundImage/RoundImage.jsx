import React, { useState } from 'react';
import styles from './RoundImage.module.css';

const RoundImage = ({ onImageChange }) => {
  const [imageSrc, setImageSrc] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageSrc(e.target.result);
      onImageChange(file);
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageSrc(e.target.result);
      onImageChange(file);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.roundImage} onDragOver={handleDragOver} onDrop={handleDrop}>
      {imageSrc ? (
        <img className={styles.image} src={imageSrc} alt='User' />
      ) : (
        <label htmlFor='upload' className={styles.uploadLabel}>
          Cargar imagen
          <input id='upload' type='file' accept='image/*' onChange={handleImageChange} />
        </label>
      )}
    </div>
  );
};

export default RoundImage;
