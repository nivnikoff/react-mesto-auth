import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const ref = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: ref.current.value,
    });
    ref.current.value = '';
  }

return (
  <PopupWithForm
    name="avatar"
    title="Обновить аватар"
    buttonText="Сохранить"
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
  >
    <input 
      name="avatar" 
      type="url" 
      placeholder="Ссылка на аватар" 
      id="element-avatar" 
      className="popup__input-text popup__input-text_type_avatar" 
      required 
      ref={ref}
    />
    <span 
      id="element-avatar-error" 
      className="popup__error"
    ></span>
  </PopupWithForm>
)
}

export default EditAvatarPopup;