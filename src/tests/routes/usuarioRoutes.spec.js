import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import mongoose from "mongoose";
import app from '../../app';
import request from "supertest";
import faker from 'faker-br';

/*
  .get("/usuarios", AuthMidleware, usuarioController.listarUsuarios)
  .get("/usuarios/:id", AuthMidleware, usuarioController.listarUsuarioPorId)
  .post("/usuarios", AuthMidleware, usuarioController.cadastrarUsuario)
  .patch("/usuarios/:id", AuthMidleware, usuarioController.atualizarUsuario)
  
  */

let server 
let token = false;
let idPessoa = false;

beforeEach(() => {
    const port = 3099;
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
    it("Deve retornar uma lista de usuarios", async () => {
        const dados = await request(app)
        .get('/usuarios')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);
        //console.log(dados._body)
        expect(dados._body.docs[1].nome).toContain('Venina Silveira');
    });
});
describe ('/GET/ID em usuarios', () => {
    it("Deve retornar uma pessoa por ID ", async () => {
        const dados = await request(app)
        .get('/usuarios/63f969d459942abbe89a2484')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);
        //console.log(dados._body)
        expect(dados._body.nome).toContain('Irismar Nogueira');
    });

    it("Deve retornar erro de ID invalido ", async () => {
        const dados = await request(app)
        .get('/usuarios/robinho')
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
        //console.log(dados._body)
        expect(dados._body.message).toEqual('ID inválido');
    });
});

describe ('/POST em usuarios', () => {
    it.skip("Deve casdastrar uma pessoa", async () => {
        const dataPessoa = new Date()
        const dados = await request(app)
        .post('/usuarios')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({           
            nome: 'renato alencar',
            email:""
        })
        .expect(201);
        const idPessoa = dados._body._id;
        //console.log(idPessoa);
    });
});

describe ('/PACTH/ID em usuarios', () => {
    it("Deve atualizar pessoa cadastrada", async () => {
        const idPessoaPatch = "640be14204707b9590854572";
        let telefoneFalso = faker.phone.phoneNumber();  
        const dados = await request(app)
        .patch(`/usuarios/${idPessoaPatch}`)
        .set('Authorization', `Bearer ${token}`)
        .send({telefone: telefoneFalso})
        .expect(200);
        expect(dados._body.message).toEqual('Cadastro atualizado com sucesso');
    });
});
    
