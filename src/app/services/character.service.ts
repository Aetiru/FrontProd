import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment.staging";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private url = environment.apiUrl

  constructor(

    private http: HttpClient

  ) { }

  getAll(page: number = 1, pageSize = 10, searchTerm: string = ''): Observable<any> {

    return this.http.get(`${this.url}rick/?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}`)

  }

  getById(id: string): Observable<any> {

    return this.http.get(`${this.url}rick/${id}`)
  }

  save(character: any): Observable<any> {
    return this.http.post<any>(`${this.url}rick`, character);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}rick/${id}`)

  }


  updateCharacter(character: any): Observable<any> {
    const url = `${this.url}rick/${character.id}`;
    return this.http.put<any>(url, character);
  }



}
