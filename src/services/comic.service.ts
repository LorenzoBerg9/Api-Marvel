import Schemacomics from "../schema/comic.schema";
import { TypeComics } from "../types/comic.type";


class ServiceCategoria {

    async create(TypeComics: TypeComics) {
        try {
            const comics = await Schemacomics.create(TypeComics)
            return comics
        } catch {
            throw new Error('Error');
        }
    }

    async delete(id: string) {
        try {
            const deletecomics = await Schemacomics.findByIdAndDelete(id)
            return "HQ removida"
        } catch {
            throw new Error('Error');
        }
    }

    async PrimeiraLetraDoNome(letra: string) {
        try {
            const comics = await Schemacomics.find({ titulo: { $regex: `^${letra}`, $options: 'i' } });
            return comics;
        } catch {
            throw new Error('Error');
        }
    }

    async dataPubli() {
        try {
            const dataPubli = await Schemacomics.find({}, { _id: 0, dataPublicacao: 1 });
            return dataPubli;
        } catch {
            throw new Error('Error');
        }
    }

    async BuscaPorDesc() {
        try {
            const comics = await Schemacomics.find({ $where: 'this.descricao.length > 50' });
            return comics;
        } catch {
            throw new Error("erro de busca")
        }
    }

    async update(id: string, comics: TypeComics) {
        try {
            const updateComics = await Schemacomics.findByIdAndUpdate(id, {
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

    async findAll(){
        try{
            const comics = await Schemacomics.find()
            return comics;
        } catch{
            throw new Error('Error');
        }
    }
}

export default new ServiceCategoria();