import counterService from "@/lib/services/counter.service";

interface Props {
    params: {
        counterId: string;
    };
}

export default async function Page({ params: { counterId } }: Props) {
    const counter = await counterService.findOne(counterId);

    return <p>Edit counter here</p>;
}
