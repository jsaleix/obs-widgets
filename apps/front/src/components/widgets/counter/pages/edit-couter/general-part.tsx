"use client";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import Loader from "@/components/misc/loader";
import { useEditCounterContext } from "@/contexts/edit-counter.context";
import { GeneralFormInputs } from "@/lib/interfaces/counter";
import { CounterGeneralSettingsSchema } from "@/lib/validator/schemas/counter.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
    // initValues: GeneralFormInputs;
    onChangeAction: (data: GeneralFormInputs) => void;
}

export default function GeneralPart({ onChangeAction }: Props) {
    const { updateGeneral, data } = useEditCounterContext();
    const initValues = data.general;
    const [isLoading, setLoading] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<GeneralFormInputs>({
        resolver: zodResolver(CounterGeneralSettingsSchema),
    });

    const onSubmit: SubmitHandler<GeneralFormInputs> = async (data) => {
        setLoading(true);
        await updateGeneral(data);
        setHasChanged(false);
        setLoading(false);
    };

    watch(() => {
        if (!hasChanged) setHasChanged(true);
    });

    return (
        <div className="w-full flex flex-col gap-3">
            <h1 className="text-xl">General: </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                onChange={handleSubmit(onChangeAction)}
                className={"w-full flex flex-col gap-1"}
            >
                <div className="flex items-center">
                    <h3 className="w-1/3">Background color:</h3>
                    <Input
                        placeholder="Background color"
                        register={register("bgColor", {
                            required: true,
                            value: initValues.bgColor,
                        })}
                        type="color"
                        defaultValue={initValues.bgColor}
                        maxLength={7}
                        minLength={7}
                    />
                    {errors.bgColor?.message && (
                        <span className="text-red-500">
                            {errors.bgColor.message}
                        </span>
                    )}
                </div>
                <div className="flex items-center">
                    <h3 className="w-1/3">Icons color:</h3>{" "}
                    <Input
                        placeholder="Icons color"
                        register={register("iconsColor", {
                            required: true,
                            value: initValues.iconsColor,
                        })}
                        type="color"
                        defaultValue={initValues.iconsColor}
                        maxLength={7}
                        minLength={7}
                    />
                    {errors.iconsColor?.message && (
                        <span className="text-red-500">
                            {errors.iconsColor.message}
                        </span>
                    )}
                </div>
                <div className="flex items-center">
                    <h3 className="w-1/3">Optional text:</h3>{" "}
                    <Input
                        placeholder="Optional text"
                        register={register("optionalText", {
                            required: false,
                            value: initValues.optionalText,
                        })}
                        defaultValue={initValues.optionalText}
                    />
                    {errors.optionalText?.message && (
                        <span className="text-red-500">
                            {errors.optionalText.message}
                        </span>
                    )}
                </div>
                <div className="flex items-center">
                    <h3 className="w-1/3">Optional text color:</h3>{" "}
                    <Input
                        placeholder="Optional text color"
                        register={register("optionalTextColor", {
                            required: false,
                            value: initValues.optionalTextColor,
                        })}
                        type="color"
                        defaultValue={initValues.optionalTextColor}
                        // maxLength={7}
                        // minLength={7}
                    />
                    {errors.optionalTextColor?.message && (
                        <span className="text-red-500">
                            {errors.optionalTextColor.message}
                        </span>
                    )}
                </div>
                {isLoading ? (
                    <Button disabled className="uppercase">
                        <Loader />
                        Saving...
                    </Button>
                ) : (
                    <Button
                        type="submit"
                        disabled={!hasChanged || Object.keys(errors).length > 0}
                        className="uppercase"
                    >
                        SAVE
                    </Button>
                )}
            </form>
        </div>
    );
}
