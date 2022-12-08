import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (`element__delete-button ${isOwn ? 'element__delete-button_active' : ''}`);

  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (`element__like-button ${isLiked ? 'element__like-button_active' : ''}`);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="element">
      <img 
        className="element__pic"
        alt={props.card.name}
        src={props.card.link}
        onClick={handleClick}
      />
      <button 
        type="button" 
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="element__info">
        <h2 className="element__place">{props.card.name}</h2>
        <div className="element__like-box">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;