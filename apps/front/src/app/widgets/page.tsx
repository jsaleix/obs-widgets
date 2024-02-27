"use server";
import widgetService from "@/lib/services/widget.service";

export default async function Page() {
    const widgets = await widgetService.findAllByOwner("noOne");
    if (!widgets || widgets.length === 0) return <div>No widget found</div>;
    return (
        <div>
            {widgets.length > 0 &&
                widgets.map((c, idx) => <button key={c.id}>{c.name}</button>)}
        </div>
    );
}
