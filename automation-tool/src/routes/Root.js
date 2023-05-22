import { Outlet, Link, useNavigate, Navigate } from 'react-router-dom'
import Navbar from '../components/general/Navbar'
import { useEffect } from "react";
import { GeneralTokenContext } from '../context/GeneralTokenContext'
import { useContext } from 'react';



function Root() {
  // const navigate = useNavigate()
  const generalToken = useContext(GeneralTokenContext);

  // useEffect(() => {
  //   const value = generalToken.tokenNumber
  //   console.log(value)
  //   if (value === null) {
  //     navigate("/login")
  //   }
  // }, []);

  if (!generalToken.tokenNumber) {
    return <Navigate to='/login' />

  }
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Root;
