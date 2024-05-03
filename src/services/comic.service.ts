import schemacomics from "../schemas/comic.schema";
import { TypeComics } from "../types/comic.type";


class ServiceCategoria {

    async create(TypeComics: TypeComics) {
        try {
            const comics = await schemacomics.create(TypeComics)
            return comics
        } catch {
            throw new Error('Error');
        }
    }

    async findById(id: string) {
        try {
            const comicsId = await schemacomics.findById(id);
            return comicsId
        } catch {
            throw new Error('Error');
        }
    }

    async findAll(){
        try{
            const comics = await schemacomics.find()
            return comics;
        } catch{
            throw new Error('Error');
        }
    }

    async update(id: string, comics: TypeComics) {
        try {
            const updateComics = await schemacomics.findByIdAndUpdate(id, {
                titulo: comics.titulo,
                descricacao: comics.descricacao,
                dataPublicacao: comics.dataPublicacao,
                capa: comics.capa
            }, {
                new: true
            })
            return updateComics;
        } catch {
            throw new Error('Error');
        }
    }

    async delete(id: string) {
        try {
            const deletecomics = await schemacomics.findByIdAndDelete(id)
            return "HQ removida"
        } catch {
            throw new Error('Error');
        }
    }

    async firstLetterOfName(letra: string) {
        try {
            const comics = await schemacomics.find({ titulo: { $regex: `^${letra}`, $options: 'i' } });
            return comics;
        } catch {
            throw new Error('Error');
        }
    }

    async dataPubli() {
        try {
            const dataPubli = await schemacomics.find({}, { _id: 0, dataPublicacao: 1 });
            return dataPubli;
        } catch {
            throw new Error('Error');
        }
    }

    async buscaPorDesc() {
        try {
            const comics = await schemacomics.find({ $where: 'this.descricao.length > 50' });
            return comics;
        } catch {
            throw new Error("erro de busca")
        }
    }
}

export default new ServiceCategoria();