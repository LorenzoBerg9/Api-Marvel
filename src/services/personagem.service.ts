import { TypePersonagens } from '../types/personagem.type';
import personagemSchema from '../schemas/personagem.schema';

class personagemServices {

    async create(personagemType: TypePersonagens) {
        try {
            const novoPersonagem = await personagemSchema.create(personagemType);
            return novoPersonagem;
        } catch {
            throw new Error('Error');
        }
    }

    async findById(id: string) {
        try {
            const personagemId = await personagemSchema.findById(id);
            return personagemId;
        } catch {
            throw new Error('Error');
        }
    }

    async findByName(name: string) {
        try {
            const personagem = await personagemSchema.find
                ({ nome: name })
                return personagem;
        } catch {
            throw new Error('Error')
        }
    }

    async findAll() {
        try {
            const personagens = await personagemSchema.find()
            return personagens;
        } catch {
            throw new Error('Error');
        }
    }

    async update(id: string, personagem: TypePersonagens) {
        try {
            const personagemAtualizado = await personagemSchema.findByIdAndUpdate(id, {
                nome: personagem.nome,
                descricacao: personagem.descricacao,
                urlImagem: personagem.urlImagem
            }, { new: true });
            return personagemAtualizado;
        } catch {
            throw new Error('Error');
        }
    }

    async delete(id: string) {
        try {
            const deletePersonagem = await personagemSchema.findByIdAndDelete(id)
            return deletePersonagem
        } catch (error) {
            throw new Error("Error")
        }
    }

    async returnImage(nome: string) {
        try {
            const personagem = await this.findByName(nome);
            return personagem[0].urlImagem;
        } catch {
            throw new Error("Error")
        }
    }
}

export default new personagemServices();