export default function AuthInput({ type = "text", placeholder, icon }) {
    return (
        <div className="flex items-center bg-[#E6C46E] rounded-full px-4 py-3 w-full mb-4 
                        font-['League_Spartan',Arial,sans-serif] font-bold">
            <span className="text-white mr-3 text-xl flex items-center">
                {icon}
            </span>

            <input
                type={type}
                placeholder={placeholder}
                className="flex-1 bg-transparent border-none outline-none text-white text-[1.5rem] placeholder-white"
            />
        </div>
    );
}
