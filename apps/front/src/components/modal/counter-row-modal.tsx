import { CounterRowSettings } from "@/lib/interfaces/counter";
import BaseModal, { BaseModalProps } from "./base";
import RowForm, { RowFormInputs } from "../widgets/counter/forms/row-form";

interface Props extends BaseModalProps {
    rowData: RowFormInputs;
    onSubmit: (data: RowFormInputs) => void;
}

export default function CounterRowModal({
    isOpen,
    onClose,
    rowData,
    onSubmit,
}: Props) {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <RowForm
                initValues={rowData}
                submitAction={onSubmit}
                formMode="edit"
            />
        </BaseModal>
    );
}
