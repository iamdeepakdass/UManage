import { useState, useEffect } from "react";
import axios from "axios";

export default function Table(props: any) {
    const {tableName} = props;
    const [columns, setColumns] = useState<any>([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        (async () => {
            
            const {data} = await axios.get(`http://localhost:8000/table/${tableName}`);
            console.log(data);
            setColumns(Object.keys(data[0]));
            const allRows: any = [];
            data.forEach((r: any) => {
                allRows.push(Object.values(r));
            })

            setRows(allRows);
        })();
    }, [tableName]);

    return (
            <div className="relative overflow-x-auto">
                <h1 className="m-3 font-bold uppercase">{tableName}</h1>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {columns.map((columnName: string) => {
                                return <th scope="col" className="px-6 py-3">
                                    {columnName}
                                </th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row: [string]) => {
                            return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                {row.map((data) => {
                                    return <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {data}
                                    </th>
                                })}
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

    );
}