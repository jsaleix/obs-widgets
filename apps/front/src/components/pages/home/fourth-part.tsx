import { useParallax } from "react-scroll-parallax";

const FourthPart = () => {
    const parallax = useParallax<HTMLDivElement>({
        rotateY: [0, 360],
    });
    return (
        <div className="flex flex-row items-center justify-evenly w-full">
            <div
                ref={parallax.ref}
                className="flex items-center gap-sm md:gap-lg justify-center text-4xl"
            >
                <div className="bg-blue-100 border-2 border-blue-500 border-solid rounded-lg h-14 w-14 flex items-center justify-center">
                    👍🏻
                </div>
                <div className="bg-blue-100 border-2 border-blue-500 border-solid rounded-lg h-14 w-14 flex items-center justify-center">
                    👏🏻
                </div>
                <div className="bg-blue-100 border-2 border-blue-500 border-solid rounded-lg h-14 w-14 flex items-center justify-center">
                    🙌🏻
                </div>
                <div className="bg-blue-100 border-2 border-blue-500 border-solid rounded-lg h-14 w-14 flex items-center justify-center">
                    👎🏻
                </div>
            </div>
        </div>
    );
};

export default FourthPart;
