import schemaCriadores from "../schemas/criador.schema";
import { TypeCriador } from "../types/criador.type";

class ServiceCriadores {

    async create(TypeCriador: TypeCriador) {
        try {
            const novoCriador = await schemaCriadores.create(TypeCriador)
            return novoCriador;
        } catch {
            throw new Error('Error');
        }
    }

    async findById(id: string) {
        try {
            const criadorId = await schemaCriadores.findById(id);
            return criadorId
        } catch {
            throw new Error('Error');
        }
    }

    async firstLetterOfName(letra: String) {
        try {
            const criadores = await schemaCriadores.find({ nome: { $regex: `^${letra}`, $options: 'i' } });
            return criadores;
        } catch {
            throw new Error('Error');
        }
    }

    async findAll() {
        try {
            const criadores = await schemaCriadores.find()
            return criadores;
        } catch {
            throw new Error('Error');
        }
    }

    async update(id: string, criadores: TypeCriador) {
        try {
            const updateCriadores = await schemaCriadores.findByIdAndUpdate(id, {
                nome: criadores.nome,
                funcao: criadores.funcao,
                HQfeitas: criadores.HQfeitas
            },
                { new: true })
            return updateCriadores;
        } catch {
            throw new Error('Error');
        }
    }

    async delete(id: string) {
        try {
            const deleteCriadores = await schemaCriadores.findByIdAndDelete(id)
            return deleteCriadores;
        } catch {
            throw new Error('Error');
        }
    }

    async moreThan(numberHQ: string) {
        const valor = parseInt(numberHQ)
        try {
            const criadores = await schemaCriadores.find({ HQfeitas: { $gt: 5 } });
            return criadores;
        } catch {
            throw new Error('Error');
        }
    }

    async criadorFunctionInHQ(funcao: string) {
        try {
            const criadores = await schemaCriadores.find({ funcao: funcao });
            return criadores;
        } catch {
            throw new Error('Error');
        }
    }
}


export default new ServiceCriadores();