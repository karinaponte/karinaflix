import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from "../../../components/PageDefault"
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const { HandleChange, values } = useForm({
    titulo: '',
    url: '',
    categoria: '',
  });

  useEffect(() => {
    categoriasRepository
      .getAll()
      .then((categoriasFromServer) => {
        setCategorias(categoriasFromServer);
      });
  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de Vídeo</h1>

      <form onSubmit={(event) => {
        event.preventDefault();
        // alert('Vídeo Cadastrado com sucesso!');

        const categoriaEscolhida = categorias.find((categoria) => {
          return categoria.titulo === values.categoria;
        });

        videosRepository.create({
          titulo: values.titulo,
          url: values.url,
          categoriaId: categoriaEscolhida.id,
        })
          .then(() => {
            console.log("Cadastrado com sucesso!");
            history.push("/");
          });
      }}
      >


        <FormField
          label="Título do Vídeo"
          type="text"
          name="titulo" 
          value={values.titulo} 
          onChange={HandleChange} />

        <FormField
          label="URL"
          type="text"
          name="url" 
          value={values.url} 
          onChange={HandleChange} />  

        <FormField
          label="Categoria"
          type="text"
          name="categoria" 
          value={values.categoria} 
          onChange={HandleChange}
          suggestions={categoryTitles} 
        /> 

      
        <Button type="submit">
          Cadastrar
        </Button>
      </form>

      <br/>

      <Link to="/cadastro/categoria">
        Cadastrar Categoria
      </Link>

    </PageDefault>
  );
}

export default CadastroVideo;