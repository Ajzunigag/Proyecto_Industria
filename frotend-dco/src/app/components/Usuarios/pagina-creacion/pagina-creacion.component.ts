
import { Component, OnInit, PipeTransform, Pipe} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pagina } from 'src/app/models/pagina';
import { PaginaService } from 'src/app/services/pagina.service';



@Component({
  selector: 'app-pagina-creacion',
  templateUrl: './pagina-creacion.component.html',
  styleUrls: ['./pagina-creacion.component.css']
})



export class PaginaCreacionComponent implements OnInit  {
  paginaForm: FormGroup;
  html: string=""
  css:  string=""
  javascript: string=""
  empresaId: number=0;
  htmlStr=""
  cssStr=""
  uploadedFiles!: Array<File>;
  img!: string;
  uploadedFiles2!: Array<File>;
  img2!: string;
  uploadedFiles3!: Array<File>;
  img3!: string;
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _paginaService: PaginaService,
    private sanatizer:DomSanitizer) {
    this.paginaForm = this.fb.group({
      html:['',Validators.required],
      css:['',[Validators.required]],
      javascript:['',Validators.required],
      empresaId:['',Validators.required],
     
    })
  }

  ngOnInit(): void {
   
  }
  
  agregarPagina(){
    const PAGINA: Pagina={
      html: this.paginaForm.get('html')?.value,
      css: this.paginaForm.get('css')?.value,
      javascript: this.paginaForm.get('javascript')?.value,
      empresaId: this.paginaForm.get('empresaId')?.value,
      img1:this.img,
      img2:this.img2,
      img3:this.img3
    }

    
    console.log(PAGINA);
    this._paginaService.guardarPagina(PAGINA).subscribe(data=>{
      this.toastr.success('El usuario fue registrado con exito', 'Usuario Registrado');
      this.router.navigate(['/paginas/ver'])
    }, error=>{
      console.log(error);
      this.paginaForm.reset();
    })


    
  }

  renderizarPagina() {
    let id="62f53e9d7c9354beb574fb3d"
    this. _paginaService.obtenerPagina(id).subscribe(data => {
      if (data) {
      this.html =data.html;
       this.css= data.css;
       this.javascript = data.javascript;
       this.empresaId = data.empresaId;
       this.htmlStr =data.html;
       this.cssStr =data.css;
       this.img=data.img1;
       this.img2=data.img2;
       this.img3=data.img3;
       console.log(this.cssStr)

      }else{
        this.toastr.error('Datos incorrectos', 'error');
      }

    }, error => {
      console.log(error);
      this.paginaForm.reset();
      this.toastr.error('Algo salio mal en el login')
    })
  }

  subir(element: any) {
    this.uploadedFiles = element.target.files;
    console.log(this.uploadedFiles)

    //previsualizacion de la imagen que se subira y creacion del b64 que se guardará para generar el logo o cualquier archivo que se quiera subir
    const reader = new FileReader()
    reader.onload = () => this.img = reader.result as string
    reader.readAsDataURL(this.uploadedFiles[0])
    console.log(this.img)
  }

  subir2(element: any) {
    this.uploadedFiles2 = element.target.files;
    console.log(this.uploadedFiles2)

    //previsualizacion de la imagen que se subira y creacion del b64 que se guardará para generar el logo o cualquier archivo que se quiera subir
    const reader = new FileReader()
    reader.onload = () => this.img2 = reader.result as string
    reader.readAsDataURL(this.uploadedFiles2[0])
    console.log(this.img2)
  }
  subir3(element: any) {
    this.uploadedFiles3 = element.target.files;
    console.log(this.uploadedFiles3)

    //previsualizacion de la imagen que se subira y creacion del b64 que se guardará para generar el logo o cualquier archivo que se quiera subir
    const reader = new FileReader()
    reader.onload = () => this.img3 = reader.result as string
    reader.readAsDataURL(this.uploadedFiles3[0])
    console.log(this.img3)
  }


}



