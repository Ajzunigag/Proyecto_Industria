export class Pagina {
    _id?: number;
    html: string;
    css: string;
    javascript: string;
    empresaId: string;
    img1: string;
    img2: string;
    img3: string;


    constructor(html:string,css: string,javascript: string, empresaId: string,img1: string,img2: string,img3: string){

        this.html=html;
        this.css=css;
        this.javascript=javascript;
        this.empresaId=empresaId;
        this.img1=img1;
        this.img2=img2;
        this.img3=img3;

    }

}