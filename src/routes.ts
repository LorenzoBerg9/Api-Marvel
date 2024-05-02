import { Router } from "express";
import ControllerPersonagem from "./controller/ControllerPersonagem";


const routes = Router();


routes.post('/personagens', ControllerPersonagem.buscarPersonagem);