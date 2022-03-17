import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // 사용자 정보 변화 감지
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {/* 사용자 정보 로딩 UI */}
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Loading..."}
      <footer>&copy; {new Date().getFullYear()} Firebase</footer>
    </>
  );
}

export default App;
