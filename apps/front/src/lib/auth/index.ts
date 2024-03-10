import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import counterService from "../services/counter.service";

export const getServerAuthSession = () => getServerSession(authOptions);

export async function checkPermission(counterId: string) {
    const session = await getServerAuthSession();
    if (!session) throw new Error("Not authenticated.");
    const isAllowed = await counterService.isAllowedToEdit(
        counterId,
        session.user.id!
    );
    if (!isAllowed) throw new Error("Not allowed.");
}