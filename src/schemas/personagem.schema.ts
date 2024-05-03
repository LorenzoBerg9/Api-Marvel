import { Schema, model } from 'mongoose'

const SchemaPersonagens = new Schema({
    nome: String,
    urlImagem: String,
    descricacao: String
}, { 
    timestamps: true 
});

export default model ("Personagem", SchemaPersonagens);