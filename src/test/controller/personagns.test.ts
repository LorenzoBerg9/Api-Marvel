import { Request, Response } from 'express';
import personagemServices from '../../services/personagem.service';
import ControllerPersonagem from '../../controllers/pesonagem.controller'
import { TypePersonagens } from '../../types/personagem.type';

jest.mock('../../src/services/personagens.service');

describe('teste personagemController', () => {

    describe("teste delete", () => {
        it("deletar", async () => {
            const id = 'e485e17f45dbdc0596adbced0ff361aea62b55b5';
            const req = { params: { id } } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            (personagemServices.delete as jest.Mock).mockResolvedValue(true);
            await ControllerPersonagem.delete(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'deletado' });
        });
        it("personagem n encontrado", async () => {
            const id = 'e485e17f45dbdc0596adbced0ff361aea62b55b5';
            const req = { params: { id } } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            (personagemServices.delete as jest.Mock).mockResolvedValue(false);
            await ControllerPersonagem.delete(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "ñ encontrado" });
        });
    });


    describe("teste findAll", () => {
        it("lista personagens", async () => {
            const personagensMock: TypePersonagens[] = [
                { nome: "personagem0", urlImagem: "url0", descricacao: "descricao0" },
                { nome: "personagem1", urlImagem: "url1", descricacao: "descricao1" },
            ];
            const req = {} as Request;
            const res = { json: jest.fn() } as unknown as Response;
            (personagemServices.findAll as jest.Mock).mockResolvedValue(personagensMock);
            await ControllerPersonagem.findAll(req, res);
            expect(res.json).toHaveBeenCalledWith(personagensMock);
        });
        it('personagem n achado', async () => {
            const req = {} as Request;
            const res = { json: jest.fn() } as unknown as Response;
            (personagemServices.findAll as jest.Mock).mockResolvedValue([]);
            await ControllerPersonagem.findAll(req, res);
            expect(res.json).toHaveBeenCalledWith([]);
        });
    });



    describe("teste create", () => {
        it("cria personagem", async () => {
            const newPersonagem: TypePersonagens = { nome: "novo personagem", urlImagem: "url", descricacao: "nova descricao" };
            const personagemCriadoMock: TypePersonagens = { ...newPersonagem };
            const req = { body: newPersonagem } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            (personagemServices.create as jest.Mock).mockResolvedValue(personagemCriadoMock);
            await ControllerPersonagem.create(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(personagemCriadoMock);
        });
    });



    describe("teste update", () => {
        it("atualizar personagem", async () => {
            const id = 'e485e17f45dbdc0596adbced0ff361aea62b55b5';
            const updatedPersonagem = { nome: 'atualizado' };
            const personagemAtualizadoMock = { ...updatedPersonagem, _id: id };
            const req = { params: { id }, body: updatedPersonagem } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            (personagemServices.update as jest.Mock).mockResolvedValue(personagemAtualizadoMock);
            await ControllerPersonagem.update(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(personagemAtualizadoMock);
        });
        it("personagem n encontrado e erro 404", async () => {
            const id = 'e485e17f45dbdc0596adbced0ff361aea62b55b5';
            const updatedPersonagem = { nome: ' atualizado' };
            const req = { params: { id }, body: updatedPersonagem } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            (personagemServices.update as jest.Mock).mockResolvedValue(null);

            await ControllerPersonagem.update(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'n encontrado' });
        });
    });
});
