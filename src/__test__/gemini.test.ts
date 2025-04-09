import { describe, it, expect } from "vitest";
import { askGemini } from "@/lib/gemini";

describe("Test Gemini", () => {
  it("should send request and return response text", async () => {
    const result = await askGemini("Hello gemini");

    expect(typeof result).toBe("string");
  });
});
