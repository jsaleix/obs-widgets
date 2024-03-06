"use client";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import Select from "@/components/common/select";
import { IconsValues } from "@/lib/config/counter";
import { RowFormInputs } from "@/lib/interfaces/counter";
import { CounterRowSettingsSchema } from "@/lib/validator/schemas/counter.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
    submitAction: (data: RowFormInputs) => void;
    initValues: RowFormInputs;
    label?: string;
    formMode?: "edit" | "create";
    onChangeAction?: (data: RowFormInputs) => void;
}

export default function RowForm({ submitAction, initValues }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RowFormInputs>({
        resolver: zodResolver(CounterRowSettingsSchema),
        defaultValues: initValues,
    });

    const onSubmit: SubmitHandler<RowFormInputs> = (data) => {
        submitAction(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={"w-full flex flex-col gap-1"}
        >
            <div>
                <Select
                    register={register("icon", { value: initValues?.icon })}
                >
                    <option disabled value="null">
                        Icon
                    </option>
                    {Object.values(IconsValues).map((i, idx) => (
                        <option key={idx} value={i}>
                            {i}
                        </option>
                    ))}
                </Select>
                {errors.icon?.message && (
                    <span className="text-red-500">{errors.icon.message}</span>
                )}
            </div>
            <div>
                <Input
                    register={register("fontColor", {
                        value: initValues?.fontColor,
                    })}
                    type="color"
                    // defaultValue={initValues?.fontColor ?? "#000000"}
                    maxLength={7}
                    minLength={7}
                />
                {errors.fontColor?.message && (
                    <span className="text-red-500">
                        {errors.fontColor.message}
                    </span>
                )}
            </div>
            <div>
                <Input
                    register={register("label", {
                        value: initValues?.label,
                        required: false,
                    })}
                    // defaultValue={initValues?.label}
                />
                {errors.label?.message && (
                    <span className="text-red-500">{errors.label.message}</span>
                )}
            </div>
            <div>
                <Input
                    register={register("value", {
                        value: initValues?.value,
                        required: false,
                        valueAsNumber: true,
                    })}
                    type="number"
                    step={1}
                    // defaultValue={initValues?.value}
                    maxLength={7}
                    minLength={7}
                />
                {errors.value?.message && (
                    <span className="text-red-500">{errors.value.message}</span>
                )}
            </div>
            <Button type="submit">Apply</Button>
        </form>
    );
}
