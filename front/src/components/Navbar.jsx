import React, { useContext } from 'react'
import Logo from '../img/premier.svg'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'


const Navbar = () => {

  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className='navbar'>
        <div className="container">
            <div className="logo">
                <img src={Logo} alt="" />
            </div>
            <div className="links">
                <Link className='link' to="/?cat=estadisticas">
                <h6>ESTADISTICAS</h6>
                </Link>
                <Link className='link' to="/?cat=medias">
                <h6>MEDIAS</h6>
                </Link>
                <Link className='link' to="/?cat=jugadores">
                <h6>JUGADORES</h6>
                </Link>
                <Link className='link' to="/?cat=equipos">
                <h6>EQUIPOS</h6>
                </Link>
                <span>{currentUser?.username}</span>
                {currentUser ? (
                    <span onClick={logout}>Cerrar Sesión</span> 
                ): (
                    <Link className='link' to="/login">
                    Iniciar Sesión</Link>
                )}
                {currentUser?.is_admin === 1 && (
                    <span className='create-match'>
                        <Link className='link' to="/create-match">Crear Partido</Link>
                    </span>
                )}
            </div>
        </div>
    </div>
  )
}

export default Navbar