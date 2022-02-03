import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";
import { supabase } from "../config";

export default class ColecaoCliente implements ClienteRepositorio {

    async salvar(cliente: Cliente): Promise<Cliente> {
        const { data } = await supabase
            .from('pessoas')
            .insert({
                nome: cliente.nome,
                idade: cliente.idade,
            })
            .single()
        return data
    }

    async editar(cliente: Cliente): Promise<Cliente> {

        const { data } = await supabase
            .from('pessoas')
            .update({
                nome: cliente.nome,
                idade: cliente.idade
            })
            .eq('id', cliente.id)
            .single()

        return data
    }

    async excluir(cliente: Cliente): Promise<void> {
        await supabase
            .from('pessoas')
            .delete()
            .eq('id', cliente.id)
    }

    async obterTodos(): Promise<Cliente[]> {
        const { data } = await supabase
            .from('pessoas')
            .select('*')
        return data
    }
}