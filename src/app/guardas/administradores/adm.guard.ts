
import { CanActivateFn } from '@angular/router';

export const admGuard: CanActivateFn = (route) => {

  const tipo = localStorage.getItem('tipo')
  if (tipo === 'Admin') {
    return true; // O administrador tem acesso
  } else {
    return false;
  }

};
