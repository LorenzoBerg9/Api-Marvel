
import { Schema, model } from 'mongoose'

const SchemaCriadores = new Schema({
    nome: String,
    funcao: String,
    quadrinhosFeitos: String
}, {
    timestamps: true
});

export default model ("criadores", SchemaCriadores)