import { login } from '../repository/usuarioRepository.js';

import { Router } from 'express';
const server = Router();


server.post('/usuariao/login', async (req, resp) => {

    try {
        
        const {email , senha } =  req.body;

        const linha = await login(email , senha);
        if (!linha ) {
            throw new Error('Credencias inválidas');
        }

        resp.send( linha )
    
    } 
    catch (err) {
        
        resp.status(400).send({ error : err.message });
    }
}) 

export default server;