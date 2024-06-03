import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TareasService {

  // Variable que almacena de la ruta de la api
  private baseUrl = 'https://backend-api-tareas.onrender.com';  


  // variable que almacena la cabecera que identifica la respuesta tipo Json
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }


  // Método get para traer la lista de tareas
  getTareas() {
    return this.http.get(this.baseUrl + '/api/tareas/', this.options);
  }

  postTareas(tarea: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(this.baseUrl + '/api/tareas/',tarea, {headers})
    
  }

  deleteTareas(id: number): Observable <any> {
    return this.http.delete(this.baseUrl + '/api/tareas/' + id +'/');
    
  }

}
