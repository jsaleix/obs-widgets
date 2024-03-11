import { IconsValues } from "@/lib/config/counter";
import { Suspense, lazy } from "react";

const CrownIcon = lazy(
    () => import("@/components/widgets/counter/icons/crown")
);
const HeartIcon = lazy(
    () => import("@/components/widgets/counter/icons/heart")
);

const ControllerIcon = lazy(
    () => import("@/components/widgets/counter/icons/controller")
);

interface Props {
    name: string;
    color: string;
}

export default function IconRenderer({ name, ...rest }: Props) {
    return (
        <div className="w-30 h-30 flex justify-center items-center">
            <Suspense>
                {name === IconsValues.crown && <CrownIcon {...rest} />}
                {name === IconsValues.heart && <HeartIcon {...rest} />}
                {name === IconsValues.controller && (
                    <ControllerIcon {...rest} />
                )}
            </Suspense>
        </div>
    );
}
