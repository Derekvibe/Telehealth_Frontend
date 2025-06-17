import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeIndex from './pages/Home/HomeIndex';
import Hero from './pages/Home/Hero';

//Authentication Section

import NewUser from './pages/Auth/Join/NewUser';
import Login from './pages/Auth/login/Login'
import ForgotPass from './pages/Auth/login/ForgotPass';
import VerifyAcct from './pages/Auth/login/VerifyAcct';

// Dashboard
import Dashboard from './pages/Dashboard/Dashboard';
import VideoStream from './components/VideoStream';



const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeIndex />,
    children: [
      { index: true, element: <Hero /> }
    ],
  },

  {
    path: 'signup',
    element: <NewUser />,
    children: [
      { index: true, element: <NewUser /> }
    ],
  },

  {
    path: 'login',
    element: <Login />,
    children: [
      {index:true, element:<Login />}
    ]
  },

  {
    path: 'forgotPass',
    element: <ForgotPass />,
    children: [
      {index:true, element:<ForgotPass />}
    ]
  },

  {
    path: 'verifyAcct',
    element: <VerifyAcct />,
    children: [
      {index:true, element:<VerifyAcct />}
    ]
  },


  // Dashboard
  {
    path: 'dashboard',
    element: <Dashboard />,
    children: [
      {index:true, element:<Dashboard />}
    ]
  },
  // Chatbox
  {
    path: 'videoCall',
    element: <VideoStream />,
    children: [
      {index:true, element:<VideoStream />}
    ]
  }


]);

function App() {
  return (
    <div className="w-full min-h-screen border border-red-700">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
