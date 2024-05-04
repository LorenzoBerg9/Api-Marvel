import request from 'supertest';
import app from '../app';

describe("teste rotas", () => {
    it('rotas', async () => {
        const requestPromises = [];
        const requestCount = 100;

        for (let i = 0; i < requestCount; i++) {
            requestPromises.push(request(app).get('/comics'));
        }

        const responses = await Promise.all(requestPromises);

        responses.forEach(response => {
            expect(response.status).toBe(200);
        });
    }, 10000); 
});
