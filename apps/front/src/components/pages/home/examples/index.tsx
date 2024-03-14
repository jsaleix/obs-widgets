import { useParallax } from "react-scroll-parallax";
import Counter1 from "./counter-1";
import Counter2 from "./counter-2";
import Counter3 from "./counter-3";
import Counter4 from "./counter-4";
import Counter5 from "./counter-5";
import Counter6 from "./counter-6";
import Counter7 from "./counter-7";
import Counter8 from "./counter-8";

const Examples = () => {
    return (
        <div className="flex flex-row items-center justify-evenly w-full py-10">
            <div className="container mx-auto">
                <div className="flex grid lg:grid-cols-3  gap-5">
                    <div className="flex items-center justify-center">
                        <Counter1 />
                    </div>
                    <div className="flex items-center justify-center">
                        <Counter2 />
                    </div>
                    <div className="flex items-center justify-center">
                        <Counter3 />
                    </div>
                    <div className="flex items-center justify-center">
                        <Counter4 />
                    </div>
                    <div className="flex flex-col gap-3 items-center justify-center">
                        <Counter5 />
                        <Counter6 />
                        <Counter7 />
                    </div>
                    <div className="flex items-center justify-center">
                        <Counter8 />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Examples;
