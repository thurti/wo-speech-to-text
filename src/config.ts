import type { SelectedSettings } from "./store";
import type { UIInputItem } from "./types/UIInputItem";

export const config = {
  debug: false,
  disableServiceWorker: false,
  updateInterval: 20000,
  version: import.meta.env.PACKAGE_VERSION,
  url: "https://worksoffline.app/speech-to-text",
  github: "https://github.com/thurti/wo-speech-to-text",
  title: "Speech To Text",
  titleHeader: "Speech To Text",
  localStoragePrefix: "wo-speech-to-text",
  notificationIcon: "/icons/android-chrome-192x192.png",
  colorScheme: "zinc-purple",
  allowedFormats: "video/*,audio/*",
  maxFileSizeMb: 2000, //2GB hard wasm max
  fileDropLabel: "Add Audio, Video Files",
  formats: <ConfigFormats>{
    id: "format",
    label: "Output Format",
    value: "format",
    options: [
      {
        id: "txt",
        label: "Plain Text (txt)",
        value: "txt",
        ext: "txt",
        mimetype: "text/plain",
        isDefault: true,
      },
      {
        id: "csv",
        label: "CSV",
        value: "csv",
        ext: "csv",
        mimetype: "application/csv",
      },
      {
        id: "json",
        label: "JSON",
        value: "json",
        ext: "json",
        mimetype: "application/json",
      },
      {
        id: "vtt",
        label: "Subtitles VTT",
        value: "vtt",
        ext: "vtt",
        mimetype: "text/vtt",
      },
      {
        id: "srt",
        label: "Subtitles SRT",
        value: "srt",
        ext: "srt",
        mimetype: "application/x-subrip",
      },
      {
        id: "lrc",
        label: "Lyrics LRC",
        value: "lrc",
        ext: "lrc",
        mimetype: "text/plain",
      },
      {
        id: "lrc-enhanced",
        label: "Lyrics LRC Enhanced",
        value: "lrc-enhanced",
        ext: "lrc",
        mimetype: "text/plain",
      },
    ],
  },
  settings: <ConfigSettings>{
    lang: {
      id: "lang",
      label: "Input Language",
      options: [
        {
          id: "auto",
          label: "Auto (slow)",
          value: "auto",
          isDefault: true,
        },
        {
          id: "ar",
          value: "ar",
          label: "Arabic",
        },
        {
          id: "hy",
          value: "hy",
          label: "Armenian",
        },
        {
          id: "az",
          value: "az",
          label: "Azerbaijani",
        },
        {
          id: "eu",
          value: "eu",
          label: "Basque",
        },
        {
          id: "be",
          value: "be",
          label: "Belarusian",
        },
        {
          id: "bn",
          value: "bn",
          label: "Bengali",
        },
        {
          id: "bg",
          value: "bg",
          label: "Bulgarian",
        },
        {
          id: "ca",
          value: "ca",
          label: "Catalan",
        },
        {
          id: "zh",
          value: "zh",
          label: "Chinese",
        },
        {
          id: "hr",
          value: "hr",
          label: "Croatian",
        },
        {
          id: "cs",
          value: "cs",
          label: "Czech",
        },
        {
          id: "da",
          value: "da",
          label: "Danish",
        },
        {
          id: "nl",
          value: "nl",
          label: "Dutch",
        },
        {
          id: "en",
          value: "en",
          label: "English",
        },
        {
          id: "et",
          value: "et",
          label: "Estonian",
        },
        {
          id: "tl",
          value: "tl",
          label: "Filipino",
        },
        {
          id: "fi",
          value: "fi",
          label: "Finnish",
        },
        {
          id: "fr",
          value: "fr",
          label: "French",
        },
        {
          id: "gl",
          value: "gl",
          label: "Galician",
        },
        {
          id: "ka",
          value: "ka",
          label: "Georgian",
        },
        {
          id: "de",
          value: "de",
          label: "German",
        },
        {
          id: "el",
          value: "el",
          label: "Greek",
        },
        {
          id: "gu",
          value: "gu",
          label: "Gujarati",
        },
        {
          id: "iw",
          value: "iw",
          label: "Hebrew",
        },
        {
          id: "hi",
          value: "hi",
          label: "Hindi",
        },
        {
          id: "hu",
          value: "hu",
          label: "Hungarian",
        },
        {
          id: "is",
          value: "is",
          label: "Icelandic",
        },
        {
          id: "id",
          value: "id",
          label: "Indonesian",
        },
        {
          id: "ga",
          value: "ga",
          label: "Irish",
        },
        {
          id: "it",
          value: "it",
          label: "Italian",
        },
        {
          id: "ja",
          value: "ja",
          label: "Japanese",
        },
        {
          id: "kn",
          value: "kn",
          label: "Kannada",
        },
        {
          id: "ko",
          value: "ko",
          label: "Korean",
        },
        {
          id: "la",
          value: "la",
          label: "Latin",
        },
        {
          id: "lv",
          value: "lv",
          label: "Latvian",
        },
        {
          id: "lt",
          value: "lt",
          label: "Lithuanian",
        },
        {
          id: "mk",
          value: "mk",
          label: "Macedonian",
        },
        {
          id: "ms",
          value: "ms",
          label: "Malay",
        },
        {
          id: "mt",
          value: "mt",
          label: "Maltese",
        },
        {
          id: "no",
          value: "no",
          label: "Norwegian",
        },
        {
          id: "fa",
          value: "fa",
          label: "Persian",
        },
        {
          id: "pl",
          value: "pl",
          label: "Polish",
        },
        {
          id: "pt",
          value: "pt",
          label: "Portuguese",
        },
        {
          id: "ro",
          value: "ro",
          label: "Romanian",
        },
        {
          id: "ru",
          value: "ru",
          label: "Russian",
        },
        {
          id: "sr",
          value: "sr",
          label: "Serbian",
        },
        {
          id: "sk",
          value: "sk",
          label: "Slovak",
        },
        {
          id: "sl",
          value: "sl",
          label: "Slovenian",
        },
        {
          id: "es",
          value: "es",
          label: "Spanish",
        },
        {
          id: "sw",
          value: "sw",
          label: "Swahili",
        },
        {
          id: "sv",
          value: "sv",
          label: "Swedish",
        },
        {
          id: "ta",
          value: "ta",
          label: "Tamil",
        },
        {
          id: "te",
          value: "te",
          label: "Telugu",
        },
        {
          id: "th",
          value: "th",
          label: "Thai",
        },
        {
          id: "tr",
          value: "tr",
          label: "Turkish",
        },
        {
          id: "uk",
          value: "uk",
          label: "Ukrainian",
        },
        {
          id: "ur",
          value: "ur",
          label: "Urdu",
        },
        {
          id: "vi",
          value: "vi",
          label: "Vietnamese",
        },
        {
          id: "cy",
          value: "cy",
          label: "Welsh",
        },
        {
          id: "yi",
          value: "yi",
          label: "Yiddish",
        },
      ],
    },
    suppress_non_speech: {
      id: "suppress_non_speech",
      label: "Ignore Non Speech",
      value: false,
    },
    threads: {
      id: "threads",
      label: "Threads",
      options: [
        {
          id: "0",
          label: "Auto",
          value: 0,
          isDefault: true,
        },
        {
          id: "1",
          label: "1",
          value: 1,
        },
        {
          id: "2",
          label: "2",
          value: 2,
        },
        {
          id: "4",
          label: "4",
          value: 4,
        },
        {
          id: "8",
          label: "8",
          value: 8,
        },
        {
          id: "16",
          label: "16",
          value: 16,
        },
      ],
    },
    model: {
      id: "model",
      label: "Model",
      options: [
        {
          id: "ggml-tiny-q5_1.bin",
          label: "tiny q5 (32M)",
          value: "ggml-tiny-q5_1.bin",
          isDefault: true,
        },
        {
          id: "ggml-base-q5_1.bin",
          label: "base q5 (60M)",
          value: "ggml-base-q5_1.bin",
        },
        {
          id: "ggml-model-whisper-tiny.bin",
          label: "tiny (78M)",
          value: "ggml-model-whisper-tiny.bin",
        },
        {
          id: "ggml-model-whisper-tiny.en.bin",
          label: "tiny - english only (78M)",
          value: "ggml-model-whisper-tiny.en.bin",
        },
        {
          id: "ggml-model-whisper-base.bin",
          label: "base (148M)",
          value: "ggml-model-whisper-base.bin",
        },
        {
          id: "ggml-model-whisper-base.en.bin",
          label: "base - english only (148M)",
          value: "ggml-model-whisper-base.en.bin",
        },
        {
          id: "ggml-model-whisper-small.bin",
          label: "small (489M)",
          value: "ggml-model-whisper-small.bin",
        },
        {
          id: "ggml-model-whisper-small.en.bin",
          label: "small - english only (489M)",
          value: "ggml-model-whisper-small.en.bin",
        },
      ],
    },
  },
};

export type ConfigFormats = {
  id: string;
  label: string;
  value: string;
  options: ConfigFormatOption[];
};

export interface ConfigFormatOption extends UIInputItem {
  mimetype?: string;
  ext: string;
  isDefault?: boolean;
}

export type ConfigSettings = {
  lang: ConfigSettingOption<string>;
  suppress_non_speech: ConfigSettingOption<boolean>;
  threads: ConfigSettingOption<number>;
  model: ConfigSettingOption<string>;
};

export interface ConfigSettingOption<T = any> extends UIInputItem<T> {
  options?: ConfigSettingOption<T>[];
  isDefault?: boolean;
}
