import logo from '../images/logo.svg';
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Место" className="header__logo" />
      <Switch>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">Войти</Link>
        </Route>
        <Route exact path="/">
          <div className="header__info">
            <p className="header__email">{props.email}</p>
            <Link to="/sign-in" className="header__sign-out" onClick={props.onSignOut}>Выйти</Link>
          </div>    
        </Route>
      </Switch>
    </header>
  );
}

export default Header;