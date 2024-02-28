import RenderedWidget from "@/components/widgets/rendered-item";
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
    return <RenderedWidget widget={data} />;
}
