export interface Cidade {    
    id?:number,
    nome:string,
    estado_id:string,
    created_at?:string,
    update_at?:string,
    estabelecimento?:[{

        id?:number,
        nome:string,
        cnpj:string,
        endereco:string,
        cep:string,
        telefone:string,
        email:string,
        ativa?:boolean,
        logo:string,
        cidade_id?:any,
        usuario_id?:any,
        created_at?:string,
        update_at?:string,
    }]

}