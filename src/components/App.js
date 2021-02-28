import { useEffect, useState } from 'react';
import AppRouter from "components/Router";
import { authService } from "fbase";


function App() {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // it depends on the status of user's log in
      if (user) {
      //  setIsLoggedIn(true);
        setUserObj(user);
      } else {
      //  setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [])
  // setInterval(() => {
  //  console.log(authService.currentUser)
  // }, 2000)
  return (
  <>
  {/* {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."} */}
  {init ? (
    <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
    ) : (
      "Initializing..."
    )}
  {/* <footer>&copy; Switter {new Date().getFullYear()} </footer> */}
  </>
  )
}

export default App;
