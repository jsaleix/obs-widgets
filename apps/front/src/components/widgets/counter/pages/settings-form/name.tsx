"use client";
import { changeNameAction } from "@/actions/widget/settings-counter";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import Loader from "@/components/misc/loader";
import { StatusValues } from "@/lib/interfaces/actions";
import { displayMsg } from "@/lib/utils/toasts";
import { UpdateCounterNameRequestSchema } from "@/lib/validator/schemas/counter.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";

interface FormContentProps {
    id: string;
    name: string;
}

export const FormContent = ({ id, name }: FormContentProps) => {
    const {
        register,
        formState: { isValid, errors },
    } = useForm({
        resolver: zodResolver(UpdateCounterNameRequestSchema),
        defaultValues: {
            name,
            id,
        },
    });
    const { pending } = useFormStatus();

    return (
        <>
            <Input
                type="text"
                placeholder="Title"
                register={register("name")}
                disabled={pending}
            />
            {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
            <input type="hidden" {...register("id")} />
            {pending ? (
                <Button disabled className="!w-fit px-10">
                    <Loader />
                    Saving...
                </Button>
            ) : (
                <Button
                    type="submit"
                    disabled={!isValid}
                    className="!w-fit px-10"
                >
                    {pending ? <Loader /> : "Apply"}
                </Button>
            )}
        </>
    );
};

interface ChangeNameProps {
    id: string;
    name: string;
}

export default function ChangeName({ id, name }: ChangeNameProps) {
    const [state, formAction] = useFormState(changeNameAction, null);

    useEffect(() => {
        if (state?.status === StatusValues.Success) displayMsg("Name updated");
        if (state?.status === StatusValues.Error)
            displayMsg(state.message ?? "Could not update name", "error");
    }, [state]);

    return (
        <form className="flex flex-col gap-2" action={formAction}>
            <FormContent id={id} name={name} />
        </form>
    );
}
