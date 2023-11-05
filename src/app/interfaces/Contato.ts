export interface Contato{
    id:number,
    nome:string,
    email:string,
    assunto:string,
    mensagem:string,
    estado:string,
    created_at?:string,
    update_at?:string,
}