import { UserI } from "@/lib/interfaces/user";
import userService from "@/lib/services/user.service";
import Link from "next/link";

function UserRow({ user }: { user: UserI }) {
    return (
        <tr>
            <td>{user.id}</td>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={user.image} alt="User profile picture" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                </div>
            </td>
            <td>{user.role}</td>
            <td>{new Date(user.createdAt).toLocaleString()}</td>
            <th>
                <Link href={`/admin/users/${user.id}`}>
                    <button className="btn btn-ghost btn-xs">more</button>
                </Link>
            </th>
        </tr>
    );
}

export default async function Page() {
    const users = await userService.findAll({ orderBy: { createdAt: "desc" } });

    return (
        <div className="w-full h-full">
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Users:</h1>
                {users.length === 0 && <p>No user found</p>}
                {users.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Info</th>
                                    <th>Role</th>
                                    <th>CreatedAt</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <UserRow user={user} key={user.id} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
