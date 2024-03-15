import { useState, useEffect } from "react";
import axios from "axios";
// import { IoIosArrowDown } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

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
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            {columns.map((columnName: string) => {
                                return (
                                  <th scope="col" className="px-6 py-3">
                                    <span className="flex">
                                      <p className="flex flex-1">
                                        {columnName}{" "}
                                      </p>
                                      <span>
                                        <IoMdArrowDropdown className="h-3 w-3"/>
                                      </span>
                                    </span>
                                  </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row: [string]) => {
                            return <tr className="bg-white border-b ">
                                {row.map((data) => {
                                    return <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
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