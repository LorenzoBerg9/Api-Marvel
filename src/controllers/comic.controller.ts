import { Request, Response } from 'express'
import ServiceCategoria from "../services/comic.service"
import axios from 'axios'
import { TypeComics } from '../types/comic.type'
import comicService from '../services/comic.service'

class ControllerComics {

    async fetchMarvelComics(req: Request, res: Response) {
        try {
            const url = 'https://gateway.marvel.com:443/v1/public/series/3613/comics?apikey=15a747d5deefa91aeccf500bdd134ec4&ts=1&hash=b6a2d4722e1cd059c793dbd627db048b'
            const response = await axios.get(url);
            const data = response.data.data.results;

            for (const dataComics of data) {
                const dateObject = dataComics.dates.find((date: any) => date.type === 'onsaleDate');

                const dataPublicacao = dateObject ? dateObject.date : null;

                const novaDataComics: TypeComics = {
                    titulo: dataComics.title,
                    capa: dataComics.thumbnail.path,
                    descricacao: dataComics.description,
                    dataPublicacao: dataPublicacao
                };
                await ServiceCategoria.create(novaDataComics);
            } return res.status(200).json('Comics API Marvel criadas com sucesso');
        } catch (error: any) {
            res.status(500).json('Erro ao buscar comic Marvel');
        }
    }

    async create(req: Request, res: Response) {
        try {
            const comics = await comicService.create(req.body)
            res.status(201).json(comics)
        } catch (error: any) {
            res.status(500).json(error.message);
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const comicId = await comicService.findById(req.params.id);
            return res.status(200).json(comicId);
        } catch (error: any) {
            res.status(500).json(error.message);
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const comics = await comicService.findAll()
            return res.status(200).json(comics);
        } catch (error:any) {
            res.status(500).json(error.message);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const comics = await comicService.update(req.params.id, req.body);
            return res.status(200).json(comics);
        } catch (error:any) {
            res.status(500).json(error.message);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const comics = await comicService.delete(req.params.id);
            return res.status(204).json(comics);
        } catch (error:any) {
            res.status(500).json(error.message);
        }
    }

    async firstLetterOfName(req: Request, res: Response) {
        try {
            const letra = req.params.letra;
            const comics = await comicService.firstLetterOfName(letra);
            return res.status(200).json(comics);
        } catch (error:any) {
            res.status(500).json(error.message);
        }
    }

    async dataPubli(req: Request, res: Response) {
        try {
            const dataPublicacao = await comicService.dataPubli();
            return res.status(200).json(dataPublicacao);
        } catch (error:any) {
            res.status(500).json(error.message);
        }
    }

    async buscaPorDesc(req: Request, res: Response) {
        try {
            const comics = await comicService.buscaPorDesc();
            res.status(200).json(comics);
        } catch (error:any) {
            res.status(500).json(error.message);
        }
    }
}

export default new ControllerComics();