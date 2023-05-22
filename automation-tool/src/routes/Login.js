
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from 'react-toastify'
import { GeneralTokenContext } from '../context/GeneralTokenContext'
import { useContext } from 'react';
import styles from "./Login.module.scss";
import useRequest from "../hooks/useRequest"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";


const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
}).required();

function Login() {
    const navigate = useNavigate()
    const generalToken = useContext(GeneralTokenContext);
    const { data: postUpdated, isLoading: isLoadingPost, error: errorPost, request: postLogin } = useRequest(null)
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

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
        <div>
            <h1>Login!</h1>
            <div className={styles.loginContainer}>
                <form onSubmit={handleSubmit(handlerOnsubmit)}>
                    <div >
                        Username: <br /> <input {...register("username")} type="text" />
                        {errors && errors.username ? <p> {errors.username.message} </p> : null}
                    </div>
                    <div>
                        Password: <br /> <input {...register("password")} type="password" />
                        {errors && errors.password ? <p> {errors.password.message} </p> : null}
                    </div>
                    <button className={"button"} type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
