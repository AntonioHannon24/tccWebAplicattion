
import { CanActivateFn } from '@angular/router';

export const admGuard: CanActivateFn = (route) => {

  const tipo = localStorage.getItem('tipo')
  if (tipo === 'Admin') {
    console.log('true')
    return true; // O administrador tem acesso
  } else {
    console.log('false')
    return false;
  }

};
