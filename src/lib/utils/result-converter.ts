import type { TranscribeResult } from "@transcribe/transcriber";

export function resultToText(result: TranscribeResult): string {
  return result.transcription.map((t) => t.text.trim()).join("\n");
}

export function resultToJson(result: TranscribeResult): string {
  return JSON.stringify(result);
}

export function resultToCsv(result: TranscribeResult): string {
  let csv = "from,to,text";

  result.transcription.forEach(({ timestamps, text }) => {
    csv += `\n"${timestamps.from}","${timestamps.to}","${text.trim()}"`;
  });

  return csv;
}

export function resultToSrt(result: TranscribeResult): string {
  let srt = "";

  result.transcription.forEach(({ timestamps, text }, index) => {
    srt += `${index + 1}\n`;
    srt += `${timestamps.from} --> ${timestamps.to}\n`;
    srt += `${text.trim()}`;
    srt += index < result.transcription.length - 1 ? "\n\n" : "";
  });

  return srt;
}

export function resultToVtt(result: TranscribeResult): string {
  let vtt = "WEBVTT\n\n";

  result.transcription.forEach(({ timestamps, text }, index) => {
    vtt += `${timestamps.from.replace(",", ".")} --> ${timestamps.to.replace(",", ".")}\n`;
    vtt += `${text.trim()}`;
    vtt += index < result.transcription.length - 1 ? "\n\n" : "";
  });

  return vtt;
}

export function resultToLrc(result: TranscribeResult): string {
  let lrc = "";

  result.transcription.forEach(({ timestamps, text }, index) => {
    const from = timestamps.from.replace(",", ".").substring(3, 11);
    lrc += `[${from}]${text.trim()}`;
    lrc += index < result.transcription.length - 1 ? "\n" : "";
  });

  return lrc;
}

export function resultToLrcEnhanced(result: TranscribeResult): string {
  let lrc = "";

  result.transcription.forEach(({ timestamps, tokens }, index) => {
    const from = timestamps.from.replace(",", ".").substring(3, 11);
    lrc += `[${from}]`;

    tokens.forEach(({ timestamps, text }, i) => {
      if (text.startsWith("[") || ["!", "?", "."].includes(text)) {
        return;
      }

      if (timestamps) {
        const from = timestamps.from.replace(",", ".").substring(3, 11);
        lrc += ` <${from}> `;
      }

      lrc += text.trim();
    });

    lrc += index < result.transcription.length - 1 ? "\n" : "";
  });

  return lrc;
}

export function resultToFormat(
  result: TranscribeResult,
  format: "txt" | "json" | "csv" | "srt" | "vtt" | "lrc" | "lrc-enhanced",
): string {
  switch (format) {
    case "txt":
      return resultToText(result);
    case "json":
      return resultToJson(result);
    case "csv":
      return resultToCsv(result);
    case "srt":
      return resultToSrt(result);
    case "vtt":
      return resultToVtt(result);
    case "lrc":
      return resultToLrc(result);
    case "lrc-enhanced":
      return resultToLrcEnhanced(result);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
}
