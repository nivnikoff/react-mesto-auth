import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

return (
  <PopupWithForm
    name="edit"
    title="Редактировать профиль"
    buttonText="Сохранить"
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
  >
    <input 
      name="name" 
      type="text" 
      placeholder='Имя' 
      value={name} 
      id="profile-name" 
      className="popup__input-text popup__input-text_type_name" 
      minLength="2" 
      maxLength="40" 
      required 
      onChange={handleNameChange}
    />
    <span 
      id="profile-name-error" 
      className="popup__error"
    ></span>
    <input 
      name="about" 
      type="text" 
      placeholder='Деятельность' 
      value={description} 
      id="profile-description" 
      className="popup__input-text popup__input-text_type_description" 
      minLength="2" 
      maxLength="200" 
      required 
      onChange={handleDescriptionChange}
    />
    <span 
      id="profile-description-error" 
      className="popup__error"
    ></span>
  </PopupWithForm>
)
}

export default EditProfilePopup;