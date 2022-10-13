import React, {useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';

function App() {
  // Состояния попапов
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  // Состояния карточек и пользователя
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  // Получаем данные пользователя и карточки
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])
  // Открытие и закрытие попапов
  function handleEditProfilePopupOpen() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlacePopupOpen() {
    setAddPlacePopupOpen(true);
  }
  function handleEditAvatarPopupOpen() {
    setEditAvatarPopupOpen(true);
  }
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }
  // Обработчики карточки
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.error(err);
      });
  }
  // Редактирование информации о пользователе
  function handleUpdateUser(data) {
    api.editUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  // Редактирование аватара пользователя
  function handleUpdateAvatar(data) {
    api.editAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  // Добавление новой карточки
  function handleAddPlace(data) {
    api.newCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  // Обработка регистрации
  function handleRegister() {

  }
  // Обработка входа
  function handleLogin() {

  }
  // Обработка выхода
  function handleSignOut() {

  }
  // Разметка страницы
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header email={email} onSignOut={handleSignOut} />

        <Switch>

          <ProtectedRoute
            exact path="/"
            isLoggedIn={isLoggedIn}
            component={Main}
            onEditProfile={handleEditProfilePopupOpen}
            onAddPlace={handleAddPlacePopupOpen}
            onEditAvatar={handleEditAvatarPopupOpen} 
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route exact path="/">
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>

        </Switch>

        {isLoggedIn && <Footer />}

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          buttonText="Да"
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
