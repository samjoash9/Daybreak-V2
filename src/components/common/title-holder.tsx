interface TitleHolderProps {
    Title?: string;
    Description?: string;
    Color?: string; // e.g. "#4a2b17" or "red"
    TitleSize?: string; // e.g. "text-5xl", "text-7xl"
    DescriptionSize?: string;
    Bold?: boolean; // use lowercase `boolean` type
}

const TitleHolder = ({
    Title = "",
    Description = "",
    Color = "#4a2b17",
    TitleSize = "text-7xl",
    DescriptionSize = "text-xl",
    Bold = false,
}: TitleHolderProps) => {
    return (
        <div className="text-center mt-8">
            <h1
                className={`font-['League Spartan',Arial,sans-serif] font-bold tracking-tight ${TitleSize}`}
                style={{ color: Color }}
            >
                {Title}
            </h1>

            <p
                className={`mt-2 tracking-wide ${DescriptionSize} ${Bold ? "font-bold" : "font-normal"
                    }`}
                style={{ color: Color }}
            >
                {Description}
            </p>
        </div>
    );
};

export default TitleHolder;
