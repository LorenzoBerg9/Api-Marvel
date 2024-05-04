import { Router } from "express";
import comicController from "./controllers/comic.controller";
import criadoresController from './controllers/criadores.controller'
import personagemController from './controllers/pesonagem.controller'

const routes = Router();

routes.post('/fetch-comics', comicController.fetchMarvelComics)
routes.post('/comics', comicController.create)
routes.get('/comics/:id', comicController.findById)
routes.get('/comics', comicController.findAll)
routes.put('/comics/:id', comicController.update)
routes.delete('/comics/:id', comicController.delete)

routes.post('/fetch-criadores', criadoresController.fetchMarvelCriadores)
routes.post('/criadores', criadoresController.create)
routes.get('/criadores/:id', criadoresController.findById)
routes.get('/criadores', criadoresController.findAll)
routes.put('/criadores/:id', criadoresController.update)
routes.delete('/criadores/:id', criadoresController.delete)

routes.post('/fetch-personagens', personagemController.fetchMarvelCharacters)
routes.post('/personagens', personagemController.create)
routes.get('/personagens/:id', personagemController.findById)
routes.get('/personagensName/:nome', personagemController.findByName)
routes.get('/personagens', personagemController.findAll)
routes.put('/personagem/:id', personagemController.update)
routes.delete("/personagens/:id", personagemController.delete)


routes.get('/moreThan/:numberHQ', criadoresController.moreThan);
routes.get('/primeiraLetraComic/:letra', comicController.firstLetterOfName); 
routes.get('/buscarCriador/:funcao', criadoresController.criadorFunctionInHQ); 
routes.get('/buscarImagemPersonagem/:nome', personagemController.findImagePathUrl); 
routes.get('/primeiraLetraCriador/:letra', criadoresController.firstLetterOfName); 


export{
    routes
}