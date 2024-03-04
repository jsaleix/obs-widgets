"use client";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import Select from "@/components/common/select";
import { IconsValues } from "@/lib/config/counter";
import {
    CounterGeneralSettings,
    CounterRowSettings,
    RowFormInputs,
} from "@/lib/interfaces/counter";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
    submitAction: (data: RowFormInputs) => void;
    initValues: RowFormInputs | null;
    label?: string;
    formMode?: "edit" | "create";
    onChangeAction?: (data: RowFormInputs) => void;
}

export default function RowForm({
    submitAction,
    initValues,
    label,
    formMode,
    onChangeAction,
}: Props) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RowFormInputs>();

    const onSubmit: SubmitHandler<RowFormInputs> = (data) => {
        console.log(data);
        submitAction(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            onChange={formMode === "edit" ? handleSubmit(onSubmit) : () => null}
            className={"w-full flex flex-col gap-1"}
        >
            {/* <Input
                register={register("icon", {
                    value: initValues?.icon,
                    required: false,
                })}
                defaultValue={initValues?.icon}
            /> */}
            <Select register={register("icon", { value: initValues?.icon })}>
                <option disabled value="null">
                    Icon
                </option>
                {Object.values(IconsValues).map((i, idx) => (
                    <option key={idx} value={i}>
                        {i}
                    </option>
                ))}
            </Select>
            <Input
                register={register("fontColor", {
                    value: initValues?.fontColor,
                    required: false,
                })}
                defaultValue={initValues?.fontColor}
                maxLength={7}
                minLength={7}
            />
            <Input
                register={register("label", {
                    value: initValues?.label,
                    required: false,
                })}
                defaultValue={initValues?.label}
            />
            <Input
                register={register("value", {
                    value: initValues?.value,
                    required: false,
                })}
                defaultValue={initValues?.value}
                maxLength={7}
                minLength={7}
            />
            {/* {JSON.stringify(errors)} */}
            {formMode === "create" && (
                <Button type="submit">{label ?? "Apply"}</Button>
            )}
        </form>
    );
}
