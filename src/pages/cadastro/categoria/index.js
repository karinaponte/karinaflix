import React, { useState, useEffect } from 'react';
import PageDefault from "../../../components/PageDefault"
import { Link } from 'react-router-dom';
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import useForm from "../../../hooks/useForm";

function CadastroCategoria() {
  const valoresIniciais = {
    nome: "",
    descricao: "",
    cor: ""
  }

  const { HandleChange, values, clearForm } = useForm(valoresIniciais);

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const url = window.location.hostname.includes("localhost")
    ? "http://localhost:8080/categorias" 
    : "https://karinaflix.herokuapp.com/categorias";

    fetch(url)
      .then(async (res) => {
        const resposta = await res.json();
        setCategorias([
          ...resposta,
        ]);
      });

    // setTimeout(() => {
    //   setCategorias([
    //     ...categorias,
    //     {
    //       id: 1,
    //       nome: "Músicas",
    //       descricao: "Minhas Músicas Favoritas",
    //       cor: "#9932cc"
    //       },
    //       {
    //       id: 2,
    //       nome: "Filmes",
    //       descricao: "Meus Filmes Favoritos",
    //       cor: "#a346d1"
    //       },
    //       {
    //       id: 3,
    //       nome: "Séries",
    //       descricao: "Minhas Séries Favoritas",
    //       cor: "#ad5ad6"
    //       },
    //       {
    //       id: 4,
    //       nome: "Animes",
    //       descricao: "Meus Animes Favoritos",
    //       cor: "#b76fdb"
    //       },
    //       {
    //       id: 5,
    //       nome: "Desenhos Animados",
    //       descricao: "Meus Desenhos Animados Favoritos",
    //       cor: "#c184e0"
    //       },
    //       {
    //       id: 6,
    //       nome: "Jogos",
    //       descricao: "",
    //       cor: "#cc98e5"
    //       }
    //   ]);
    // }, 4000)
  }, []);

    return (
      <PageDefault>
        <h1>Cadastro de Categoria: {values.nome} </h1>

        <form onSubmit={function handleSubmit(event) {
          event.preventDefault();

          setCategorias([
            ...categorias,
            values
          ]);

          clearForm();


        }}>

          <FormField
          label="Nome da Categoria"
          type="text"
          name="nome" 
          value={values.nome} 
          onChange={HandleChange} />

          <FormField
          label="Descrição"
          type="textarea"
          name="descricao" 
          value={values.descricao} 
          onChange={HandleChange} />

          <FormField
          label="Cor"
          type="color"
          name="cor" 
          value={values.cor} 
          onChange={HandleChange} />  
        
          <Button>
            Cadastrar
          </Button>
        </form>

        {categorias.length === 0 && (
          <div>
            Loading...
          </div>
        )}

        <ul>
          {categorias.map( (categoria) => {
            return (
              <li key={`${categoria.titulo}`}>
                {categoria.titulo}
              </li>
            )
          })}
        </ul>

        <Link to="/">
          Ir para home
        </Link>
      </PageDefault>
    )
}

export default CadastroCategoria;