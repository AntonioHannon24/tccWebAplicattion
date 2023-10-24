import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];
  add(message: string) {
    this.openModal();
    this.messages.push(message);
  }
  clear() {
    this.messages = [];
  }

  openModal = (): void => {
    const modal = document.querySelector('#modal');
    modal!.classList.remove("hide")
    setTimeout(() => {
      this.closeModal()
    }, 2000);
  }

  closeModal = (): void => {
    const modal = document.querySelector('#modal');
    this.clear()
    modal!.classList.add("hide")
  }
}
