
import './erro.css';

function Erro () {
  return (
    <div className="erro">
      <h1>404</h1>
      <h2>Página não encontrada!</h2>
      <p>Desculpe, mas a página que você está procurando não existe.</p>
        <p>Verifique o endereço ou volte para a página inicial.</p>
        <a href="/">Voltar para a Home</a>
    </div>
  );
}

export default Erro;