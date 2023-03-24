import { describe, expect, it, jest, } from "@jest/globals";
import atendimentos from '../../models/Atendimento.js';
import mongoose from "mongoose";

describe("Deve retornar teste de unidade de atendimento", () => {
    afterEach(() => jest.clearAllMocks());

    const oid = mongoose.Schema.Types.ObjectId.get();
    const objetoAtendimento = {
        oid_pessoa: oid,
        nome: 'Renato Alencar',
        cpf: '00853002258',
        nit: '123455678896',
        tipo: 'vale alimentação',
        observacao: 'fazer oque',
        dataAtendimento: new Date(),
    };

    it("Deve instanciar um novo atendimento", () => {
        const atendimento = new atendimentos(objetoAtendimento);
        expect(atendimento).toEqual(expect.objectContaining(objetoAtendimento));
        expect(atendimento).toHaveProperty('tipo', 'vale alimentação');
    });

    /*it.skip("Deve fazer uma chamada simulada de cadastro ao banco de dados", () => {
        const atendimento = new atendimentos(objetoAtendimento);
      AtendimentoController.cadastrarAtendimento = jest.fn().mockReturnValue({

        oid_pessoa: oid,
        nome: 'Renato Alencar',
        cpf: '00853002258',
        nit: '123455678896',
        tipo: 'vale alimentação',
        observacao: 'fazer oque',
        dataAtendimento: new date(),
      });
      const retorno = AtendimentoController.cadastrarAtendimento();
        expect(retorno).toEqual(expect.objectContaining({ dataAtendimento: expect.any(Date),...objetoAtendimento,}));
    });*/

});