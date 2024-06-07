import { resultToFormat } from "@/lib/utils/result-converter";
import type { TranscribeResult } from "@transcribe/transcriber";

describe("resultToFormat", () => {
  const transcribeResult: TranscribeResult = {
    result: {
      language: "en",
    },
    transcription: [
      {
        timestamps: {
          from: "00:00:00,000",
          to: "00:00:11,000",
        },
        offsets: {
          from: 0,
          to: 11000,
        },
        text: " And so my fellow Americans",
        tokens: [
          {
            text: "[_BEG_]",
            timestamps: {
              from: "00:00:00,000",
              to: "00:00:00,000",
            },
            offsets: {
              from: 0,
              to: 0,
            },
            id: 50364,
            p: 0.756269,
          },
          {
            text: " And",
            timestamps: {
              from: "00:00:00,320",
              to: "00:00:00,350",
            },
            offsets: {
              from: 320,
              to: 350,
            },
            id: 400,
            p: 0.72166,
          },
          {
            text: " so",
            timestamps: {
              from: "00:00:00,350",
              to: "00:00:00,540",
            },
            offsets: {
              from: 350,
              to: 540,
            },
            id: 370,
            p: 0.880945,
          },
          {
            text: " my",
            timestamps: {
              from: "00:00:00,680",
              to: "00:00:00,810",
            },
            offsets: {
              from: 680,
              to: 810,
            },
            id: 452,
            p: 0.664775,
          },
          {
            text: " fellow",
            timestamps: {
              from: "00:00:00,810",
              to: "00:00:01,510",
            },
            offsets: {
              from: 810,
              to: 1510,
            },
            id: 7177,
            p: 0.998825,
          },
          {
            text: " Americans",
            timestamps: {
              from: "00:00:01,510",
              to: "00:00:02,100",
            },
            offsets: {
              from: 1510,
              to: 2100,
            },
            id: 6280,
            p: 0.975707,
          },
          {
            text: ".",
            timestamps: {
              from: "00:00:10,480",
              to: "00:00:10,990",
            },
            offsets: {
              from: 10480,
              to: 10990,
            },
            id: 13,
            p: 0.684276,
          },
          {
            text: "[_TT_550]",
            timestamps: {
              from: "00:00:11,000",
              to: "00:00:11,000",
            },
            offsets: {
              from: 11000,
              to: 11000,
            },
            id: 50914,
            p: 0.0301658,
          },
        ],
      },
      {
        timestamps: {
          from: "00:00:11,000",
          to: "00:00:12,000",
        },
        offsets: {
          from: 11000,
          to: 12000,
        },
        text: "another thing",
        tokens: [
          {
            text: "another",
            id: 0,
            p: 0.999999,
            timestamps: {
              from: "00:00:11,000",
              to: "00:00:11,800",
            },
          },
          {
            text: "thing",
            id: 1,
            p: 0.999999,
            timestamps: {
              from: "00:00:11,800",
              to: "00:00:12,000",
            },
          },
        ],
      },
    ],
  };

  it("should convert result to text format", () => {
    const result = resultToFormat(transcribeResult, "txt");
    expect(result).toBe("And so my fellow Americans\nanother thing");
  });

  it("should convert result to json format", () => {
    const result = resultToFormat(transcribeResult, "json");
    expect(result).toBe(JSON.stringify(transcribeResult));
  });

  it("should convert result to csv format", () => {
    const result = resultToFormat(transcribeResult, "csv");
    expect(result).toBe(
      'from,to,text\n"00:00:00,000","00:00:11,000","And so my fellow Americans"\n"00:00:11,000","00:00:12,000","another thing"',
    );
  });

  it("should convert result to srt format", () => {
    const result = resultToFormat(transcribeResult, "srt");
    expect(result).toBe(
      "1\n00:00:00,000 --> 00:00:11,000\nAnd so my fellow Americans\n\n2\n00:00:11,000 --> 00:00:12,000\nanother thing",
    );
  });

  it("should convert result to vtt format", () => {
    const result = resultToFormat(transcribeResult, "vtt");
    expect(result).toBe(
      "WEBVTT\n\n00:00:00.000 --> 00:00:11.000\nAnd so my fellow Americans\n\n00:00:11.000 --> 00:00:12.000\nanother thing",
    );
  });

  it("should convert result to lrc format", () => {
    const result = resultToFormat(transcribeResult, "lrc");
    expect(result).toBe(
      "[00:00.00]And so my fellow Americans\n[00:11.00]another thing",
    );
  });

  it("should convert result to enhanced lrc format", () => {
    const result = resultToFormat(transcribeResult, "lrc-enhanced");
    expect(result).toBe(
      "[00:00.00] <00:00.32> And <00:00.35> so <00:00.68> my <00:00.81> fellow <00:01.51> Americans\n[00:11.00] <00:11.00> another <00:11.80> thing",
    );
  });
});
