import { json, useParams, Link } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import React, { useEffect, useState } from "react";
import Spinner from "../general/Spinner"
import styles from "./UserDetail.module.scss";
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const schema = yup.object({
    username: yup.string().required(),
    name: yup.string().matches(/^[a-zA-Z ]+$/, "Must not to contains numbers, symbols, etc").required(),
    surname: yup.string().matches(/^[a-zA-Z ]+$/, "Must not to contains numbers, symbols, etc").required(),
    organization: yup.string().matches(/^[a-zA-Z ]+$/, "Must not to contains numbers, symbols, etc").required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    admin: yup.bool(),
    disabled: yup.bool(),
}).required();

const UserDetail = () => {
    const { id } = useParams()
    const { data, isLoading, error, request } = useRequest(null)
    const { data: dataUpdated, isLoading: isLoadingUpdated, error: errorUpdated, request: updatedUser } = useRequest(null)
    const { data: postUpdated, isLoading: isLoadingPost, error: errorPost, request: postUser } = useRequest(null)
    const { register, handleSubmit, reset, formState: { errors }, setValue, watch, control } = useForm({ resolver: yupResolver(schema) })
    useEffect(() => {
        if (!id) {
            return
        }
        request(`/user/${id}`, 'GET')
    }, []);

    useEffect(() => {
        reset(data)
    }, [data]);

    useEffect(() => {
        if (error === 'Not Found') {
            throw new Error(error)
        }

    }, [error]);

    useEffect(() => {
        if (dataUpdated === null) {
            return
        }
        toast.success('Congratulation!, user changed', {
            position: "top-right",
            theme: "light",
        });
    }, [dataUpdated]);

    useEffect(() => {
        if (postUpdated === null) {
            return
        }
        toast.success('Congratulation!, user created', {
            position: "top-right",
            theme: "light",
        });
    }, [postUpdated]);

    const handlerOnsubmit = (data) => {
        console.log(data)
        if (!id) {
            postUser("/user/", 'POST', data)
            return
        }
        updatedUser(`/user/${id}`, 'PUT', data)

    }

    return (
        <div>
            {/* <h1>UserDetail!</h1> */}
            {isLoading ? <Spinner /> : <div>
                <h2>Edit Profile</h2>
                <div className={styles.loginContainer}>
                    <Card >
                        <CardContent>
                            <form onSubmit={handleSubmit(handlerOnsubmit)}>
                                <Stack spacing={2}>
                                    <Controller
                                        control={control}
                                        name="name"
                                        render={({ field: { onChange, value } }) => (
                                            <TextField id="filled-basic" label="Name" variant="filled" onChange={onChange} value={value} />
                                        )}
                                    />
                                    {errors && errors.name ? <p> {errors.name.message} </p> : null}
                                    <Controller
                                        control={control}
                                        name="username"
                                        render={({ field: { onChange, value } }) => (
                                            <TextField id="filled-basic" label="Username" variant="filled" onChange={onChange} value={value} />
                                        )}
                                    />
                                    {errors && errors.username ? <p> {errors.username.message} </p> : null}
                                    <Controller
                                        control={control}
                                        name="surname"
                                        render={({ field: { onChange, value } }) => (
                                            <TextField id="filled-basic" label="Surname" variant="filled" onChange={onChange} value={value} />
                                        )}
                                    />
                                    {errors && errors.surname ? <p> {errors.surname.message} </p> : null}
                                    <Controller
                                        control={control}
                                        name="email"
                                        render={({ field: { onChange, value } }) => (
                                            <TextField id="filled-basic" label="Email" variant="filled" onChange={onChange} value={value} />
                                        )}
                                    />
                                    {errors && errors.email ? <p> {errors.email.message} </p> : null}
                                    <Controller
                                        control={control}
                                        name="organization"
                                        render={({ field: { onChange, value } }) => (
                                            <TextField id="filled-basic" label="Organization" variant="filled" onChange={onChange} value={value} />
                                        )}
                                    />
                                    {errors && errors.organization ? <p> {errors.email.organization} </p> : null}
                                    <Controller
                                        control={control}
                                        name="password"
                                        render={({ field: { onChange, value } }) => (
                                            <TextField id="filled-basic" label="Password" variant="filled" onChange={onChange} value={value} />
                                        )}
                                    />
                                    {errors && errors.password ? <p> {errors.password.message} </p> : null}
                                    <FormGroup>
                                        <FormControlLabel control={<Controller
                                            control={control}
                                            name="admin"
                                            render={({ field: { onChange, value } }) => (
                                                <Checkbox onChange={onChange} checked={value} />
                                            )}
                                        />} label="Admin" />
                                        <FormControlLabel control={<Controller
                                            control={control}
                                            name="disabled"
                                            render={({ field: { onChange, value } }) => (
                                                <Checkbox onChange={onChange} checked={value} />
                                            )}
                                        />} label="Disabled" />
                                    </FormGroup>
                                </Stack>
                                {/* <input {...register("admin")} type="checkbox" id="admin" />
                        <label htmlFor="admin">Admin</label>
                        <br />
                        <input {...register("disabled")} type="checkbox" id="disabled" />
                        <label htmlFor="admin">Disabled</label>
                        <br /> */}
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" type="submit" endIcon={<SendIcon />} >Save</Button>
                                    <Button href={`/users`} variant="contained" startIcon={<ClearIcon />} >Cancel</Button>
                                </Stack>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>}
        </div>
    );
};

export default UserDetail;