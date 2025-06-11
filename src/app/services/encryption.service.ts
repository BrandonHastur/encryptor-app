import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface EncryptRequest { text: string; }
interface EncryptResponse { encrypted: string; }
interface DecryptRequest { encrypted: string; }
interface DecryptResponse { decrypted: string; }

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private API_BASE = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  encrypt(text: string): Observable<EncryptResponse> {
    const body: EncryptRequest = { text };
    return this.http.post<EncryptResponse>(`${this.API_BASE}/encrypt`, body);
  }

  decrypt(encrypted: string): Observable<DecryptResponse> {
    const body: DecryptRequest = { encrypted };
    return this.http.post<DecryptResponse>(`${this.API_BASE}/decrypt`, body);
  }
}
