import { Link, useNavigate, Navigate } from 'react-router-dom'
// import "./Navbar.style.css"
import styles from './Navbar.module.scss'
import LogoutIcon from './LogoutIcon'
// import GeneralCounterIncrementor from './GeneralCounterIncrementor'
import { GeneralTokenContext } from '../../context/GeneralTokenContext'
import { useContext } from 'react';
import { GeneralUserContext } from '../../context/GeneralUserContext'
function Navbar() {
    const navigate = useNavigate()
    const generalToken = useContext(GeneralTokenContext);
    const generalUser = useContext(GeneralUserContext);
    function handlerLogout() {
        generalToken.setTokenNumber(null)
        // localStorage.removeItem('AT-token')
        // navigate("/login")
    }


    return (
        <>
            <div className={styles.containerNavbar}>
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/contact"}>Contact</Link></li>
                    <li><Link to={"/perfil"}>Perfil</Link></li>
                    <li><Link to={"/token"}>Token</Link></li>
                    <li><Link to={"/map"}>Map</Link></li>
                    {generalUser.user?.admin ? <li><Link to={"/users"}>Users</Link></li> : null}

                </ul>
                <ul>
                    {/* <li>
                        <GeneralCounterIncrementor />
                    </li> */}
                    <li>Bienvenido {generalUser.user?.name}</li>
                    <li><a href="#" onClick={handlerLogout}><LogoutIcon color={'white'} height={30} width={30} /></a></li>
                </ul>
            </div>

        </>
    );
}

export default Navbar;