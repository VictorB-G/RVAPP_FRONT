import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class UiSpinnerService {
  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay) {}

  public showSpinner(message: string = 'Cargando...') {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }

    const spinnerOverlayPortal = new ComponentPortal(SpinnerComponent);
    const component = this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
    component.instance.message = message;
  }

  public hideSpinner() {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
