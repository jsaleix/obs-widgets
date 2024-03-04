import Button from "@/components/common/button";
import { COUNTER_MAX_ROWS } from "@/lib/config/counter";
import { CounterRowSettings } from "@/lib/interfaces/counter";

interface Props {
    rows: CounterRowSettings[];
    addRow: () => void;
    selectRow: (id: string) => void;
}
export default function RowsPart({ rows, addRow, selectRow }: Props) {
    return (
        <div id="rows-part" className={"w-full flex flex-col gap-1"}>
            {rows.length > 0 &&
                rows.map((row, idx) => (
                    <Button key={idx} onClick={() => selectRow(row.id)}>
                        {row.id}
                    </Button>
                ))}
            {rows.length < COUNTER_MAX_ROWS && (
                <Button onClick={addRow} className="bg-gray-500">
                    +
                </Button>
            )}
        </div>
    );
}
