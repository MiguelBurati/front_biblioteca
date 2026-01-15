import { useEffect, useState } from 'react';
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import axios from "axios";
import './App.css';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
        

function App() {
  const [dados, setDados] = useState([]);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/dados")
      .then((res) => setDados(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <div className='header'>
        <h1>Biblioteca</h1>
        <FaCirclePlus className='addButon' onClick={() => setShowCard(true)}/>
      </div>

      <DataTable value={dados} tableStyle={{ minWidth: '50rem',maxWidth:'100rem', backgroundColor: '#f9f9f9' }}>
        <Column field='titulo' header="Título"></Column>
        <Column field='paginas' header="Páginas"></Column>
        <Column field='autor' header="Autor"></Column>
        <Column field='editora' header="Editora"></Column>
      </DataTable>

      {showCard && (
        <div className='card'>
          <div className='header'>
            <h1>Adicionar livro</h1>
            <IoIosCloseCircle className='closeButon' onClick={() => setShowCard(false)}/>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
