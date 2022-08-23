import React, { useEffect, useState } from 'react';
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
        });
      }else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, [])
  const refreshUser = () => {
    const user = authService.currentUser;
    user && setUserObj({
      displayName: user.displayName,
      uid: user.uid,
    });
  };
  
  return (
    <>
      {init ? (
      <AppRouter 
        isLoggedIn={isLoggedIn} // Boolean(userObj)
        userObj={userObj}
        refreshUser={refreshUser}
        />
      ): "Initializing..."}
    </>
  );
}

export default App;
