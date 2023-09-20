
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from 'react-toastify'
import { GeneralTokenContext } from '../context/GeneralTokenContext'
import { useContext } from 'react';
import styles from "./Login.module.scss";
import useRequest from "../hooks/useRequest"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
}).required();

function Login() {
    const navigate = useNavigate()
    const generalToken = useContext(GeneralTokenContext);
    const { data: postUpdated, isLoading: isLoadingPost, error: errorPost, request: postLogin } = useRequest(null)
    const { register, handleSubmit, reset, formState: { errors }, setValue, watch, control } = useForm({ resolver: yupResolver(schema) })

    useEffect(() => {
        if (postUpdated === null) {
            return
        }
        generalToken.setTokenNumber(postUpdated.access_token)
        toast.success('Congratulation!, user changed', {
            position: "top-right",
            theme: "light",
        });
    }, [postUpdated]);

    const handlerOnsubmit = (data) => {
        console.log(data)
        postLogin("/auth/login", 'POST', `grant_type=&username=${data.username}&password=${data.password}&scope=&client_id=&client_secret=`)
        reset(data)
        return
    }

    if (generalToken.tokenNumber) {
        return <Navigate to='/' />

    }


    return (
        <div className={styles.background}>
            <div className={styles.logo}>
            </div>
            <div className={styles.loginContainer}>
                <Card >
                    <CardContent>
                        <form onSubmit={handleSubmit(handlerOnsubmit)}>
                            <Stack spacing={2}>
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
                                    name="password"
                                    render={({ field: { onChange, value } }) => (
                                        <TextField id="filled-basic" label="Password" variant="filled" type="password" onChange={onChange} value={value} />
                                    )}
                                />
                                {errors && errors.password ? <p> {errors.password.message} </p> : null}
                                <Button variant="contained" type="submit">Login</Button>
                            </Stack>
                        </form>

                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Login;
