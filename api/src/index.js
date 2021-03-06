import 'dotenv/config'

// importações dos end-poits
import usuarioController from './controller/usuarioController.js'
import filmeController  from './controller/filmeController.js' 


import express from 'express'
import cors from 'cors'

const server = express();
server.use(cors());
server.use(express.json());

// liberar aquivos da storage
server.use( '/starage/capasFilmes' , express.static( '/starage/capasFilmes' ));

// configuração dos endpoints
server.use(usuarioController);
server.use(filmeController);



server.listen(process.env.PORT, () => console.log(` Api está online na porta  ${process.env.PORT}`));
