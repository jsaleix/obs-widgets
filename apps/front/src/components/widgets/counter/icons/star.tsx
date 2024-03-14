interface Props {
    color: string;
}

export default function Star({ color }: Props) {
    return (
        <svg
            width="30"
            height="30"
            viewBox="0 0 233 224"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M232 84.0501C230.784 80.3234 228.5 77.0361 225.431 74.5968C222.363 72.1575 218.645 70.6738 214.74 70.3301L157.74 65.4001L135.44 12.2601C133.906 8.64635 131.342 5.56397 128.069 3.39717C124.795 1.23036 120.956 0.0749512 117.03 0.0749512C113.104 0.0749512 109.265 1.23036 105.991 3.39717C102.718 5.56397 100.154 8.64635 98.6201 12.2601L76.2901 65.4001L19.2901 70.3301C15.3639 70.6552 11.6213 72.1325 8.53166 74.5768C5.44205 77.021 3.14311 80.3233 1.9233 84.0693C0.703489 87.8152 0.617143 91.838 1.67509 95.6328C2.73305 99.4277 4.88817 102.826 7.87006 105.4L51.1901 143.2L38.1901 199.44C37.2985 203.27 37.5556 207.277 38.9292 210.961C40.3027 214.646 42.7318 217.843 45.9128 220.155C49.0938 222.466 52.8855 223.788 56.814 223.957C60.7424 224.125 64.6332 223.131 68.0001 221.1L117 191.34L166 221.1C169.367 223.128 173.256 224.119 177.183 223.949C181.109 223.78 184.899 222.457 188.078 220.146C191.257 217.835 193.685 214.639 195.059 210.956C196.432 207.274 196.69 203.268 195.8 199.44L182.8 143.2L226.12 105.4C229.094 102.816 231.239 99.4114 232.285 95.6132C233.331 91.8149 233.232 87.7923 232 84.0501ZM165.25 126.67C162.508 129.056 160.467 132.144 159.348 135.603C158.23 139.062 158.075 142.76 158.9 146.3L170.29 195.62L127.35 169.54C124.232 167.641 120.651 166.637 117 166.637C113.349 166.637 109.768 167.641 106.65 169.54L63.7101 195.62L75.1001 146.3C75.9255 142.76 75.7704 139.062 74.6516 135.603C73.5328 132.144 71.4925 129.056 68.7501 126.67L30.6601 93.4401L80.8001 89.1001C84.4309 88.7892 87.9069 87.4883 90.8497 85.339C93.7924 83.1896 96.0892 80.2742 97.4901 76.9101L117 30.4201L136.51 76.9101C137.911 80.2742 140.208 83.1896 143.15 85.339C146.093 87.4883 149.569 88.7892 153.2 89.1001L203.34 93.4401L165.25 126.67Z"
                fill={color ?? "white"}
            />
        </svg>
    );
}
