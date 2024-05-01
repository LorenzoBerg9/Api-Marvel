import { Schema, model, Document } from 'mongoose';
import SchemaComic from '../schema/comic.schema';
import { TypeComics } from "../types/comic.type";

export default class ComicsService {

    async criarNovoItem(novoItem: TypeComics) {
        try {
            const itemCriado = await SchemaComic.create(novoItem);
            return itemCriado;
        } catch (error) {
            console.error('Erro ao criar um novo item:', error);
            throw error;
        }
    }

    async buscarTodosItens() {
        try {
            const itens = await SchemaComic.find();
            return itens;
        } catch (error) {
            console.error('Erro ao buscar todos os itens:', error);
            throw error;
        }
    }

    async atualizarItemPorId(id: string, novosDados: TypeComics) {
        try {
            const itemAtualizado = await SchemaComic.findByIdAndUpdate(id, novosDados, { new: true });
            return itemAtualizado;
        } catch (error) {
            console.error('Erro ao atualizar o item pelo ID:', error);
            throw error;
        }
    }

    async removerItemPorId(id: string) {
        try {
            const itemRemovido = await SchemaComic.findByIdAndDelete(id);
            return "Item Removido";
        } catch (error) {
            console.error('Erro ao remover o item pelo ID:', error);
            throw error;
        }
    }

    async buscarDatasPublicacao() {
        try {
            const datasPublicacao = await SchemaComic.find({}, { _id: 0, dataPublicacao: 1 });
            return datasPublicacao;
        } catch (error) {
            console.error('Erro ao buscar as datas de publicação:', error);
            throw error;
        }
    }

    async buscarPorLetraInicial(letra: string) {
        try {
            const itens = await SchemaComic.find({ titulo: { $regex: `^${letra}`, $options: 'i' } });
            return itens;
        } catch (error) {
            console.error('Erro ao buscar itens pela letra inicial do título:', error);
            throw error;
        }
    }

    async buscarPorDescricaoLonga() {
        try {
            const itens = await SchemaComic.find({ $where: 'this.descricao.length > 50' });
            return itens;
        } catch (error) {
            console.error('Erro ao buscar itens por descrição longa:', error);
            throw new Error('Erro ao buscar itens por descrição longa.');
        }
    }
}
