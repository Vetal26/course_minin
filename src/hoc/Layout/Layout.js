import React, { useState } from 'react';
import classes from './Layout.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import { connect } from 'react-redux';

const Layout = ({ children, isAuthenticated }) => {
  const [menu, setMenu] = useState(false);

  const toggleMenuHandler = () => {
    setMenu((prev) => !prev);
  };

  const menuCloseHandler = () => {
    setMenu(false);
  };

  return (
    <div className={classes.Layout}>
      <Drawer
        isOpen={menu}
        onClose={menuCloseHandler}
        isAuthenticated={isAuthenticated}
      />
      <MenuToggle onToggle={toggleMenuHandler} isOpen={menu} />
      <main>{children}</main>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

export default connect(mapStateToProps)(Layout);
