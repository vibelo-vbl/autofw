import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Root from './routes/Root'
import Home from './components/views/Home';
import Contact from './components/views/Contact';
import Perfil from './components/views/Perfil';
import Login from './routes/Login';
import Map from './components/views/Map';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import EventDetail from './components/views/EventDetail';
// import { GeneralCounterContextProvider } from './context/GeneralCounterContext';
import Token from './components/views/Token';
import { GeneralTokenContextProvider } from './context/GeneralTokenContext';
import Users from './components/views/Users';
import UserDetail from './components/views/UserDetail';
import { GeneralUserContextProvider } from './context/GeneralUserContext';
import DynamicrouterProvider from './routes/DynamicrouterProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <GeneralTokenContextProvider>
      <GeneralUserContextProvider>
        <DynamicrouterProvider />
      </GeneralUserContextProvider>
    </GeneralTokenContextProvider>
    <ToastContainer />
  </>

  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
