import axios from 'axios';
import { Request, Response } from 'express'
import { TypePersonagens } from '../types/personagem.type';
import personagemServices from '../services/personagem.service';



class ControllerPersonagem {

    async buscarPersonagem(req:Request, res:Response){
        try{
            const url = await fetch('https://gateway.marvel.com:443/v1/public/series/3613/characters?apikey=15a747d5deefa91aeccf500bdd134ec4&ts=1&hash=b6a2d4722e1cd059c793dbd627db048b');
            const dataUrl = await url.json();
            const responseData = dataUrl.data.results;

            for(const resultData of responseData) {
                const personagem : TypePersonagens = {
                    nome: resultData.name,
                    urlImagem: resultData.thumbnail.path,
                    descricacao: resultData.description
                }
                await personagemServices.create(personagem);
            }
            return res.status(201).json ({ message: "Personagem salvo"});
        } catch{
            throw new Error('Error')
        }
    } 
}

export default new ControllerPersonagem();