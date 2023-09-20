import { useEffect, useState, useMemo, useContext } from "react";
import Spinner from "../general/Spinner";
import { toast } from 'react-toastify'
import styles from "./Perfil.module.scss";
import { useForm, Controller } from "react-hook-form";
import useRequest from "../../hooks/useRequest";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDropzone } from 'react-dropzone'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { GeneralUserContext } from "../../context/GeneralUserContext";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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
  const { setUser } = useContext(GeneralUserContext)

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
    setUser(dataUpdated)
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
    <div>
      <h2>Edit Profile</h2>
      <div className={styles.loginContainer}>
        <Card >
          <CardContent>
            {isLoading ? <Spinner /> : <>

              <form onSubmit={handleSubmit(handlerOnsubmit)}>

                <Box sx={{ width: '100%' }}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                    <Grid item xs={6}>
                      {!editModeinput ? <div className={styles.draganddrop} {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                          isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>
                        }

                      </div> : null}
                      <img src={watchImage} />
                      <br />
                      <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                          <TextField id="filled-basic" label="Name" variant="filled" onChange={onChange} value={value} disabled={editModeinput} />
                        )}
                      />
                      <p>{errors.name?.message}</p>
                      <Controller
                        control={control}
                        name="username"
                        render={({ field: { onChange, value } }) => (
                          <TextField id="filled-basic" label="Username" variant="filled" onChange={onChange} value={value} disabled={editModeinput} />
                        )}
                      />
                      <p>{errors.username?.message}</p>
                      <Controller
                        control={control}
                        name="surname"
                        render={({ field: { onChange, value } }) => (
                          <TextField id="filled-basic" label="Surname" variant="filled" onChange={onChange} value={value} disabled={editModeinput} />
                        )}
                      />
                      <p>{errors.surname?.message}</p>
                    </Grid>
                    <Grid item xs={6}>
                      {/* <div className={styles.formContainer}>Organization <select {...register("organization")} disabled={editModeinput} >
              {organizations.map((org) => {
                return <option value={org} key={org}>{org}</option>
              })
              }
            </select></div> */}
                      <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                          <TextField id="filled-basic" label="Email" variant="filled" onChange={onChange} value={value} disabled={editModeinput} />
                        )}
                      />
                      <p>{errors.email?.message}</p>

                      <InputLabel id="demo-simple-select-label">Organization</InputLabel>
                      <Controller
                        control={control}
                        name="organization"
                        render={({ field: { onChange, value } }) => (
                          <Select value={value} label="organization" onChange={onChange} disabled={editModeinput}>
                            {organizations.map((org) => {
                              return <MenuItem value={org} key={org}>{org}</MenuItem>
                            })
                            }
                          </Select>
                        )}
                      />


                    </Grid>
                    <Grid item xs={12}>
                      {/* <input accept="image/*" type="file" onChange={convertToBase64} /> */}
                      {!editModeinput ? <><div className={styles.formContainer}>
                        <Controller
                          control={control}
                          name="Password"
                          render={({ field: { onChange, value } }) => (
                            <TextField id="filled-basic" label="Password" variant="filled" onChange={onChange} value={value} disabled={editModeinput} />
                          )}
                        /></div><p>{errors.password?.message}</p></> : null}
                      {!editModeinput ? <Button variant="contained" type="submit" endIcon={<SendIcon />} >Save</Button> : null}
                      <Button variant="contained" type="button" endIcon={editModeinput ? null : null} onClick={() => {
                        setEditmodeInput(!editModeinput)

                        // Other method to switch the previus state
                        // setEditmodeInput((preveditModeinput) => {
                        //   return (!preveditModeinput)
                        // })
                      }}>{editModeinput ? 'Edit User' : 'Cancel'}</Button>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </>}
          </CardContent>
        </Card>
      </div >
    </div>
  );
}

export default Perfil;