import {
  asyncEvery,
  generateRandomId,
  getDtwTypeFromFilename,
} from "@/lib/utils/utils";
import { describe } from "vitest";

describe("lib/utils", () => {
  describe("#generateRandomId()", () => {
    it("should generate a random id", () => {
      const id = generateRandomId("test");
      expect(id).toMatch(/^test-.+$/);
    });
  });

  describe("#getDtwTypeFromFilename()", () => {
    it("should return the correct dtw type", () => {
      expect(getDtwTypeFromFilename("ggml-tiny-q5_1.bin")).toBe("tiny");
      expect(getDtwTypeFromFilename("ggml-base-q5_1.bin")).toBe("base");
      expect(getDtwTypeFromFilename("ggml-model-whisper-tiny.bin")).toBe(
        "tiny",
      );
      expect(getDtwTypeFromFilename("ggml-model-whisper-tiny.en.bin")).toBe(
        "tiny.en",
      );
      expect(getDtwTypeFromFilename("ggml-model-whisper-base.bin")).toBe(
        "base",
      );
      expect(getDtwTypeFromFilename("ggml-model-whisper-base.en.bin")).toBe(
        "base.en",
      );
      expect(getDtwTypeFromFilename("ggml-model-whisper-small.bin")).toBe(
        "small",
      );
      expect(getDtwTypeFromFilename("ggml-model-whisper-small.en.bin")).toBe(
        "small.en",
      );
      expect(getDtwTypeFromFilename("ggml-model-whisper.bin")).toBe(undefined);
    });
  });

  describe("asyncEvery()", () => {
    const fakeAsyncCallback = async (value: any) => {
      return new Promise<boolean>((resolve) => {
        setTimeout(() => {
          resolve(value);
        }, 100);
      });
    };

    it("should return true if all promises resolve to true", async () => {
      const result = await asyncEvery([true, true, true], async (value) => {
        return await fakeAsyncCallback(value);
      });
      expect(result).toBe(true);
    });

    it("should return false if any promise resolves to false", async () => {
      const result = await asyncEvery([true, false, true], async (value) => {
        return fakeAsyncCallback(value);
      });
      expect(result).toBe(false);
    });
  });
});
