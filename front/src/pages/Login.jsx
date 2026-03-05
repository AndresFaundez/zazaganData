import React, { useState, useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
   })
  
  const [err, setErr] = useState(null)

  const navigate = useNavigate()

  const { login } = useContext(AuthContext);

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }   

  const handleSubmit = async e =>{
    e.preventDefault()
    try{
      await login(inputs)
      navigate("/")
    }catch(err){
      console.log(err)
      setErr(err.response.data)
    }
  }
  return (
    <div className='auth'>
      <h1>Iniciar Sesión</h1>
      <form>
          <input required type ="text" placeholder="Nombre de usuario" name = 'username' onChange={handleChange}/>
          <input required type ="password" placeholder="Contraseña" name = 'password' onChange={handleChange}/>
          <button onClick={handleSubmit}>Iniciar Sesión</button>
          {err && <p>{err}</p>}
          <span>No tienes cuenta? <Link to="/register">Registrarse</Link></span>
      </form>
    </div>
  )
}

export default Login