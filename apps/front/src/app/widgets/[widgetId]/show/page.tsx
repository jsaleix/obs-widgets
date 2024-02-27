import { Collections } from "@/config/firestore";
import { findAll } from "@/lib/firebase";
import widgetService from "@/lib/services/widget.service";

export function WidgetTest({ data }: { data: any }) {
    return (
        <div>
            <div>
                <h2>General</h2>
                <p>{Object.keys(data.general).sort().join(" ")}</p>
            </div>
            <p>{data.secret}</p>
            <p>{data.owner}</p>
        </div>
    );
}

export default async function Page() {
    const data = await findAll(Collections.widgets);

    return (
        <div>
            {data &&
                data.length > 0 &&
                data.map((c, idx) => <WidgetTest key={idx} data={c} />)}
        </div>
    );
}
