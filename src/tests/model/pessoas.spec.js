import { describe, expect, it, jest,} from '@jest/globals';
import Pessoa from '../../models/Pessoa.js';
import PessoaController from '../../controllers/PessoaController.js';

describe ( 'Deve retornar os testes de unidade de pessoa', () => {
    afterEach(() => jest.clearAllMocks());
    const dataPessoa = new Date();
        const objetoPessoa ={
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
    };

    it('Deve Instancia uma nova Pessoa', () => {
        const pessoa = new Pessoa(objetoPessoa);
        expect(pessoa).toEqual(expect.objectContaining(objetoPessoa));
        
        expect(pessoa).toHaveProperty('nome', 'Wesley Teste');
        /* expect.objectContaining = comparação de objeto, subconjunto do objeto
           toHaveProperty = verifica as propriedades do objeto
        */
    });

    it('Deve fazer uma chamada simulada de cadastro ao BD', () => {
        const pessoa = new Pessoa(objetoPessoa);
        PessoaController.cadastrarPessoa = jest.fn().mockReturnValue({
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
        });
        const retorno = PessoaController.cadastrarPessoa();
        expect(retorno).toEqual(expect.objectContaining({
            dataNascimento: expect.any(Date),...objetoPessoa,}));
    });
    
    
});
