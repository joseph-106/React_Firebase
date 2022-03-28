import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false); // 로딩 상태
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    // 사용자 정보 변화 감지
    authService.onAuthStateChanged((user) => {
      user ? setUserObj(user) : setUserObj(null);
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Loading..."
      )}
      <footer>&copy; {new Date().getFullYear()} Firebase</footer>
    </>
  );
}

export default App;
