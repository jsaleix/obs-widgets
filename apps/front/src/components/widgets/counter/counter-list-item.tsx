import Button from "@/components/common/button";
import ExternalIcon from "@/components/icons/external";
import { CounterI, CounterPublicI } from "@/lib/interfaces/counter";
import Link from "next/link";

export default function CounterListItem({ item }: { item: CounterPublicI }) {
    return (
        <article
            className={
                "flex flex-col gap-3 border-white border-2 w-full p-5 rounded-md overflow-hidden"
            }
        >
            <h2>{item.name}</h2>
            <div className="w-full flex justify-between gap-1 lg:gap-4 ">
                <Link
                    href={`/widgets/counter/${item.id}/overview`}
                    className="w-1/2"
                >
                    <Button>Overview</Button>
                </Link>
                <Link
                    target="_blank"
                    href={`/viewer/counter/${item.id}`}
                    className="w-1/2"
                >
                    <Button className="gap-3">
                        Overlay <ExternalIcon />
                    </Button>
                </Link>
            </div>
        </article>
    );
}
