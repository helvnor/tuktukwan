import { useEffect, useRef, type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  className?: string;
}

// A native modal <dialog>: the browser traps focus, closes it on Escape and
// keeps the rest of the page inert. A click on the backdrop closes it too.
export function Modal({
  open,
  onClose,
  labelledBy,
  children,
  className = "",
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const pressedBackdrop = useRef(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      // A drag that starts inside the dialog and ends on the backdrop clicks
      // the dialog too, so only a press that also began there counts.
      onPointerDown={(event) => {
        pressedBackdrop.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (pressedBackdrop.current && event.target === event.currentTarget) {
          onClose();
        }
        pressedBackdrop.current = false;
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-full max-w-[calc(100vw-2rem)] overflow-y-auto rounded-lg bg-white p-0 shadow-lg open:animate-scale-in sm:w-max"
    >
      <div className={`flex flex-col gap-4 p-8 ${className}`}>{children}</div>
    </dialog>
  );
}

export function CloseButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="-mt-4 -mr-4 self-end cursor-pointer text-2xl text-red-600 hover:brightness-[0.85]"
    >
      <i className="fa-solid fa-circle-xmark" aria-hidden />
    </button>
  );
}
