"use client";
import Examples from "@/components/pages/home/examples";
import Hero from "@/components/pages/home/hero";
import { ParallaxProvider } from "react-scroll-parallax";

export default function Home() {
    return (
        <ParallaxProvider>
            <div className="flex w-full min-h-screen flex-col gap-0 overflow-hidden">
                <Hero />
                <Examples />
            </div>
        </ParallaxProvider>
    );
}
