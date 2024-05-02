import { Request, Response, response } from 'express'
import ServiceCategoria from "../services/comic.service"
import axios from 'axios'
import { TypeComics } from '../types/comic.type'
import comicService from '../services/comic.service'
import { json } from 'stream/consumers'

class ControllerComics {

    async PesquisarComics(req: Request, res: Response) {
        try {
            const url = 'https://gateway.marvel.com:443/v1/public/series/3613/comics?apikey=15a747d5deefa91aeccf500bdd134ec4&ts=1&hash=b6a2d4722e1cd059c793dbd627db048b'
            const response = await axios.get(url);
            const data = response.data.data.results;

            for (const dataComics of data) {
                const dateObject = dataComics.dates.find((date: any) => date.type === 'onsaleDate');

                const dataPublicacao = dateObject ? dateObject.date : null;

                const novaDataComics: TypeComics = {
                    titulo: "Annihilation (2006 - 2007)",
                    capa: dataComics.thumbnail.path,
                    descricacao: dataComics.description,
                    dataPublicacao: dataPublicacao
                };
                await ServiceCategoria.create(novaDataComics);
            } return res.status(200).json({ message: 'Criado!' });
        } catch {
            throw new Error('Error');
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const comics = await comicService.delete(req.params.id);
            res.status(201);
            return res.json(comics);
        } catch {
            throw new Error('Error');
        }
    }

    async create(req: Request, res: Response) {
        try {
            const comics = await comicService.create(req.body)
            res.status(202)
            return res.json(comics)
        } catch {
            throw new Error('Error');
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const comics = await comicService.findAll()
            res.status(200)
            return res.json(comics);
        } catch {
            throw new Error('Error');
        }
    }

    async BuscaPorDesc(req: Request, res: Response) {
        try {
            const comics = await comicService.BuscaPorDesc();
            res.status(200).json(comics);
        } catch {
            throw new Error('Error');
        }
    }
    
    async dataPubli (req:Request, res:Response){
        try{
            const dataPublicacao = await comicService.dataPubli();
            res.status(200)
            return res.json(this.dataPubli)
        } catch {
            throw new Error('Error');
        }
    }

    async PrimeiraLetraDoNome (req: Request, res: Response){
        try{
            const letra = req.params.letra;
            const comics = await comicService.PrimeiraLetraDoNome(letra);
            res.status(200)
            return res.json(comics);
        } catch {
            throw new Error('Error');
        }
    }

    async update (req:Request, res:Response) {
        try{
            const comics = await comicService.update(req.params.id, req.body);
            res.status(201)
            return res.json(comics);
        } catch {
            throw new Error('Error');
        }
    }
}

export default new ControllerComics ();