import axios from 'axios';
import { Request, Response } from 'express'
import { TypePersonagens } from '../types/personagem.type';
import personagemServices from '../services/personagem.service';

class ControllerPersonagem {

    async fetchMarvelCharacters(req: Request, res: Response) {
        try {
            const url = 'https://gateway.marvel.com:443/v1/public/series/3613/characters?apikey=15a747d5deefa91aeccf500bdd134ec4&ts=1&hash=b6a2d4722e1cd059c793dbd627db048b'
            const response = await axios.get(url)
            const responseData = response.data.data.results;

            for (const resultData of responseData) {
                const extension = resultData.thumbnail.extension;
                const personagem: TypePersonagens = {
                    nome: resultData.name,
                    urlImagem: resultData.thumbnail.path + "." + extension,
                    descricacao: resultData.description
                }
                await personagemServices.create(personagem);
            }
            return res.status(201).json("Personagens API Marvel salvos com sucesso");
        } catch (error: any) {
            res.status(500).json('Erro ao buscar personagens na Marvel API');
        }
    }

    async create(req: Request, res: Response) {
        try {
            const novoPersonagem = await personagemServices.create(req.body)
            return res.status(201).json(novoPersonagem)
        } catch (error: any) {
            res.status(500).json('Erro ao criar personagem');
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const personagemId = await personagemServices.findById(req.params.id);
            console.log(personagemId);
            return res.status(200).json(personagemId);
        } catch (error: any) {
            res.status(500).json('Erro ao buscar personagem(s)');
        }
    }

    async findByName(req: Request, res: Response) {
        try {
            const nome = req.params.nome;
            const personagem = await personagemServices.findByName(nome);

            if (personagem.length == 0) {
                return res.status(404).json("Personagem não encontrado");
            }
            return res.status(200).json(personagem)
        } catch (error: any) {
            res.status(500).json('Erro ao buscar personagem');
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const personagens = await personagemServices.findAll()
            return res.status(200).json(personagens);
        } catch (error: any) {
            res.status(500).json('Erro ao buscar personagem(s)');
        }
    }

    async update(req: Request, res: Response) {
        try {
            const personagemAtualizado = await personagemServices.update(req.params.id, req.body);
            return res.status(201).json(personagemAtualizado);
        } catch (error: any) {
            res.status(500).json('Erro ao atualizar personagem(s)');
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await personagemServices.delete(req.params.id);
            res.status(204).json('Personagem deletado com sucesso');
        } catch (error: any) {
            res.status(500).json('Erro ao deletar personagem');
        }
    }

    async findImagePathUrl(req: Request, res: Response) {
        try {
            const imagemPersonagem = await personagemServices.returnImage(req.params.nome);
            res.status(200)
            res.status(200).json(imagemPersonagem)
        } catch (error: any) {
            res.status(500).json('Erro ao buscar url imagem');
        }
    }
}

export default new ControllerPersonagem;