import Counter from "@/components/widgets/counter/rendered";
import counterService from "@/lib/services/counter.service";
import userService from "@/lib/services/user.service";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
    params: {
        userId: string;
    };
}

export default async function Page({ params: { userId } }: Props) {
    const user = await userService.findOne(userId);
    if (!user) return redirect("/admin");
    const counters = await counterService.findAllByOwner(userId);

    return (
        <div className="w-full h-full flex flex-row justify-between items-start gap-5">
            <section id="user_info" className="w-1/2 flex items-center gap-5">
                <div className="h-50 w-50 rounded-full overflow-hidden">
                    <img src={user.image} alt={""} />
                </div>
                <div>
                    <h3 className="text-xl">{user.email}</h3>
                    <h4 className="text-xl font-bold">{user.name}</h4>
                    <p>{user.role}</p>
                </div>
            </section>
            <section
                id="user_counters"
                className="w-1/2 h-full flex flex-col gap-5"
            >
                <h2 className="text-xl">Counters</h2>
                {counters.length === 0 && (
                    <p className="text-md italic">This user has no counter.</p>
                )}
                {counters.length > 0 && (
                    <ul className="w-full flex flex-col gap-3">
                        {counters.map((counter) => (
                            <li key={counter.id}>
                                <Link
                                    className="w-full btn text-white"
                                    target="_blank"
                                    href={`/widgets/counter/${counter.id}/overview`}
                                >
                                    {counter.name}
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8 3C8.26522 3 8.51957 3.10536 8.70711 3.29289C8.89464 3.48043 9 3.73478 9 4C9 4.26522 8.89464 4.51957 8.70711 4.70711C8.51957 4.89464 8.26522 5 8 5H2V16H13V10C13 9.73478 13.1054 9.48043 13.2929 9.29289C13.4804 9.10536 13.7348 9 14 9C14.2652 9 14.5196 9.10536 14.7071 9.29289C14.8946 9.48043 15 9.73478 15 10V16C15 16.5304 14.7893 17.0391 14.4142 17.4142C14.0391 17.7893 13.5304 18 13 18H2C1.46957 18 0.960859 17.7893 0.585786 17.4142C0.210714 17.0391 0 16.5304 0 16V5C0 4.46957 0.210714 3.96086 0.585786 3.58579C0.960859 3.21071 1.46957 3 2 3H8ZM17 0C17.2652 0 17.5196 0.105357 17.7071 0.292893C17.8946 0.48043 18 0.734784 18 1V6C18 6.26522 17.8946 6.51957 17.7071 6.70711C17.5196 6.89464 17.2652 7 17 7C16.7348 7 16.4804 6.89464 16.2929 6.70711C16.1054 6.51957 16 6.26522 16 6V3.414L7.707 11.707C7.5184 11.8892 7.2658 11.99 7.0036 11.9877C6.7414 11.9854 6.49059 11.8802 6.30518 11.6948C6.11977 11.5094 6.0146 11.2586 6.01233 10.9964C6.01005 10.7342 6.11084 10.4816 6.293 10.293L14.586 2H12C11.7348 2 11.4804 1.89464 11.2929 1.70711C11.1054 1.51957 11 1.26522 11 1C11 0.734784 11.1054 0.48043 11.2929 0.292893C11.4804 0.105357 11.7348 0 12 0H17Z"
                                            fill="white"
                                        />
                                    </svg>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
