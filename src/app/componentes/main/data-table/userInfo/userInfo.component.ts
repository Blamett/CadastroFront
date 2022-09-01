import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { plainToInstance } from 'class-transformer';
import { Aniversario, User } from '../../users/user';
import { idData } from '../id-interface';


@Component({
    selector: 'app-userInfo',
    templateUrl: './userInfo.component.html',
    styleUrls: ['./userInfo.component.scss']
})
export class UserInfoComponent implements OnInit {

    panelOpenState: boolean = false;

    get arrayEnderecos(): FormArray {
        return this.formulario.get("Endereco") as FormArray;
    }

    usuario!: User;

    userId: string = '';

    editMode: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<UserInfoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: idData,
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private _snackBar: MatSnackBar
    ) { }



    ngOnInit() {
        this.userId = this.data.id;
        this.getUserInfo(this.userId);
    }

    activeEditMode() {
        this.editMode = true;
        this.formulario.enable();
    }

    desactiveEditMode() {
        this.editMode = false;
        this.formulario.disable();
    }

    getUserInfo(userId: string) {
        this.http.get<User>(`http://192.168.90.58:3000/user/${userId}`)
            .subscribe(response => {
                this.usuario = plainToInstance(User, response);

                while ((this.formulario.get("Endereco") as FormArray).length < this.usuario.Endereco.length) {
                    this.addEndereco();
                }

                this.formulario.patchValue(
                    this.usuario
                );

                this.formulario.disable();
            });
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

    newEndereco(): FormGroup {
        return this.formBuilder.group({
            cep: [null, [Validators.required, Validators.pattern(/\d{8}/)],],
            endereco: [null, Validators.required],
            numero: [null, Validators.required],
            complemento: [null],
            cidade: [null, Validators.required],
            estado: [null, Validators.required]
        });
    }

    addEndereco() {
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

    atualizarUsuario() {
        if (this.formulario.valid) {
            this.http.patch(`http://192.168.90.58:3000/user/${this.userId}`,
                this.formulario.value,
            )
                .subscribe(resposta => {
                    this.openSnackBar('Usuário atualizado!', 'Fechar');

                });
        }
    }

    deletarUsuario() {

        this.http.delete(`http://192.168.90.58:3000/user/${this.userId}`
        )
            .subscribe(resposta => {
                this.openSnackBar('Usuário Removido', 'Ok');

            });

    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 3000,
        });
    }
}
