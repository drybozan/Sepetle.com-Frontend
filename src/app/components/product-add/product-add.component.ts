import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm : FormGroup

  constructor(private formBuilder:FormBuilder,private productService:ProductService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm(){
this.productAddForm = this.formBuilder.group({
  product_name : ["",Validators.required],
  unit_price: ["",Validators.required],
  units_in_stock: ["",Validators.required],
  category_id: ["",Validators.required]
})
  }

  add(){
    if(this.productAddForm.valid){
    let productModel = Object.assign({},this.productAddForm.value)
    this.productService.add(productModel).subscribe(response=>{      
      this.toastrService.success("Başarılı",response.message)//backende kısmında yazılan mesajı getirir.
    },responseError=>{
      if(responseError.error.Errors.length>0){
        
        for (let i = 0; i < responseError.error.Errors.length; i++) {         
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
        }
       
      }
     
    })
    
    
    }else{
      this.toastrService.error("Yeniden gözden geçirin.","Formunuz Eksik")
    }

  }

}
