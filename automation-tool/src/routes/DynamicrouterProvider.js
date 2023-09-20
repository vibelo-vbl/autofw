import React, { useContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GeneralUserContext } from '../context/GeneralUserContext'
import Root from './Root';
import Login from './Login';
import Home from '../components/views/Home';
import Contact from '../components/views/Contact';
import Perfil from '../components/views/Perfil';
import Map from '../components/views/Map';
import EventDetail from '../components/views/EventDetail';
import Token from '../components/views/Token';
import Users from '../components/views/Users';
import UserDetail from '../components/views/UserDetail';
import Image from '../components/views/Image';
import Page404 from '../components/views/Page404';

const DynamicrouterProvider = () => {
    const generalUser = useContext(GeneralUserContext);
    const routers = [{
        path: '/',
        element: <Root />,
        errorElement: <Page404 />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'perfil',
                element: <Perfil />
            },
            {
                path: 'perfil/edit',
                element: <Perfil />
            },
            {
                path: 'event/:id',
                element: <EventDetail />
            },
            {
                path: 'users',
                element: <Users />
            },
            {
                path: 'user/create',
                element: <UserDetail />
            },
            {
                path: 'user/:id',
                element: <UserDetail />
            }

        ]
    }, {
        path: 'login',
        element: <Login />
    }]

    const router = createBrowserRouter(routers)
    return (
        <RouterProvider router={router} />
    );
};

export default DynamicrouterProvider;