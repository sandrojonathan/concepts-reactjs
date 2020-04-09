import React, { useState, useEffect }  from "react";
import api from './services/api'

import "./styles.css";

function App() {
  
  const [ getRepositories, setRepositories ] = useState([]);
  
  // before mount component, get repositories
  useEffect( () => {
    api.get('/repositories').then( response => {
      setRepositories( response.data );
    });
  }, [] )

  async function handleAddRepository() {
    // TODO
    const { data } = await api.post( '/repositories', {
      title : `Novo repository ${Date.now()} `,
      url: 'http://github.com/xesperito',
      techs: 'amado batista, jose aldo, caramelo',
    });

    setRepositories( [ ...getRepositories, data ] )
  }

  async function handleRemoveRepository(id) {
    // TODO
    try {
      await api.delete(`repositories/${id}`)
      setRepositories( getRepositories.filter(repository => repository.id !== id ) )
    } catch (error) {
      alert('Error on delete this repository')
    }
  } 


  return (
    <div>
      <ul data-testid="repository-list">
      { getRepositories.map( repository => 
        <li key={repository.id}> {repository.title} 
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>  
      )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
