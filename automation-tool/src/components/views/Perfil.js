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
import { useDropzone } from 'react-dropzone'

const schema = yup.object({
  username: yup.string().required(),
  name: yup.string().matches(/^[a-zA-Z ]+$/, "Must not to contains numbers, symbols, etc").required(),
  surname: yup.string().matches(/^[a-zA-Z ]+$/, "Must not to contains numbers, symbols, etc").required(),
  organization: yup.string().matches(/^[a-zA-Z ]+$/, "Must not to contains numbers, symbols, etc").required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  // image: yup.mixed()
  //   .test("type", "We only support jpeg and jpg format", function (value) {
  //     return value && (value.type === "image/jpg" || value.type === "image/jpeg");
  //   })
  //   .test("type", "Max allowed size is 100KB", function (value) {
  //     return value && value.size <= 102400;
  //   })
}).required();


function Perfil() {
  const endpoint = useParams()
  const [user, setUser] = useState([]);
  // const navigate = useNavigate()
  const generalToken = useContext(GeneralTokenContext);
  const [editModeinput, setEditmodeInput] = useState(true);
  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm({ resolver: yupResolver(schema) })
  const { data, isLoading, error, request } = useRequest(null)
  const { data: dataUpdated, isLoading: isLoadingUpdated, error: errorUpdated, request: updatedUser } = useRequest(null)
  const watchImage = watch("image")
  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles)
    var reader = new FileReader();

    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      setValue("image", reader.result)
    }
    reader.onerror = error => {
      console.log("Error:", error)
    }
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

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
          <div className={styles.formContainer}>Organization <select {...register("organization")} disabled={editModeinput} >
            <option value="OHCRH">OHCRH</option>
            <option value="UNICC">UNICC</option>
          </select></div>
          <div className={styles.formContainer}>Email <input {...register("email")} type="email" disabled={editModeinput} /></div>
          <p>{errors.email?.message}</p>
          {/* <input accept="image/*" type="file" onChange={convertToBase64} /> */}
          {!editModeinput ? <div className={styles.draganddrop} {...getRootProps()}>
            <input {...getInputProps()} />
            {
              isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>
            }
          </div> : null}
          <img src={watchImage} />
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