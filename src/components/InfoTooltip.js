import React from 'react';
import Success from '../images/success.svg';
import Fail from '../images/fail.svg';

function InfoToolTip(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container-info">
        <button 
          type="button" 
          className="popup__close-button"
          onClick={props.onClose}
        ></button>

        {props.isSuccess ? (
          <>
            <img
              src={`${Success}`}
              alt="Регистрация прошла успешно."
              className="popup__icon"
            />
            <p className="popup__message">Вы успешно зарегистрировались!</p>
          </>
        ) : (
          <>
            <img
              src={`${Fail}`}
              alt="Регистрация не была выполнена."
              className="popup__icon"
            />
            <p className="popup__message">Что-то пошло не так. Попробуйте ещё раз!</p>
          </>
        )}

      </div>
      <div 
        className="popup__overlay"
        onClick={props.onClose}
      ></div>
    </section>
  )
}

export default InfoToolTip;