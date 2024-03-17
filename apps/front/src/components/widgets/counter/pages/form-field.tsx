const FormField = ({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) => {
    return (
        <div className="min-h-12 flex flex-col md:flex-row items-center gap-2 md:gap-4 py-2 md:py-0">
            <h3 className="w-full md:w-1/3">{label}:</h3>
            <div className="w-full flex flex-col">{children}</div>
        </div>
    );
};

export default FormField;
