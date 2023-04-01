import { describe, expect, it, jest, } from "@jest/globals";
import atendimentos from '../../models/Atendimento.js';
import mongoose from "mongoose";

describe("Deve retornar teste de unidade de atendimento", () => {
    afterEach(() => jest.clearAllMocks());

    const oid = mongoose.Schema.Types.ObjectId.get();
    const objetoAtendimento = {
        oid_pessoa: oid,
        nome: 'Renato',
        cpf: '99887722212',
        nit: '0001',
        tipo: 'vale alimentação',
        observacao: 'fazer oque',
        dataAtendimento: new Date(),
    };

    it("Deve instanciar um novo atendimento", () => {
        const atendimento = new atendimentos(objetoAtendimento);
        expect(atendimento).toEqual(expect.objectContaining(objetoAtendimento));
        expect(atendimento).toHaveProperty('nome', 'Renato');
    });

    

});