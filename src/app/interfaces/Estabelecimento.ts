export interface Estabelecimento {

    id?:number,
    nome:string,
    cnpj:string,
    endereco:string,
    telefone:string,
    logo:string,
    cep:string,
    email:string,
    password:string,
    cidade_id?:any,
    created_at?:string,
    update_at?:string,
    funcionario?:[{
            id: number,
            email:string,
            status:any,
            cidade_id:number,
            estabelecimento_id:number,
            foto:string,
            password: null | undefined,
            nome:string,
            funcao:string,
            created_at?:string,
            updated_at:string
    }]
    servico?:[{ 
            id:number,
            nome:string,
            valor:string,
            status:any,
            estabelecimento_id:number,
            descricao:string,
            created_at?: string,
            update_at?: string,
    }]
}
