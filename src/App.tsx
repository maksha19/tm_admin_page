import React, { useState } from 'react';
import Login from './Login';
import Home from './Home';

const App = () => {

  const [mobileNumber, setMobileNumber] = useState<string | null>(null)

  const loginHandler = (mobileNumber: string) => {
    setMobileNumber(mobileNumber)
  }

  const logoutHandler= () => {
    setMobileNumber(null)
  }
  return (
    <div className="App">
      {
        mobileNumber === null ? <Login loginHandler={loginHandler} /> : <Home mobileNumber={mobileNumber} logoutHandler={logoutHandler} />
      }
    </div>
  );
}

export default App;
