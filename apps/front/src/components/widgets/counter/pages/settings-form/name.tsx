"use client";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import Loader from "@/components/misc/loader";
import { FormEvent, FormHTMLAttributes, useState } from "react";

interface Props {
    name: string;
}

export default function ChangeName({ name }: Props) {
    const [localName, setLocalName] = useState(name);
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setLoading(false);
    };

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Title"
                value={localName}
                onChange={() => null}
            />

            {isLoading ? (
                <Button disabled className="!w-fit px-10">
                    <Loader />
                    Saving...
                </Button>
            ) : (
                <Button type="submit" className="!w-fit px-10">
                    {isLoading ? <Loader /> : "Apply"}
                </Button>
            )}
        </form>
    );
}
