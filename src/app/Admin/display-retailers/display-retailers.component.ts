import { Component, OnInit } from '@angular/core';

import { faCoffee,faPencil ,faTrashAlt,faUserPen} from '@fortawesome/free-solid-svg-icons';

import { Router } from '@angular/router';
import { Retailer } from 'src/app/Modules/Retailer';
import { AdminService } from 'src/app/Service/admin-service.service';
import { RetailerService } from 'src/app/Service/retailer-service.service';
import { UserService } from 'src/app/Service/user-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-display-retailers',
  templateUrl: './display-retailers.component.html',
  styleUrls: ['./display-retailers.component.css']
})
export class DisplayRetailersComponent implements OnInit {
  faCoffee = faCoffee;
  faPencil=faPencil;
  faTrashAlt=faTrashAlt;
  faUserPen=faUserPen

  retailerForm!:FormGroup


  retailerList!: Retailer[]
  responseObject!:any
  authenticated!:any
  retailerDetails!:any
  editRetailerObject:Retailer = {
    retailer_id: 0,
    ownerName: '',
    shopName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    authenticate: false
  }

  constructor(private fb: FormBuilder,private router: Router,private userService: UserService,private retailerService:RetailerService,private adminService:AdminService) { }

  ngOnInit(): void {


    this.retailerForm= this.fb.group({
      retailer_id:[],
      ownerName:['', Validators.required],
      shopName:['', Validators.required],
      email:['', Validators.required],
      phone:['', Validators.required],
      address:['', Validators.required],
      authenticate: ['', Validators.required]
    });


    // call retailers list api
    this.adminService.getAllRetailers().subscribe((data)=>{

      this.responseObject = data
      this.retailerList = this.responseObject.data

      console.log("In iNit method : ",data)
    },(error)=>{
      console.log(error)
    })


  }



  editRetailer() : void {

    console.log("Edit retailer : ",this.retailerForm.value)

    this.editRetailerObject.retailer_id = this.retailerForm.get('retailer_id')?.value

    this.retailerForm.get('authenticate')?.value == 'Yes' ? this.editRetailerObject.authenticate = true : this.editRetailerObject.authenticate = false
   
    this.adminService.authenticateRetailer(this.editRetailerObject).subscribe((data)=>{

      console.log(data)
      this.authenticated = data
      alert(this.authenticated.message)
      this.router.navigate(['display-retailers'])
    },(error)=>{
      console.log(error)
    })

  }



  onEdit(retailer:Retailer){

    // get id
    this.retailerService.getRetailerById(retailer.retailer_id).subscribe((data)=>{
      this.retailerDetails = data

      this.editRetailerObject = this.retailerDetails.data



    },(error)=>{
      console.log(error)
    })
  }









}

