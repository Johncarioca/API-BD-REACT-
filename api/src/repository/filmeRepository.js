
import { con } from "./connection.js";

export function isereFilme( filme){

    const comando =
        `
        INSERT INTO tb_filme (id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
                       VALUES (?, ?, ?, ?, ?, ?); 
        `
    const [resposta] = await con.query(comando [ filme.usuario, filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel ]);
    filme.id = resposta.insertId;

    return filme;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function alteraImagem(imagem, id){

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

export function listarFilmes(){

    const comando =
            `
      SELECT id_filme			id,
             nm_filme			nome,
             vl_avaliacao		avaliacao,
             dt_lancamento	lancamento,
             bt_disponivel	disponivel
        FROM tb_filme;
        `
    const [linhas] = await con.query(comando);  
    return linhas;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function listarPorId(id){

    const comando =
        `
        SELECT id_filme			id,
               nm_filme			nome,
               ds_sinopse       sinopse,
               img_filme        imagem,
               vl_avaliacao		avaliacao,
               dt_lancamento	lancamento,
               bt_disponivel	disponivel
          FROM tb_filme;
         WHERE id_filme = ? `;
    const [linhas] = await con.query(comando, [id]);  
    return linhas[0];
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function listarPorNome(nome){

    const comando =
        `
        SELECT id_filme			id,
               nm_filme			nome,
               vl_avaliacao		avaliacao,
               dt_lancamento	lancamento,
               bt_disponivel	disponivel
          FROM tb_filme;
         WHERE nm_filme like ? `;
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
    const [resposta] = await con.query(comando [id] );
    return resposta.affectedRows;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function alterarFilme(id, filme){

    const comando =
            `
     UPDATE tb_filme 
        SET nm_filme      = ?,
            ds_sinopse    = ?,
            vl_avaliacao  = ?,
            dt_lancamento = ?,
            bt_disponivel = ?,
            id_usuario    = ?
      WHERE id_filme = ?
            `

    const [ resposta ] = con.query(comando [id , filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel, filme.usuario]);
    return resposta.affectedRows;
}