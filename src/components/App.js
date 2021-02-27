import react, { useEffect, useState } from 'react';
import AppRouter from "components/Router";
import { authService } from "fbase";


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // it depends on the status of user's log in
      if(user){
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [])
  // setInterval(() => {
  //  console.log(authService.currentUser)
  // }, 2000)
  return (
  <>
  {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
  <footer>&copy; Switter {new Date().getFullYear()} </footer>
  </>
  )
}

export default App;
