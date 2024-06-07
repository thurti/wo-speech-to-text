import { derived, get, readable, writable } from "svelte/store";
import {
  type ConfigFormatOption,
  type ConfigSettingOption,
  config,
  type ConfigSettings,
  type ConfigFormats,
} from "./config";
import {
  createLogger,
  createPersistentBooleanStore,
  createPersistentJsonStore,
  createPersistentNumberStore,
} from "./lib/utils/store";
import type { TranscribeResult } from "@transcribe/transcriber";

export type SelectedSettings = {
  [key: string]: ConfigSettingOption["value"];
};

/**
 * Show complete UI.
 */
export const isOpen = writable<boolean>(true);

/**
 * Array of selected files for conversion.
 */
export const selectedFiles = writable<File[]>([]);

/**
 * Available formates/presets for conversion.
 */
export const configFormats = readable<ConfigFormats>(
  structuredClone(config.formats),
);

/**
 * Available settings for given id.
 */
export const configSettings = readable<ConfigSettings>(
  structuredClone(config.settings),
);

export const getDefaultFormat = (): ConfigFormatOption =>
  // cast to ConfigFormatOption because default format must be set in config
  structuredClone(
    get(configFormats).options.find((format) => format.isDefault),
  ) as ConfigFormatOption;

/**
 * The selected target file format. (eg. mp3)
 */
export const selectedFormat = createPersistentJsonStore<ConfigFormatOption>(
  "selectedFormat",
  getDefaultFormat(),
);

/**
 * The default settings for the selected format.
 */
function getDefaultSettings() {
  let settings: SelectedSettings = {};

  for (const setting of Object.values(config.settings)) {
    settings[setting.id] =
      setting.options?.find((options) => options.isDefault)?.value ??
      setting.value;
  }

  return settings;
}

export const defaultSettings = getDefaultSettings();

/**
 * The selected settings for the conversion. (eg. sample rate, bit rate, etc.)
 */
export const selectedSettings = createPersistentJsonStore<SelectedSettings>(
  "selectedSettings",
  structuredClone(defaultSettings),
);

/**
 * Log output.
 */
export const logger = createLogger();
export type Logger = typeof logger;

/**
 * True while files are being preloaded. (wasm, sw, script)
 */
export const isPreloadingFiles = writable<boolean>(true);

/**
 * True while files are being converted.
 */
export const isConverting = writable<boolean>(false);

/**
 * True if converted files are ready for download.
 */
export const isDownloadReady = writable<boolean>(false);

/**
 * Total files that have been converted all time.
 */
export const transcribedFilesCount = createPersistentNumberStore(
  "transcribedWordsCount",
  0,
);

/**
 * Map of files that are ready for download.
 */
export const filesReadyForDownload = writable<Map<File, TranscribeResult>>(
  new Map(),
);

/**
 * If true a notification will be shown when files are ready for download.
 */
export const notifyOnConversionReady = createPersistentBooleanStore(
  "notifyOnConversionReady",
  false,
);

/**
 * If true a badge will be shown when files are ready for download.
 */
export const badgeOnConversionReady = createPersistentBooleanStore(
  "badgeOnConversionReady",
  false,
);

/**
 * Light, dark, or auto color scheme.
 */
export const preferedColorScheme = createPersistentJsonStore<
  "auto" | "light" | "dark"
>("prefersLightTheme", "auto");
