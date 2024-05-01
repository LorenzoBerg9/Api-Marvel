import { Schema, model } from 'mongoose'

const SchemaPersonagens = new Schema({
    nome: String,
    urlImagem: String,
    descricacao: String
});

export default SchemaPersonagens;