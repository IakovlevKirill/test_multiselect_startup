import {useState} from "react";
import MultiSelect from "./MultiSelect.tsx";


const App = () => {

    const options = [
        { value: '1', label: 'Первый' },
        { value: '2', label: 'Второй' },
        { value: '3', label: 'Третий' },
        { value: '4', label: 'Четвертый' },
        { value: '5', label: 'Пятый' },
        { value: '6', label: 'Шестой' },
        { value: '7', label: 'Седьмой' },
    ];

    const [selectedOptions, setSelectedOptions] = useState([]);

    return (
        <div className="flex flex-col">
            <h1 className="absolute font-[sans-serif] left-[3%] top-[1%]">Тестовое задание</h1>
            <h2 className="absolute font-[sans-serif] left-[3%] top-[7%]">Мультиселект на tailwind</h2>
            <div className="flex flex-col items-center justify-center w-[100vw]">
                <MultiSelect
                    options={options}
                    selectedOptions={selectedOptions}
                    onChange={setSelectedOptions}
                    placeholder="Выберите"
                />
            </div>
        </div>
    );
};

export default App;
