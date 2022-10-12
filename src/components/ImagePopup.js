import React from 'react';

function ImagePopup({card, onClose}) {
  return (
    <section className={`popup popup_type_img ${card ? 'popup_opened' : ''}`}>
      <div className="popup__container-img">
        <button 
          type="button" 
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <img className="popup__image" 
          src={card?.link}
          alt={card?.name}
        />
        <h2 className="popup__place">{card?.name}</h2>
      </div>
      <div 
        className="popup__overlay popup__overlay_type_img"
        onClick={onClose}
      ></div>
    </section>
  )
}

export default ImagePopup;