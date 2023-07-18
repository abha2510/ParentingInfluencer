// web-speech-recognition.d.ts
declare global {
    interface SpeechRecognition {
    //   grammars: SpeechGrammarList;
      lang: string;
      continuous: boolean;
      interimResults: boolean;
      maxAlternatives: number;
      serviceURI: string;
      onaudiostart: ((this: SpeechRecognitionEvent) => any) | null;
      onaudioend: ((this: SpeechRecognitionEvent) => any) | null;
      onend: ((this: SpeechRecognitionEvent) => any) | null;
      onerror: ((this: SpeechRecognitionEvent) => any) | null;
      onnomatch: ((this: SpeechRecognitionEvent) => any) | null;
      onresult: ((this: SpeechRecognitionEvent) => any) | null;
      onsoundstart: ((this: SpeechRecognitionEvent) => any) | null;
      onsoundend: ((this: SpeechRecognitionEvent) => any) | null;
      onspeechend: ((this: SpeechRecognitionEvent) => any) | null;
      onstart: ((this: SpeechRecognitionEvent) => any) | null;
      start(): void;
      stop(): void;
      abort(): void;
      addEventListener<K extends keyof SpeechRecognitionEventMap>(
        type: K,
        listener: (this: SpeechRecognition, ev: SpeechRecognitionEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions
      ): void;
      removeEventListener<K extends keyof SpeechRecognitionEventMap>(
        type: K,
        listener: (this: SpeechRecognition, ev: SpeechRecognitionEventMap[K]) => any,
        options?: boolean | EventListenerOptions
      ): void;
    }
  
    interface SpeechRecognitionEventMap {
      audiostart: Event;
      audioend: Event;
      end: Event;
      error: Event;
      nomatch: Event;
      result: SpeechRecognitionEvent;
      soundstart: Event;
      soundend: Event;
      speechend: Event;
      start: Event;
    }
  }
  
  export {};
  