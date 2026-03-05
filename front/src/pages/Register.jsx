import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    nickname: "",
    password: "",
    preferred_position: ""
   })
  
  const [err, setErr] = useState(null)

  const navigate = useNavigate()

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }   

  const handleSubmit = async e =>{
    e.preventDefault()
    try{
      await axios.post("/auth/register", inputs)
      navigate("/login")
    }catch(err){
      setErr(err.response.data)
    }
  }

  return (
  <div className='auth'>
    <h1>Registrarse</h1>
    <form>
        <input required type ="text" placeholder="Nombre de usuario" name = 'username' onChange={handleChange}/>
        <input required type ="password" placeholder="Contraseña" name = 'password' onChange={handleChange}/>
        <input required type ="text" placeholder="Sobrenombre" name = 'nickname' onChange={handleChange}/>
        <select required name="preferred_position" onChange={handleChange} >
          <option value="">Posición preferida (opcional)</option>
          <option value="Portero">Portero</option>
          <option value="Defensa">Defensa</option>
          <option value="Centrocampista">Centrocampista</option>
          <option value="Delantero">Delantero</option>
        </select> 
        <button onClick={handleSubmit}>Registrarse</button>
        {err && <p>{err}</p>}
        <span>Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link></span>
    </form>
  </div>
  )
}

export default Register