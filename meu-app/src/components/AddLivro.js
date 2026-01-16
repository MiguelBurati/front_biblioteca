import { IoArrowBackCircle } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './addLivro.css';
import { useState } from "react";

function AddLivro(){
    const navigation = useNavigate();
    
    //armazenar os dados vindo pelo edit
    const location = useLocation();
    const dadosLivro = location.state || {};

    //verifica se esta vindo como edica ou adicao
    const isEdit = !!location.state;

    const [titulo, setTitulo] = useState(dadosLivro.titulo || '');
    const [paginas, setPaginas] = useState(dadosLivro.paginas || '');
    const [autor, setAutor] = useState(dadosLivro.autor || '');
    const [editora, setEditora] = useState(dadosLivro.editora || '');
  
    const cadastrar = async () => {
        try {
            const response = await axios.post("http://localhost:5000/dados", {
                titulo: titulo,
                paginas: paginas,
                autor: autor,
                editora: editora
            });
            console.log("Livro adicionado", response.data);
            setTitulo('');
            setPaginas('');
            setAutor('');
            setEditora('');
        } catch (error) {
            console.log("Erro ao adicionar livro", error);
        }
    }; 

    const atualizar = async () => {
        try{
            const response = await axios.put(`http://localhost:5000/dados/${dadosLivro.id}`, {
                titulo,
                paginas,
                autor,
                editora
            });
            navigation('/');
            console.log("Livro atualizado", response.data);
        } catch (error) {
            console.log("Erro ao atualizar livro", error);
        }
    }

    return(
        <div className='container'>
            <div className='header'>
                <IoArrowBackCircle className='closeButon' onClick={() => navigation('/')}/>
                <h1>{ isEdit? "Editar livro" : "Adicionar livro"}</h1>
            </div>
            <div className='cadastro'>
                <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)}></input>
                <input type="number" placeholder="Páginas" value={paginas} onChange={(e) => setPaginas(e.target.value)}></input>
                <input type="text" placeholder="Autor" value={autor} onChange={(e) => setAutor(e.target.value)}></input>
                <input type="text" placeholder="Editora" value={editora} onChange={(e) => setEditora(e.target.value)}></input>
                <button onClick={isEdit? atualizar : cadastrar}>{isEdit? "Confirmar" : "Cadastrar"}</button>
            </div>
        </div>
    )
}

export default AddLivro;