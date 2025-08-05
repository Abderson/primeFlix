import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './filme.css';
import { toast, ToastContainer } from 'react-toastify';


function Filme() {
  const { id } = useParams();
  const navigation = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      try {
        const response = await api.get(`movie/${id}`, {
          params: {
            api_key: process.env.REACT_APP_API_KEY || '54b8ea9059fdf6f57807e6c0bb19b60b',
            language: 'pt-BR',
            page: 1,
          }
        });
        setFilme(response.data);

      } catch (error) {
        console.error(error);
        navigation('/', { replace: true });
        return;

      } finally {
        setLoading(false);
      }
    }

    loadFilme();

    return () => {
      console.log('Componente desmontado');
    };

  }, [id, navigation]);

  function salvarFilme() {
    if (!filme.id) return;
    const minhaLista = JSON.parse(localStorage.getItem('@primeflix')) || [];
    if (minhaLista.some((f) => f.id === filme.id)) {
      toast.error('Filme já está na lista!');
      return;
    }
    minhaLista.push(filme);
    localStorage.setItem('@primeflix', JSON.stringify(minhaLista));
    toast.success('Filme salvo com sucesso!');
    navigation('/favoritos');
  }

  if (loading) {
    return <div><h1>Carregando...</h1></div>;
  } 

 
  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>


      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
      <h2>Sinopse:</h2>
      <p>{filme.overview}</p>
      <h3>Avaliação: {filme.vote_average} / 10</h3>
      <h3>Lançamento: {new Date(filme.release_date).toLocaleDateString()}</h3>
      <h3>Gêneros:</h3>
      <ul>
        {filme.genres && filme.genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>

      <h3>Orçamento: {filme.budget ? `R$ ${filme.budget.toLocaleString('pt-BR')}` : 'N/A'}</h3>
      <h3>Receita: {filme.revenue ? `R$ ${filme.revenue.toLocaleString('pt-BR')}` : 'N/A'}</h3>

      <div className="area-buttons">
        <button className='button-salvar' onClick={() => {salvarFilme()}}>salvar</button>

        <a className="button-trailer" href={`https://www.youtube.com/results?search_query=${filme.title} trailer`} target="_blank" rel="noopener noreferrer">
          Trailer
        </a>

      </div>
      <ToastContainer autoClose={9000} />
    </div>
  );
}

export default Filme;