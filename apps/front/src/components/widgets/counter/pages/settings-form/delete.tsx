"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { deleteCounterAction } from "@/actions/widget/settings-counter";
import { StatusValues } from "@/lib/interfaces/actions";
import { displayMsg } from "@/lib/utils/toasts";
import Button from "@/components/common/button";
import Loader from "@/components/misc/loader";

interface FormContentProps {
    id: string;
}

function FormContent({ id }: FormContentProps) {
    const { pending } = useFormStatus();

    return (
        <>
            <input type="hidden" value={id} name="id" />
            {pending ? (
                <Button disabled className="!w-fit px-10">
                    <Loader />
                    Processing...
                </Button>
            ) : (
                <Button type="submit" className="!w-fit px-10">
                    Delete
                </Button>
            )}
        </>
    );
}

interface Props {
    id: string;
}

export default function DeleteCounter({ id }: Props) {
    const [state, formAction] = useFormState(deleteCounterAction, null);
    const router = useRouter();

    useEffect(() => {
        if (state?.status === StatusValues.Success) {
            displayMsg("Counter deleted", "success");
            router.push("/widgets");
        }
        if (state?.status === StatusValues.Error)
            displayMsg(
                state.message ?? "Could not delete this counter",
                "error"
            );
    }, [state]);

    return (
        <React.Fragment>
            <form action={formAction}>
                <FormContent id={id} />
            </form>
        </React.Fragment>
    );
}
