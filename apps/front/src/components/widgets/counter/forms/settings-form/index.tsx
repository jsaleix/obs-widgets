"use client";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import SettingRow from "@/components/misc/setting-row";
import { CounterI } from "@/lib/interfaces/counter";
import { useState } from "react";

interface Props {
    updateName: (name: string) => Promise<boolean>;
    resetSecret: () => Promise<boolean>;
    deleteCounter: () => Promise<boolean>;
    counter: CounterI;
}

export default function SettingsForm({
    counter,
    updateName,
    resetSecret,
    deleteCounter,
}: Props) {
    const [isLoading, setLoading] = useState(true);

    return (
        <div className="w-full flex flex-col gap-5">
            <SettingRow title="Name" details={"Customize your counter name."}>
                <form className="flex flex-col gap-2">
                    <Input
                        type="text"
                        placeholder="Title"
                        value={counter.name}
                        onChange={() => null}
                    />
                    <Button
                        disabled={isLoading}
                        type="submit"
                        className="!w-fit px-10"
                    >
                        Apply
                    </Button>
                </form>
            </SettingRow>
            <hr />
            <SettingRow
                title="Secret"
                details="Your secret is your way to use the API to update your counter. You should keep it secret as its name says."
                contentClassName="gap-2"
            >
                <p className="cursor-pointer w-fit bg-gray-200 text-black px-3 py-1">
                    {counter.secret}
                </p>
                <Button disabled={isLoading} className="!w-fit px-10">
                    Reset
                </Button>
            </SettingRow>
            <hr />
            <SettingRow
                title="Delete counter"
                details="Deleting your counter is irreversible"
                contentClassName="gap-2"
            >
                <Button disabled={isLoading} className="!w-fit px-10">
                    Delete
                </Button>
            </SettingRow>
        </div>
    );
}
