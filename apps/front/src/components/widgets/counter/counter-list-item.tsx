import Button from "@/components/common/button";
import { CounterI, CounterPublicI } from "@/lib/interfaces/counter";
import Link from "next/link";

export default function CounterListItem({ item }: { item: CounterPublicI }) {
    return (
        <article
            className={
                "flex flex-col gap-3 border-white border-2 w-full p-5 rounded-md"
            }
        >
            <h2>{item.name}</h2>
            <div className="w-full flex justify-between gap-4">
                <Link href={`/widgets/counter/${item.id}/overview`}>
                    <Button>Overview</Button>
                </Link>
                <Link target="_blank" href={`/viewer/counter/${item.id}`}>
                    <Button>Show</Button>
                </Link>
            </div>
        </article>
    );
}
