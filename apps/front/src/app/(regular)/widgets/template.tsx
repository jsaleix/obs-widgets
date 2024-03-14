import { redirect } from "next/navigation";

interface Props {
    children: React.ReactNode;
}

async function authorizationCheck() {
    // TODO: verify if the user is connected
    // return redirect("/login")
}

export default async function Template({ children }: Props) {
    await authorizationCheck();
    return <div className="container mx-auto h-full w-full pb-10">{children}</div>;
}
