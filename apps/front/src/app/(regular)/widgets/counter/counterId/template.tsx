import { redirect } from "next/navigation";

interface Props {
    children: React.ReactNode;
}

async function authorizationCheck() {
    // TODO: verify if the user is the owner of the widget
    // return redirect("/widgets")
}

export default async function Template({ children }: Props) {
    await authorizationCheck();
    return <div>{children}</div>;
}
