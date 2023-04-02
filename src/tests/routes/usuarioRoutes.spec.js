import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import mongoose from "mongoose";
import app from '../../app';
import request from "supertest";
import faker from 'faker-br';

/* .get("/usuarios", AuthMidleware, UsuarioController.listarUsuarios)
  .get("/usuarios/:id", AuthMidleware, UsuarioController.listarUsuarioPorId)
  .post("/usuarios", AuthMidleware, UsuarioController.cadastrarUsuario)
  .put("/usuarios/:id", AuthMidleware, UsuarioController.atualizarUsuario)
  .patch("/usuarios/:id", AuthMidleware, UsuarioController.atualizarUsuario)
  .delete("/usuarios/:id", AuthMidleware, UsuarioController.excluirUsuario) */

let server 
let token = false;
let idUsuario = false;

beforeEach(() => {
    const port = 3030;
    server =  app.listen(port);
} );

afterEach(() => {
    server.close();
  });

afterAll(() => {
    mongoose.connection.close();
  });


describe ('Autenticação', () => {
      it("Deve receber um token de um usario válido", async () => {
        const dados = await request(app)
        .post('/login')
        .send({
            email: "4190451Rynaldo.Carvalho@live.com",
            senha:"123"
        })
        .set('Accept', 'aplication/json')
        .expect(200);
        expect(dados._body.user.email).toEqual("4190451Rynaldo.Carvalho@live.com")
        token = dados._body.token;
    });
});

describe ('/GET em usuarios', () => {
    it("Deve retornar uma lista de usuários", async () => {
        const dados = await request(app)
        .get('/usuarios')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);
        console.log(dados._body)
        expect(dados._body.docs[1].nome).toContain('Eloisa Silva');
    });
});
describe ('/GET/ID em usuarios', () => {
    it("Deve retornar um usuário por ID ", async () => {
        const dados = await request(app)
        .get('/usuarios/63f969d459942abbe89a2485')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);
        //console.log(dados._body)
        expect(dados._body.nome).toContain('Eloisa Silva');
    });

    it("Deve retornar erro de ID inválido ", async () => {
        const dados = await request(app)
        .get('/usuarios/eloisa')
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
        //console.log(dados._body)
        expect(dados._body.message).toEqual('ID inválido');
    });
});

describe ('/POST em usuarios', () => {
    it.skip("Deve cadastrar um usuário", async () => {
        const dataUsuario = new Date()
        const dados = await request(app)
        .post('/usuarios')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({           
            nome: 'Renato',
            email: "renato@gmail.com",
            senha: "321"
        })
        .expect(201);
        const idUsuario = dados._body._id;
        console.log(idUsuario);
    });
});

// describe ('/PACTH/ID em usuários', () => {
//     it("Deve atualizar usuário cadastrado", async () => {
//         const idUsuarioPatch = ""; 
//         const dados = await request(app)
//         .patch(`/usuarios/${idUsuarioPatch}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({email: "renato123@gmail.com"})
//         .expect(200);
//         expect(dados._body.message).toEqual('Cadastro atualizado com sucesso');
//     });
// });