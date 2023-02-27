import React from 'react'
import styles from './Modal.module.css'

function Modal({content, closeModal}) {

    return (
        <div className={styles.bg}>
            <div className={styles.modal}>
                <div className={styles.close} onClick={closeModal}>
                    <i class="ri-close-line"></i>
                </div>
                <div className={styles.contInfo}>
                    {content}
                </div>
            </div>
        </div>
       
    )
 }

 
export default Modal