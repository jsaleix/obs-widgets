"use client";
import {
    CounterGeneralSettings,
    CounterRowSettings,
} from "@/lib/interfaces/counter";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = Omit<CounterRowSettings, "id">;

interface Props {
    submitAction: (data: Inputs) => void;
    initValues: Inputs | null;
    label?: string;
}

export default function RowForm({ submitAction, initValues, label }: Props) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        // Check data
        // ...
        // If everything is ok, call the submitAction
        submitAction(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={"w-full flex flex-col gap-1"}
        >
            <input {...register("icon")} defaultValue={initValues?.icon} className={"text-black"} />
            <input {...register("fontColor")} defaultValue={initValues?.fontColor} />
            <input {...register("label")} defaultValue={initValues?.label} className={"text-black"} />
            <input {...register("value")} defaultValue={initValues?.value} className={"text-black"} />
            <input type="submit" value={label??"Apply"} />
        </form>
    );
}
