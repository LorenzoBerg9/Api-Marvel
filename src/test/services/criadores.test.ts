import criadorService from "../../services/criador.service";
import comicSchema from "../../schemas/comic.schema";
import criadorSchema from "../../schemas/criador.schema";

describe("teste criadoresService", () => {

    describe("teste findAll", () => {
        it("remove criadores", async () => {
            const criadores = await criadorService.findAll();
            expect(criadores).toBeDefined(); //
            expect(criadores!.length).toBeGreaterThan(0);
        });
        it("erro ao encontrar criadores", async () => {
            const id = "000";
            try {
                await criadorService.delete(id);
            } catch (error) {
                console.error(error);
            }
        });
    });

    describe("teste delete ", () => {
        it("remover criador", async () => {
            const id = "a60c0d2103eb0a949b94f9948ee67eca5ec37265";
            const resultado = await criadorService.delete(id);
            expect(resultado).toEqual("removido");
        });
        it("erro ao excluir", async () => {
            const id = "000";
            try {
                await criadorService.delete(id);
            } catch (error) {
                console.error(error);
            }
        });
    });

    describe("teste create", () => {
        it("criar criador", async () => {
            const CriadorNovo = { nome: "novo criador", funcao: "escritor",  HQfeitas: "mais de 5" };
            const criadorCriado = await criadorService.create(CriadorNovo);
            expect(criadorCriado).toBeDefined();
            if (criadorCriado) {
                const criadorachado = await criadorSchema.findById(criadorCriado._id);
                expect(criadorachado).toBeDefined();
                expect(criadorachado).toMatchObject(CriadorNovo);
            }
        });
        it("dados do criador invaliddo", async () => {
            const id = "000";
            try {
                await criadorService.delete(id);
            } catch (error) {
                console.error(error);
            }
        });
    });

    describe("teste update", () => {
        it("atualizar dados", async () => {
            const id = "a60c0d2103eb0a949b94f9948ee67eca5ec37265";
            const Dadosnovo = { nome: "novo ome", funcao: "nova funcao", HQfeitas: "Mais de 30" };
            const criadorAtualizado = await criadorService.update(id, Dadosnovo);
            expect(criadorAtualizado).toMatchObject(Dadosnovo);
        });
        it("atualiza criador que nao existe ", async () => {
            const id = "000";
            const Dadosnovo = { nome: "novo nome", funcao: "nova func ", HQfeitas: "mais de 5"};
            try {
                await criadorService.update(id, Dadosnovo);
            } catch (error) {
                console.error(error);
            }
        });
    });





})
