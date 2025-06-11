import { Component, OnInit, NgZone } from '@angular/core';
import { EncryptionService } from '../../services/encryption.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-encryptor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './encryptor.component.html',
  styleUrls: ['./encryptor.component.css']
})

export class EncryptorComponent implements OnInit {

  // Para enlazar con el input de la vista
  mensaje: string = '';
  resultado: string = '';

  // Para referenciar la API de reconocimiento de voz
  recognition: any;

  constructor(
    private encryptionSvc: EncryptionService,
    private zone: NgZone   
  ) { }

  ngOnInit(): void {
    this.initVoiceRecognition();
  }


  onEncrypt(): void {
    this.resultado = 'Cifrando...';

    this.encryptionSvc.encrypt(this.mensaje).subscribe({
      next: resp => {
        this.resultado = resp.encrypted;
        this.mensaje = resp.encrypted;
      },
      error: err => {
        console.error('Error al cifrar (Angular):', err);
        this.resultado = 'Error al cifrar.';
      }
    });
  }

  onDecrypt(): void {
    this.resultado = 'Descifrando...';
    const base64 = this.mensaje.trim();

    this.encryptionSvc.decrypt(base64).subscribe({
      next: resp => {
        this.resultado = resp.decrypted;
      },
      error: err => {
        console.error('Error al descifrar (Angular):', err);
        this.resultado = 'Error al descifrar.';
      }
    });
  }


  /** Inicializa el reconocimiento de voz usando Web Speech API */
  initVoiceRecognition(): void {
    // @ts-ignore: Hacer cast para compatibilidad (webkit prefix o estándar)
    const SpeechRecognition = window['SpeechRecognition'] || window['webkitSpeechRecognition'];
    if (!SpeechRecognition) {
      console.warn('Este navegador no soporta SpeechRecognition (reconocimiento por voz).');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'es-MX';      
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    // Evento cuando se detecta un resultado final
    this.recognition.addEventListener('result', (event: any) => {
      const transcript = event.results[0][0].transcript;
      // Como este callback sale del contexto Angular, usamos NgZone para actualizar binding
      this.zone.run(() => {
        this.mensaje = transcript;
      });
    });

    this.recognition.addEventListener('error', (event: any) => {
      console.error('SpeechRecognition error:', event.error);
    });
  }

  /** Inicia el reconocimiento de voz al hacer click */
  startVoiceRecognition(): void {
    if (this.recognition) {
      this.recognition.start();
    } else {
      alert('Reconocimiento por voz no soportado en este navegador.');
    }
  }
}
