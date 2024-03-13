import { useParallax } from "react-scroll-parallax";
import Counter1 from "./counter-1";
import Counter2 from "./counter-2";
import Counter3 from "./counter-3";
import Counter4 from "./counter-4";

const Examples = () => {
    return (
        <div className="flex flex-row items-center justify-evenly w-full py-10 bg-gradient-to-r from-base-200 to-black">
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
                    {/* <div className="flex items-center justify-center">
                        <Counter1 />
                    </div>
                    <div className="flex items-center justify-center">
                        <Counter1 />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Examples;
