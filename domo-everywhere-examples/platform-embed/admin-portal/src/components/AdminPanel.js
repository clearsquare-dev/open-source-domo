import React from "react";

export default function AdminPanel() {
  return (
    <div class="p-8">
      <div class="mb-20">
        <div class="mb-10 flex flex-wrap">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Main Instance</h2>
          <p class="w-full flex mt-1 text-sm leading-6 text-gray-600">
            Upload data related to your main instance of Domo.
          </p>
        </div>

        <form>
          <div class="space-y-12 border-b border-gray-900/10 pb-12">
            <div class="flex w-full items-center">
              <div class="max-w-2xl grid gap-y-3">
                <div class="w-96">
                  <label
                    for="website"
                    class="flex text-sm font-medium leading-6 text-gray-900">
                    Embed URL
                  </label>
                  <div class="mt-2">
                    <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                        https://
                      </span>
                      <input
                        type="text"
                        name="website"
                        id="website"
                        class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="example.domo.com"
                      />
                    </div>
                  </div>
                </div>
                <div class="">
                  <label
                    for="website"
                    class="flex text-sm font-medium leading-6 text-gray-900">
                    JWT Secret
                  </label>
                  <div class="mt-2">
                    <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="password"
                        name="website"
                        id="website"
                        class="block flex-1 border-0 bg-transparent py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="***********************************"
                      />
                    </div>
                  </div>
                </div>
                <div class="">
                  <label
                    for="website"
                    class="flex text-sm font-medium text-gray-900">
                    Key Attribute
                  </label>
                  <div class="mt-2">
                    <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                      <input
                        type="text"
                        name="website"
                        id="website"
                        class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="keyAttribute"
                      />
                    </div>
                  </div>
                  <div class="sm:col-span-4 w-full pt-6 flex justify-end">
                    <button
                      type="submit"
                      class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ul
        role="list"
        class="divide-y divide-gray-100">
        <li class="flex items-center justify-between gap-x-6 py-5">
          <div class="w-96">
            <div class="flex items-start gap-x-3">
              <p class="text-sm font-semibold leading-6 text-gray-900">Apple Inc.</p>
            </div>
            <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p class="whitespace-nowrap">https://example-apple.domo.com</p>
              <svg
                viewBox="0 0 2 2"
                class="h-0.5 w-0.5 fill-current">
                <circle
                  cx="1"
                  cy="1"
                  r="1"
                />
              </svg>
              <p class="truncate">tYU45TY</p>
            </div>
          </div>
          <button
            type="button"
            class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add user
          </button>
          <div class="flex flex-none items-center gap-x-4">
            <div class="relative flex-none">
              <button
                type="button"
                class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
                id="options-menu-0-button"
                aria-expanded="false"
                aria-haspopup="true">
                <span class="sr-only">Open options</span>
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                </svg>
              </button>
              <div
                class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu-0-button"
                tabindex="-1">
                <a
                  href="#"
                  class="block px-3 py-1 text-sm leading-6 text-gray-900"
                  role="menuitem"
                  tabindex="-1"
                  id="options-menu-0-item-0">
                  Edit<span class="sr-only">, GraphQL API</span>
                </a>
                <a
                  href="#"
                  class="block px-3 py-1 text-sm leading-6 text-gray-900"
                  role="menuitem"
                  tabindex="-1"
                  id="options-menu-0-item-2">
                  Delete<span class="sr-only">, GraphQL API</span>
                </a>
              </div>
            </div>
          </div>
        </li>
        <li class="flex items-center justify-between gap-x-6 py-5">
          <div class="w-96">
            <div class="flex items-start gap-x-3">
              <p class="text-sm font-semibold leading-6 text-gray-900">Microsoft Corp.</p>
            </div>
            <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p class="whitespace-nowrap">https://example-microsoft.domo.com</p>
              <svg
                viewBox="0 0 2 2"
                class="h-0.5 w-0.5 fill-current">
                <circle
                  cx="1"
                  cy="1"
                  r="1"
                />
              </svg>
              <p class="truncate">67HgfT3AS</p>
            </div>
          </div>
          <button
            type="button"
            class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add user
          </button>
          <div class="flex flex-none items-center gap-x-4">
            <div class="relative flex-none">
              <button
                type="button"
                class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
                id="options-menu-0-button"
                aria-expanded="false"
                aria-haspopup="true">
                <span class="sr-only">Open options</span>
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                </svg>
              </button>
            </div>
          </div>
        </li>
        <li class="flex items-center justify-between gap-x-6 py-5">
          <div class="w-96">
            <div class="flex items-start gap-x-3">
              <p class="text-sm font-semibold leading-6 text-gray-900">RedBull Marketing</p>
            </div>
            <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p class="whitespace-nowrap">https://example-redbull.domo.com</p>
              <svg
                viewBox="0 0 2 2"
                class="h-0.5 w-0.5 fill-current">
                <circle
                  cx="1"
                  cy="1"
                  r="1"
                />
              </svg>
              <p class="truncate">iiOB77DR</p>
            </div>
          </div>
          <button
            type="button"
            class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add user
          </button>
          <div class="flex flex-none items-center gap-x-4">
            <div class="relative flex-none">
              <button
                type="button"
                class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
                id="options-menu-0-button"
                aria-expanded="false"
                aria-haspopup="true">
                <span class="sr-only">Open options</span>
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                </svg>
              </button>
            </div>
          </div>
        </li>
        <li class="flex items-center justify-between gap-x-6 py-5">
          <div class="w-96">
            <div class="flex items-start gap-x-3">
              <p class="text-sm font-semibold leading-6 text-gray-900">Banana Republic</p>
            </div>
            <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p class="whitespace-nowrap">https://example-bananarepublic.domo.com</p>
              <svg
                viewBox="0 0 2 2"
                class="h-0.5 w-0.5 fill-current">
                <circle
                  cx="1"
                  cy="1"
                  r="1"
                />
              </svg>
              <p class="truncate">RTTYX198</p>
            </div>
          </div>
          <button
            type="button"
            class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add user
          </button>
          <div class="flex flex-none items-center gap-x-4">
            <div class="relative flex-none">
              <button
                type="button"
                class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
                id="options-menu-0-button"
                aria-expanded="false"
                aria-haspopup="true">
                <span class="sr-only">Open options</span>
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                </svg>
              </button>
            </div>
          </div>
        </li>
        <li class="flex items-center justify-between gap-x-6 py-5">
          <div class="w-96">
            <div class="flex items-start gap-x-3">
              <p class="text-sm font-semibold leading-6 text-gray-900">Dell Corp.</p>
            </div>
            <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p class="whitespace-nowrap">https://example-dell.domo.com</p>
              <svg
                viewBox="0 0 2 2"
                class="h-0.5 w-0.5 fill-current">
                <circle
                  cx="1"
                  cy="1"
                  r="1"
                />
              </svg>
              <p class="truncate">44HBCX99</p>
            </div>
          </div>
          <button
            type="button"
            class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add user
          </button>
          <div class="flex flex-none items-center gap-x-4">
            <div class="relative flex-none">
              <button
                type="button"
                class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
                id="options-menu-0-button"
                aria-expanded="false"
                aria-haspopup="true">
                <span class="sr-only">Open options</span>
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                </svg>
              </button>
            </div>
          </div>
        </li>
      </ul>
      <form>
        <div class="mt-20 p-3 border border-1 border-gray-200 rounded space-y-12 border-b border-gray-900/10">
          <div class="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
            <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div class="sm:col-span-10">
                <label
                  for="website"
                  class="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div class="mt-2">
                  <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="website"
                      id="website"
                      class="block flex-1 border-0 bg-transparent py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
              <div class="sm:col-span-4">
                <label
                  for="website"
                  class="block text-sm font-medium leading-6 text-gray-900">
                  Embed URL
                </label>
                <div class="mt-2">
                  <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      https://
                    </span>
                    <input
                      type="text"
                      name="website"
                      id="website"
                      class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="example.domo.com"
                    />
                  </div>
                </div>
              </div>
              <div class="sm:col-span-4">
                <label
                  for="website"
                  class="block text-sm font-medium leading-6 text-gray-900">
                  Key Attribute
                </label>
                <div class="mt-2">
                  <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                    <input
                      type="text"
                      name="website"
                      id="website"
                      class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="keyAttribute"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex w-full">
            <div class="w-full flex items-center justify-end gap-x-6">
              <button
                type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
