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
import FormField from "../form-field";

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
                className={"w-full flex flex-col gap-2"}
            >
                <FormField label="Background color">
                    <Input
                        placeholder="Background color"
                        register={register("bgColor", {
                            required: true,
                            value: initValues.bgColor,
                        })}
                        onChange={() => console.log("Ok")}
                        type="color"
                        defaultValue={initValues.bgColor}
                        maxLength={7}
                        minLength={7}
                    />
                    {errors.bgColor?.message && (
                        <span className="text-red-500">
                            ⚠️{errors.bgColor.message}
                        </span>
                    )}
                </FormField>
                <FormField label="Background opacity">
                    <Input
                        placeholder="Background opacity"
                        register={register("bgOpacity", {
                            required: true,
                            value: initValues.bgOpacity ?? 100,
                            valueAsNumber: true,
                        })}
                        step={5}
                        type="number"
                        defaultValue={initValues.bgOpacity}
                        min={0}
                        max={100}
                    />
                    {errors.bgOpacity?.message && (
                        <span className="text-red-500">
                            ⚠️{errors.bgOpacity.message}
                        </span>
                    )}
                </FormField>
                <FormField label="Background image">
                    <Input
                        placeholder="Background image"
                        register={register("bgImage", {
                            required: false,
                            value: initValues.bgImage ?? "",
                        })}
                        type="text"
                        defaultValue={initValues.bgImage ?? ""}
                    />
                    {errors.bgImage?.message && (
                        <span className="text-red-500">
                            ⚠️{errors.bgImage.message}
                        </span>
                    )}
                </FormField>
                <FormField label="Image opacity">
                    <Input
                        placeholder="Image opacity"
                        register={register("bgImageOpacity", {
                            required: true,
                            value: initValues.bgImageOpacity ?? 85,
                            valueAsNumber: true,
                        })}
                        step={5}
                        type="number"
                        defaultValue={initValues.bgImageOpacity}
                        min={0}
                        max={100}
                    />
                    {errors.bgImageOpacity?.message && (
                        <span className="text-red-500">
                            ⚠️{errors.bgImageOpacity.message}
                        </span>
                    )}
                </FormField>
                <FormField label="Icons color">
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
                            ⚠️{errors.iconsColor.message}
                        </span>
                    )}
                </FormField>
                <FormField label="Optional text">
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
                            ⚠️{errors.optionalText.message}
                        </span>
                    )}
                </FormField>
                <FormField label="Optional text color">
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
                            ⚠️{errors.optionalTextColor.message}
                        </span>
                    )}
                </FormField>

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
