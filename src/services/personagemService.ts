import SchemaPersonagens from '../schema/personagem';
import { personagensType } from "";

export default class PersonagemService {
    private personagens: SchemaPersonagens[] = []; 

    async getAll(): Promise<Personagem[]> {
        try {
            // buscar todos os personagens
            return this.personagens;
        } catch (error) {
            console.error('Erro ao buscar personagens:', error);
            throw error;
        }
    }

    async getById(id: number): Promise<Personagem | null> {
        try {
            // buscar um personagem pelo ID
            const personagem = this.personagens.find(p => p.id === id);
            return personagem || null; // Retorna o personagem se encontrado, senão retorna null
        } catch (error) {
            console.error('Erro ao buscar personagem pelo ID:', error);
            throw error;
        }
    }

    async create(novoPersonagem: Personagem): Promise<Personagem> {
        try {
            const proximoId = this.personagens.length > 0 ? Math.max(...this.personagens.map(p => p.id)) + 1 : 1;
            const personagemComId: Personagem = { ...novoPersonagem, id: proximoId };

            this.personagens.push(personagemComId);

            return personagemComId;
        } catch (error) {
            console.error('Erro ao criar personagem:', error);
            throw error;
        }
    }

    async updateById(id: number, novosDados: Partial<Personagem>): Promise<Personagem | null> {
        try {
            const index = this.personagens.findIndex(p => p.id === id);
            if (index === -1) {
                return null; 
            }

            const personagemAtualizado = { ...this.personagens[index], ...novosDados };
            this.personagens[index] = personagemAtualizado;

            return personagemAtualizado;
        } catch (error) {
            console.error('Erro ao atualizar personagem pelo ID:', error);
            throw error;
        }
    }

    async deleteById(id: number): Promise<boolean> {
        try {
            const index = this.personagens.findIndex(p => p.id === id);
    
            if (index !== -1) {

                this.personagens.splice(index, 1);
                return true; 
            } else {
                return false; 
            }
        } catch (error) {
            console.error('Erro ao excluir personagem pelo ID:', error);
            throw error;
        }
    }
}