import { notFound, redirect } from "next/navigation";
import userService from "@/lib/services/user.service";
import { UserI } from "@/lib/interfaces/user";

async function migrate() {
    const users = await userService.findAll();
    console.log(users);
    // users.forEach(async (user: UserI) => {
    //     const createdAt = new Date().toISOString();
    //     await userService.update(user.id, { createdAt });
    // });
}

export async function GET() {
    const env = process.env.NODE_ENV;
    if (env !== "development") return redirect("/404");
    await migrate();
    return Response.json({ msg: env }, { status: 400 });
}
