import { useState } from "react";
import Cliente from "../core/Cliente";
import Botao from "./Botao";
import Entrada from "./Entrada";

interface FormularioProps {
    cliente: Cliente
    cancelado?: () => void
    clienteMudou?: (cliente: Cliente) => void
    valorMutado?: () => void
}

export default function Formulario(props: FormularioProps) {

    const id = props.cliente?.id ?? null

    const [nome, setNome] = useState(props.cliente?.nome ?? '');
    const [idade, setIdade] = useState(props.cliente?.idade ?? 0);

    return (
        <div>
            {id ? (
            <Entrada className="mb-4" texto="Código" valor={id} somenteLeitura />
            ) : false }
            <Entrada className="mb-4" texto="Nome" valor={nome} valorMudou={setNome} />
            <Entrada texto="Idade" tipo="number" valor={idade} valorMudou={setIdade}  />
            <div className="flex justify-end mt-7">
                <Botao cor="blue" className="mr-2"
                onClick={() => props.clienteMudou?.(new Cliente(nome, idade, id))}>
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao className="mr-2" onClick={props.cancelado}>Cancelar</Botao>
            </div>
        </div>
    )
}