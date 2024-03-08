"use client";
import { changeNameAction } from "@/actions/widget/settings-counter";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import Loader from "@/components/misc/loader";
import { UpdateCounterNameRequestSchema } from "@/lib/validator/schemas/counter.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";

interface Props {
    id: string;
    name: string;
}

export const FormContent = ({ id, name }: Props) => {
    const { register } = useForm({
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
            <input type="hidden" {...register("id")} />
            {pending ? (
                <Button disabled className="!w-fit px-10">
                    <Loader />
                    Saving...
                </Button>
            ) : (
                <Button type="submit" className="!w-fit px-10">
                    {pending ? <Loader /> : "Apply"}
                </Button>
            )}
        </>
    );
};

export default function ChangeName({ id, name }: Props) {
    const [state, formAction] = useFormState(changeNameAction, null);

    return (
        <form className="flex flex-col gap-2" action={formAction}>
            <FormContent id={id} name={name} />
        </form>
    );
}
