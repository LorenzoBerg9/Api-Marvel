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

    it("excluir um personagem ", async () => {
        const response = await request(app).delete('/personagens/:id');
        expect(response.status).toBe(204);
    });

    it("excluir criadores ", async () => {
        const response = await request(app).delete('/criadores/:id');
        expect(response.status).toBe(200);
    });

    it("excluir uma comic ", async () => {
        const response = await request(app).delete('/comics/:id');
        expect(response.status).toBe(200);
    });

    it('atualizar um criador ', async () => {
        const updatedCriador = {
            nome: 'criadorAtualizado',
            funcao: 'funcaoAtualizada',
            quadrinhosFeitos: '50'
        };
        const response = await request(app).put('/criadores/:id').send(updatedCriador);
        expect(response.status).toBe(200);
    });


    it('atualizar um personagem', async () => {
        const updatedPersonagem = {
            nome: 'personagemAtualizado',
            urlImagem: 'urlAtualizada',
            descricacao: 'descricaoAtualizada'
        };
        const response = await request(app).put('/personagem/:id').send(updatedPersonagem);
        expect(response.status).toBe(200);
    });

    it('atualizar uma comic ', async () => {
        const updatedCriador = {
            descricacao: "descricaoatualizada",
            titulo: "tituloatualizado",
            dataPublicacao: "dataatualizada",
            capa: "src/imagem.jpg"
        };
        const response = await request(app).put('/comics/:id').send(updatedCriador);
        expect(response.status).toBe(200);
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
        const response = await request(app).get('/bucarImagemPersonagem/:nome');
        expect(response.status).toBe(200);
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
        const response = await request(app).get('/comics/:id');
        expect(response.status).toBe(200);
    })

    it("buscar criadores por Id:", async () => {
        const response = await request(app).get('/criadores/:id');
        expect(response.status).toBe(200);
    })

    it("buscar personagens por Id:", async () => {
        const response = await request(app).get('/personagens/:id');
        expect(response.status).toBe(200);
    })

    it("buscar comics na API da marvel", async () => {
        const response = await request(app).post('/fetch-comics');
        expect(response.status).toBe(200);
    })

    it("buscar criadores na API da marvel", async () => {
        const response = await request(app).post('/fetch-criadores');
        expect(response.status).toBe(200);
    })

    it("buscar personagens na API da marvel", async () => {
        const response = await request(app).post('/fetch-personagens');
        expect(response.status).toBe(200);
    })


})