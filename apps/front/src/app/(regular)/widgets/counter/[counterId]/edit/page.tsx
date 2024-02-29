import GeneralForm from "@/components/widgets/counter/forms/general-form";
import RowForm from "@/components/widgets/counter/forms/row-form";
import counterService from "@/lib/services/counter.service";
import { notFound } from "next/navigation";

interface Props {
    params: {
        counterId: string;
    };
}

export default async function Page({ params: { counterId } }: Props) {
    const counter = await counterService.findOne(counterId);

    if (!counter) notFound();

    return (
        <div className={"flex flex-col gap-3"}>
            <div className={"flex flex-col w-full"}>
                <GeneralForm
                    submitAction={async () => {
                        "use server";
                    }}
                    initValues={counter.general}
                />
            </div>
            <div className={"flex flex-col w-full"}>
                {counter.rows.length > 0 && (
                    <RowForm
                        submitAction={async () => {
                            "use server";
                        }}
                        initValues={counter.rows[0]}
                    />
                )}
            </div>
        </div>
    );
}
