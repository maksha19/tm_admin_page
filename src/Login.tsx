import React, { useState } from 'react';

interface LoginInterface {
  loginHandler: Function
}

const Login: React.FC<LoginInterface> = ({ loginHandler }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState<string | null>();
  const [alert, setAlert] = useState<Boolean>(false);
  const [alertMessage, setAlertMessage] = useState('Please enter all field')

  const loginInfo: Record<number, { username: string, password: string }> = {
    83135769: {
      username: 'admin',
      password: 'admin'
    },
    90251126: {
      username: 'swarna',
      password: 'admin'
    },
    93809371: {
      username: 'suzanne',
      password: 'admin'
    },
    98924374: {
      username: 'hakim',
      password: 'admin'
    },
    82228512: {
      username: 'sharon',
      password: 'admin'
    },

  }
  const handleLogin = () => {
    // Add your login logic here
    if (!username || !password || !mobileNumber) {
      setAlert(true)
      clearAlret()
      return
    }
    const MN = parseInt(mobileNumber)
    const userInfo = loginInfo[MN]
    if (userInfo && userInfo.username === username && userInfo.password === password) {
      loginHandler(mobileNumber)
      console.log('Logging in with:', username, password, mobileNumber);
    }else{
      setTimeout(() => {
        setAlert(true)
        setAlertMessage("Please enter valid credentials")
        clearAlret()
      },0)
    }
  };

  const clearAlret = () => {
    setTimeout(() => {
      setAlert(false)
      setAlertMessage('Please enter all field')
    }, 1200)
  }

  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input
            type="text"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
          <input
            type="number"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            placeholder="Enter your mobile number"
            value={mobileNumber || ''}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        {alert && <div className="text-red-500">{alertMessage}</div>}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
          onClick={handleLogin} onKeyUp={handleKeyPress}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
