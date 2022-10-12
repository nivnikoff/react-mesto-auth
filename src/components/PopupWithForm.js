import React from 'react';

function PopupWithForm(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container-form">
        <button 
          type="button" 
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form name={props.name} className="popup__form" onSubmit={props.onSubmit} noValidate>
          <fieldset className="popup__input">
            {props.children}
            <button 
              type="submit" 
              className="popup__submit-button"
              onClick={props.onClose}
            >{props.buttonText}</button>
          </fieldset>
        </form>
      </div>
      <div 
        className="popup__overlay"
        onClick={props.onClose}
      ></div>
    </section>
  )
}

export default PopupWithForm;