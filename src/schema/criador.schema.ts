
import { Schema, model } from 'mongoose'

const SchemaCriadores = new Schema({
    nome: String,
    funcao: String,
    HQfeitas: String
}, {
    timestamps: true
});

export default model ("criadores", SchemaCriadores)