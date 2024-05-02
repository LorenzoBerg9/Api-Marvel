import { StringifyOptions } from "querystring";
import SchemaCriadores from "../schema/criador.schema";
import { TypeCriador } from "../types/criador.type";

class ServiceCriadores {

    async create(TypeCriador: TypeCriador) {
        try {
            const criadores = await SchemaCriadores.create(TypeCriador)
            return criadores
        } catch {
            throw new Error('Error');
        }
    }


    async update(id: string, criadores: TypeCriador) {
        try {
            const updatecriadores = await SchemaCriadores.findByIdAndUpdate(id, {
                nome: criadores.nome,
                funcao: criadores.funcao,
                HQfeitas: criadores.HQfeitas
            },
                { new: true })
            return updatecriadores;
        } catch {
            throw new Error('Error');
        }
    }

    async PrimeiraLetraDoNome(letra: String) {
        try {
            const criadores = await SchemaCriadores.find({ nome: { $regex: `^${letra}`, $options: 'i' } });
            return criadores;
        } catch {
            throw new Error('Error');
        }
    }

    async findAll() {
        try {
            const criadores = await SchemaCriadores.find()
            return criadores;
        } catch {
            throw new Error('Error');
        }
    }

    async delete(id: string) {
        try {
            const deleteCriadores = await SchemaCriadores.findByIdAndDelete(id)
            return "O criador foi removido"
        } catch {
            throw new Error('Error');
        }
    }

    async Maisdecinco() {
        try {
            const criadores = await SchemaCriadores.find({ HQfeitas: { $gt: 20 } });
            return criadores;
        } catch {
            throw new Error('Error');
        }
    }

    async Funcao(funcao: string) {
        try {
            const criadores = await SchemaCriadores.find({ funcao: funcao });
            return criadores;
        } catch {
            throw new Error('Error');
        }
    }
}


export default new ServiceCriadores();