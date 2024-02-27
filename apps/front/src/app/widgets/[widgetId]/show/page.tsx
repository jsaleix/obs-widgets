import widgetService from "@/lib/services/widget.service";
import { redirect } from "next/navigation";

interface PageProps {
    params: {
        widgetId: string;
    };
}

export default async function Page({ params: { widgetId } }: PageProps) {
    const data = await widgetService.findOne(widgetId);

    if (!data) return redirect("/widgets?not-found");
    return (
        <div>
            <p>{widgetId}</p>
            <div>
                <h2>General</h2>
                <p>{Object.keys(data.general).sort().join(" ")}</p>
            </div>
            <p>{data.secret}</p>
            <p>{data.owner}</p>
        </div>
    );
}
