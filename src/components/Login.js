import React from 'react';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <section className="sign">
      <h2 className="sign__title">Вход</h2>
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
        <button className="sign__submit-button" type="button">Войти</button>
      </form>
    </section>
  );
}

export default Login;