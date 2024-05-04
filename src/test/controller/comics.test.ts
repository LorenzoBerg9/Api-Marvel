import { Request, Response } from 'express';
import comicController from '../../controllers/comic.controller';
import comicService from '../../services/comic.service';


jest.mock('../../src/services/comic.service');

describe("testando comics", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("teste create", () => {
        it("cria uma comic", async () => {
            const req = {
                body: { titulo: "comic" }
            } as unknown as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            const ComicNew = { titulo: "comic 0" };
            (comicService.create as jest.Mock).mockResolvedValue(ComicNew);

            await comicController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "criado comic" });
        });
        it("erro se estiver faltando informação", async () => {
            const req = {
                body: { descricao: "descricao comic" }
            } as unknown as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            (comicService.create as jest.Mock).mockRejectedValue(new Error("faltando dados"));

            await comicController.create(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "dados incompletos" });
        });
    });

    describe("teste delete", () => {
        it("apaga comic", async () => {
            const id = "30f8f8d0b13bd39ee341558e2f6ba7ae2bd58b83";
            const req = { params: { id } } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            (comicService.delete as jest.Mock).mockResolvedValue(true);

            await comicController.delete(req, res);

            expect(res.status).toHaveBeenLastCalledWith(200);
            expect(res.json).toHaveBeenLastCalledWith({ message: "deletada" });
        });
        it("retorna erro", async () => {
            const id = "30f8f8d0b13bd39ee341558e2f6ba7ae2bd58b83";
            const Comicupdate = { titulo: "atualizada" };
            const req = { params: { id }, body: Comicupdate } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            (comicService.delete as jest.Mock).mockResolvedValue(false);

            await comicController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "nao encontrado" });
        });
    });

    describe("teste update", () => {
        it("atualiza comic", async () => {
            const id = "30f8f8d0b13bd39ee341558e2f6ba7ae2bd58b83";
            const Comicupdate = { titulo: "atualizado" };
            const comicAtualizadoMock = { ...Comicupdate, id: id };
            const req = { params: { id }, body: Comicupdate } as
                unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            (comicService.update as jest.Mock).mockResolvedValue(comicAtualizadoMock);
            await comicController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(comicAtualizadoMock);
        });
        it("retona 404 caso n encontre ", async () => {
            const id = "30f8f8d0b13bd39ee341558e2f6ba7ae2bd58b83";
            const updatedComic = { titulo: "Comic Atualizado" };
            const req = { params: { id }, body: updatedComic } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            (comicService.update as jest.Mock).mockResolvedValue(null);

            await comicController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "n encontrado" });
        });
    });


    describe("Teste delete", () => {
        it('deletar comic', async () => {
            const id = '30f8f8d0b13bd39ee341558e2f6ba7ae2bd58b83';
            const req = { params: { id } } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            (comicService.delete as jest.Mock).mockResolvedValue(true);

            await comicController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'deletado' });
        });
        it("erro 404", async () => {
            const id = '30f8f8d0b13bd39ee341558e2f6ba7ae2bd58b83';
            const req = { params: { id } } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            (comicService.delete as jest.Mock).mockResolvedValue(false);

            await comicController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'não encontrado' });
        });
    });

    describe("teste FindAll", () => {
        it("mostra lista de comics", async () => {
            const req = {} as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            const ComicExpected = [{ titulo: "Comic 0" }, { titulo: "Comic 1" }];
            (comicService.findAll as jest.Mock).mockResolvedValue(ComicExpected);

            await comicController.findAll(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(ComicExpected);
        });

        it("lista semn nada", async () => {
            const req = {} as Request;
            const res = {
                status: jest.fn(),
                json: jest.fn()
            } as unknown as Response;

            (comicService.findAll as jest.Mock).mockResolvedValue([]);

            await comicController.findAll(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]);
        });
    });

});