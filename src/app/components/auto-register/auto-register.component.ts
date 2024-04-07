import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { UsuarioAlta } from 'src/app/models/usuario.model';
import { MasterdataPublicService } from 'src/app/services/masterdata-public.service';
import { UiSpinnerService } from 'src/app/services/ui-spinner.service';
import { FormsValidation } from 'src/app/validators/forms.validator';

@Component({
  selector: 'app-auto-register',
  templateUrl: './auto-register.component.html',
  styleUrls: ['./auto-register.component.scss']
})
export class AutoRegisterComponent {

  usuarioRegistroForm: FormGroup;
  usuario: UsuarioAlta = {} as UsuarioAlta;
  messages: Message[] = [];
  showSpinner: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private readonly masterdataPublicService: MasterdataPublicService,
    private readonly uiSpinnerService: UiSpinnerService
  ){
    this.usuarioRegistroForm=this.formBuilder.group({});
    this.fillForm();
  }

  ngOnInit() {
    this.obtenerDatosDefault();
  }

  obtenerDatosDefault() {
    this.masterdataPublicService.getRolAutoregister()
      .then((response) => {
        this.usuarioRegistroForm.get('idRol')?.patchValue(response.id);
        this.usuarioRegistroForm.get('nombreRol')?.patchValue(response.descripcion);
      }).catch((error) => {
        this.messages = [{ severity: 'error', summary: 'Error', detail: error },];
      });
  }

  fillForm() {
    this.usuarioRegistroForm=this.formBuilder.group({
      id: [this.usuario?.id ? this.usuario.id : null],
      nif: [this.usuario?.nif ? this.usuario.nif : null, [FormsValidation.notEmpty, FormsValidation.validationDocumentoId]],
      nombre: [this.usuario?.nombre ? this.usuario.nombre : null, [FormsValidation.notEmpty]],
      apellido1: [this.usuario?.apellido1 ? this.usuario.apellido1 : null, [FormsValidation.notEmpty]],
      apellido2: [this.usuario?.apellido2 ? this.usuario.apellido2 : null],
      email: [this.usuario?.email ? this.usuario.email : null, [FormsValidation.notEmpty, FormsValidation.validationEmail]],
      idRol: [this.usuario?.rol?.id ? this.usuario?.rol?.id : null],
      nombreRol: [this.usuario?.rol?.descripcion ? this.usuario?.rol.descripcion : null],
      username: [this.usuario?.username ? this.usuario.username : null, [FormsValidation.notEmpty]],
      password: [this.usuario?.password ? this.usuario.password : null, [FormsValidation.notEmpty, FormsValidation.validationPassword]],
      confirmarPassword: [this.usuario?.confirmarPassword ? this.usuario.confirmarPassword : null, [FormsValidation.notEmpty, FormsValidation.validationPassword]],
      confirmacionEmail: [this.usuario?.confirmacionEmail ? this.usuario.confirmacionEmail : null, [FormsValidation.notEmpty, FormsValidation.validationEmail]],
    });
    this.usuarioRegistroForm.get('nombreRol')?.disable();
  }

  validarMismosDatosEmailPass(): boolean {
    this.messages = [];
    let invalidMails = this.usuario.email !== this.usuario.confirmacionEmail;
    let invalidPasswords = this.usuario.password !== this.usuario.confirmarPassword;
    if (invalidMails) {
      this.messages.push({ severity: 'error', summary: 'Error', detail: 'Los emails no coinciden' });
    }
    if (invalidPasswords) {
      this.messages.push({ severity: 'error', summary: 'Error', detail: 'Las contraseñas no coinciden' });
    }
    return !invalidMails && !invalidPasswords;
  }

  autoRegistroUsuario() {
    this.usuario = this.usuarioRegistroForm.getRawValue();
    let validarMismosDatosEmailPass : boolean = this.validarMismosDatosEmailPass();
    if (this.usuarioRegistroForm.valid && validarMismosDatosEmailPass) {
      this.uiSpinnerService.showSpinner("Registrando usuario...")
      this.masterdataPublicService.autoRegisterUser(this.usuario)
        .then((response) => {
          this.messages = [{ severity: 'success', detail: 'El usuario se ha dado de alta correctamente' }];
          this.usuarioRegistroForm.reset()
        }).catch((error) => {
          this.messages = [{ severity: 'error', summary: 'Error', detail: error }];
        }).finally(() => {
          this.uiSpinnerService.hideSpinner();
        });
    } 
    console.log(this.usuario);
  }
}
