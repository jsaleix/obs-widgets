"use client";
import { resetSecretAction } from "@/actions/widget/settings-counter";
import Button from "@/components/common/button";
import Loader from "@/components/misc/loader";
import { StatusValues } from "@/lib/interfaces/actions";
import { copyToClipboard } from "@/lib/utils";
import { displayMsg } from "@/lib/utils/toasts";
import React, { FormEvent, useEffect } from "react";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface FormContentProps {
    id: string;
}

const FormContent = ({ id }: FormContentProps) => {
    const { pending } = useFormStatus();
    return (
        <>
            <input type="hidden" value={id} name="id" />
            {pending ? (
                <Button disabled className="!w-fit px-10">
                    <Loader />
                    Applying...
                </Button>
            ) : (
                <Button type="submit" className="!w-fit px-10">
                    Reset
                </Button>
            )}
        </>
    );
};

interface Props {
    id: string;
    secret: string;
}

export default function Secret({ id, secret }: Props) {
    const [localSecret, setLocalSecret] = useState(secret);
    const [state, formAction] = useFormState(resetSecretAction, null);

    const copySecret = () => {
        copyToClipboard({
            text: localSecret,
            label: "App secret",
            toast: true,
        });
    };

    useEffect(() => {
        if (state?.status === StatusValues.Success) {
            setLocalSecret(state.value);
            displayMsg("Secret reset", "success");
        }
        if (state?.status === StatusValues.Error)
            displayMsg(state.message ?? "Could not update secret", "error");
    }, [state]);

    return (
        <React.Fragment>
            <div className="collapse bg-gray-200">
                <input type="checkbox" />
                <div className="collapse-title text-md text-black font-medium">
                    Click to show/hide the key
                </div>
                <div className="collapse-content">
                    <div
                        className="cursor-pointer flex items-center gap-2"
                        onClick={copySecret}
                    >
                        <p className="text-gray-700">{localSecret}</p>
                        <svg
                            className="cursor-pointer"
                            width="14"
                            height="16"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                style={{ transition: "0.5s" }}
                                d="M5.6437 2.983C5.61053 2.98287 5.57765 2.98929 5.54696 3.00189C5.51627 3.0145 5.48837 3.03304 5.46487 3.05645C5.44136 3.07987 5.42271 3.10769 5.40998 3.13833C5.39725 3.16897 5.3907 3.20182 5.3907 3.235C5.3907 3.374 5.5037 3.486 5.6437 3.486H9.3567C9.4967 3.486 9.6097 3.374 9.6097 3.235C9.6097 3.20182 9.60315 3.16897 9.59043 3.13833C9.5777 3.10769 9.55905 3.07987 9.53554 3.05645C9.51204 3.03304 9.48414 3.0145 9.45345 3.00189C9.42276 2.98929 9.38988 2.98287 9.3567 2.983H5.6437ZM9.3567 1.641C10.0907 1.641 10.7097 2.131 10.9007 2.801L13.0757 2.802C13.6967 2.806 14.1977 3.007 14.5077 3.44C14.7737 3.812 14.8797 4.29 14.8527 4.827L14.8497 17.84C14.8917 18.392 14.7877 18.88 14.5217 19.285C14.2097 19.758 13.7007 19.995 13.0697 20.001H2.1397C1.3797 19.971 0.816703 19.792 0.464703 19.392C0.137703 19.021 -0.00529663 18.512 0.000703368 17.892V4.84C-0.0122966 4.24 0.154703 3.734 0.518703 3.36C0.894703 2.976 1.4507 2.806 2.1657 2.801H4.1007C4.2907 2.131 4.9097 1.641 5.6437 1.641H9.3567ZM9.3567 4.828H5.6437C5.0977 4.828 4.6167 4.558 4.3267 4.144H2.1697C1.7867 4.146 1.5677 4.214 1.4877 4.296C1.3967 4.389 1.3437 4.548 1.3497 4.827V17.897C1.3467 18.222 1.4017 18.419 1.4797 18.507C1.5337 18.568 1.7657 18.642 2.1647 18.658H13.0647C13.2647 18.656 13.3447 18.618 13.3907 18.549C13.4817 18.411 13.5237 18.215 13.5007 17.891L13.5017 4.795C13.5157 4.502 13.4747 4.313 13.4057 4.217C13.3797 4.182 13.2897 4.145 13.0697 4.144H10.6727C10.3827 4.558 9.9017 4.828 9.3557 4.828H9.3567ZM16.1997 0C17.1937 0 17.9997 0.801 17.9997 1.79V15.872C17.9997 16.86 17.1937 17.662 16.1997 17.662H14.2417V16.319H16.1987C16.4477 16.319 16.6487 16.119 16.6487 15.872V1.789C16.6482 1.67009 16.6005 1.55625 16.5161 1.47245C16.4318 1.38865 16.3176 1.34173 16.1987 1.342H8.6427C8.3947 1.342 8.1927 1.542 8.1927 1.789V1.946H6.8427V1.789C6.8427 0.801 7.6487 0 8.6427 0H16.1997ZM7.1957 11.751C7.5687 11.751 7.8707 12.051 7.8707 12.422C7.8707 12.792 7.5687 13.093 7.1957 13.093H3.1447C3.05632 13.0934 2.96873 13.0764 2.88693 13.0429C2.80512 13.0095 2.73071 12.9602 2.66794 12.898C2.60517 12.8358 2.55526 12.7618 2.52108 12.6803C2.48689 12.5988 2.4691 12.5114 2.4687 12.423C2.4687 12.052 2.7717 11.751 3.1447 11.751H7.1957ZM11.2477 9.067C11.6197 9.067 11.9227 9.367 11.9227 9.738C11.9227 10.108 11.6197 10.409 11.2477 10.409H3.1447C3.05632 10.4094 2.96873 10.3924 2.88693 10.3589C2.80512 10.3255 2.73071 10.2762 2.66794 10.214C2.60517 10.1518 2.55526 10.0778 2.52108 9.99632C2.48689 9.91482 2.4691 9.82738 2.4687 9.739C2.4687 9.368 2.7717 9.067 3.1447 9.067H11.2477ZM11.2477 6.383C11.6197 6.383 11.9227 6.683 11.9227 7.054C11.9224 7.14238 11.9048 7.22984 11.8707 7.31139C11.8366 7.39295 11.7869 7.46699 11.7242 7.5293C11.6615 7.59161 11.5872 7.64096 11.5054 7.67454C11.4236 7.70812 11.3361 7.72526 11.2477 7.725H3.1447C3.05632 7.72539 2.96873 7.70838 2.88693 7.67492C2.80512 7.64146 2.73071 7.59222 2.66794 7.53001C2.60517 7.46779 2.55526 7.39382 2.52108 7.31232C2.48689 7.23082 2.4691 7.14338 2.4687 7.055C2.4687 6.684 2.7717 6.383 3.1447 6.383H11.2477Z"
                                fill={"#3E3E3E"}
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <form action={formAction}>
                <FormContent id={id} />
            </form>
        </React.Fragment>
    );
}
