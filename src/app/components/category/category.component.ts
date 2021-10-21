import { Category } from './../../models/category';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories:Category[]=[]
  currentCategory:Category;
  

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

 getCategories(){
   this.categoryService.getCategories().subscribe(response=>{
     this.categories=response.data
     
   })
 }

 setCurrentCategory(category:Category){
   this.currentCategory=category;
 }

 setAllCategory(){
  return this.currentCategory={category_id:0, category_name:""};
}


 getCurrentCategoryClass(category:Category){
  if(category== this.currentCategory){
    return "list-group-item active" //tıklandığında renk değişecek
  }else{
    return "list-group-item "
  }
}
getAllCategoryClass(){
  if(!this.currentCategory){
    return "list-group-item active"
  }else{
    return "list-group-item "
  }
}

}
