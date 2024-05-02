import { Schema, model, Document } from 'mongoose';
import SchemaComic from '../schema/comic.schema';
import { TypeComics } from "../types/comic.type";

export default class ComicsService {

    async buscarComic(novoItem: TypeComics) {
        try {
            const itemCriado = await SchemaComic.create(novoItem);
            return itemCriado;
        } catch (error) {
            console.error('Erro ao criar um novo item:', error);
            throw error;
        }
    }

}
