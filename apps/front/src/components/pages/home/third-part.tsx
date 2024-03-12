import { ParallaxBanner } from "react-scroll-parallax";

export default function ThirdPart() {
    return (
        <div className="relative w-full h-80 overflow-hidden">
            <ParallaxBanner
                layers={[{ image: "/imgs/home/banner.webp", speed: -15 }]}
                className="aspect-[3/1] h-fit"
            />
            <div className="absolute top-0 left-0 w-full flex justify-center items-center">
                <p>Salut</p>
            </div>
        </div>
    );
}
