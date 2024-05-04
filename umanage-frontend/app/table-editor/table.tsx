/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import axios from "axios";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Table(props: any) {
  const { tableName } = props;
  const [columns, setColumns] = useState<any>([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://localhost:8000/table/${tableName}`
      );

   
      if(data[0]) setColumns(Object.keys(data[0]));
      const allRows: any = [];
      data.forEach((r: any) => {
        allRows.push(Object.values(r));
      });

      setRows(allRows);
    })();
  }, [tableName]);

  return (
    <div className="relative overflow-x-auto">
      <div className="flex">
        <h1 className="font-bold uppercase mb-3">{tableName}</h1>
        <Menu as="div" className="relative inline-block text-left ml-8">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mr-6">
              Insert
              <ChevronDownIcon
                className="-mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Insert Column
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Insert Row
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-10">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            {columns.map((columnName: string) => {
              return (
                <th scope="col" className="px-6 py-3">
                  <span className="flex">
                    <p className="flex flex-1">{columnName} </p> <span>DataType</span>
                    <span>
                      <Menu
                        as="div"
                        className="relative inline-block text-left ml-8"
                      >
                        <div>
                          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-gray-300 z-50">
                            <ChevronDownIcon
                              className="-mr-1 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-40">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-2  py-1 text-xs"
                                    )}
                                  >
                                    Edit column
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-2 py-1 text-xs"
                                    )}
                                  >
                                    Delete column
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </span>
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: [string]) => {
            return (
              <tr className="bg-white border-b ">
                {row.map((data) => {
                  return (
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {data}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
