import { CanActivateFn } from '@angular/router';

export const estabGuard: CanActivateFn = (route) => {
  const tipo = localStorage.getItem('tipo')
  if (tipo === 'Estab') {
    return true; 
  } else {
    return false;
  }

};
