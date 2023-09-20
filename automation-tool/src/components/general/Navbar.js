import { Link, useNavigate, Navigate } from 'react-router-dom'
// import "./Navbar.style.css"
import styles from './Navbar.module.scss'
import LogoutIcon from './LogoutIcon'
// import GeneralCounterIncrementor from './GeneralCounterIncrementor'
import { GeneralTokenContext } from '../../context/GeneralTokenContext'
import { useContext, useState } from 'react';
import { GeneralUserContext } from '../../context/GeneralUserContext'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';


function Navbar() {
    const navigate = useNavigate()
    const generalToken = useContext(GeneralTokenContext);
    const generalUser = useContext(GeneralUserContext);

    function handlerLogout() {
        generalToken.setTokenNumber(null)
        // localStorage.removeItem('AT-token')
        // navigate("/login")
    }

    function handlerClickuserProfile() {
        handleClose()
        navigate("/perfil")
    }

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div className={styles.containerNavbar}>
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    {generalUser.user?.admin ? <li><Link to={"/users"}>Users</Link></li> : null}

                </ul>
                <ul>
                    {/* <li>
                        <GeneralCounterIncrementor />
                    </li> */}
                    {/* <li onClick={handleClick}>Bienvenido {generalUser.user?.name}</li> */}
                    <li onClick={handleClick}><Avatar alt="Remy Sharp" src={generalUser.user?.image} /></li>
                    {/* <li><a href="#" onClick={handlerLogout}><LogoutIcon color={'white'} height={30} width={30} /></a></li> */}
                </ul>
            </div>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handlerClickuserProfile}>
                    <Avatar /> {generalUser.user?.name}
                </MenuItem>
                <MenuItem onClick={handlerLogout} >
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}

export default Navbar;