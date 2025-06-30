import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Results } from '../interfaces/results';
import { Classes } from '../interfaces/classes';
import { Level } from '../interfaces/level';
import { RacesComplete } from '../interfaces/races';

@Injectable({
  providedIn: 'root'
})
export class CharacterCreationService {

  private apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  getRaces() {
    return this.http.get<Results>(`${this.apiUrl}races`);
  }
  getSubraces() {
    return this.http.get<Results>(`${this.apiUrl}subraces`);
  }
  getClasses() {
    return this.http.get<Results>(`${this.apiUrl}classes`);
  }
  getBackgrounds() {
    return this.http.get<Results>(`${this.apiUrl}backgrounds`);
  }
  getAlignments() {
    return this.http.get<Results>(`${this.apiUrl}alignments`);
  }

  getClassById(id: string) {
    return this.http.get<Classes>(`${this.apiUrl}classes/${id}`);
  }
  getClassLevelById(id: string, level: number) {
    return this.http.get<Level>(`${this.apiUrl}classes/${id}/levels/${level}`);
  }
  getRacesById(id: string) {
    return this.http.get<RacesComplete>(`${this.apiUrl}races/${id}`);
  }
}
