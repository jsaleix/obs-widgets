"use client";
import { ToastOptions, toast } from "react-toastify";

type ToastType = "success" | "error" | "warning";

export function displayMsg(msg: string, type: ToastType = "success") {
    const settings: ToastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    };
    switch (type) {
        case "success":
            toast.success(msg, settings);
            break;
        case "error":
            toast.error(msg, settings);
            break;
        case "warning":
            toast.warn(msg, settings);
            break;
        default:
            toast(msg, settings);
    }
}

export function notify(msg: string) {
    toast.info(msg, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
