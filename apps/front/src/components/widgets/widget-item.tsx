import { Widget } from "@/lib/interfaces/widget";
import Link from "next/link";

export default function WidgetItem({ widget }: { widget: Widget }) {
    return (
        <article
            className={
                "flex flex-col gap-3 border-white border-2 w-full p-5 rounded-md"
            }
        >
            <h2>{widget.name}</h2>
            <div className="w-full flex justify-between gap-4">
                <Link
                    className="bg-white text-black p-2 rounded-md w-full"
                    href={`/widgets/${widget.id}/edit`}
                >
                    Edit
                </Link>
                <Link
                    target="_blank"
                    className="bg-white text-black p-2 rounded-md w-full"
                    href={`/viewer/widget/${widget.id}`}
                >
                    Show (out)
                </Link>
            </div>
        </article>
    );
}
