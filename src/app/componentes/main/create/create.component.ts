import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {



  firstFormGroup = this._formBuilder.group({
    nome: ['', Validators.required],
    sexo: ['', Validators.required],
    dataDeNascimento: ['', Validators.required],
    estado: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    cep: ['', Validators.required],
    endereço: ['', Validators.required],
    numero: ['', Validators.required],
    cidade: ['', Validators.required],
    estado: ['', Validators.required],
  });
  
  isLinear = true;

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient
    ) {}

  ngOnInit(): void {
  }

  enviarDados(nome: string, sexo: string, dataDeNascimento: string, estadoCivil: string){
    this.http.post('http://192.168.90.58:3000/user',
    {
      nome: nome,
      sexo: sexo,
      dataDeNascimento: dataDeNascimento,
      estadoCivil: estadoCivil
    })
    .subscribe(response=>{
      console.log(response)
    }) 
  }
}
