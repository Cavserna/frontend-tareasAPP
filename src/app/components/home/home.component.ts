import { Component, NgModule, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarea } from '../../models/tarea';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  myForm: FormGroup;
  tareas: any;
  
 
  
  constructor(private fb:FormBuilder, private tareaService: TareasService){
    this.myForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.tareaService.getTareas().subscribe(res=>{
      console.log(res)
      this.tareas = res;
    })
  }


  onSubmit():void{
    if(this.myForm.valid){
      this.tareaService.postTareas(this.myForm.value).subscribe(res=>{
        console.log(res)
        this.myForm.reset();
        this.ngOnInit();
      })
    }
    // this.tareaService.postTareas(tarea).subscribe(res=>{
    //   console.log(res)
      
    // })
  }

  onDelete(tarea: Tarea){
    this.tareaService.deleteTareas(tarea.id).subscribe(res=>{
      console.log(res);
      this.ngOnInit();
    })
    
    
  }

}
