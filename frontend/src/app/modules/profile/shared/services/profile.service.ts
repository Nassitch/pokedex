import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment.development';
import { Profile } from '../../models/profile.type';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly http = inject(HttpClient);

  private readonly _BASE_URL: string = environment._BASE_URL;
  private readonly _USER: string = environment._USER;

  getProfile$(): Observable<Profile> {
    return this.http.get<Profile>(`${this._BASE_URL}${this._USER}`);
  }

  updateProfile$(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this._BASE_URL}${this._USER}`, profile);
  }

  deleteProfile$(): Observable<Profile> {
    return this.http.delete<Profile>(`${this._BASE_URL}${this._USER}`);
  }
}
