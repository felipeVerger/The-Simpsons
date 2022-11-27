import { useEffect, useState } from "react";

import { obtenerNoticias } from "./fakeRest";
import Modal from "./Modal";
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

export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: number | string;
  esPremium: boolean;
  imagen: string;
  descripcionCorta?: string;
}

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  /**
   * It takes a string and returns a string with the first letter of each word capitalized.
   * @param {string} title - string - This is the title that we want to capitalize.
   * @returns A function that takes a string and returns a string.
   */
  const capitalize = (title: string): string => {
    return title.split(' ').map((string) => string.charAt(0).toUpperCase() + string.slice(1)).join(" ");
  }

  /**
   * Get the time difference between the current time and the time of the news article, and return the
   * difference in minutes.
   * @param {Date} fechaNoticia - Date =&gt; The date of the news
   * @returns The number of minutes between the current time and the time of the news.
   */
  const getTime = (fechaNoticia: Date): number => {
    const time = new Date();
    const minutosTranscurridos = Math.floor(
      (time.getTime() - fechaNoticia.getTime()) / 60000
    );
      return minutosTranscurridos;
  }

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();

      const data = respuesta.map((noticia) => {        
        const titulo = capitalize(noticia.titulo);
        const minutosTranscurridos = getTime(noticia.fecha)

        return {
          id: noticia.id,
          titulo,
          descripcion: noticia.descripcion,
          fecha: `Hace ${minutosTranscurridos} minutos`,
          esPremium: noticia.esPremium,
          imagen: noticia.imagen,
          descripcionCorta: noticia.descripcion.substring(0, 100),
        };
      });

      setNoticias(data);
    };

    obtenerInformacion();
  }, []);

  
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
