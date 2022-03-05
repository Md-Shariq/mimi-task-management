import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('closedModel') closedModel: ElementRef | undefined;
  @ViewChild('editclosedModel') editclosedModel: ElementRef | undefined;

  users: any = [];
  taskList: any = [];
  
  constructor(private apiService: ApiService) {
    this.getUsers();
    this.getTaskList();
   }

   editForm = new FormGroup({
    message: new FormControl(''),
    due_date: new FormControl(''),
    priority: new FormControl(null,),
    assigned_to: new FormControl(null,),
    taskid : new FormControl(null),
  })


  autoFillUserForm(userData: any) {
    this.editForm.patchValue({
      message: userData.message,
      created_on: userData.created_on,
      priority: userData.priority,
      taskid: userData.id,
      assigned_to: userData.assigned_to,
    })
  }




  editFormData() {
    console.log(this.editForm.value);
   
    const formData = new FormData();
    Object.keys(this.editForm.value).forEach(key => formData.append(key, this.editForm.value[key]));
  
    this.apiService.updateData(formData).subscribe((result: any) => {
      this.editclosedModel?.nativeElement.click();
      console.log(result);
      this.getTaskList();
    })
    
  }
  




   createForm = new FormGroup({
    message: new FormControl(''),
    due_date: new FormControl(''),
    priority: new FormControl(null,),
    assigned_to: new FormControl(null,),
  })

  createFormData() {
    console.log(this.createForm.value);
    const formData = new FormData();
    Object.keys(this.createForm.value).forEach(key => formData.append(key, this.createForm.value[key]));
  
    this.apiService.createData(formData).subscribe((result: any) => {
      this.closedModel?.nativeElement.click();
      console.log(result);
      this.getTaskList();
    })
    
  }

  ngOnInit(): void {
  }

  getUsers() {
    this.apiService.getUser().subscribe((result: any)=> {
      console.log(result);
      this.users = result.users;
    })
  }

  getTaskList() {
    this.apiService.taskList().subscribe((result: any)=> {
      console.log(result);
       this.taskList = result.tasks;
    })
  }

  deleteData(id:any){
    console.log(id);
    const data: any = {
      taskid: id
    }
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    this.apiService.delete(formData).subscribe((result: any)=>{
      console.log(result);
      this.getTaskList();
      
    })
  }

}
