import { useEffect, useState } from "react";
import useFetch, { INoticiasNormalizadas } from "../../hooks/useFetch";
import {
  TarjetaNoticia,
  FechaTarjetaNoticia,
  DescripcionTarjetaNoticia,
  ImagenTarjetaNoticia,
  TituloTarjetaNoticia,
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias,
  BotonLectura,
} from "./styled";
import Modal from "./Modal";

const Noticias = () => {
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);
  const {obtenerInformacion, noticias} = useFetch();

  useEffect(() => {
    obtenerInformacion();
  }, [obtenerInformacion]);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((noticia) => (
          <TarjetaNoticia key={noticia.id}>
            <ImagenTarjetaNoticia src={noticia.imagen} />
            <TituloTarjetaNoticia>{noticia.titulo}</TituloTarjetaNoticia>
            <FechaTarjetaNoticia>{noticia.fecha}</FechaTarjetaNoticia>
            <DescripcionTarjetaNoticia>
              {noticia.descripcionCorta}
            </DescripcionTarjetaNoticia>
            <BotonLectura onClick={() => setModal(noticia)}>Ver más</BotonLectura>
          </TarjetaNoticia>
        ))}
        <Modal setModal={setModal} modal={modal}/>
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;
