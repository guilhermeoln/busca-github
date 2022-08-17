import './style.css';
import api from './services/api';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';


function App() {

  const [user, setUser] = useState('');
  const [userInfo, setUserInfo] = useState([]);
  const [repositorios, setRepositorios] = useState([]);
  const [exibirInfo, setExibirInfo] = useState(false);

  async function searchUser(){
    
    try{
      const response = await api.get(`/${user}`)
      const repositorios = await api.get(`/${user}/repos`)

      setUserInfo({
        nome: response.data.name,
        bio: response.data.bio,
        logo: response.data.avatar_url,
        github: response.data.html_url
      })
      setExibirInfo(true);
      setRepositorios(repositorios.data)
    } catch(err){
      
      console.log(err)
    }
  }

  
  function clearUser(){
    setUser('');
    setExibirInfo(false);
  }


  return (
    <div className='app'>
      <header>
        <FaGithub className='icon'/>
      </header>
      <div className='container-inputs'>
        <input type='text' placeholder='Digite o nome do usuário' value={user} onChange={(e) => setUser(e.target.value)}/>
        <button onClick={ searchUser } className='btn-search'>Buscar</button>
        <button onClick={ clearUser } className="btn-clear">Limpar</button>
      </div>
      
      {
        exibirInfo 
          &&
        <div className='container-user'>
          <img src={userInfo.logo} />
          <h1>{userInfo.nome}</h1>
          <p className='bio'>{userInfo.bio}</p>
            {repositorios.map((e) =>{
              return(
                <ul key={e.id}>
                  <li>
                    <h2>{e.name}</h2>
                    <p>{e.description}</p>
                    <div className='btn-user'>
                      <a target="_blank" href={e.html_url}>Acessar Repositório</a>
                    </div>
                  </li>
                </ul>
              );
            })}
        </div>
      }

    </div>
  );
}

export default App;
