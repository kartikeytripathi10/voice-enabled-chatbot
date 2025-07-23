// src/types/speech.d.ts

export {}; // ensure this is treated as a module

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
  type SpeechRecognition = any;


  interface SpeechRecognition extends EventTarget {
    start(): void;
    stop(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onend: () => void;
    lang: string;
    interimResults: boolean;
    maxAlternatives: number;
  }

  interface SpeechRecognitionEvent extends Event {
    results: {
      [index: number]: {
        [index: number]: {
          transcript: string;
        };
      };
    };
  }
}
