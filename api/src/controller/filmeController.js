import { isereFilme, alteraImagem, listarFilmes   } from '../repository/usuarioRepository.js';

import multer from 'multer' 
import { Router } from 'express'
import { alterarFilme, apagarFlmes, listarFilmes, listarPorId, listarPorNome } from '../repository/filmeRepository.js';


const server = Router();
const upload = multer({ dest: 'storage/capasFilmes' })

server.post( '/Filmes' , async (req,resp) => {

    try {
        const novoFilme = req.body;

        if(!novoFilme.nome){   throw new Error(' Nome do filme é obrigatório! ') }

        if(!novoFilme.sinopse){  throw new Error(' Sinopse do filme é obrigatório! ') }
        
        if(novoFilme.avaliacao == undefined || novoFilme.avaliacao < 0){ throw new Error(' Avaliação do filme é obrigatório! ') }        
        
        if(!novoFilme.Lancamento){  throw new Error(' Lançamento do filme é obrigatório! ') }
        
        if(novoFilme.disponivel  == undefined){  throw new Error(' O campo disponivel é do filme é obrigatório! ') }
        
        if(!novoFilme.usuario){ throw new Error(' Usuario do filme é obrigatório! ') }


        const filme = await isereFilme(novoFilme);
        resp.send(filme);
    } 
    catch (err) {

        resp.status(406).send({ erro: err.message })    

    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

server.put('/filme/:id/imagem', upload.single('capa') , async (req, resp)=> {

    try {
        const { id } = req.params;
        const alterar = req.file.path;

        const resposta = await alteraImagem(imagem, id);
        if(resposta != 1)  
            throw new Error('Não foi possivel salvar a imagem') 

        resp.status(204).send();
    } 
    catch (err) {
        
       resp.status(400).send({ erro: err.message })  
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

server.get( '/filme', async ( req, resp ) => {
    
    try {
        const resposta = await listarFilmes();
        resp.send(resposta);        
    } 
    catch (err) {

        resp.status(406).send({ 
            erro : err.message })
        
    }

    
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

server.get( '/Filme/busca', async ( req, resp ) => {
    
    try {
        const { nome } = req.query
        const resposta = await listarPorNome( nome );
        if(resposta.length == 0)
            throw new Error(' NÃO FOI POSSIVEL ACHAR O FILME')

        resp.send(resposta);        
    }  
    catch (err) {

        resp.status(406).send({ 
            erro : err.message 
        })
     
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

server.get( '/Filme/:id', async ( req, resp ) => {
    
    try {
        const id = Number( req.params.id);
        const resposta = await listarPorId(id);
        if(!resposta)
            throw new Error(' NÃO FOI POSSIVEL ACHAR O FILME')

        resp.send(resposta);        
    }  
    catch (err) {

        resp.status(406).send({ 
            erro : err.message 
        })
     
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

server.delete('/deletarFilme/:id', async (req,resp) => {

    try {
        const { id } = req.params;

        const resposta = await apagarFlmes(id);
        if(resposta != 1){
            throw new Error(' O filme não pode ser APAGADO  ');
        
        }
        resp.status(204).send()
    } 
    catch (err) {

        resp.status(406).send({ 
            erro : err.message 
        })
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

server.put('/filme/:id', async (req, resp) => {

    try {
        const { id } = req.params;
        const { filme } = req.body;

        if(!filme.nome){   throw new Error(' Nome do filme é obrigatório! ') }

        if(!filme.sinopse){  throw new Error(' Sinopse do filme é obrigatório! ') }
        
        if(filme.avaliacao == undefined || novoFilme.avaliacao < 0){ throw new Error(' Avaliação do filme é obrigatório! ') }        
        
        if(!filme.Lancamento){  throw new Error(' Lançamento do filme é obrigatório! ') }
        
        if(filme.disponivel == undefined){  throw new Error(' O campo disponivel é do filme é obrigatório! ') }
        
        if(!filme.usuario){ throw new Error(' Usuario do filme é obrigatório! ') }



        const alterar = await alterarFilme(id, filme);
         if(resposta != 1){
            throw new Error(' O filme não pode ser ALTERADO  ');
        
        }
        else

            resp.status(204).send()
        
    } catch (err) {

        resp.status(406).send({ 
            erro : err.message 
        })
    }

})