import { useEffect, useState } from "react"
import ColecaoCliente from "../backend/db/ColecaoCliente"
import Botao from "../components/Botao"
import Formulario from "../components/Formulario"
import Layout from "../components/Layout"
import Tabela from "../components/Tabela"
import Cliente from "../core/Cliente"
import ClienteRepositorio from "../core/ClienteRepositorio"

export default function Home() {

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')
  const [clientes, setClientes] = useState<Cliente[]>([])
  const colecaoCliente: ClienteRepositorio = new ColecaoCliente()

  function obterTodos() {
    colecaoCliente.obterTodos().then((data) => {
      setClientes(data)
    })
  }

  useEffect(function () {
    obterTodos()
  }, [])

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente)
    setVisivel('form')
  }
  function clienteExcluido(cliente: Cliente) {
    console.log('Excluir: ' + cliente.nome)
    colecaoCliente.excluir(cliente).then(() => {
      obterTodos()
    })
  }

  function novoCliente() {
    setCliente(Cliente.vazio())
    setVisivel('form')
  }

  function salvarCliente(cliente: Cliente) {
    if (cliente.id) {
      colecaoCliente.editar(cliente).then(() => {
        obterTodos()
      })
    } else {
      colecaoCliente.salvar(cliente).then((data) => {
        setClientes([
          ...clientes,
          data
        ])
      })
    }
    setVisivel('tabela')
  }

  return (
    <div className={`
    flex h-screen justify-center items-center
    bg-gradient-to-r from-blue-500 to-purple-500
    text-white
    `}>
      <Layout titulo="Cadastro Simples">
        <div className="flex justify-end">
          {visivel === 'tabela' ? (
            <Botao className="mb-4" cor="blue" onClick={novoCliente}>Novo cliente</Botao>
          ) : ''}
        </div>
        {visivel === 'tabela' ? (
          <Tabela
            clientes={clientes}
            clienteSelecionado={clienteSelecionado}
            clienteExcluido={clienteExcluido} />
        ) : (
          <Formulario cliente={cliente} cancelado={() => setVisivel('tabela')} clienteMudou={salvarCliente} />
        )}
      </Layout>
    </div >
  )
}
