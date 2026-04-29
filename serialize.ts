import type { ReceiptDraft } from "@/lib/receipt/types";

function base64UrlEncodeUtf8(input: string) {
  if (typeof window !== "undefined" && typeof window.btoa === "function") {
    const bytes = new TextEncoder().encode(input);
    let binary = "";
    for (const b of bytes) binary += String.fromCharCode(b);
    const b64 = window.btoa(binary);
    return b64.replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
  }

  // Server / Node runtime
  return Buffer.from(input, "utf8").toString("base64url");
}

function base64UrlDecodeUtf8(input: string) {
  if (typeof window !== "undefined" && typeof window.atob === "function") {
    const b64 = input.replaceAll("-", "+").replaceAll("_", "/") + "===".slice((input.length + 3) % 4);
    const binary = window.atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  // Server / Node runtime
  return Buffer.from(input, "base64url").toString("utf8");
}

export function encodeDraftToQuery(draft: ReceiptDraft) {
  const json = JSON.stringify(draft);
  return base64UrlEncodeUtf8(json);
}

export function decodeDraftFromQuery(encoded: string) {
  const json = base64UrlDecodeUtf8(encoded);
  return JSON.parse(json) as ReceiptDraft;
}

