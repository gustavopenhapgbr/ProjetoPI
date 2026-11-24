export interface Usuario {
    id?:string;
    email: string;
    senha:string;
    admin?: boolean;
}