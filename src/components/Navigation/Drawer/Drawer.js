import React from 'react';
import classes from './Drawer.css';
import { NavLink } from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop';

const Drawer = (props) => {
  const clickHandler = () => {
    props.onClose();
  };

  function renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            end={link.end}
            className={({ isActive }) => (isActive ? classes.active : '')}
            onClick={clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  const cls = [classes.Drawer];

  if (!props.isOpen) {
    cls.push(classes.close);
  }

  const links = [{ to: '/', label: 'Список', end: true }];

  if (props.isAuthenticated) {
    links.push({ to: '/quiz-creator', label: 'Создать тест', end: false });
    links.push({ to: '/logout', label: 'Выйти', end: false });
  } else {
    links.push({ to: '/auth', label: 'Авторизация', end: false });
  }

  return (
    <React.Fragment>
      <nav className={cls.join(' ')}>
        <ul>{renderLinks(links)}</ul>
      </nav>
      {props.isOpen ? <Backdrop onClick={props.onClose} /> : null}
    </React.Fragment>
  );
};

export default Drawer;
