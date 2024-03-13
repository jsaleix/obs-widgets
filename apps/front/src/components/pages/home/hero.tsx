import { Parallax } from "react-scroll-parallax";
import DemoCounter from "./demo-counter";

export default function Hero() {
    return (
        // <div className="hero min-h-screen bg-gradient-to-r from-red-950 to-black">
        <div className="relative hero min-h-screen bg-gradient-to-r from-base-200 to-black">
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
                    <p className="py-6">I don't know what else to add 🧐.</p>
                </div>
                <div className="card shrink-0 w-fit max-w-sm shadow-2xl md:-skew-y-6">
                    <DemoCounter />
                </div>
            </div>
            <Parallax
                className="z-1 absolute w-full h-full opacity-80"
                speed={-5}
                translateX={[-130, 10]}
                style={{ zIndex: 1 }}
            >
                <div className="z-1 blur-3xl absolute -right-40 bottom-20 h-80 w-80 bg-red-500 rounded-full opacity-100"></div>
                {/* <div className="z-1 blur-3xl absolute -right-60 bottom-20 h-80 w-80 bg-red-300 rounded-full opacity-40"></div> */}
            </Parallax>
            <Parallax
                className="z-1 absolute w-full h-full opacity-80"
                speed={-5}
                translateX={[130, -10]}
                style={{ zIndex: 1 }}
            >
                <div className="z-1 blur-3xl absolute -left-40 top-20 h-80 w-80 bg-red-800 rounded-full opacity-100"></div>
                {/* <div className="z-1 blur-3xl absolute -right-60 bottom-20 h-80 w-80 bg-red-300 rounded-full opacity-40"></div> */}
            </Parallax>
        </div>
    );
}
