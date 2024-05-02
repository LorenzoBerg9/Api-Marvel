import { Router } from "express";
import ControllerComic from "./controller/ControllerComic";
import ControlerCriadores from './controller/ControllerCriadores'
import ControllerPersonagem from './controller/ControllerPersonagem'
import comicService from "./services/comic.service";

const routes = Router();

routes.post('/create-comics', ControllerComic.create)
routes.put('/comics/:id', ControllerComic.update)
routes.delete('/comics/delete/:id', ControllerComic.delete)
routes.get('/inserir-comics', ControllerComic.BuscaPorDesc)
routes.get('/comics', ControllerComic.findAll)

routes.post('/create-criadores', ControlerCriadores.create)
routes.put('/criadores/:id', ControlerCriadores.update)
routes.delete('/criadores/delete/:id', ControlerCriadores.delete)
routes.get('/inserir-criadores', ControlerCriadores.buscarCriadores)
routes.get('/criadores', ControlerCriadores.findAll)

routes.get('/inserir-personagens', ControllerPersonagem.buscarPersonagem)
routes.get('/personagens/:id', ControllerPersonagem.findAll)
routes.delete("/personagens/delete/:id", ControllerPersonagem.delete)
routes.post('/create-personagem', ControllerPersonagem.create)
routes.put('/personagem/:id', ControllerPersonagem.update)

//AUXILIARES: 

routes.get('/publicacao', ControllerComic.dataPubli);
routes.get('/BuscaPordescricao', ControllerComic.BuscaPorDesc);
routes.get('/maisdecinco', ControlerCriadores.Maisdecinco);
routes.get('/PrimeiraLetraComic/:letra', ControllerComic.PrimeiraLetraDoNome);
routes.get('/buscarCriador/:funcao', ControlerCriadores.Funcao);
routes.get('/bucarImagemPersonagem', ControllerPersonagem.caminhoImagem);
routes.get('/primeiraLetraCriador/:letra', ControlerCriadores.PrimeiraLetraDoNome);
routes.get('/buscaPersonagem/:nome', ControllerPersonagem.buscarpersonagemPeloNome);


export{
    routes
}