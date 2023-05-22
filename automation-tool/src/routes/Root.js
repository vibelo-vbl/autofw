import { Outlet, Link, useNavigate, Navigate } from 'react-router-dom'
import Navbar from '../components/general/Navbar'
import { useEffect } from "react";
import { GeneralTokenContext } from '../context/GeneralTokenContext'
import { useContext } from 'react';
import useRequest from "../hooks/useRequest";
import Spinner from '../components/general/Spinner';


function Root() {
  // const navigate = useNavigate()
  const generalToken = useContext(GeneralTokenContext);
  const { data, isLoading, error, request } = useRequest(null)

  useEffect(() => {
    if (generalToken.tokenNumber) {
      console.log('insert Request')
      request(`/user/me`, 'GET')
    }
  }, [generalToken.tokenNumber]);

  if (!generalToken.tokenNumber) {
    return <Navigate to='/login' />
  }

  return (
    isLoading ? 
    <Spinner /> : 
    <>
      {data && <>
        <Navbar />
        <div>
          <Outlet />
        </div>
      </>}
      {error && <div>{error}</div>}
    </>
  );

}

export default Root;
