import { CounterI } from "@/lib/interfaces/counter";
import Link from "next/link";

export default function CounterListItem({ item }: { item: CounterI }) {
    return (
        <article
            className={
                "flex flex-col gap-3 border-white border-2 w-full p-5 rounded-md"
            }
        >
            <h2>{item.name}</h2>
            <div className="w-full flex justify-between gap-4">
                <Link
                    className="bg-white text-black p-2 rounded-md w-full"
                    href={`/widgets/counter/${item.id}/edit`}
                >
                    Edit
                </Link>
                <Link
                    target="_blank"
                    className="bg-white text-black p-2 rounded-md w-full"
                    href={`/viewer/counter/${item.id}`}
                >
                    Show (out)
                </Link>
            </div>
        </article>
    );
}
