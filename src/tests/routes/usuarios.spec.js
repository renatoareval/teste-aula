import { describe, expect, it, jest, } from '@jest/globals';
import Usuario from '../../models/Usuario.js';
import UsuarioController from '../../controllers/UsuarioController.js';

describe('Deve retornar os testes de unidade de Usuario', () => {
    afterEach(() => jest.clearAllMocks());
    const dataUsuario = new Date();
    const objetoUsuario = {
        nome: 'Venina Silveira',
        email: "1146633Nora12@yahoo.com",
        senha: "$2a$08$QSEjtzH2gjV6f1lCO/7Eg.yrU8y/eTNQoT0TuspCzxwf6TuJXphnW"
    };

    it('Deve Instancia uma nova usuario', () => {
        const usuario = new usuario(objetousuario);
        expect(usuario).toEqual(expect.objectContaining(objetousuario));

        expect(usuario).toHaveProperty('nome', 'Venina Silveira');
        /* expect.objectContaining = comparação de objeto, subconjunto do objeto
           toHaveProperty = verifica as propriedades do objeto
        */
    });

    it('Deve fazer uma chamada simulada de cadastro ao BD', () => {
        const usuario = new Usuario(objetoUsuario);
        UsuarioController.cadastrarUsuario = jest.fn().mockReturnValue({
            nome: 'Venina Silveira',
            email: '1146633Nora12@yahoo.com',
            senha: "$2a$08$QSEjtzH2gjV6f1lCO/7Eg.yrU8y/eTNQoT0TuspCzxwf6TuJXphnW"
        });
        const retorno = UsuarioController.cadastrarUsuario();
        expect(retorno).toEqual(expect.objectContaining({
            dataNascimento: expect.any(Date), ...objetoUsuario,
        }));
    });


});

