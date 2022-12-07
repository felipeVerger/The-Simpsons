import React from 'react'
import {ContenedorModal, TarjetaModal, CloseButton, ImagenModal, CotenedorTexto, TituloModal, DescripcionModal, BotonSuscribir} from './styled';
import { SuscribeImage, CloseButton as Close } from "../../assets";
import { INoticiasNormalizadas } from '../../hooks/useFetch';

interface IProps {
    setModal: (props: INoticiasNormalizadas | null) => void;
    modal: INoticiasNormalizadas | null
}

const Modal = ({ setModal, modal }: IProps) => {
  return (
    <>
        {modal ? ( modal?.esPremium ? (
        <ContenedorModal>
            <TarjetaModal>
                <CloseButton onClick={() => setModal(null)}>
                <img src={Close} alt="close-button" />
                </CloseButton>
                <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
                <CotenedorTexto>
                <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
                <DescripcionModal>
                    Suscríbete a nuestro newsletter y recibe noticias de nuestros
                    personajes favoritos.
                </DescripcionModal>
                <BotonSuscribir
                    onClick={() =>
                    setTimeout(() => {
                        alert("Suscripto!");
                        setModal(null);
                    }, 1000)
                    }
                >
                    Suscríbete
                </BotonSuscribir>
                </CotenedorTexto>
            </TarjetaModal>
        </ContenedorModal>
        ) : (
            <ContenedorModal>
              <TarjetaModal>
                <CloseButton onClick={() => setModal(null)}>
                  <img src={Close} alt="close-button" />
                </CloseButton>
                <ImagenModal src={modal?.imagen} alt="news-image" />
                <CotenedorTexto>
                  <TituloModal>{modal?.titulo}</TituloModal>
                  <DescripcionModal>{modal?.descripcion}</DescripcionModal>
                </CotenedorTexto>
              </TarjetaModal>
            </ContenedorModal>
        )) : null}
    </>
  );
}

export default Modal;