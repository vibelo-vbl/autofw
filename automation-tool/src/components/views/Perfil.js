import { useEffect, useState } from "react";
import Spinner from "../general/Spinner";
import { toast } from 'react-toastify'
import { GeneralTokenContext } from '../../context/GeneralTokenContext'
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import styles from "./Perfil.module.scss";
import { json, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useRequest from "../../hooks/useRequest";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required(),
  name: yup.string().matches(/^[a-zA-Z ]+$/, "Must not to contains numbers, symbols, etc").required(),
  surname: yup.string().matches(/^[a-zA-Z ]+$/, "Must not to contains numbers, symbols, etc").required(),
  organization: yup.string().matches(/^[a-zA-Z ]+$/, "Must not to contains numbers, symbols, etc").required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();


function Perfil() {
  const endpoint = useParams()
  const [user, setUser] = useState([]);
  // const navigate = useNavigate()
  const generalToken = useContext(GeneralTokenContext);
  const [editModeinput, setEditmodeInput] = useState(true);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
  const { data, isLoading, error, request } = useRequest(null)
  const { data: dataUpdated, isLoading: isLoadingUpdated, error: errorUpdated, request: updatedUser } = useRequest(null)


  useEffect(() => {
    request(`/user/me`, 'GET')
  }, []);

  useEffect(() => {
    reset(data)
  }, [data]);

  const handlerOnsubmit = (data) => {
    console.log(data)
    updatedUser(`/user/${data.id}`, 'PUT', data)
    return
  }

  return (
    <div className="Home">
      {isLoading ? <Spinner /> : <>
        <h1>Perfil!</h1>
        <form onSubmit={handleSubmit(handlerOnsubmit)}>
          <div className={styles.formContainer}>User <input {...register("username")} type="text" disabled={editModeinput} /></div>
          <p>{errors.username?.message}</p>
          <div className={styles.formContainer}>Name <input {...register("name")} type="text" disabled={editModeinput} /></div>
          <p>{errors.name?.message}</p>
          <div className={styles.formContainer}>Surname <input {...register("surname")} type="text" disabled={editModeinput} /></div>
          <p>{errors.surname?.message}</p>
          <div className={styles.formContainer}>Organization <input {...register("organization")} type="text" disabled={editModeinput} /></div>
          <p>{errors.organization?.message}</p>
          <div className={styles.formContainer}>Email <input {...register("email")} type="email" disabled={editModeinput} /></div>
          <p>{errors.email?.message}</p>
          {!editModeinput ? <><div className={styles.formContainer}>Password <input {...register("password")} type="password" disabled={editModeinput} /></div><p>{errors.password?.message}</p></> : null}
          {!editModeinput ? <button className={"button"} type="submit">Submit</button> : null}
          <button className={"button"} type="button" onClick={() => {
            setEditmodeInput(!editModeinput)

            // Other method to switch the previus state
            // setEditmodeInput((preveditModeinput) => {
            //   return (!preveditModeinput)
            // })
          }}>{editModeinput ? 'Edit User' : 'Cancel'}</button>
        </form>
      </>}
    </div >
  );
}

export default Perfil;