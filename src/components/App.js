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
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoToolTip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  // Состояния попапов
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false);
  // Состояния карточек и пользователя
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  // Переменная для хука useHistory
  const history = useHistory();
  // Получаем данные пользователя и карточки
  React.useEffect(() => {
    if (isLoggedIn) {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      })
    }}, [isLoggedIn])
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
    setInfoToolTipPopupOpen(false);
    setSelectedCard(null);
  }
  // Обработчики карточки
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleCardLike(card) {
    console.log(card);
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => {
          return (c._id === card._id ? newCard : c)
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.error(err);
      });
  }
  // Редактирование информации о пользователе
  function handleUpdateUser(userInfo) {
    api.editUserInfo(userInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  // Редактирование аватара пользователя
  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar)
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
  // Проверка наличия токена
  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.email);
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [history])
  // Обработка регистрации
  function handleRegister(email, password) {
    auth.register(email, password)
      .then((res) => {
        setIsSuccess(true);
        setInfoToolTipPopupOpen(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err.status);
        setIsSuccess(false);
        setInfoToolTipPopupOpen(true);
      })
  }
  // Обработка входа
  function handleLogin(email, password) {
    auth.login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        setEmail(email);
        history.push('/');
      })
      .catch((err) => {
        console.log(err.status);
      })
  }
  // Обработка выхода
  function handleSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    history.push('/sign-in');
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
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
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

        <InfoToolTip
          name="info" 
          isOpen={isInfoToolTipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
