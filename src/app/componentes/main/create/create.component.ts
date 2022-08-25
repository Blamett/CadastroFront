import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { EnderecoEntity } from './endereco';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  aniversariante: boolean = false
  enderecoNome: string = 'Primeiro Endereço'
  panelOpenState: boolean = false

  formulario = this.formBuilder.group({
    nome: [null, Validators.required],
    sexo: [null, Validators.required],
    dataDeNascimento: [null, Validators.required],
    estadoCivil: [null, Validators.required],

    Endereco: this.formBuilder.group({
      cep: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)],],
      endereco: [null, Validators.required],
      numero: [null, Validators.required],
      complemento: [null],
      cidade: [null, Validators.required],
      estado: [null, Validators.required]
    })
  })

  isLinear = true;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  //   const hoje = new Date().toLocaleDateString()
  //   const newh = hoje.slice(0, 5)
  //   const newdataNascimento = dataDeNascimento.slice(0, 5)

  //   if (newh == newdataNascimento) {
  //     this.aniversariante = true
  //   }


  consultaCEP() {
    const cep = this.formulario.get('Endereco.cep')?.value

    if(this.formulario.get('Endereco.cep')?.valid){
      this.http.get(`//viacep.com.br/ws/${cep}/json`)
      .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados: any) {
    // this.formulario.setValue({});

    this.formulario.patchValue({
      Endereco: {
        endereco: dados.logradouro,
        numero: dados.numero,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  OnSubmit() {

    if (this.formulario.valid) {
      this.http.post('http://192.168.90.58:3000/user',
        this.formulario.value,
        // nome: this.formulario.value.nome,
        // sexo: this.formulario.value.sexo,
        // dataDeNascimento: this.formulario.value.dataDeNascimento,
        // estadoCivil: this.formulario.value.estadoCivil,
        // Endereco: this.formulario.get('Endereco'),

      )
        .subscribe(resposta => {
          console.log(resposta)
        })
    }
  }
}
