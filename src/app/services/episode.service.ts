import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment.staging";

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  private url = environment.apiUrl

  constructor(

    private http: HttpClient

  ) { }

  getAll(page: number = 1, pageSize = 10, searchTerm: string = ''): Observable<any> {

    return this.http.get(`${this.url}episodes/?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}`)

  }

  getById(id: string): Observable<any> {

    return this.http.get(`${this.url}episodes/${id}`)
  }

  save(character: any): Observable<any> {
    return this.http.post<any>(`${this.url}episodes`, character);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}episodes/${id}`)

  }


  updateEpisode(id: string, character: any): Observable<any> {
    const url = `${this.url}episodes/${id}`;
    return this.http.put<any>(url, character);
  }



}
