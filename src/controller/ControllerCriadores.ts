import { Request, Response } from 'express'
import { TypeCriador } from '../types/criador.type';
import axios from 'axios';
import { createHash } from 'crypto';
import { watch } from 'fs';
import { ADDRGETNETWORKPARAMS } from 'dns';
import { json } from 'stream/consumers';
import  ServiceCriadores  from "../services/criador.service"


class ControlerCriadores {

    async buscarCriadores(req: Request, res: Response) {
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
                await ServiceCriadores.create(criadornovo);
            }
            return res.status(201).json({ messagem: "criador salvo!" });
        } catch {
            throw new Error('Error');
        }
    }

    async update(req: Request, res: Response) {
        try {
            const criadores = await ServiceCriadores.update(req.params.id, req.body);
            res.status(201)
            return res.json(criadores);
        } catch {
            throw new Error('Error');
        }
    }


    async delete(req: Request, res: Response) {
        try {
            const criadores = await ServiceCriadores.delete(req.params.id);
            res.status(201);
            return res.json(criadores);
        } catch {
            throw new Error('Error');
        }
    }

    async Funcao(req: Request, res: Response) {
        try {
            const funcao = req.params.funcao;
            const criadores = await ServiceCriadores.Funcao(funcao);
            return res.status(200).json(criadores);
        } catch {
            throw new Error('Error');
        }
    }

    async PrimeiraLetraDoNome(req: Request, res: Response) {
        try {
            const letra = req.params.letra;
            const criadores = await ServiceCriadores.PrimeiraLetraDoNome(letra);
            return res.status(200).json(criadores);
        } catch {
            throw new Error('Error');
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const criadores = await ServiceCriadores.findAll()
            res.status(200)
            return res.json(criadores);
        } catch {
            throw new Error('Error');
        }
    }

    async create(req: Request, res: Response) {
        try {
            const criadores = await ServiceCriadores.create(req.body)
            res.status(201)
            return res.json(criadores)
        } catch {
            throw new Error('Error');
        }
    }

    async Maisdecinco(req: Request, res: Response) {
        try {
            const criadores = await ServiceCriadores.Maisdecinco();
            res.status(200);
            return res.json(criadores);
        } catch {
            throw new Error('Error');
        }
    }
}

export default new ControlerCriadores();