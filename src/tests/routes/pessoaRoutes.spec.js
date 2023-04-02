import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import mongoose from "mongoose";
import app from '../../app';
import request from "supertest";
import faker from 'faker-br';

/*
  .get("/pessoas", AuthMidleware, pessoaController.listarPessoas)
  .get("/pessoas/:id", AuthMidleware, pessoaController.listarPessoaPorId)
  .post("/pessoas", AuthMidleware, pessoaController.cadastrarPessoa)
  .patch("/pessoas/:id", AuthMidleware, pessoaController.atualizarPessoa)
  
  */

let server 
let token = false;
let idPessoa = false;

beforeEach(() => {
    const port = 3045;
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

describe ('/GET em pessoas', () => {
    it("Deve retornar uma lista de Pessoas", async () => {
        const dados = await request(app)
        .get('/pessoas')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);
        //console.log(dados._body)
        expect(dados._body.docs[1].nome).toContain('Srta. Eddy Melo');
    });
});
describe ('/GET/ID em pessoas', () => {
    it("Deve retornar uma pessoa por ID ", async () => {
        const dados = await request(app)
        .get('/pessoas/63f969d459942abbe89a2251')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);
        //console.log(dados._body)
        expect(dados._body.nome).toContain('Tarsila Reis');
    });

    it("Deve retornar erro de ID invalido ", async () => {
        const dados = await request(app)
        .get('/pessoas/robinho')
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
        //console.log(dados._body)
        expect(dados._body.message).toEqual('ID inválido');
    });
});

describe ('/POST em pessoas', () => {
    it.skip("Deve casdastrar uma pessoa", async () => {
        const dataPessoa = new Date()
        const dados = await request(app)
        .post('/pessoas')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({           
            nome: 'Wesley Teste',
            cpf: '00233255278',
            nit:   '25542',
            dataNascimento: dataPessoa,
            estrangeiro: false,
            pais: 'Brasil',
            cep: '76980658',
            logradouro: 'Rua 20',
            numero: '4075',
            bairro: 'Setor industrial',
            cidade: 'Vilhena',
            estado: 'Rondônia',
            telefone: '69-985003326',
            telefoneContato: '33216032'
        })
        .expect(201);
        const idPessoa = dados._body._id;
        //console.log(idPessoa);
    });
});

describe ('/PACTH/ID em pessoas', () => {
    it("Deve atualizar pessoa cadastrada", async () => {
        const idPessoaPatch = "640be14204707b9590854572";
        let telefoneFalso = faker.phone.phoneNumber();  
        const dados = await request(app)
        .patch(`/pessoas/${idPessoaPatch}`)
        .set('Authorization', `Bearer ${token}`)
        .send({telefone: telefoneFalso})
        .expect(200);
        expect(dados._body.message).toEqual('Cadastro atualizado com sucesso');
    });
});
    


