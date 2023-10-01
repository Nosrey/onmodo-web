import React from 'react';
import styles from './Alert.module.css';


function Alert(props) {
  const notificationClass = props.type === "success" ? styles.notificationGreen : styles.notificationRed;
  return (
    <div className={notificationClass}>
      <p className={styles.textAlert}>{props.text}</p>
    </div>
  );
}

export default Alert;
