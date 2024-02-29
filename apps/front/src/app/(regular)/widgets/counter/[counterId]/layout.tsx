import counterService from "@/lib/services/counter.service";
import { redirect } from "next/navigation";

interface Props {
    children: React.ReactNode;
    params: {
        counterId: string;
    };
}

async function authorizationCheck(counterId: string) {
    // TODO: verify if the user is the owner of the widget
    const counter = await counterService.findOne(counterId);
    // return redirect("/widgets")
}

export default async function Layout({
    children,
    params: { counterId },
}: Props) {
    await authorizationCheck(counterId);
    return <div>{children}</div>;
}
