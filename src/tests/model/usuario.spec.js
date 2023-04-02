import { describe, expect, it, jest, } from '@jest/globals';
import Usuario from '../../models/Usuario.js';
import UsuarioController from '../../controllers/UsuarioController.js';

describe('Deve retornar os testes de unidade de Usuario', () => {
    afterEach(() => jest.clearAllMocks());
    const dataUsuario = new Date();
    const objetoUsuario = {
        nome: 'Renato',
        email: 'renato123@gmail.com',
        dataNascimento: dataUsuario

    };

    it('Deve Instancia uma nova usuario', () => {
        const usuario = new usuario(objetoUsuario);
    });

    it('Deve fazer uma chamada simulada de cadastro ao BD', () => {
        const usuario = new Usuario(objetoUsuario);
        UsuarioController.cadastrarUsuario = jest.fn().mockReturnValue({
            nome: 'Renato',
            email: 'renato123@gmail.com',
            dataNascimento: dataUsuario

        });

        const retorno = UsuarioController.cadastrarUsuario();
        expect(retorno).toEqual(expect.objectContaining({
            nome: expect.any(String),
            email: expect.any(String),
            dataNascimento: expect.any(Date), ...objetoUsuario,
        }));
    });
});


