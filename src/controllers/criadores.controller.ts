import { Request, Response } from 'express'
import { TypeCriador } from '../types/criador.type';
import axios from 'axios';
import serviceCriadores from "../services/criador.service"

class ControlerCriadores {

    async fetchMarvelCriadores(req: Request, res: Response) {
        try {
            const url = 'https://gateway.marvel.com:443/v1/public/series/3613/creators?apikey=15a747d5deefa91aeccf500bdd134ec4&ts=1&hash=b6a2d4722e1cd059c793dbd627db048b';
            const response = await axios.get(url);
            const data = response.data.data.results;

            for (const criadores of data) {
                const criadornovo: TypeCriador = {
                    nome: criadores.fullName,
                    funcao: "autor",
                    HQfeitas: criadores.comics.available.toString()
                };
                await serviceCriadores.create(criadornovo);
            }
            return res.status(201).json("Criadores API Marvel salvos com sucesso");
        } catch (error: any) {
            res.status(500).json(error.message);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const criadores = await serviceCriadores.create(req.body)
            return res.status(201).json(criadores)
        } catch (error: any) {
            res.status(500).json(error.message);
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const criadorId = await serviceCriadores.findById(req.params.id);
            return res.status(200).json(criadorId);
        } catch (error: any) {
            res.status(500).json(error.message);
        }
    }

    async firstLetterOfName(req: Request, res: Response) {
        try {
            const letra = req.params.letra;
            const criadores = await serviceCriadores.firstLetterOfName(letra);
            return res.status(200).json(criadores);
        } catch (error: any) {
            res.status(500).json(error.message);
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const criadores = await serviceCriadores.findAll()
            return res.status(200).json(criadores);
        } catch (error: any) {
            res.status(500).json(error.message);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const criadores = await serviceCriadores.update(req.params.id, req.body);
            return res.status(201).json(criadores);
        } catch (error: any) {
            res.status(500).json(error.message);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const criadores = await serviceCriadores.delete(req.params.id);
            return res.status(201).json(criadores);
        } catch (error: any) {
            res.status(500).json(error.message);
        }
    }

    async moreThan(req: Request, res: Response) {
        try {
            const criadores = await serviceCriadores.moreThan(req.params.numeroHQ);
            return res.status(200).json(criadores);
        } catch (error: any) {
            res.status(500).json(error.message);
        }
    }

    async criadorFunctionInHQ(req: Request, res: Response) {
        try {
            const funcao = req.params.funcao;
            const criadores = await serviceCriadores.criadorFunctionInHQ(funcao);
            return res.status(200).json(criadores);
        } catch (error: any) {
            res.status(500).json(error.message);
        }
    }
}

export default new ControlerCriadores();