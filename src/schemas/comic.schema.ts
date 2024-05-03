import { Schema, model } from 'mongoose';

const SchemaComic = new Schema({
    titulo: String,
    descricacao: String,
    dataPublicacao: Date,
    capa: String
}, { 
    timestamps: true 
});

export default model ("comics",SchemaComic)
