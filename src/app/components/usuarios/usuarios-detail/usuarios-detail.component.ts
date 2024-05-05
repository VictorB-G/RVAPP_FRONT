import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Rol } from 'src/app/models/rol.model';
import { UsuarioAlta } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { MasterdataService } from 'src/app/services/masterdata.service';
import { UiSpinnerService } from 'src/app/services/ui-spinner.service';
import { UserService } from 'src/app/services/user.service';
import { FormsValidation } from 'src/app/services/validators/forms.validator';
import { OPERACION } from 'src/app/utils/constants';

@Component({
  selector: 'app-usuarios-detail',
  templateUrl: './usuarios-detail.component.html',
  styleUrl: './usuarios-detail.component.scss'
})
export class UsuariosDetailComponent {

  idUsuario: any;
  usuarioSeleccionado: UsuarioAlta | undefined;
  usuarioDetailForm: FormGroup;
  messages: Message[] = [];
  roles: Rol[] = [];
  activos: any[] = [{label: 'Sí', value: "true"}, {label: 'No', value: "false"}];
  OPS = OPERACION;
  op: OPERACION = OPERACION.NEW;

  constructor(
    private readonly uiSpinnerService: UiSpinnerService,
    private readonly userService: UserService,
    private readonly masterdataService: MasterdataService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
  ) {
    this.usuarioDetailForm=this.formBuilder.group({});
   }

  ngOnInit() {
    this.cargarCombos();
    this.activatedRoute.params.subscribe(params => {
      if (this.router.url.includes('consulta') && params?.['id']) {
        this.idUsuario = params['id'];
        this.op = this.OPS.VIEW;
        if (this.authService.userId != this.idUsuario) {
          this.messages = [{ severity: 'error', summary: 'Error', detail: 'No tiene permisos para ver este usuario' }];
        } else {
          this.getUsuario();
        }
      } else if (!this.router.url.includes('consulta') && params?.['id']) {
        this.idUsuario = params['id'];
        this.op = this.OPS.EDIT;
        this.getUsuario();
      } else {
        this.fillForm();
      }
    });
  }

  getUsuario() {
    this.uiSpinnerService.showSpinner("Cargando...");
    this.userService.findById(this.idUsuario).then((response) => {
      this.usuarioSeleccionado = response.message;
      this.fillForm();
    }).catch((error) => {
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Se ha producido un error al cargar el usuario' }];
    }).finally(() => {
      this.uiSpinnerService.hideSpinner();
    });
  }

  cargarCombos() {
    this.masterdataService.getRoles()
    .then((response) => {
      this.roles = response;
    }).catch((error) => {
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Se ha producido un error al cargar los roles' }];
    })
    .finally(() => {
    });
  }

  
  fillForm() {
    this.usuarioDetailForm = this.formBuilder.group({
      id: [this.usuarioSeleccionado?.id ? this.usuarioSeleccionado.id : null],
      nif: [this.usuarioSeleccionado?.nif ? this.usuarioSeleccionado.nif : null, [FormsValidation.notEmpty, FormsValidation.validationDocumentoId]],
      nombre: [this.usuarioSeleccionado?.nombre ? this.usuarioSeleccionado.nombre : null, [FormsValidation.notEmpty]],
      apellido1: [this.usuarioSeleccionado?.apellido1 ? this.usuarioSeleccionado.apellido1 : null, [FormsValidation.notEmpty]],
      apellido2: [this.usuarioSeleccionado?.apellido2 ? this.usuarioSeleccionado.apellido2 : null],
      email: [this.usuarioSeleccionado?.email ? this.usuarioSeleccionado.email : null, [FormsValidation.notEmpty, FormsValidation.validationEmail]],
      idRol: [this.usuarioSeleccionado?.rol?.id ? this.usuarioSeleccionado?.rol?.id : null, [FormsValidation.notEmpty]],
      activo: [this.usuarioSeleccionado?.activo ? this.usuarioSeleccionado?.activo.toString() : null, [FormsValidation.notEmpty]],
      username: [this.usuarioSeleccionado?.username ? this.usuarioSeleccionado.username : null, []],
      password: [this.usuarioSeleccionado?.password ? this.usuarioSeleccionado.password : null, []],
    });
    if (this.op === this.OPS.VIEW) {
      this.usuarioDetailForm.disable();
    } else if (this.op === this.OPS.EDIT) {
      this.usuarioDetailForm.get('nif')?.disable();
      if (this.authService.userId == this.idUsuario) {
        this.usuarioDetailForm.get('activo')?.disable();
        this.usuarioDetailForm.get('idRol')?.disable();
      }
    }
  }

  saveUsuario() {
    let usuarioToSend = this.usuarioDetailForm.getRawValue();
    usuarioToSend.rol = this.roles.find(rol => rol.id === usuarioToSend.idRol);
    if (this.usuarioDetailForm.valid) {
      if (this.op === this.OPS.EDIT) {
        this.uiSpinnerService.showSpinner("Actualizando usuario...");
        this.userService.updateUser(usuarioToSend)
        .then((response) => {
          if (response.success) {
            this.router.navigate(['/usuarios'], {state: {severity: 'success', detail: 'El usuario se ha actualizado correctamente'}});
          } else {
            this.messages = [{ severity: 'error', summary: 'Error', detail: 'Se ha producido un error al actualizar el usuario' }];
          }
        })
        .catch((error) => {
          this.messages = [{ severity: 'error', summary: 'Error', detail: error.error }];
        })
        .finally(() => {
          this.uiSpinnerService.hideSpinner();
        });
      } else if (this.op === this.OPS.NEW) {
        this.uiSpinnerService.showSpinner("Guardando usuario...");
        this.userService.saveUser(usuarioToSend)
        .then((response) => {
          if (response.success) {
            this.router.navigate(['/usuarios'], {state: {severity: 'success', detail: 'El usuario se ha guardado correctamente'}});
          } else {
            this.messages = [{ severity: 'error', summary: 'Error', detail: 'Se ha producido un error al guardar el usuario' }];
          }
        })
        .catch((error) => {
          this.messages = [{ severity: 'error', summary: 'Error', detail: error.error }];
        })
        .finally(() => {
          this.uiSpinnerService.hideSpinner();
        });
      }
    } else {
      this.messages = [{ severity: 'error', summary: 'Error', detail: 'Hay errores en el formulario' }];
    }
  }

  volver() {
    this.router.navigate(['/usuarios']);
  }

}
