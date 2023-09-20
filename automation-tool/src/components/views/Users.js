import useRequest from "../../hooks/useRequest";
import { Link } from 'react-router-dom'
import styles from "./Users.module.scss";
import { useEffect, useContext } from 'react';
import { GeneralUserContext } from '../../context/GeneralUserContext'
import Page404 from "./Page404";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

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
            <div><Button href="/user/create" variant="outlined" startIcon={<AddIcon />} >New User</Button></div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Surname</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Mail</TableCell>
                            <TableCell>Organization</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Delete</TableCell>
                            <TableCell>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((user) => {
                            return (<TableRow key={user.id} >
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.surname}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.organization}</TableCell>
                                <TableCell>{user.disabled ? 'True' : 'False'}</TableCell>
                                <TableCell><Button variant="contained" startIcon={<DeleteIcon />} onClick={() => {
                                    handlerDeleteuSer(user.id)
                                }}>Delete</Button></TableCell>
                                <TableCell><Button href={`/user/${user.id}`} variant="outlined" startIcon={<ModeEditIcon />} >Edit</Button></TableCell>
                            </TableRow>)
                        })

                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Users;