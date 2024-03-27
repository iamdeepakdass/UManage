"use client";
import { Fragment, useState, useEffect } from "react";
import { Menu } from "@headlessui/react";
import Table from "./table";
import { Bars3Icon, HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { CiMenuKebab } from "react-icons/ci";
// import { Fragment, } from 'react'
import { Dialog, Transition } from "@headlessui/react";
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: "Add New Table", href: "#", icon: HomeIcon, current: true },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function getTableStructre(name: string, id: number) {
  return { id: id, name: name, initial: name[0], current: false };
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [listOfTables, setListOfTables] = useState<any[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [isAddNewTable,setisAddNewTable] = useState(false);

  const [selectedTable, setSelectedTable] = useState("");

  useEffect(() => {
    (async () => {
      const error = await axios.post("http://localhost:8000/login");
      const { data }: any = await axios.get(
        "http://localhost:8000/getTableNames"
      );
      setListOfTables(
        data.map((tableName: string, index: number) => {
          return getTableStructre(tableName, index);
        })
      );
    })();
  }, []);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-2 bg-slate-400">
                    <div className="flex h-16 shrink-0 items-center">
                      <p>Table Editor</p>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1" onClick={() => setisAddNewTable(true)}>
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <div
                                  className={classNames(
                                    item.current
                                      ? "bg-slate-700 text-white"
                                      : "text-indigo-200 hover:text-white hover:bg-slate-700",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer"
                                  )}
                                   
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-white"
                                        : "text-indigo-200 group-hover:text-white",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                    
                                  />
                                  {item.name}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </li>
                        {/* <div>Add new Table</div> */}
                        <li>
                          <div className="text-xs font-semibold leading-6 text-indigo-200">
                            Your tables
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {listOfTables.map((table) => (
                              <li key={table.name}>
                                <div
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedTable(table.name);
                                  }}
                                  className={classNames(
                                    table.current
                                      ? "bg-slate-700 text-white"
                                      : "text-indigo-200 hover:text-white hover:bg-slate-700",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
                                    {table.initial}
                                  </span>
                                  <span className="truncate">{table.name}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {isAddNewTable && (
          <Transition.Root as={Fragment} show={isAddNewTable}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={(x) => setisAddNewTable(!x)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div>
                        <form className="p-4">
                          <div>
                            <div className="flex justify-around">
                              <div>General</div>
                              <div>
                                <div className="flex">
                                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Name
                                  </label>
                                </div>
                                <div className="">
                                  <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="inline-full-name"
                                    type="text"
                                  />
                                </div>
                                <div className="flex">
                                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Description
                                  </label>
                                </div>
                                <div className="">
                                  <textarea
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="inline-full-name"
                                  />
                                </div>
                              </div>
                            </div>
                            <hr className="h-px my-8 bg-gray-400 border-0 dark:bg-gray-700" />
                            {/* columns  */}
                            <div>Columns</div>
                            <div className="flex mt-2">
                              <div>
                                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4">
                                  Name
                                </label>
                                <input
                                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  id="inline-full-name"
                                  type="text"
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
                                />
                              </div>
                              <div className="ml-2">
                                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4">
                                  Default Value
                                </label>
                                <input
                                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  id="inline-full-name"
                                  type="text"
                                />
                              </div>
                              <div className="ml-2">
                                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4">
                                  Primary
                                </label>
                                <input
                                  id="default-checkbox"
                                  type="checkbox"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                              </div>
                            </div>
                            <div className="text-center mt-2 text-sm">Add Column</div>
                            <hr className="h-px my-8 bg-gray-400 border-0 dark:bg-gray-700" />
                            {/* foreign keys */}
                            <div className="flex">
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={() => setOpen(false)}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto bg-green-500 ml-3"
                              onClick={() => setOpen(false)}
                            >
                              Save
                            </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        ) }

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-400 px-6">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=white"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <div
                          className={classNames(
                            item.current
                              ? "bg-slate-700 text-white"
                              : "text-indigo-200 hover:text-white hover:bg-slate-700",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-white"
                                : "text-indigo-200 group-hover:text-white",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-indigo-200">
                    Your tables
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {listOfTables.map((table) => (
                      <li key={table.name}>
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedTable(table.name);
                          }}
                          className={classNames(
                            table.current
                              ? "bg-slate-700 text-white"
                              : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                            "group flex rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <div className="flex">
                            <div className="flex">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
                                {table.initial}
                              </span>
                              <span className="truncate ml-3 flex flex-1">
                                {table.name}
                              </span>
                            </div>
                            <Menu
                              as="div"
                              className="relative inline-block text-left ml-8"
                            >
                              <div>
                                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-gray-300 z-50">
                                  <CiMenuKebab
                                    className="-mr-1 h-5 w-5 text-white"
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
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                                          onClick={() => setOpen(true)} //lol
                                        >
                                          Edit Table
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
                                          Delete Table
                                        </a>
                                      )}
                                    </Menu.Item>
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-indigo-700"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-slate-700"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Tom Cook</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {isOpen ? (
          <Transition.Root as={Fragment} show={isOpen}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={(x) => setOpen(!x)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div>
                        <form className="p-4">
                          <div>
                            <div className="flex justify-around">
                              <div>General</div>
                              <div>
                                <div className="flex">
                                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Name
                                  </label>
                                </div>
                                <div className="">
                                  <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="inline-full-name"
                                    type="text"
                                  />
                                </div>
                                <div className="flex">
                                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Description
                                  </label>
                                </div>
                                <div className="">
                                  <textarea
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="inline-full-name"
                                  />
                                </div>
                              </div>
                            </div>
                            <hr className="h-px my-8 bg-gray-400 border-0 dark:bg-gray-700" />
                            {/* columns  */}
                            <div>Columns</div>
                            <div className="flex mt-2">
                              <div>
                                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4">
                                  Name
                                </label>
                                <input
                                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  id="inline-full-name"
                                  type="text"
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
                                />
                              </div>
                              <div className="ml-2">
                                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4">
                                  Default Value
                                </label>
                                <input
                                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                  id="inline-full-name"
                                  type="text"
                                />
                              </div>
                              <div className="ml-2">
                                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4">
                                  Primary
                                </label>
                                <input
                                  id="default-checkbox"
                                  type="checkbox"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                              </div>
                            </div>
                            <div className="text-center mt-2 text-sm">Add Column</div>
                            <hr className="h-px my-8 bg-gray-400 border-0 dark:bg-gray-700" />
                            {/* foreign keys */}
                            <div className="flex">
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={() => setOpen(false)}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto bg-green-500 ml-3"
                              onClick={() => setOpen(false)}
                            >
                              Save
                            </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        ) : (
          <div />
        )}

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-indigo-600 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-indigo-200 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-white">
            Dashboard
          </div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full bg-slate-700"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </a>
        </div>

        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">
            {selectedTable !== "" ? <Table tableName={selectedTable} /> : null}
          </div>
        </main>
      </div>
    </>
  );
}
