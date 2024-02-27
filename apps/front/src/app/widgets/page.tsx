"use server";
import WidgetItem from "@/components/widgets/widget-item";
import widgetService from "@/lib/services/widget.service";

export default async function Page() {
    const widgets = await widgetService.findAllByOwner("noOne");
    if (!widgets || widgets.length === 0) return <div>No widget found</div>;
    return (
        <div className={"w-100"}>
            {widgets.length > 0 && (
                <div className={"w-full grid sm:grid-cols-1 md:grid-cols-4 gap-4"}>
                    {widgets.map((c, idx) => (
                        <WidgetItem key={idx} widget={c} />
                    ))}
                </div>
            )}
        </div>
    );
}
