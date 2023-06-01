import useRequest from "../../hooks/useRequest";
import { Link } from 'react-router-dom'
import styles from "./Users.module.scss";
import { useEffect, useContext } from 'react';
import { GeneralUserContext } from '../../context/GeneralUserContext'
import Page404 from "./Page404";
function Users() {
    const { data, isLoading, error, request } = useRequest([])
    const { data: dataDelete, isLoading: isLoadingDelete, error: errorDelete, request: deleteUser } = useRequest([])
    const generalUser = useContext(GeneralUserContext);

    useEffect(() => {
        request(`/user/users`, 'GET')
    }, [dataDelete]);

    const handlerDeleteuSer = (id) => {
        console.log(id)
        deleteUser(`/user/${id}`, 'DELETE')
    }
    if (!generalUser?.user?.admin) {
        return (
            <Page404 />
        )
    }
    return (
        <div>
            <h1>Users</h1>
            <div><Link className={"button"} to={`/user/create`}>New User</Link></div>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Surname</td>
                        <td>Username</td>
                        <td>Mail</td>
                        <td>Organization</td>
                        <td>Status</td>
                        <td>Delete</td>
                        <td>Edit</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => {
                        return (<tr key={user.id} >
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.organization}</td>
                            <td>{user.disabled ? 'True' : 'False'}</td>
                            <td><button className={"button"} onClick={() => {
                                handlerDeleteuSer(user.id)
                            }}>Delete</button></td>
                            <td><Link to={`/user/${user.id}`}>Edit</Link></td>
                        </tr>)
                    })

                    }
                </tbody>
            </table>
        </div>
    );
}

export default Users;
