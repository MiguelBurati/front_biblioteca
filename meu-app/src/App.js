import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/dados")
      .then((res) => setDados(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <h1>Biblioteca</h1>
      <ul>
        {dados.map((item) => 
          <li key={item.id}>
            {item.titulo} - {item.autor} ({item.paginas} páginas, {item.editora})
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;

//realizar a area de post