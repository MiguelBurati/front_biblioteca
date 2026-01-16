import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useEffect, useState } from 'react';
import { FaCirclePlus } from "react-icons/fa6";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi2";

function Home(){
    const [dados, setDados] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:5000/dados")
        .then((res) => setDados(res.data))
        .catch((err) => console.error(err));
    }, []);

    const deletar = async (id) => {
        try{
            const response = await axios.delete(`http://localhost:5000/dados/${id}`);
            setDados(dados.filter(livro => livro.id !== id));
            console.log("Dado excluido", response)
        } catch (error) {
            console.log("Erro ao deletar livro", error);
        }
    }
    
    const navigation = useNavigate();

    const confirmDelete = (id) => {
        const resposta = window.confirm("Confirmar exclusão?");
        if (resposta){
            deletar(id);
        } else {
            console.log("Exclusão cancelada");
        }
    } 

    return(
        <div className="App">
            <div className='header'>
                <h1>Biblioteca</h1>
                <FaCirclePlus className='addButon' onClick={() => navigation('/addLivro')}/>
            </div>

            <DataTable value={dados} tableStyle={{ minWidth: '50rem',maxWidth:'100rem', backgroundColor: '#f9f9f9' }}>
                <Column field='titulo' header="Título"></Column>
                <Column field='paginas' header="Páginas"></Column>
                <Column field='autor' header="Autor"></Column>
                <Column field='editora' header="Editora"></Column>
                <Column body={(rowData) => (
                    <div className="editIcons">
                        <HiOutlinePencil className="editButon" onClick={() => navigation('/addLivro', { state: rowData })}/>
                        <FaTrash className="deleteButon" onClick={() => (confirmDelete(rowData.id), { state: rowData })}/>
                    </div>
                    
                )} ></Column>
            </DataTable>
        </div>
    );
}

export default Home;