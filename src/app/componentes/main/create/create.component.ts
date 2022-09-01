import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aniversario } from '../users/user';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

    panelOpenState: boolean = false;

    get arrayEnderecos(): FormArray {
        return this.formulario.get("Endereco") as FormArray;
    }

    formulario = this.formBuilder.group({
        nome: [null, Validators.required],
        sexo: [null, Validators.required],
        dataDeNascimento: [null, Validators.required],
        estadoCivil: [null, Validators.required],

        Endereco: this.formBuilder.array([
            this.newEndereco()
        ]),

    });

    isLinear = true;

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private _snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.formulario.patchValue({
            // nome: "Baldinho",
            // sexo: "qq isso?",
            // dataDeNascimento: new Date("2006-02-17T02:00:00.000Z"),
            // estadoCivil: "É Complicado",
            Endereco: [
                {
                    // cep: "89160141",
                    // endereco: "",
                    // numero: "",
                    // complemento: "",
                    // cidade: "",
                    // estado: "",
                }
            ]
        });
    }

    newEndereco(): FormGroup {
        return this.formBuilder.group({
            apelido: ['Novo Endereço'],
            cep: [null, [Validators.required, Validators.pattern(/\d{8}/)],],
            endereco: [null, Validators.required],
            numero: [null, Validators.required],
            complemento: [null],
            cidade: [null, Validators.required],
            estado: [null, Validators.required]
        });
    }


    quandoAdicionarMais() {
        (this.formulario.get("Endereco") as FormArray).push(this.newEndereco());
    }

    consultaCEP(group: AbstractControl) {
        const cep = group.get('cep')?.value;

        if (group.get('cep')?.valid) {
            this.http.get(`//viacep.com.br/ws/${cep}/json`)
                .subscribe((dados: any) => {
                    group.patchValue({
                        endereco: dados.logradouro,
                        cidade: dados.localidade,
                        estado: dados.uf
                    });
                });
        }
    }

    OnSubmit() {

        if (this.formulario.valid) {
            this.http.post<Aniversario>('http://192.168.90.58:3000/user',
                this.formulario.value,
                // nome: this.formulario.value.nome,
                // sexo: this.formulario.value.sexo,
                // dataDeNascimento: this.formulario.value.dataDeNascimento,
                // estadoCivil: this.formulario.value.estadoCivil,
                // Endereco: this.formulario.get('Endereco'),

            )
                .subscribe(resposta => {
                    this.formulario.reset();
                    if (resposta.aniversario) {
                        this.openSnackBar('Parabéns hoje é seu aniversário 🥳', 'Fechar');
                    }
                    else {
                        this.openSnackBar('Usuário Criado', 'Fechar');
                    }
                });
        }
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 3000,
        });
    }
}
