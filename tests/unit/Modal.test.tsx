import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "../test-utils";
import { Modal } from "../../src/components/Modal";

function renderModal() {
  const onClose = vi.fn();
  render(
    <Modal open onClose={onClose} labelledBy="title">
      <h2 id="title">Title</h2>
      <input aria-label="Field" />
    </Modal>,
  );
  return { onClose, dialog: screen.getByRole("dialog", { name: "Title" }) };
}

describe("Modal", () => {
  it("closes on a click on the backdrop", () => {
    const { onClose, dialog } = renderModal();

    fireEvent.pointerDown(dialog);
    fireEvent.click(dialog);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("stays open when a drag from inside ends on the backdrop", () => {
    const { onClose, dialog } = renderModal();

    fireEvent.pointerDown(screen.getByLabelText("Field"));
    fireEvent.click(dialog);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("stays open on a click inside", () => {
    const { onClose } = renderModal();

    fireEvent.pointerDown(screen.getByLabelText("Field"));
    fireEvent.click(screen.getByLabelText("Field"));

    expect(onClose).not.toHaveBeenCalled();
  });
});
