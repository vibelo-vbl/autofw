import { useEffect, useState, useMemo } from "react";
import Spinner from "../general/Spinner";
import { toast } from 'react-toastify'
import styles from "./Perfil.module.scss";
import { useForm, Controller } from "react-hook-form";
import useRequest from "../../hooks/useRequest";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDropzone } from 'react-dropzone'
import TextField from '@mui/material/TextField';

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
  const [editModeinput, setEditmodeInput] = useState(true);
  const { register, handleSubmit, reset, formState: { errors }, setValue, watch, control } = useForm({ resolver: yupResolver(schema) })
  const { data: myUser, isLoading: isLoadingMyuser, error: errorMyser, request: getMyuser } = useRequest(null)
  const { data: dataUpdated, isLoading: isLoadingUpdated, error: errorUpdated, request: updatedUser } = useRequest(null)
  const { data: organizations, isLoading: isLoadingorganizations, error: errorOrganizations, request: getOrganizations } = useRequest([])

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
    getMyuser(`/user/me`, 'GET')
    getOrganizations(`/user/org`, 'GET')

  }, []);

  useEffect(() => {
    reset(myUser)
  }, [myUser]);

  useEffect(() => {
    if (dataUpdated === null) {
      return
    }
    toast.success('Congratulation!, user changed', {
      position: "top-right",
      theme: "light",
    });
  }, [dataUpdated]);


  const handlerOnsubmit = (data) => {
    console.log(data)
    updatedUser(`/user/${data.id}`, 'PUT', data)
    return
  }

  // Funciona como useEffect para triggear cuando cambia los isLoading
  const isLoading = useMemo(() => {
    return isLoadingMyuser || isLoadingUpdated || isLoadingorganizations
  }, [isLoadingMyuser, isLoadingUpdated, isLoadingorganizations])

  return (
    <div className="Home">
      {isLoading ? <Spinner /> : <>
        <h1>Perfil!</h1>
        <form onSubmit={handleSubmit(handlerOnsubmit)}>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextField id="filled-basic" label="Filled" variant="filled" onChange={onChange} value={value} disabled={editModeinput} />
            )}
          />
          < div className={styles.formContainer}>User <input {...register("username")} type="text" disabled={editModeinput} /></div>
          <p>{errors.username?.message}</p>
          {/* <div className={styles.formContainer}>Name <input {...register("name")} type="text" disabled={editModeinput} /></div> */}
          <p>{errors.name?.message}</p>
          <div className={styles.formContainer}>Surname <input {...register("surname")} type="text" disabled={editModeinput} /></div>
          <p>{errors.surname?.message}</p>
          <div className={styles.formContainer}>Organization <select {...register("organization")} disabled={editModeinput} >
            {organizations.map((org) => {
              return <option value={org} key={org}>{org}</option>
            })
            }
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