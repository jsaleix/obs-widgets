import { notify } from "./toasts";

export const classNames = (...classes: string[]) =>
    classes.filter(Boolean).join(" ");

export const bgColorToRgba = (color: string, opacity: number) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
};

interface CopyToClipboardParams {
    text: string;
    label?: string;
    toast?: boolean;
}

export const copyToClipboard = ({
    text,
    label,
    toast,
}: CopyToClipboardParams) => {
    navigator.clipboard.writeText(text);
    if (toast) {
        if (label) {
            notify(`${label} copied to clipboard`);
        } else {
            notify(`Copied to clipboard`);
        }
    }
};

export function genRandomString(length: number) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

export function debounce(func: Function, timeout = 300) {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, timeout);
    };
}

export function throttle(func: Function, limit = 300) {
    let inThrottle: boolean;
    return (...args: any) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}
