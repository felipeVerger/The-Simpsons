import { useState } from 'react'
import { obtenerNoticias } from '../features/news/fakeRest';
import { capitalize, getTime } from '../features/news/news-utils';
export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: number | string;
  esPremium: boolean;
  imagen: string;
  descripcionCorta?: string;
}

const useFetch = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);

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
  
  return {obtenerInformacion, noticias}
}

export default useFetch