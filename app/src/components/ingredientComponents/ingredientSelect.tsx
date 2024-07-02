import useIngredientsFetcher from "@/hooks/useIngredientsFetcher";
import Select, { MultiValue } from 'react-select'
import { useEffect, useState } from "react";


export interface ISelectOption {
    value: string;
    label: string;
}

interface IngredientSelectProps {
    handleChange: (selected: MultiValue<ISelectOption>) => void;
    dafaultValue: string[];
}

export function IngredientSelect(props: IngredientSelectProps) {
    const { items } = useIngredientsFetcher();
    const [ options, setOptions] = useState<ISelectOption[]>([]);

    useEffect(() => {
        const newOptions = items.map(item => {
            return {
                value: item._id || "",
                label: item.name
            };
        });

        setOptions(
            newOptions
        )
    }, [items]);

    function handleChange(selectedOptions: MultiValue<ISelectOption>) {
        props.handleChange(selectedOptions)

    }

    function getDefaultValue(): ISelectOption[]  {
        return options.filter(opt => props.dafaultValue.indexOf(opt.value) > -1 );
    }
    
    return (
        <div>
            {options.length > 0 && <Select options={options} defaultValue={getDefaultValue()} isMulti isClearable onChange={handleChange} isSearchable/>}
        </div>
    );
}