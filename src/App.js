import React from 'react';
import './App.css';
import RoutesApp from './utils/routes'
import { AuthContextProvider } from './contexts/authContext';


function App() {
  // if(window.location.pathname === '/') {
  //   window.location.href = window.location.origin + "/login"
  // }

  return (
    <>
      <AuthContextProvider>
        <RoutesApp />
      </AuthContextProvider>
    </>
  );
}

export default App;
