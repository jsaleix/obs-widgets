import BaseModal from "@/components/modal/base";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <p>Hello</p>
            <BaseModal>
                <p>super content</p>
            </BaseModal>
        </main>
    );
}
