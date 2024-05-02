import axios from 'axios';
import { Request, Response } from 'express'
import { TypePersonagens } from '../types/personagem.type';
import personagemServices from '../services/personagem.service';

class ControllerPersonagem {

    async buscarPersonagem(req: Request, res: Response) {
        try {
            const url = 'https://gateway.marvel.com:443/v1/public/series/3613/characters?apikey=15a747d5deefa91aeccf500bdd134ec4&ts=1&hash=b6a2d4722e1cd059c793dbd627db048b'
            const response = await axios.get(url)
            const responseData = response.data.data.results;

            for (const resultData of responseData) {
                const personagem: TypePersonagens = {
                    nome: resultData.name,
                    urlImagem: resultData.thumbnail.path,
                    descricacao: resultData.description
                }
                await personagemServices.create(personagem);
            }
            return res.status(201).json({ message: "Personagem salvo" });
        } catch {
            throw new Error('Error');
        }
    }

    async buscarpersonagemPeloNome(req: Request, res: Response) {
        try {
            const nome = req.params.nome;
            const personagem = await personagemServices.buscarpersonagemPorNome(nome)
            res.status(200)
            return res.json(personagem)
        } catch {
            throw new Error('Error');
        }
    }

    async create(req: Request, res: Response) {
        try {
            const personagem = await personagemServices.create(req.body)
            res.status(201)
            return res.json(personagem)
        } catch {
            throw new Error('Error');
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const personagem = await personagemServices.findById(req.params.id);
            res.status(200)
            return res.json(personagem);
        } catch {
            throw new Error('Error');
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const personagem = await personagemServices.findAll()
            res.status(200)
            return res.json(personagem);
        } catch {
            throw new Error('Error');
        }
    }

    async update(req: Request, res: Response) {
        try {
            const personagem = await personagemServices.update(req.params.id, req.body);
            res.status(201)
            return res.json(personagem);
        } catch {
            throw new Error('Error');
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const personagem = await personagemServices.delete(req.params.id);
            res.status(201);
            return res.json(personagem);
        } catch {
            throw new Error('Error');
        }
    }

    async caminhoImagem(req: Request, res: Response) {
        try {
            const personagem = await personagemServices.caminhoImagem();
            res.status(200)
            return res.json(personagem)
        } catch {
            throw new Error('Error');
        }
    }
}

export default new ControllerPersonagem;