import React, { useState } from 'react';
import PageDefault from "../../../components/PageDefault"
import { Link } from 'react-router-dom';
import FormField from "../../../components/FormField";

function CadastroCategoria() {
  const valoresIniciais = {
    nome: "",
    descricao: "",
    cor: "#000000"
  }

  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor){
    setValues({
      ...values,
      [chave]: valor
    })    
  }

  function HandleChange(event) {
    const { getAttribute, value } = event.target;
    setValue(
      getAttribute("name"),
      value
    );  
  }

    return (
      <PageDefault>
        <h1>Cadastro de Categoria: {values.nome} </h1>

        <form onSubmit={function handleSubmit(event) {
          event.preventDefault();

          setCategorias([
            ...categorias,
            values
          ]);

          setValues(valoresIniciais);


        }}>

          <FormField
          label="Nome da Categoria"
          type="text"
          name="nome" 
          value={values.nome} 
          onChange={HandleChange} />

          <div>
            <label>
              Descrição:
              <textarea
                type="text"
                name="descricao"
                value={values.descricao}
                onChange={HandleChange}
              />
            </label>
          </div>

          <FormField
          label="Cor"
          type="color"
          name="cor" 
          value={values.nome} 
          onChange={HandleChange} />  
        
          <button>
            Cadastrar
          </button>
        </form>

        <ul>
          {categorias.map( (categoria, indice) => {
            return (
              <li key={`${categoria}${indice}`}>
                {categoria.nome}
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