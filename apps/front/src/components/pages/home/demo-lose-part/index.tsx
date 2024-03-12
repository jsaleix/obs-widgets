import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import DemoCounter from "./demo-counter";

export default function DemoLosePart() {
    return (
        <section className="relative bg-black py-10 z-1 h-fit">
            <div className="w-full bg-orange-950 py-5">
                <div className="w-full bg-black py-5">
                        <div className="container mx-auto">
                            <div className="relative flex flex-col md:flex-row items-center gap-20 md:gap-10">
                                <div className="w-1/3 md:w-1/2 -skew-y-6 flex items-center justify-center md:scale-125">
                                    <Parallax translateY={[-20, 20]}>
                                        <DemoCounter />
                                    </Parallax>
                                </div>
                                <div className="w-full md:w-1/2 flex flex-col gap-0 uppercase">
                                    <Parallax translateY={[-40, 40]}>
                                        <h2 className="text-4xl md:text-5xl text-center md:text-start font-bold text-white">
                                            Expose your stats
                                        </h2>
                                        <h2 className="text-4xl md:text-5xl text-center md:text-start font-bold">
                                            to your viewers
                                        </h2>
                                    </Parallax>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
