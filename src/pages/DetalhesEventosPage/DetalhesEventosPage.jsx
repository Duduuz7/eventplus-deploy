import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
// import TableDv from "./TableDv/TableDv";
import Container from "../../components/Container/Container";
import { Select } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import api, {
    eventsResource,
    myEventsResource,
    presencesEventResource,
    commentaryEventResource,
} from "../../Services/Service";

import { DetalhesEvents } from "../../components/NextEvent/NextEvent";

import "./DetalhesEventosPage.css";
import { UserContext } from "../../context/AuthContext";

const DetalhesEventosPage = () => {
    // state do menu mobile

    const [showSpinner, setShowSpinner] = useState(false);

    // recupera os dados globais do usuário
    const { userData } = useContext(UserContext);
    
    //STATES
    const [eventos, setEventos] = useState([]);
    const [nomeEvento, setNomeEvento] = useState([]);
    const [idEvento, setIdEvento] = useState();
    const [dataEvento, setDataEvento] = useState([]);
    const [descricao, setDescricao] = useState([]);

    useEffect(() => {
        loadAll();
    }, []); //

    async function loadAll() {
        setShowSpinner(true);
        // setEventos([]); //zera o array de eventos
        if (userData.Role === "Administrador") {
            //todos os eventos (Evento)
            try {

                const promiseEvento = await api.get(eventsResource);
                setEventos(promiseEvento.data)
                setNomeEvento(promiseEvento.data.nomeEvento)
                setIdEvento(promiseEvento.data.idEvento)
                setDataEvento(promiseEvento.data.dataEvento)
                setDescricao(promiseEvento.data.descricao)

            } catch (error) {
                //colocar o notification
                console.log("Erro na API");
                console.log(error);
            }
        } else {
            try {

            } catch (error) {
                //colocar o notification
                console.log("Erro na API");
                console.log(error);
            }
        }

        setShowSpinner(false);

    }

    return (
        <>
            <MainContent>
                <Container>
                    <Title titleText={"Detalhes Eventos"} additionalClass="custom-title" />

                    <DetalhesEvents
                        key={idEvento}
                        title={nomeEvento}
                        description={descricao}
                        eventDate={dataEvento}
                        idEvent={idEvento}
                    />

                </Container>
            </MainContent>
            {/* SPINNER -Feito com position */}
            {showSpinner ? <Spinner /> : null}
        </>
    );
};

export default DetalhesEventosPage;