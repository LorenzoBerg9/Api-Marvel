import SchemaPersonagens from '../schema/personagem.schema';
import { TypePersonagens } from '../types/personagem.type';


class personagemServices {
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


}

export default new personagemServices();