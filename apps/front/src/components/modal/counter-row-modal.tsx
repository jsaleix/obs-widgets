import { CounterRowSettings, RowFormInputs } from "@/lib/interfaces/counter";
import BaseModal, { BaseModalProps } from "./base";
import RowForm from "../widgets/counter/pages/row-form";

interface Props extends BaseModalProps {
    rowData: RowFormInputs | null;
    onSubmit: (data: RowFormInputs) => void;
    deleteAction: () => void;
}

export default function CounterRowModal({
    isOpen,
    onClose,
    rowData,
    onSubmit,
    deleteAction,
}: Props) {
    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={"Editing counter row"}
        >
            {rowData && (
                <div className="flex flex-col gap-3">
                    <RowForm
                        initValues={rowData}
                        submitAction={onSubmit}
                        formMode="edit"
                    />
                    <button onClick={deleteAction}>Delete this row</button>
                </div>
            )}
        </BaseModal>
    );
}
