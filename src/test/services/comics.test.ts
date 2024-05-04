import comicService from "../../services/comic.service";
import comicSchema from "../../schemas/comic.schema";

jest.mock('../../src/schemas/comic.shema');

describe("teste comicsService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("teste create", () => {
        it("criar comic", async () => {
            const ComicNew = {
                titulo: "teste",
                descricacao: "descricao",
                dataPublicacao: new Date("2024-03-20"),
                capa: "src/imagem.jpg"
            };
            (comicSchema.create as jest.Mock).mockResolvedValue(ComicNew);
            const comic = await comicSchema.create(ComicNew);
            expect(comic).toEqual(ComicNew);
        });
        it("faltando dados", async () => {
            const incompleteComic = {
                descricacao: "descicao erro",
                titulo: "test",
                dataPublicacao: new Date("2024-03-20"),
                capa: "src/imagem.jpg"
            };
            (comicSchema.create as jest.Mock).mockRejectedValue(new Error("incompleto"));

            await expect(comicSchema.create(incompleteComic)).rejects.toThrow("incompleto");
        });
    });


    describe("teste delete", () => {
        it("deletar comic", async () => {
            const id = "30f8f8d0b13bd39ee341558e2f6ba7ae2bd58b83";
            (comicSchema.findByIdAndDelete as jest.Mock).mockResolvedValue(true);
            const comicdeletada = await comicService.delete(id);
            expect(comicdeletada).toBeTruthy();
        });
        it("cimic n encontrada", async () => {
            const id = "0000";
            (comicSchema.findByIdAndDelete as jest.Mock).mockResolvedValue(false);
            const comicdeletada = await comicService.delete(id);
            expect(comicdeletada).toBeFalsy();
        });
    });


    describe("teste findAll", () => {
        it("lista de comics", async () => {
            const expectedComics = [{ titulo: "comic 0" }, { titulo: "comic 0" }];
            (comicSchema.find as jest.Mock).mockResolvedValue(expectedComics);
            const comics = await comicService.findAll();
            expect(comics).toEqual(expectedComics);
        });
        it("se n tiver comic", async () => {
            (comicSchema.find as jest.Mock).mockResolvedValue([]);
            const comics = await comicService.findAll();
            expect(comics).toEqual([]);
        });
    });


    describe("teste update", () => {
        it("atualizar comic", async () => {
            const id = "30f8f8d0b13bd39ee341558e2f6ba7ae2bd58b83";
            const ComicUpdate = {
                descricacao: "descricao",
                titulo: "test",
                dataPublicacao: new Date("2024-03-20"),
                capa: "src/imagem.jpg"
            };
            const atualizadoComicMock = { ...ComicUpdate, _id: id };
            (comicSchema.findByIdAndUpdate as jest.Mock).mockResolvedValue(atualizadoComicMock);
            const atualizadoComic = await comicService.update(id, ComicUpdate);
            expect(atualizadoComic).toEqual(atualizadoComicMock);
        });
        it("nao encontrado vai retornar null", async () => {
            const id = "000";
            const ComicUpdate = {
                descricacao: "descricao erro",
                titulo: "test",
                dataPublicacao: new Date("024-03-20"),
                capa: "src/imagem.jpg"
            };
            (comicSchema.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
            const atualizadoComic= await comicService.update(id, ComicUpdate);
            expect(atualizadoComic).toBeNull();
        });
    });



});