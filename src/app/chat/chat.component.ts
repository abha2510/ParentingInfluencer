import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';

interface Message {
  role: string;
  content: string;
}
declare interface SpeechGrammarList {
  [index: number]: SpeechGrammar;
  length: number;
  addFromString(string: string, weight?: number): void;
  addFromURI(src: string, weight?: number): void;
}

declare interface SpeechGrammar {
  src: string;
  weight: number;
}
declare global {
  interface SpeechRecognitionEvent extends Event {
    results: any;
  }

  interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): any;
  }

  interface SpeechRecognitionResult {
    readonly length: number;
    item(index: number): any;
  }
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userMessage = '';
  chatHistory: Message[] = [];
  isProcessing = false;
  isListening = false;
  recognition: any;

  constructor(private http: HttpClient) {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
    } else if ('SpeechRecognition' in window) {
      this.recognition = new (window as any).SpeechRecognition();
    } else {
      console.warn('SpeechRecognition not available in this browser.');
    }

    if (this.recognition) {
      this.recognition.lang = 'en-US';
      this.recognition.continuous = true;

      this.recognition.onresult = (event: any) => {
        const message = event.results[event.results.length - 1][0].transcript;
        this.userMessage = message;
        this.detectChanges();
      };
    }
  }
  private detectChanges(): void {
    if (!(this as any)._cd || !(this as any)._cd.detectChanges) return;
    (this as any)._cd.detectChanges();
  }

  startListening(): void {
    if (this.recognition) {
      this.recognition.start();
      this.isListening = true;
    }
  }

  stopListening(): void {
    if (this.recognition) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  private scrollToBottom(): void {
    const element = this.chatContainer.nativeElement;
    element.scrollTop = element.scrollHeight;
  }

  async sendMessage(): Promise<void> {
    if (this.userMessage.trim() !== '') {
      this.chatHistory.push({ role: 'user', content: this.userMessage });
      this.isProcessing = true;
      try {
        const response = await this.http.post<any>('https://parentinflencer.onrender.com/getChatbotResponse', {
          user_input: this.userMessage
        }).toPromise();

        const chatbotResponse = response.chatbot_response;
        this.chatHistory.push({ role: 'assistant', content: chatbotResponse });
        setTimeout(() => {
          this.scrollToBottom();
        }, 0);
      } catch (error) {
        console.error('Error calling ChatBot API:', error);
        this.chatHistory.push({ role: 'assistant', content: 'Oops! Something went wrong.' });
      } finally {
        this.isProcessing = false;
      }

      this.userMessage = '';
    }
  }

  @ViewChild('chatContainer') chatContainer!: ElementRef;
}
