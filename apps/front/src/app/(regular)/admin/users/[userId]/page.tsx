import userService from "@/lib/services/user.service";

export default async function Page() {
    const users = await userService.findAll();

    return (
        <div>
            <h1>Users:</h1>
            {users.length === 0 && <p>No user found</p>}
            {users.length > 0 &&
                users.map((user) => <p key={user.id}>{user.email}</p>)}
        </div>
    );
}
