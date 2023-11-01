import { CanActivateFn } from '@angular/router';

export const funcGuard: CanActivateFn = (route) => {
  const tipo = localStorage.getItem('tipo')
  if (tipo === 'Func') {
    return true; 
  } else {
    return false;
  }
};
