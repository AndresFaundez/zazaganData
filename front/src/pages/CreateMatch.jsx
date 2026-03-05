import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateMatch = () => {

  const [teamSize, setTeamSize] = useState(6);
  const [users, setUsers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [matchData, setMatchData] = useState({
    date: "",
    location: ""
  });

  const navigate = useNavigate();

  useEffect(()=>{
    const fetchUsers = async () =>{
      try{
        const res = await axios.get("/users");
        setUsers(res.data);
      }catch (err){
        console.log(err);
      };
    };
    fetchUsers();
  },[]);


  const handlePlayerSelect = (user, team) => {
    const isSelected = selectedPlayers.find((p)=>p.id === user.id);
    const playersInTeam = selectedPlayers.filter((p)=>p.team===team).length;


    if(isSelected){
      if(isSelected.team===team){
        setSelectedPlayers(selectedPlayers.filter((p)=>p.id !== user.id));
      }else{
        if(playersInTeam<teamSize){
          setSelectedPlayers(selectedPlayers.map((p) => (p.id === user.id ? { ...p, team } : p)));
        }else{
          alert(`El equipo ${team} ya tiene el número máximo de jugadores.`);
        }
      }
    }else{
      if (playersInTeam < teamSize) {
        setSelectedPlayers([...selectedPlayers, { ...user, team }]);
      } else {
        alert(`¡El Equipo ${team} ya está lleno!`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post("/matches", {...matchData, players: selectedPlayers});
      navigate("/");
    }catch(err){
      console.log(err);
    }
  };


  return (
    <div className='add-match'>
      <div className='content'>
        <h1>Crear Partido</h1>
        <input type =  "datetime-local" onChange={(e)=>setMatchData({ ...matchData, date: e.target.value })} />
        <input type="text" placeholder="Lugar (ej: Cancha 5 Mall Tobalaba)" onChange={(e) => setMatchData({ ...matchData, location: e.target.value })} />

        <div className='player-selection'>
          <h2>Convocatoria</h2>
          <div className="format-selection">
            <label>Formato del partido: </label>
            <select value={teamSize} onChange={(e) => setTeamSize(parseInt(e.target.value))}>
              <option value={5}>5 vs 5</option>
              <option value={6}>6 vs 6</option>
              <option value={7}>7 vs 7</option>
              <option value={11}>11 vs 11</option>
            </select>
            
            <div className="status-bar">
              <p>Equipo A: {selectedPlayers.filter(p => p.team === 'A').length} / {teamSize}</p>
              <p>Equipo B: {selectedPlayers.filter(p => p.team === 'B').length} / {teamSize}</p>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Jugador</th>
                <th>Equipo Blanco</th>
                <th>Equipo Negro</th>
              </tr>
            </thead>
            <tbody>
                {users.map((user)=>(
                  <tr key={user.id}>
                    <td>{user.nickname}</td>
                    <td>
                      <input 
                      type="checkbox" 
                      checked={selectedPlayers.find(p => p.id === user.id)?.team === 'A'} 
                      onChange={() => handlePlayerSelect(user, 'A')} 
                    />
                  </td>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedPlayers.find(p => p.id === user.id)?.team === 'B'} 
                      onChange={() => handlePlayerSelect(user, 'B')} 
                    />
                    </td>

                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <button onClick={handleSubmit}>Crear Partido y Convocatoria</button>
      </div>
    </div>
  )
}

export default CreateMatch