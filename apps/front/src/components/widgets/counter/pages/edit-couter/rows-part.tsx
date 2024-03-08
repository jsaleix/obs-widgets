"use client";
import Button from "@/components/common/button";
import { COUNTER_MAX_ROWS } from "@/lib/config/counter";
import { CounterRowSettings } from "@/lib/interfaces/counter";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useEditCounterContext } from "@/contexts/edit-counter.context";
import Loader from "@/components/misc/loader";

interface RowItemProps {
    rowId: string;
    onClick: () => void;
    index: number;
}

export function RowItem({ rowId, onClick, index }: RowItemProps) {
    return (
        <Draggable draggableId={rowId} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Button
                        onClick={onClick}
                        className="flex !justify-start px-5"
                    >
                        <span
                            {...provided.dragHandleProps}
                            onClick={(e) => e.preventDefault()}
                        >
                            <svg
                                width="16"
                                height="14"
                                viewBox="0 0 16 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0 1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H15C15.2652 0 15.5196 0.105357 15.7071 0.292893C15.8946 0.48043 16 0.734784 16 1C16 1.26522 15.8946 1.51957 15.7071 1.70711C15.5196 1.89464 15.2652 2 15 2H1C0.734784 2 0.48043 1.89464 0.292893 1.70711C0.105357 1.51957 0 1.26522 0 1ZM0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H15C15.2652 4 15.5196 4.10536 15.7071 4.29289C15.8946 4.48043 16 4.73478 16 5C16 5.26522 15.8946 5.51957 15.7071 5.70711C15.5196 5.89464 15.2652 6 15 6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5ZM0 9C0 8.73478 0.105357 8.48043 0.292893 8.29289C0.48043 8.10536 0.734784 8 1 8H15C15.2652 8 15.5196 8.10536 15.7071 8.29289C15.8946 8.48043 16 8.73478 16 9C16 9.26522 15.8946 9.51957 15.7071 9.70711C15.5196 9.89464 15.2652 10 15 10H1C0.734784 10 0.48043 9.89464 0.292893 9.70711C0.105357 9.51957 0 9.26522 0 9ZM0 13C0 12.7348 0.105357 12.4804 0.292893 12.2929C0.48043 12.1054 0.734784 12 1 12H15C15.2652 12 15.5196 12.1054 15.7071 12.2929C15.8946 12.4804 16 12.7348 16 13C16 13.2652 15.8946 13.5196 15.7071 13.7071C15.5196 13.8946 15.2652 14 15 14H1C0.734784 14 0.48043 13.8946 0.292893 13.7071C0.105357 13.5196 0 13.2652 0 13Z"
                                    fill="white"
                                />
                            </svg>
                        </span>
                        <span className="ml-auto mr-auto">{rowId}</span>
                    </Button>
                </div>
            )}
        </Draggable>
    );
}

function RowsList({
    rows,
    onClick,
}: {
    rows: CounterRowSettings[];
    onClick: (id: string) => void;
}) {
    return rows.map((row, idx) => (
        <RowItem
            key={row.id}
            index={idx}
            rowId={row.id}
            onClick={() => onClick(row.id)}
        />
    ));
}

const reorder = (
    list: CounterRowSettings[],
    startIndex: number,
    endIndex: number
) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

interface DndListProps {
    rows: CounterRowSettings[];
    onClick: (id: string) => void;
    children: React.ReactNode;
    addRow: () => void;
    onDragEnd: (result: any) => void;
}

export function DnDList({ rows, children, addRow, onDragEnd }: DndListProps) {
    // To avoid SSR issues
    // const [winReady, setwinReady] = useState(false);

    // useEffect(() => {
    //     setwinReady(true);
    // }, []);

    // if (!winReady) return <Loader />;

    return (
        <div className={"w-full flex flex-col gap-1"}>
            {rows.length > 0 && (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="list">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="flex flex-col gap-1 w-full"
                            >
                                {children}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
            {rows.length < COUNTER_MAX_ROWS && (
                <Button onClick={addRow} className="bg-gray-500">
                    +
                </Button>
            )}
        </div>
    );
}
interface Props {}

export default function RowsPart({}: Props) {
    const { data, reorderRows, addRow, setSelectedRow } =
        useEditCounterContext();
    const { rows } = data;
    const [localRows, setLocalRows] = useState(rows);

    useEffect(() => {
        setLocalRows(rows);
    }, [rows]);

    const onDragEnd = (result: any) => {
        if (!result.destination) return;
        if (result.destination.index === result.source.index) return;
        const newOrder = reorder(
            rows,
            result.source.index,
            result.destination.index
        );
        setLocalRows(newOrder);
        reorderRows(newOrder.map((q) => q.id));
    };

    return (
        <div id="rows-part" className="w-full flex flex-col gap-3">
            <h1 className="text-xl">
                Rows ({localRows.length}/{COUNTER_MAX_ROWS}):{" "}
            </h1>
            <DnDList
                rows={localRows}
                onClick={setSelectedRow}
                onDragEnd={onDragEnd}
                addRow={addRow}
            >
                <RowsList rows={localRows} onClick={setSelectedRow} />
            </DnDList>
        </div>
    );
}
