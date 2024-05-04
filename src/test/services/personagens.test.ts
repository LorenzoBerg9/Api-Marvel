import personagensService from "../../services/personagem.service";
import personagensSchema from "../../schemas/personagem.schema";
import { TypePersonagens } from "../../types/personagem.type";


jest.mock('../../src/schemas/personagem.schema');

describe("teste personagensService", () => {


    describe("teste create", () => {
        it("new personagem", async () => {
            const personagemNovo: TypePersonagens = { nome: "novo personagem", urlImagem: "url", descricacao: "nova descrição" };
            const personagemCriadoMock: TypePersonagens = { ...personagemNovo };
            (personagensSchema.create as jest.Mock).mockResolvedValue(personagemCriadoMock);
            const personagemCriado = await personagensService.create(personagemNovo);
            expect(personagemCriado).toEqual(personagemCriadoMock);
        });
    });



    describe("teste delete", () => {
        it("deletar personagem", async () => {
            const id = 'e485e17f45dbdc0596adbced0ff361aea62b55b5';
            (personagensSchema.findByIdAndDelete as jest.Mock).mockResolvedValue(true);
            const personagemDeletado = await personagensService.delete(id);
            expect(personagemDeletado).toBeTruthy();
        });

        it("false se n achar personagem", async () => {
            const id = '0000';
            (personagensSchema.findByIdAndDelete as jest.Mock).mockResolvedValue(false);
            const personagemDeletado = await personagensService.delete(id);
            expect(personagemDeletado).toBeFalsy();
        });
    });

    describe("teste update", () => {
        it("atualizar personagem", async () => {
            const id = '1010735';
            const updatedPersonagem = {
                nome: "Drax",
                urlImagem: "http://i.annihil.us/u/prod/marvel/i/mg/e/d0/526032deabbff",
                descricacao: ''
            };
            const personagemAtualizadoMock = { ...updatedPersonagem, _id: id };
            (personagensSchema.findByIdAndUpdate as jest.Mock).mockResolvedValue(personagemAtualizadoMock);
            const personagemAtualizado = await personagensService.update(id, updatedPersonagem);
            expect(personagemAtualizado).toEqual(personagemAtualizadoMock);
        });
        it("nao encontrado retorna null ", async () => {
            const id = "1009154";
            const updatedPersonagem = {
                nome: "Annihilus",
                urlImagem: "http://i.annihil.us/u/prod/marvel/i/mg/5/f0/528d31f20a2f6",
                descricacao: ""
            };
            (personagensSchema.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
            const personagemAtualizado = await personagensService.update(id, updatedPersonagem);
            expect(personagemAtualizado).toBeNull();
        });
    });


    describe("teste findAll", () => {
        it("lista de personagens", async () => {
            const personagensMock: TypePersonagens[] = [
                { nome: "personagem0 ", urlImagem: "url0", descricacao: "descr0" },
                { nome: "personagem1", urlImagem: "url1", descricacao: "descr1" },

            ];
            (personagensSchema.find as jest.Mock).mockResolvedValue(personagensMock);
            const personagens = await personagensService.findAll();
            expect(personagens).toEqual(personagensMock);
        });
        it("se nenhum for encontra, lista vazia", async () => {
            (personagensSchema.find as jest.Mock).mockResolvedValue([]);
            const personagens = await personagensService.findAll();
            expect(personagens).toEqual([]);
        });
    });


});