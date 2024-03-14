"use client";
import Examples from "@/components/pages/home/examples";
import Hero from "@/components/pages/home/hero";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

export default function Home() {
    return (
        <ParallaxProvider>
            <div className="relative flex w-full min-h-screen flex-col gap-0 overflow-hidden pb-20 bg-gradient-to-r from-base-200 to-black">
                <div className="relative flex flex-col w-full z-2" style={{zIndex: 2}}>
                    <Hero />
                    <Examples />
                </div>
                <div className="h-full w-full absolute z-1">
                    <Parallax
                        className="z-1 absolute w-fit h-fit opacity-80 right-1/3"
                        speed={-5}
                        translateX={[130, -10]}
                        style={{ zIndex: 1 }}
                    >
                        <div className="z-1 blur-3xl h-80 w-80 bg-red-800 rounded-full"></div>
                    </Parallax>
                    <Parallax
                        className="z-1 absolute w-fit h-fit opacity-80 top-1/4 left-1/3"
                        speed={-5}
                        translateX={[-130, 140]}
                        translateY={[30, 30]}
                        style={{ zIndex: 1 }}
                    >
                        <div className="z-1 blur-3xl h-80 w-80 bg-red-500 rounded-full"></div>
                    </Parallax>
                    <Parallax
                        className="z-1 absolute w-fit h-fit opacity-80 top-3/4 left-1/3 opacity-40"
                        speed={-5}
                        translateX={[180, -140]}
                        translateY={[-10, -10]}
                        style={{ zIndex: 1 }}
                    >
                        <div className="z-1 blur-3xl h-80 w-80 bg-red-800 rounded-full"></div>
                    </Parallax>
                </div>
            </div>
        </ParallaxProvider>
    );
}
