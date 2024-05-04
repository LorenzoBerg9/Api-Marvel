import { Request, Response } from 'express';
import criadoresController from '../../controllers/criadores.controller';


describe("teste criadoresController", () => {
    describe("teste findAll", () => {
        it("lista de criadores", async () => {
            const req = {} as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            await criadoresController.findAll(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([]));
        });

        it("retorna lista vazia se n ouver", async () => {
            const req = {} as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            await criadoresController.findAll(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]);
        });
    });


    describe("funcao cacete", () => {
        it('excluir criador', async () => {
            const req = {
                params: { id: 'a60c0d2103eb0a949b94f9948ee67eca5ec37265' }
            } as unknown as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            await criadoresController.delete(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'excluido' });
        });

        it("riador n encontrado", async () => {
            const req = {
                params: { id: "000" }
            } as unknown as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            await criadoresController.delete(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'ñ encontrado' });
        });
    });


    describe("teste create", () => {
        it('add um criador', async () => {
            const req = {
                body: { nome: "novo criador", funcao: "escritor", quadrinhosFeitos: "5" }
            } as unknown as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            await criadoresController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "criador add" });
        });

        it("criador estiver incompleto", async () => {
            const req = {
                body: { funcao: "escritor", quadrinhosFeitos: "3" }
            } as unknown as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            await criadoresController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "faltam dados do escritor" });
        });
    });

    describe("teste update", () => {
        it("atualiza criador", async () => {
            const req = {
                params: { id: 'a60c0d2103eb0a949b94f9948ee67eca5ec37265' },
                body: { nome: 'atualizado', funcao: "editor" }
            } as unknown as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            await criadoresController.update(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "atualizado" });
        });

        it("criador ñ encontrado", async () => {
            const req = {
                params: { id: '000' },
                body: { nome: 'atualizado', funcao: "editor" }
            } as unknown as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            await criadoresController.update(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "criador não encontrado" });
        });
    });

});