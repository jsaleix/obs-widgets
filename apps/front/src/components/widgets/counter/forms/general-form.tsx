"use client";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import Loader from "@/components/misc/loader";
import { GeneralFormInputs } from "@/lib/interfaces/counter";
import { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
    submitAction: (data: GeneralFormInputs) => Promise<void>;
    initValues: GeneralFormInputs;
    onChangeAction: (data: GeneralFormInputs) => void;
}

export default function GeneralForm({
    submitAction,
    initValues,
    onChangeAction,
}: Props) {
    const [isLoading, setLoading] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<GeneralFormInputs>();

    const onSubmit: SubmitHandler<GeneralFormInputs> = async (data) => {
        console.log(data);
        setLoading(true);
        await submitAction(data);
        setHasChanged(false);
        setLoading(false);
    };

    watch((data) => {
        if (!hasChanged) setHasChanged(true);
    });

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            onChange={handleSubmit(onChangeAction)}
            className={"w-full flex flex-col gap-1"}
        >
            <Input
                placeholder="Background color"
                register={register("bgColor", {
                    required: true,
                    value: initValues.bgColor,
                })}
                maxLength={7}
                minLength={7}
            />
            <Input
                placeholder="Icons color"
                register={register("iconsColor", {
                    required: true,
                    value: initValues.iconsColor,
                })}
                maxLength={7}
                minLength={7}
            />
            <Input
                placeholder="Optional text"
                register={register("optionalText", {
                    required: false,
                    value: initValues.optionalText,
                })}
            />
            <Input
                placeholder="Optional text color"
                register={register("optionalTextColor", {
                    required: false,
                    value: initValues.optionalTextColor,
                })}
                maxLength={7}
                minLength={7}
            />
            {isLoading ? (
                <Button disabled className="uppercase">
                    <Loader />
                    Saving...
                </Button>
            ) : (
                <Button
                    type="submit"
                    disabled={!hasChanged}
                    className="uppercase"
                >
                    SAVE
                </Button>
            )}
        </form>
    );
}
