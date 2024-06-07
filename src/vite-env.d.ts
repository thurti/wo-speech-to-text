/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_TRANSCRIBE_VERSION: string;
  readonly VITE_TRANSCRIBE_WASM: string;
  readonly VITE_TRANSCRIBE_WORKER: string;
  readonly VITE_TRANSCRIBE_MODEL: string;
  readonly VITE_TRANSCRIBE_MODEL_PATH: string;
  readonly VITE_TRANSCRIBE_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
