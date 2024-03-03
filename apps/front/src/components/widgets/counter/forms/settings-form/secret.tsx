"use client";
import Button from "@/components/common/button";
import Loader from "@/components/misc/loader";
import React, { FormEvent } from "react";
import { useState } from "react";

interface Props {
    onSubmit: () => Promise<string>;
    secret: string;
}

export default function Secret({ secret, onSubmit }: Props) {
    const [localSecret, setLocalSecret] = useState(secret);
    const [showSecret, setShowSecret] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const handleReset = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        const r = await onSubmit();
        setLocalSecret(r);
        setShowSecret(false);
        setLoading(false);
    };

    return (
        <React.Fragment>
            <p className="cursor-pointer w-fit bg-gray-200 text-black px-3 py-1">
                {localSecret}
            </p>
            {isLoading ? (
                <Button disabled className="!w-fit px-10">
                    <Loader />
                    Applying...
                </Button>
            ) : (
                <Button onClick={handleReset} className="!w-fit px-10">
                    Reset
                </Button>
            )}
        </React.Fragment>
    );
}
