import express, { Request, Response } from 'express';
import PersonagemService from '..//../services/personagemService'
const router = express.Router();
const personagemService = new PersonagemService();

// Rotas para Personagens
router.get('/', async (req: Request, res: Response) => {
    try {
        const personagens = await personagemService.getAll();
        res.status(200).json(personagens);
    } catch (error) {
        console.error('Erro ao buscar personagens:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id); // Obtém o ID do parâmetro de rota e converte para número
        const personagem = await personagemService.getById(id); // Chama o método getById do serviço para buscar o personagem pelo ID

        if (personagem) {
            res.status(200).json(personagem); // Se o personagem for encontrado, retorna com status 200
        } else {
            res.status(404).json({ error: 'Personagem não encontrado' }); // Se o personagem não for encontrado, retorna com status 404
        }
    } catch (error) {
        console.error('Erro ao buscar personagem:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        // Extraia os dados do corpo da requisição
        const { nome, descricao, imagemUrl } = req.body;

        // Valide se todos os campos necessários estão presentes
        if (!nome || !descricao || !imagemUrl) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        // Crie um novo personagem usando o serviço
        const novoPersonagem = await personagemService.create({
            nome,
            descricao,
            imagemUrl,
            id: 0
        });

        // Envie a resposta com o novo personagem criado
        res.status(201).json(novoPersonagem);
    } catch (error) {
        console.error('Erro ao criar personagem:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { nome, descricao, imagemUrl } = req.body;

        if (!nome || !descricao || !imagemUrl) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const personagemAtualizado = await personagemService.updateById(id, {
            nome,
            descricao,
            imagemUrl,
            id // o ID pode ser opcional, dependendo da lógica do seu serviço
        });

        if (personagemAtualizado) {
            res.status(200).json(personagemAtualizado);
        } else {
            res.status(404).json({ error: 'Personagem não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar personagem:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        // Chame o método do serviço para excluir o personagem pelo ID
        const deletedPersonagem = await personagemService.deleteById(id);

        if (deletedPersonagem) {
            res.status(200).json({ message: 'Personagem excluído com sucesso' });
        } else {
            res.status(404).json({ error: 'Personagem não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao excluir personagem:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

export default router;
