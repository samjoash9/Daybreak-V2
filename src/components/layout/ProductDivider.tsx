
const ProductDivider = ({ Title = '', Description = '', Color = '' }) => {
    return (
        <div
            className="flex w-screen mt-12 h-[60px] justify-center items-center"
            style={{ backgroundColor: Color }}
        >
            <div className="flex flex-col items-center">
                <h1 className="font-['League Spartan',Arial,sans-serif] text-2xl font-bold text-[#4a2b17] tracking-tight">
                    {Title}
                </h1>
                <p className="text-[#4a2b17]">
                    {Description}
                </p>
            </div>
        </div>
    );
}

export default ProductDivider;