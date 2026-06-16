import { forwardRef, useId } from "react";

const Select = forwardRef(function Select({
    label,
    options,
    className="",
    ...props
},ref){
    const id = useId();

    return (
        <div className="w-full">
            {label && <label
            htmlFor={id}
            className="block mb-1 pl-1 font-medium text-md text-gray-900">
                {label}
                </label>}
            <select id={id} ref={ref} className={`w-full border border-gray-300 bg-white rounded-lg text-gray-900 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 placeholder:text-gray-900 shadow-sm transition-all duration-200 ${className}` }>
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
                
            </select>    


        </div>
    )

})
export default Select;