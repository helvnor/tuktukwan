import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// jsdom has no <dialog> methods; open and close it the way a browser would.
if (typeof HTMLDialogElement !== "undefined") {
  HTMLDialogElement.prototype.showModal ??= function showModal(
    this: HTMLDialogElement,
  ) {
    this.open = true;
  };
  HTMLDialogElement.prototype.close ??= function close(
    this: HTMLDialogElement,
  ) {
    this.open = false;
    this.dispatchEvent(new Event("close"));
  };
}

afterEach(() => {
  cleanup();
});

// The router restores scroll positions on navigation; jsdom has no layout.
window.scrollTo = () => {};
