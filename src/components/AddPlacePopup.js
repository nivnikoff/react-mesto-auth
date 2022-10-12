import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [place, setPlace] = React.useState('');
  const [link, setLink] = React.useState('');

  function handlePlaceChange(e) {
    setPlace(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onAddPlace({
      name: place,
      link: link,
    });
    
    setPlace('');
    setLink('');
  }

return (
  <PopupWithForm
    name="add"
    title="Новое место"
    buttonText="Создать"
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}>
    <input 
      name="name" 
      type="text" 
      placeholder="Название" 
      id="element-place" 
      className="popup__input-text popup__input-text_type_place" 
      minLength="2" 
      maxLength="30" 
      required 
      onChange={handlePlaceChange} 
      value={place}
    />
    <span 
      id="element-place-error" 
      className="popup__error"
    ></span>
    <input 
      name="link" 
      type="url" 
      placeholder="Ссылка на картинку" 
      id="element-link" 
      className="popup__input-text popup__input-text_type_link" 
      required 
      onChange={handleLinkChange} 
      value={link}
    />
    <span 
      id="element-link-error" 
      className="popup__error"
    ></span>
  </PopupWithForm>
)

}

export default AddPlacePopup;