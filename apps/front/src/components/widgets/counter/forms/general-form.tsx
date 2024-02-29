"use client";
import { CounterGeneralSettings } from "@/lib/interfaces/counter";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = CounterGeneralSettings;

interface Props {
    submitAction: (data: Inputs) => void;
    initValues: Inputs | null;
    label?: string;
}

export default function GeneralForm({
    submitAction,
    initValues,
    label,
}: Props) {
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
            <input
                {...register("bgColor")}
                defaultValue={initValues?.bgColor}
            />
            <input
                {...register("iconsColor")}
                defaultValue={initValues?.iconsColor}
            />
            <input
                {...register("optionalText")}
                defaultValue={initValues?.optionalText}
            />
            <input
                {...register("optionalTextColor")}
                defaultValue={initValues?.optionalTextColor}
            />
            <input type="submit" value={label ?? "Apply"} />
        </form>
    );
}
