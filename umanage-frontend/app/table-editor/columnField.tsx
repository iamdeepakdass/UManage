import { useState } from "react";
function CreateColumns(props: any) {
    const {Name, Type, Primary, Key, handleChange} = props;
    const [name, setName] = useState(Name);
    const [type, setType] = useState(Type);
    const [primary, setPrimary] = useState(Primary);

    const handleNameChange = (e: any) => {
        const changedName = e.target.value;
        setName(changedName);
        handleChange({key: Key, name: changedName, type: type, primary: primary}, props.index)
    }

    const handleTypeChange = (e: any) => {
        const changedType = e.target.value;
        setType(changedType);
        handleChange({key: Key, name: name, type: changedType, primary: primary}, props.index)
    }

    const handlePrimaryCheckBox = () => {
        setPrimary(!primary);
        handleChange({key: Key, name: name, type: type, primary: !primary}, props.index)
    }
    return <>
        <div className="flex mt-2">
            <div>
            <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4">
                Name
            </label>
            <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                value={name}
                onChange={handleNameChange}
            />
            </div>
            <div className="ml-2">
            <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4">
                Type
            </label>
            <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                value={type}
                onChange={handleTypeChange}
            />
            </div>
          
            <div className="ml-2">
            <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4">
                Primary
            </label>
            <input
                id="default-checkbox"
                type="checkbox"
                name="primary"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                checked={primary}
                onChange={handlePrimaryCheckBox}
            />

            </div>
        </div>
    </>
}

export default CreateColumns;