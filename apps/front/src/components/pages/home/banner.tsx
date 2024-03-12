import { ParallaxBanner } from "react-scroll-parallax";

export default function Banner() {
    return (
        <ParallaxBanner
            layers={[{ image: "/imgs/home/yellow-variant.webp", speed: -15 }]}
            className="aspect-[4/1]"
        />
    );
}
