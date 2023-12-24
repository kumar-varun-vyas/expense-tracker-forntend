import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../Context/AuthContext/AuthContext";


export default function Navbar() {
  const { logoutUser, token } = useContext(authContext)
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                  <h1 className=" font-bold font-serif text-xl text-white">KEEP COMPOUND WITH ME</h1>
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">

                </div>

              </div>

              {!token &&
                <>
                  <div className="pt-5">
                    <Link
                      to="/"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 m-3 rounded-md text-sm font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 m-3 rounded-md text-sm font-medium"
                    >
                      Register
                    </Link>
                  </div>
                </>
              }

              {token &&
                <div>
                  <button className=" border-2 border-indigo-600 float-right text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 m-3 rounded-md text-sm font-medium" onClick={() => logoutUser()}>
                    Logout
                  </button>
                </div>
              }
            </div>

          </div>

        </>
      )}
    </Disclosure>
  );
}
