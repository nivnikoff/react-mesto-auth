import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <section className="sign">
      <h2 className="sign__title">Регистрация</h2>
      <form className="sign__form" onSubmit={handleSubmit}>
        <input
          name="email" 
          type="email" 
          placeholder="Email" 
          value={email} 
          className="sign__input" 
          required 
          onChange={handleEmailChange} 
        />
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          className="sign__input"
          required
          onChange={handlePasswordChange} 
        />
        <button className="sign__submit-button" type="submit">Зарегистрироваться</button>
      </form>

      <div className="sign__signup">
        <p className="sign__signup-text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="sign__signup-link">Войти</Link>
      </div>
    </section>
  );
}

export default Register;