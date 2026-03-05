import React from 'react';
import {createBrowserRouter, RouterProvider, Route, Outlet} from 'react-router-dom';
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './style.scss';
import CreateMatch from './pages/CreateMatch';

const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

const router = createBrowserRouter([

  {path: "/", element: <Layout />,
    children:[

      {
        path: "/", element: <Home/>
      },

      // {
      //   path: "/post/:id", element: <Single/>
      // },

      // {
      //   path: "/write", element: <Write/>
      // }
    ]},

  {path: "/Register", element: <Register/>},
  {path: "/Login", element: <Login/>},
  {path: "/create-match", element: <CreateMatch/>},
]);



function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
      
    </div>
  );
}

export default App;
