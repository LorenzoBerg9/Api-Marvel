import { Schema, model } from 'mongoose'

const Schemacomic = new Schema({
    titulo: String,
    descricacao: String,
    dataPublicacao: Date,
    capa: String
});

export default Schemacomic;