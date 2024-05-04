import request from 'supertest';
import app from '../app';


describe("teste para rotas API", () => {
    it("criar uma nova comic", async () => {
        const newComic = {
            titulo: 'testeRota',
            descricacao: 'testeRotaDesc',
            dataPublicacao: new Date(),
            capa: 'testeCapaRota'
        };
        const response = await request(app).post('/comics').send(newComic);
        expect(response.status).toBe(201);
    });


    it('Deve criar um criador', async () => {
        const newCriador = {
            nome: 'natan',
            funcao: 'autor',
            quadrinhosFeitos: '40'
        };
        const response = await request(app).post('/criadores').send(newCriador);
        expect(response.status).toBe(201);
    });

    it("Deve criar personagem", async () => {
        const newPersonagem = {
            nome: 'testeRota',
            urlImagem: 'urlTesteROta',
            descricacao: 'descricaoTesteRota'
        };
        const response = await request(app).post('/personagens').send(newPersonagem);
        expect(response.status).toBe(201);
    });

    it("excluir personagem ", async () => {
        const newPersonagem = {
            nome: 'testeRota',
            urlImagem: 'urlTesteROta',
            descricacao: 'descricaoTesteRota'
        };
        const response = await request(app).post('/personagens').send(newPersonagem);
        const personagem = response.body;
        expect(response.status).toBe(201);
        const responseDelete = await request(app).delete(`/personagens/${personagem._id}`);
        expect(responseDelete.status).toBe(204);
    });


    it("excluir criadores ", async () => {
        const newCriador = {
            nome: 'testeRota',
            funcao: 'editor',
            quadrinhosFeitos: 'quadrinhos'
        };
        const response = await request(app).post('/criadores').send(newCriador);
        const criador = response.body;
        expect(response.status).toBe(201);
        const responseDelete = await request(app).delete(`/criadores/${criador._id}`);
        expect(responseDelete.status).toBe(204);
    });

    it("excluir uma comic ", async () => {
        const newComic = {
            titulo: 'testeRota',
            descricacao: 'testeRotaDesc',
            dataPublicacao: new Date(),
            capa: 'testeCapaRota'
        };
        const response = await request(app).post('/comics').send(newComic);
        const comic = response.body;
        expect(response.status).toBe(201);
        const responseDelete = await request(app).delete(`/comics/${comic._id}`);
        expect(responseDelete.status).toBe(204);
    });

    it('atualizar um criador ', async () => {
        const newCriador = {
            nome: 'newcriador',
            funcao: 'nrefuncao',
            quadrinhosFeitos: '30'
        };
        const response = await request(app).post('/criadores').send(newCriador);
        const criador = response.body;
        expect(response.status).toBe(201);
        const update = {
            nome: 'criadorAtualizado',
            funcao: 'funcaoAtualizada',
            quadrinhosFeitos: '50'
        };
        const responseCriador = await request(app).put(`/criadores/${criador._id}`).send(update);
        const updatedCriador = responseCriador.body;
        expect(responseCriador.status).toBe(200);
        expect(updatedCriador.nome).toBe("criadorAtualizado");
    });

    it('atualizar um personagem', async () => {
        const newPersonagem = {
            nome: 'newpersonagem',
            urlImagem: 'urlnew',
            descricacao: 'descricaonew'
        };
        const response = await request(app).post('/criadores').send(newPersonagem);
        const personagem = response.body;
        expect(response.status).toBe(201);
        const update = {
            nome: 'personagematualizado',
            urlImagem: 'http://i.annihil.us/u/prod/marvel/i/mg/e/d0/526032deabbff.jpg',
            descricacao: 'decricaoAtualizada'
        };
        const responsePersonagem = await request(app).put(`/criadores/${personagem._id}`).send(update);
        const updatedPersonagem = responsePersonagem.body;
        expect(responsePersonagem.status).toBe(200);
        expect(updatedPersonagem.nome).toBe("personagematualizado");
    });

    it('atualizar uma comic ', async () => {
        const newComic = {
            descricacao: "descricaonew",
            titulo: "titulonew",
            dataPublicacao: new Date(),
            capa: "urlnew"
        };
        const response = await request(app).post('/comics').send(newComic);
        const comic = response.body;
        expect(response.status).toBe(201);
        const update = {
            descricacao: "descricaoupdate",
            titulo: "tituloupdate",
            dataPublicacao: new Date(),
            capa: "http://i.annihil.us/u/prod/marvel/i/mg/6/e0/57850eb63ba98"
        };
        const responseComic = await request(app).put(`/comics/${comic._id}`).send(update);
        const updatedComic = responseComic.body;
        expect(responseComic.status).toBe(200);
        expect(updatedComic.descricacao).toBe("descricaoupdate");
    });

    it('buscar todas as comics', async () => {
        const response = await request(app).get('/comics');
        expect(response.status).toBe(200);
    });

    it('buscar todos criadores', async () => {
        const response = await request(app).get('/criadores');
        expect(response.status).toBe(200);
    });

    it('buscar todos personagens', async () => {
        const response = await request(app).get('/personagens');
        expect(response.status).toBe(200);
    });

    it('Deve buscar um personagem pelo nome', async () => {
        const response = await request(app).get('/personagensName/:nome');
        expect(response.status).toBe(200);
    });


    it('buscar criador por função', async () => {
        const response = await request(app).get('/buscarCriador/:funcao');
        expect(response.status).toBe(200);
    });

    it('buscar imagem do personagem', async () => {

        const newPersonagem = {
            nome: 'TestePersonagem',
            urlImagem: 'urlTesteROta',
            descricacao: 'descricaoTesteRota'
        };
        const responsePersonagem = await request(app).post('/personagens').send(newPersonagem);
        expect(responsePersonagem.status).toBe(201);
        const nomePersonagem = 'TestePersonagem';
        const response = await request(app).get(`/bucarImagemPersonagem/${nomePersonagem}`);
        const imagem = response.body;
        expect(response.status).toBe(200);
        expect (imagem).toBe(`urlTesteROta`);
    });


    it('buscar comics por letra', async () => {
        const response = await request(app).get('/PrimeiraLetraComic/:letra');
        expect(response.status).toBe(200);
    });

    it('buscar criador por letra', async () => {
        const response = await request(app).get('/primeiraLetraCriador/:letra');
        expect(response.status).toBe(200);
    });

    it("buscar comics por Id:", async () => {
        const newComic = {
            titulo: 'testeRota',
            descricacao: 'testeRotaDesc',
            dataPublicacao: new Date(),
            capa: 'testeCapaRota'
        };
        const responseComic = await request(app).post('/comics').send(newComic);
        expect(responseComic.status).toBe(201);
        const nomeComicID = responseComic.body
        const response = await request(app).get(`/comics/${nomeComicID._id}`);
        expect(response.status).toBe(200);
    })

    it("buscar criadores por Id:", async () => {
        const newCriador = {
            nome: 'natan',
            funcao: 'autor',
            quadrinhosFeitos: '40'
        };
        const responseCriador = await request(app).post('/criadores').send(newCriador);
        expect(responseCriador.status).toBe(201);
        const nomeCriadorID = responseCriador.body;
        const response = await request(app).get(`/criadores/${nomeCriadorID._id}`);
        expect(response.status).toBe(200);
    })

    it("buscar personagens por Id:", async () => {
        const newPersonagem = {
            nome: 'testeRota',
            urlImagem: 'urlTesteROta',
            descricacao: 'descricaoTesteRota'
        };
        const responsePersonagem = await request(app).post('/personagens').send(newPersonagem);
        expect(responsePersonagem.status).toBe(201);
        const nomePersonagemID = responsePersonagem.body;
        const response = await request(app).get(`/personagens/${nomePersonagemID._id}`);
        expect(response.status).toBe(200);
    });


    it("buscar comics na API da marvel", async () => {
        const response = await request(app).post('/fetch-comics');
        expect(response.status).toBe(200);
    })

    it("buscar criadores na API da marvel", async () => {
        const response = await request(app).post('/fetch-criadores');
        expect(response.status).toBe(201);
    })

    it("buscar personagens na API da marvel", async () => {
        const response = await request(app).post('/fetch-personagens');
        expect(response.status).toBe(201);
    })


})