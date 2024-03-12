"use client";
import Banner from "@/components/pages/home/banner";
import DemoLosePart from "@/components/pages/home/demo-lose-part";
import FourthPart from "@/components/pages/home/fourth-part";
import ThirdPart from "@/components/pages/home/third-part";
import { ParallaxProvider } from "react-scroll-parallax";

export default function Home() {
    return (
        <ParallaxProvider>
            <div className="flex w-full min-h-screen flex-col gap-0">
                <Banner/>
                <DemoLosePart />
                <Banner/>
                {/* <ThirdPart/> */}
            </div>
        </ParallaxProvider>
    );
}
