import { useState, useEffect } from 'react'; import React from 'react';
import { Link } from 'react-router-dom';
import './favoritos.css';
import { toast, ToastContainer } from 'react-toastify';


function excluirFilme(id) {                                                    // Função para excluir um filme
  const minhaLista = JSON.parse(localStorage.getItem('@primeflix')) || [];  // Obtém a lista de filmes salvos
  const novosFilmes = minhaLista.filter((filme) => filme.id !== id);        // Cria uma nova lista sem o filme excluído
  localStorage.setItem('@primeflix', JSON.stringify(novosFilmes));               // Salva a nova lista 
  toast.success('Filme removido com sucesso!');    
  window.location.reload(); // Recarrega a página para atualizar a lista de favoritos    
}

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = JSON.parse(localStorage.getItem('@primeflix')) || [];
    setFilmes(minhaLista);
  }, []);

  return (
    <div className="meus-favoritos">
      <h1>Meus Favoritos</h1>
      <ul className="favoritos-lista">
        {filmes.length === 0 && <span>Você não possui nenhum filme salvo.</span>}
        {filmes.map((filme) => (
          <li key={filme.id}>
            <span>{filme.title}</span>
            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
            <p>{filme.description}</p>


            <div className="actions">
              <Link  to={`/filme/${filme.id}`}>Detalhes</Link>
              <button onClick={() => excluirFilme(filme.id)}>Remover</button>
            </div>

          </li>



        ))}
      </ul>
      <Link to="/">Voltar para a home</Link>
      <ToastContainer autoClose={3000} />
      {/* Adiciona o ToastContainer para exibir notificações */}
    </div>
  );
}

export default Favoritos;