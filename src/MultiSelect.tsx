import { useState, useRef, useEffect } from 'react';
import dropdown from './assets/dropdown.png';
import cross from './assets/cross.png';

const MultiSelect = ({ options, selectedOptions, onChange, placeholder = "Select..." }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const wrapperRef = useRef(null)
    const selectRef = useRef(null)

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target) &&
                !selectRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const toggleOption = (option, e) => {
        e.stopPropagation();
        const newSelectedOptions = selectedOptions.includes(option.value)
            ? selectedOptions.filter(value => value !== option.value)
            : [...selectedOptions, option.value]
        onChange(newSelectedOptions)
    };

    const handleToggleDropdown = (e) => {
        e.stopPropagation()
        setIsOpen(!isOpen)
    };

    return (
        <div className="flex flex-col items-start relative" ref={selectRef}>
            <span className="text-[#454545] text-[18px] mb-[5px]">{placeholder}</span>
            <div
                className={`z-1 relative flex flex-col py-[4px] px-[15px] rounded-t-[3px] min-w-[200px] text-[#454545] text-[16px] border-[2px] cursor-pointer transform transition-[300ms] hover:border-[#1C6EF6] ${
                    isOpen ? 'border-[#1C6EF6] rounded-b-none' : 'border-[#E6E6E6] rounded-b-[3px]'
                }`}
                ref={wrapperRef}
                onClick={handleToggleDropdown}
            >
                <div className="flex flex-wrap items-center gap-2 p-2 bg-white min-h-10">
                    <div className="flex flex-row items-center h-[100%] bg-[#DADADA] rounded-[5px] gap-[4px] px-[4px] mr-[10px]">
                        <span className="text-[black] text-[12px]">{selectedOptions.length}</span>
                        <img className="w-[12px] h-[12px]" src={cross} alt=""/>
                    </div>

                    {selectedOptions.length === 0 && (
                        <span className="w-[150px]">Ничего не выбрано</span>
                    )}
                    {selectedOptions.length !== 0 && (
                        <span className="w-[150px]">Выбрано</span>
                    )}

                    <div className="flex flex-row items-center h-[100%] px-[4px] ml-[40px]">
                        <img
                            className={`w-[16px] h-[16px] transition-transform duration-300 ${
                                isOpen ? 'rotate-180' : ''
                            }`}
                            src={dropdown}
                            alt=""
                        />
                    </div>
                </div>
            </div>


            {isOpen && (
                <div
                    className={`absolute w-[285px] top-full left-0 mt-1 overflow-y-auto bg-white shadow-[0px_0px_10px_0px_#00000024] rounded-b-[5px] z-10 max-h-[150px]`}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex flex-col gap-[10px] px-[10px] py-[10px]">
                        {filteredOptions.length === 0 ? (
                            <div className="text-[#2D2D2D]">Варианты ответа отсутствуют</div>
                        ) : (
                            filteredOptions.map(option => (
                                <div
                                    key={option.value}
                                    className={`hover:bg-gray-100 transition-colors duration-200 ${
                                        selectedOptions.includes(option.value) ? 'bg-blue-50' : ''
                                    }`}
                                    onClick={(e) => toggleOption(option, e)}
                                >
                                    <label className="flex gap-[10px] items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedOptions.includes(option.value)}
                                            readOnly
                                            className="rounded text-blue-500 h-[17px] w-[17px] focus:ring-blue-500"
                                        />
                                        <span className="text-[16px]">{option.label}</span>
                                    </label>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiSelect;