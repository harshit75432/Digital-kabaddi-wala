import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Signup from '../pages/signup/Signup';
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
]);

export default router;