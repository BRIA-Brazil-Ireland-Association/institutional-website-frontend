import { Resend } from "resend";

let client: Resend | undefined;

export function getResendClient() {
  if (!client) {
    const apiKey = process.env.RESEND_KEY;

    if (!apiKey) {
      throw new Error("RESEND_KEY is not configured.");
    }

    client = new Resend(apiKey);
  }

  return client;
}

export function getResendFrom() {
  const address = process.env.RESEND_FROM_ADDRESS;
  const name = process.env.RESEND_FROM_NAME;

  if (!address) {
    throw new Error("RESEND_FROM_ADDRESS is not configured.");
  }

  return name ? `${name} <${address}>` : address;
}

export function getResendTo() {
  const address = process.env.RESEND_TO_ADDRESS;

  if (!address) {
    throw new Error("RESEND_TO_ADDRESS is not configured.");
  }

  return address;
}
