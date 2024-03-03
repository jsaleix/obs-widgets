import Button from "@/components/common/button";
import SettingRow from "@/components/misc/setting-row";
import SettingsForm from "@/components/widgets/counter/forms/settings-form";
import ChangeName from "@/components/widgets/counter/forms/settings-form/name";
import Secret from "@/components/widgets/counter/forms/settings-form/secret";
import counterService from "@/lib/services/counter.service";
import { notFound } from "next/navigation";
import { Input } from "postcss";

interface Props {
    params: {
        counterId: string;
    };
}

export default async function Page({ params: { counterId } }: Props) {
    const counter = await counterService.findOne(counterId);

    if (!counter) notFound();

    const updateName = async (name: string) => {
        "use server";
        return true;
    };

    const resetSecret = async () => {
        "use server";
        return "new secret";
    };

    const deleteCounter = async (name: string) => {
        "use server";
        console.log("")
        return true;
    };

    return (
        <div className={"flex flex-col gap-5"}>
            <SettingRow title="Name" details={"Customize your counter name."}>
                <ChangeName name={counter.name} onSubmit={updateName} />
            </SettingRow>
            <hr />
            <SettingRow
                title="Secret"
                details="Your secret is your way to use the API to update your counter. You should keep it secret as its name says."
                contentClassName="gap-2"
            >
                <Secret secret={counter.secret} onSubmit={resetSecret} />
            </SettingRow>
            <hr />
            <SettingRow
                title="Delete counter"
                details="Deleting your counter is irreversible"
                contentClassName="gap-2"
            >
                <Button disabled={false} className="!w-fit px-10">
                    Delete
                </Button>
            </SettingRow>
        </div>
    );
}
