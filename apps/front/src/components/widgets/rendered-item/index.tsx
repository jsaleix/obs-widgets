import { Widget } from "@/lib/interfaces/widget";
import RowItem from "./row-item";
import OptionalText from "./optional-text";

interface Props {
    widget: Widget;
}

export default function RenderedWidget({ widget }: Props) {
    return (
        <div className="flex flex-col bg-neutral-900/85 h-5rem w-fit rounded-l opacity-90">
            <div className="flex flex-col items-start gap-4 p-5 w-90">
                {widget.rows.length > 0 &&
                    widget.rows.map((r, idx) => <RowItem data={r} key={idx} />)}
                {widget.general.optionalText && (
                    <OptionalText
                        text={widget.general.optionalText}
                        color={widget.general.optionalTextColor}
                    />
                )}
            </div>
        </div>
    );
}
