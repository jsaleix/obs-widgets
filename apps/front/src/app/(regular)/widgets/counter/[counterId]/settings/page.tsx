import Button from "@/components/common/button";
import SettingRow from "@/components/misc/setting-row";
import ChangeName from "@/components/widgets/counter/pages/settings-form/name";
import Secret from "@/components/widgets/counter/pages/settings-form/secret";
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

    const resetSecret = async () => {
        "use server";
        return "new secret";
    };

    return (
        <div className={"flex flex-col gap-5"}>
            <SettingRow title="Name" details={"Customize your counter name."}>
                <ChangeName name={counter.name} />
            </SettingRow>
            <hr />
            <SettingRow
                title="Secret"
                details="Your secret is your way to use the API to update your counter rows. You should keep it secret as its name says."
                contentClassName="gap-2"
            >
                <Secret secret={counter.secret} />
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
