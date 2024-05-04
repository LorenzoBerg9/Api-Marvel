import request from 'supertest';
import app from '../app';

describe("teste para rotas API", () => {

    it("buscar comics", async () => {
        const response = await request(app).get("");
        expect(response.status).toBe(200);
    });


    it("criar comic", async () => {
        const newComic = {
            titulo: "testeRota",
            descricacao: "testeRotaDesc",
            dataPublicacao: new Date(),
            capa: "testeCapaRota"
        };
        const response = await request(app).post('/comics').send(newComic);
        expect(response.status).toBe(201);
    });






















})