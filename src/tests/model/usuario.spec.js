
import { describe, expect, it, jest, } from '@jest/globals';
import Usuario from '../../models/Usuario.js';
import UsuarioController from '../../controllers/UsuarioController.js';

describe('Deve retornar os testes de unidade de Usuario', () => {
    afterEach(() => jest.clearAllMocks());
    const dataUsuario = new Date();
    const objetoUsuario = {
        nome: "Renato",
        email: "renatoareval@gmail.com",
        senha: "12345678",
        dataNascimento: '01/01/2012'
    };


    it('Deve fazer uma chamada simulada de cadastro ao BD', () => {
        const usuario = new Usuario(objetoUsuario);
        UsuarioController.cadastrarUsuario = jest.fn().mockReturnValue({
            nome: "Renato",
            email: "renatoareval@gmail.com",
            senha: "12345678",
            dataNascimento: '01/01/2012'
        });
        const retorno = UsuarioController.cadastrarUsuario();
        expect(retorno).toEqual(expect.objectContaining({
            nome: expect.any(String),
            email: expect.any(String),
            senha: expect.any(String),
            dataNascimento: expect.any(Date), ...objetoUsuario,
        }));
    });


    it('Deve Instancia uma nova usuario', () => {
        const usuario = new Usuario(objetoUsuario);
        expect(usuario).toEqual(expect.objectContaining(objetoUsuario));
        expect(usuario).toHaveProperty(nome, "Renato")
        /* expect.objectContaining = comparação de objeto, subconjunto do objeto
           toHaveProperty = verifica as propriedades do objeto
        */
    });
});