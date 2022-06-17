
import { con } from './connection.js';

export async function isereFilme( filme){

    //console.log(filme);

    const comando =
        `
        INSERT INTO tb_filme (id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
                       VALUES (?, ?, ?, ?, ?, ?); 
        `
    const [resposta] = await con.query(comando, [ filme.usuario, filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel ]);
    filme.id = resposta.insertId;
    return filme;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function alteraImagem(imagem, id){

    const comando = 
        `
         UPDATE  tb_filme 
            SET  img_filme     = ?
         WHERE   id_filme      = ?
        `
    const [resposta]= await con.query(comando = [imagem , id]);
    return resposta.affectedRows;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function listarFilmes(){

    const comando =
            `
      SELECT id_filme			id,
             nm_filme			nome,
             vl_avaliacao		avaliacao,
             dt_lancamento	lancamento,
             bt_disponivel	disponivel,
             id_usuario       usuario
        FROM tb_filme;
        `
    const [linhas] = await con.query(comando);  
    return linhas;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function listarPorId(id){

    //console.log(id);

    const comando =
        `
         SELECT id_filme	    id,
                nm_filme	    nome,
                vl_avaliacao  	avaliacao,
                ds_sinopse		sinopse,
                dt_lancamento	lancamento,
                bt_disponivel	disponivel,
                img_filme       capa,
                id_usuario       usuario
           FROM tb_filme
          WHERE id_filme			= ? `
    const [linhas] = await con.query(comando, [id]);  
    return linhas[0];
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function listarPorNome(nome){

    const comando =
        `
        SELECT id_filme			id,
               nm_filme			nome,
               vl_avaliacao		avaliacao,
               dt_lancamento	lancamento,
               bt_disponivel	disponivel,
               id_usuario       usuario
          FROM tb_filme;
         WHERE nm_filme    like ?
        `
    const [linhas] = await con.query(comando, [ `%${nome}%` ]);  
    return linhas;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function apagarFlmes(id){

    const comando =
    `
        DELETE FROM tb_filme 
              WHERE id_filme = ?
    `
    const [resposta] = await con.query(comando, [id] );
    return resposta.affectedRows;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function alterarFilme(id,filme){
    
        const comando= 
        `
        UPDATE tb_filme 
         SET nm_filme          = ?,
             ds_sinopse        = ?,
             vl_avaliacao      = ?,
             dt_lancamento     = ?,
             bt_disponivel     = ?
      WHERE id_filme           = ?`
      
      const [resposta] =await con.query(comando, [ filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel, id]);
       return resposta.affectedRows;
}