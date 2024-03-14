import { Parallax } from "react-scroll-parallax";
import DemoCounter from "./demo-counter";

export default function Hero() {
    return (
        // <div className="hero min-h-screen bg-gradient-to-r from-red-950 to-black">
        <div className="relative hero min-h-screen">
            <div
                className="z-2 hero-content flex-col lg:flex-row-reverse"
                style={{ zIndex: 2 }}
            >
                <div className="text-center lg:text-left">
                    <div className="hidden md:block">
                        <h1 className="text-5xl font-bold text-white">
                            Expose your stats
                        </h1>
                        <h1 className="text-5xl font-bold">to your audience</h1>
                    </div>
                    <div className="block md:hidden">
                        <h1 className="text-5xl font-bold text-white">
                            Expose your stats to your audience
                        </h1>
                    </div>
                    <p className="py-6">
                        I don{"'"}t know what else to add 🧐.
                    </p>
                </div>
                <div className="card shrink-0 w-fit max-w-sm shadow-2xl md:-skew-y-6 md:scale-110 md:mr-10">
                    <DemoCounter />
                </div>
            </div>
        </div>
    );
}
