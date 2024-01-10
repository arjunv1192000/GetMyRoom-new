import React, { useState } from 'react';
import Header from "./Header"
import LoginModal from './Modals/LoginModal';



const Layout = ({ children }) => {

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };




  return (
    <div>
      <Header openLoginModal={openLoginModal} />
      {React.Children.map(children, child => {
        return React.cloneElement(child, { openLoginModal });
      })}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  )
}

export default Layout