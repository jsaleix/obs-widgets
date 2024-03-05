"use client";
import Button from "@/components/common/button";

interface Props {
    action: () => void;
    disabled: boolean;
}

const CreateCounterButton = ({ action, disabled }: Props) => (
    <Button disabled={disabled} className="!w-fit" onClick={() => action()}>
        Create
    </Button>
);

export default CreateCounterButton;
