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
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } 
      setInit(true);
    });
  }, []);
  // user's profile을 update하고 navigation에 바로 apply 하기 위해서 만듦.
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        updateProfile: (args) => user.updateProfile(args),
    });
  }
  // setInterval(() => {
  //  console.log(authService.currentUser)
  // }, 2000)
  return (
  <>
  {/* {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."} */}
  {init ? (
    <AppRouter 
      refreshUser={refreshUser}
      isLoggedIn={Boolean(userObj)} 
      userObj={userObj}   
    />
    ) : (
      "Initializing..."
    )}
  {/* <footer>&copy; Switter {new Date().getFullYear()} </footer> */}
  </>
  )
}

export default App;
