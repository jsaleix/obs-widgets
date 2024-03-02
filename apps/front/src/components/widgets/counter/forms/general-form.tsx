"use client";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import { CounterGeneralSettings } from "@/lib/interfaces/counter";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export type GeneralFormInputs = CounterGeneralSettings;

interface Props {
    submitAction: (data: GeneralFormInputs) => void;
    initValues: GeneralFormInputs | null;
    label?: string;
    onChangeAction?: (data: GeneralFormInputs) => void;
    formMode?: "edit" | "create";
}

export default function GeneralForm({
    submitAction,
    initValues,
    label,
    formMode = "create",
}: Props) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<GeneralFormInputs>();

    const onSubmit: SubmitHandler<GeneralFormInputs> = (data) => {
        console.log(data);
        // Check data
        // ...
        // If everything is ok, call the submitAction
        submitAction(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            onChange={formMode === "edit" ? handleSubmit(onSubmit) : () => null}
            className={"w-full flex flex-col gap-1"}
        >
            <Input
                placeholder="Background color"
                register={register("bgColor", {
                    required: true,
                    value: initValues?.bgColor,
                })}
                defaultValue={initValues?.bgColor}
                maxLength={7}
                minLength={7}
            />
            <Input
                placeholder="Icons color"
                register={register("iconsColor", {
                    required: true,
                    value: initValues?.iconsColor,
                })}
                defaultValue={initValues?.iconsColor}
                maxLength={7}
                minLength={7}
            />
            <Input
                placeholder="Optional text"
                register={register("optionalText", {
                    required: false,
                    value: initValues?.optionalText,
                })}
                defaultValue={initValues?.optionalText}
            />
            <Input
                placeholder="Optional text color"
                register={register("optionalTextColor", {
                    required: false,
                    value: initValues?.optionalTextColor,
                })}
                defaultValue={initValues?.optionalTextColor}
                maxLength={7}
                minLength={7}
            />
            {formMode === "create" && (
                <Button type="submit">{label ?? "Apply"}</Button>
            )}
        </form>
    );
}
