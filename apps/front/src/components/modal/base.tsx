"use client";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Button from "../common/button";

export interface BaseModalProps {
    children?: React.ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    title?: string;
}

export default function BaseModal({
    children,
    isOpen,
    onClose,
    title = "Modal title",
}: BaseModalProps) {
    const [hasRendered, setHasRendered] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openDialog = () => {
        if (!dialogRef.current) return;
        dialogRef.current.removeAttribute("open");
        dialogRef.current?.showModal();
    };

    const closeDialog = () => {
        if (!dialogRef.current) return;
        dialogRef.current.close();
        onClose && onClose();
    };

    useEffect(() => {
        console.log("isOpen", isOpen);
        if (!isOpen) closeDialog();
        else openDialog();
    }, [isOpen]);

    useEffect(() => {
        setHasRendered(true);
    }, []);

    return hasRendered
        ? ReactDOM.createPortal(
              <dialog ref={dialogRef} className="modal">
                  <div className="modal-box flex flex-col gap-3">
                      <h3 className="text-xl">{title}</h3>
                      {children}
                      <div className="modal-action">
                          <Button className="!w-fit" onClick={closeDialog}>
                              Close
                          </Button>
                      </div>
                  </div>
                  <form
                      method="dialog"
                      onSubmit={closeDialog}
                      className="modal-backdrop"
                  >
                      <button>close</button>
                  </form>
              </dialog>,
              document.getElementById("modal-root") as HTMLDivElement
          )
        : null;
}
