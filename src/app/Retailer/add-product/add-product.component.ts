import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/Modules/Category';
import { Product } from 'src/app/Modules/Product';
import { Retailer } from 'src/app/Modules/Retailer';
import { CategoryService } from 'src/app/Service/category-service.service';
import { ProductService } from 'src/app/Service/product-service.service';
import { RetailerService } from 'src/app/Service/retailer-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm!: FormGroup
  submitted: boolean = false
  categoryList:any=[]
  responseData!:any
  retailerDetails!:any
  productObject:Product = {
    product_id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    available: false,
    imageUrl: '',
    category: new Category,
    retailer: new Retailer
  }

    constructor(private fb: FormBuilder,private categoryService: CategoryService,private retailerService:RetailerService,private productService:ProductService) {    }
    
   

  ngOnInit() {
    
    this.addProductForm= this.fb.group({
      pName: ['', Validators.required],
      pCategory: ['', Validators.required],
     // pBrand: ['', Validators.required],
      pQuantity: ['', Validators.required],
      pDescription: ['', Validators.required],
      pPrice: ['', Validators.required],
      pAvailable: ['', Validators.required]
    });


    // Get List of All Categories
    this.categoryService.getAllCategories().subscribe((data)=>{

      console.log(data);

      this.responseData = data;

      this.categoryList = this.responseData.data

      console.log(this.categoryList)

      for (const product of this.categoryList) {
        console.log(product.category_id);
      }


    })

    //get retailer details

    if(sessionStorage.getItem('retailerId')!=null){
      //retailer logged in
      this.retailerService.getRetailerById(JSON.parse(sessionStorage.getItem('retailerId')!)).subscribe((data)=>{

        this.retailerDetails = data
        console.log("Logged in retailer details : ",this.retailerDetails.data.shopName)

      },(error)=>{
        console.log(error.error.message)
      })
    }else{
      //retailer not logged in 
      //redirect to login page
      console.log("Retailer not logged in")
    }

  }




  onSubmit(): void {    

    this.submitted=true

    console.log("values from form : ",this.addProductForm.value)

    if(!this.addProductForm.valid){
      console.log("Form not  validated - dont send")
    }else{

      
      this.productObject.name = this.addProductForm.get('pName')?.value
      this.productObject.category = this.addProductForm.get('pCategory')?.value
      this.productObject.stock = this.addProductForm.get('pQuantity')?.value
      this.productObject.description = this.addProductForm.get('pDescription')?.value
      this.productObject.price = this.addProductForm.get('pPrice')?.value
      this.addProductForm.get('pAvailable')?.value == 'Yes' ? this.productObject.available = true : this.productObject.available = false
      this.productObject.retailer = this.retailerDetails.data
  
  
      console.log("Whole Object : ",this.productObject)
      
      console.log("values from form : ",this.addProductForm.get('pAvailable')?.value)
  
      // define one product object
      // now call service
      this.productService.addProduct(this.productObject).subscribe((data)=>{
  
        console.log("Hope so : ",data)
      },(error)=>{
  
        console.log("Error : ",error);
      })
    }

   
    

  }

  



}
