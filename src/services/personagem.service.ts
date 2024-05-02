import SchemaPersonagens from '../schema/personagem.schema';
import { TypePersonagens } from '../types/personagem.type';
import personagemSchema from '../schema/personagem.schema';

class personagemServices {
    caminhoImagem() {
        throw new Error('Method not implemented.');
    }
    async create(personagemType: TypePersonagens) {
        try {
            const personagens = await SchemaPersonagens.create(personagemType);
            return personagens;
        } catch {
            throw new Error('Error');
        }
    }


    async update(id: string, personagens: TypePersonagens) {
        try {
            const updatepersonagem = await SchemaPersonagens.findByIdAndUpdate(id, {
                nome: personagens.nome,
                descricacao: personagens.descricacao,
                urlImagem: personagens.urlImagem
            }, { new: true });
            return updatepersonagem;
        } catch {
            throw new Error('Error');
        }
    }

    async findById(id: string) {
        try {
            const findedPersonagens = await personagemSchema.findById(id);
            return findedPersonagens;
        } catch {
            throw new Error('Error');
        }
    }

    async findAll() {
        try {
            const findedPersonagens = await personagemSchema.find()
            return findedPersonagens;
        } catch {
            throw new Error('Error');
        }
    }


    async buscarpersonagemPorNome(name: string) {
        try {
            const personagem = await SchemaPersonagens.find
                ({ nome: name })
        } catch {
            throw new Error('Error')
        }
    }

    async delete(id: string) {
        try {
            const deletePersonagem = await SchemaPersonagens.findByIdAndDelete(id)
            return "user deleted"
        } catch (error) {
            throw new Error("Error")
        }
    }


    async returnImage() {
        try {
            const personagem = await SchemaPersonagens.find({},
                {
                    urlImagem: 1
                })
            return personagem;
        } catch {
            throw new Error("Error")
        }
    }
}

export default new personagemServices();