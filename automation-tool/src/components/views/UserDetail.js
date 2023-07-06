import { json, useParams, Link } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import React, { useEffect, useState } from "react";
import Spinner from "../general/Spinner"
import styles from "./UserDetail.module.scss";
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";


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
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
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
            <h1>UserDetail!</h1>
            {isLoading ? <Spinner /> : <div>
                <h2>Edit Form</h2>
                <div className={styles.loginContainer}>
                    <form onSubmit={handleSubmit(handlerOnsubmit)}>
                        Username: <br /> <input {...register("username")} type="text" />
                        {errors && errors.username ? <p> {errors.username.message} </p> : null}
                        <br />
                        Name: <br /><input {...register("name")} type="text" />
                        {errors && errors.name ? <p> {errors.name.message} </p> : null}
                        <br />
                        Surname: <br /><input {...register("surname")} type="text" />
                        {errors && errors.surname ? <p> {errors.surname.message} </p> : null}
                        <br />
                        Email: <br /><input {...register("email")} type="email" />
                        {errors && errors.email ? <p> {errors.email.message} </p> : null}
                        <br />
                        Organization: <br /><input {...register("organization")} type="text" />
                        {errors && errors.organization ? <p> {errors.email.organization} </p> : null}
                        <br />
                        Password: <br /> <input {...register("password")} type="password" />
                        {errors && errors.password ? <p> {errors.password.message} </p> : null}
                        <br />
                        <input {...register("admin")} type="checkbox" id="admin" />
                        <label htmlFor="admin">Admin</label>
                        <br />
                        <input {...register("disabled")} type="checkbox" id="disabled" />
                        <label htmlFor="admin">Disabled</label>
                        <br />
                        <button className={"button"} type="submit">Save</button>
                        <div><Link className={"button"} to={`/users`}>Cancel</Link></div>

                    </form>
                </div>
            </div>}
        </div>
    );
};

export default UserDetail;