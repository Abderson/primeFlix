import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './home.css';



function Home() {

  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    async function loadFilmes() {
      try {
        const response = await api.get('movie/now_playing');
        setFilmes(response.data.results);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFilmes();

  }, []);

  if (loading) {
    return (
      <div className='loading'>
        <h2>Carregando filmes...</h2>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1>Filmes</h1>
      <div className='lista-filmes'>
        {filmes.map((filme) => (
          <article key={filme.id}>
            <strong>{filme.title}</strong>
            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={`Poster do filme ${filme.title}`} />
            <Link to={`/filme/${filme.id}`}>Acessar</Link>
             
          </article>
        ))}
      </div>

    </div>
  );
}

export default Home;