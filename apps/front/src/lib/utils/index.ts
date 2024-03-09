export const classNames = (...classes: string[]) =>
    classes.filter(Boolean).join(" ");

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
        // if (label) {
        //     notify(`${label} copied to clipboard`);
        // } else {
        //     notify(`Copied to clipboard`);
        // }
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
