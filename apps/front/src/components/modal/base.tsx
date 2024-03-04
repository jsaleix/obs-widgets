"use client";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface Props {
    children?: React.ReactNode;
}

export default function BaseModal({ children }: Props) {
    const [hasRendered, setHasRendered] = useState(false);

    useEffect(() => {
        setHasRendered(true);
    }, []);

    return hasRendered
        ? ReactDOM.createPortal(
              <div className="">
                  <div className="bg-white w-1/2 h-1/2 m-auto p-4">
                      <p>Modal</p>
                  </div>
                  <div>{children}</div>
              </div>,
              document.getElementById("modal-root") as HTMLDivElement
          )
        : null;
}
