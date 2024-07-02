import Select, { MultiValue } from 'react-select'
import { useEffect, useState } from "react";
import { ISelectOption } from "../ingredientComponents/ingredientSelect";
import useCocktailsFetcher from "@/hooks/useCocktailsFetcher";

interface CocktailSelectProps {
    handleChange: (selected: MultiValue<ISelectOption>) => void;
    dafaultValue: string[];
}

export function CocktailSelect(props: CocktailSelectProps) {
    const { cocktails } = useCocktailsFetcher();
    const [ options, setOptions] = useState<ISelectOption[]>([]);

    useEffect(() => {
        const newOptions = cocktails.map(item => {
            return {
                value: item._id || "",
                label: item.name
            };
        });

        setOptions(
            newOptions
        )
    }, [cocktails]);

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