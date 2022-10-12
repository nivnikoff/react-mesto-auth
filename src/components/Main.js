import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">

    <section className="profile">
      <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
      <div 
        className="profile__avatar-edit"
        onClick={props.onEditAvatar}
      ></div>
      <div className="profile__info">
        <h1 className="profile__name">{currentUser.name}</h1>
        <button 
          type="button" 
          className="profile__edit-button"
          onClick={props.onEditProfile}
        ></button>
        <p className="profile__description">{currentUser.about}</p>
      </div>
      <button 
        type="button" 
        className="profile__add-button"
        onClick={props.onAddPlace}
      ></button>
    </section>

    <section className="elements">
      {props.cards.map(card =>
        <Card
          key={card._id}
          card={card}
          onCardClick={props.onCardClick}
          onCardLike={props.onCardLike}
          onCardDelete={props.onCardDelete}
        />
      )}
    </section>

    </main>
  );
}

export default Main;