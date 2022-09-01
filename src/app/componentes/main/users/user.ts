import { Type } from "class-transformer";

export class User {

    _id!: string

    nome!: string;

    sexo!: string;

    @Type(() => Date)
    dataDeNascimento!: Date;

    estadoCivil!: string;

    Endereco!: {
        cep: string;
        endereco: string;
        numero: string;
        complemento: string;
        cidade: string;
        estado: string;
    }[];

};

export interface Aniversario {

    aniversario: boolean
}