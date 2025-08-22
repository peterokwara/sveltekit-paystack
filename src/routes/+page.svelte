<script>
    // This homepage uses custom elements from `@tailwindplus/elements`.
    // The library is loaded globally via a script tag in `src/app.html`.
</script>

<div class="bg-white">
    <!-- Mobile menu -->
    <el-dialog>
        <dialog id="mobile-menu" class="backdrop:bg-transparent lg:hidden">
            <el-dialog-backdrop
                class="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
            ></el-dialog-backdrop>
            <div tabindex="0" class="fixed inset-0 flex focus:outline-none">
                <el-dialog-panel
                    class="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
                >
                    <div class="flex px-4 pt-5 pb-2">
                        <button
                            type="button"
                            command="close"
                            commandfor="mobile-menu"
                            class="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                        >
                            <span class="absolute -inset-0.5"></span>
                            <span class="sr-only">Close menu</span>
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                data-slot="icon"
                                aria-hidden="true"
                                class="size-6"
                            >
                                <path
                                    d="M6 18 18 6M6 6l12 12"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </button>
                    </div>

                    <!-- Links -->
                    <el-tab-group class="mt-2 block">
                        <div class="border-b border-gray-200">
                            <el-tab-list class="-mb-px flex space-x-8 px-4">
                                <button
                                    class="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 aria-selected:border-indigo-600 aria-selected:text-indigo-600"
                                    >Wireframe Kits</button
                                >
                                <button
                                    class="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 aria-selected:border-indigo-600 aria-selected:text-indigo-600"
                                    >Icons</button
                                >
                            </el-tab-list>
                        </div>
                        <el-tab-panels>
                            <div class="space-y-10 px-4 pt-10 pb-8">
                                <div class="grid grid-cols-2 gap-x-4">
                                    <div class="group relative text-sm">
                                        <img
                                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-05-menu-03.jpg"
                                            alt="Pricing page screenshot with tiered plan options and comparison table on colorful blue and green background."
                                            class="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                        />
                                        <a
                                            href="/"
                                            class="mt-6 block font-medium text-gray-900"
                                        >
                                            <span
                                                aria-hidden="true"
                                                class="absolute inset-0 z-10"
                                            ></span>
                                            Scaffold
                                        </a>
                                        <p aria-hidden="true" class="mt-1">
                                            Shop now
                                        </p>
                                    </div>
                                    <div class="group relative text-sm">
                                        <img
                                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-05-menu-04.jpg"
                                            alt="Application screenshot with tiered navigation and account settings form on color red and purple background."
                                            class="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                        />
                                        <a
                                            href="/"
                                            class="mt-6 block font-medium text-gray-900"
                                        >
                                            <span
                                                aria-hidden="true"
                                                class="absolute inset-0 z-10"
                                            ></span>
                                            Bones
                                        </a>
                                        <p aria-hidden="true" class="mt-1">
                                            Shop now
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p
                                        id="wireframe-application-heading-mobile"
                                        class="font-medium text-gray-900"
                                    >
                                        Application UI
                                    </p>
                                    <ul
                                        role="list"
                                        aria-labelledby="wireframe-application-heading-mobile"
                                        class="mt-6 flex flex-col space-y-6"
                                    >
                                        <li class="flow-root">
                                            <a
                                                href="/"
                                                class="-m-2 block p-2 text-gray-500"
                                                >Home Screens</a
                                            >
                                        </li>
                                        <li class="flow-root">
                                            <a
                                                href="/"
                                                class="-m-2 block p-2 text-gray-500"
                                                >Detail Screens</a
                                            >
                                        </li>
                                        <li class="flow-root">
                                            <a
                                                href="/"
                                                class="-m-2 block p-2 text-gray-500"
                                                >Settings Screens</a
                                            >
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <p
                                        id="wireframe-marketing-heading-mobile"
                                        class="font-medium text-gray-900"
                                    >
                                        Marketing
                                    </p>
                                    <ul
                                        role="list"
                                        aria-labelledby="wireframe-marketing-heading-mobile"
                                        class="mt-6 flex flex-col space-y-6"
                                    >
                                        <li class="flow-root">
                                            <a
                                                href="/"
                                                class="-m-2 block p-2 text-gray-500"
                                                >Landing Pages</a
                                            >
                                        </li>
                                        <li class="flow-root">
                                            <a
                                                href="/"
                                                class="-m-2 block p-2 text-gray-500"
                                                >Pricing Pages</a
                                            >
                                        </li>
                                        <li class="flow-root">
                                            <a
                                                href="/"
                                                class="-m-2 block p-2 text-gray-500"
                                                >Contact Pages</a
                                            >
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <p
                                        id="wireframe-ecommerce-heading-mobile"
                                        class="font-medium text-gray-900"
                                    >
                                        Ecommerce
                                    </p>
                                    <ul
                                        role="list"
                                        aria-labelledby="wireframe-ecommerce-heading-mobile"
                                        class="mt-6 flex flex-col space-y-6"
                                    >
                                        <li class="flow-root">
                                            <a
                                                href="/"
                                                class="-m-2 block p-2 text-gray-500"
                                                >Storefront Pages</a
                                            >
                                        </li>
                                        <li class="flow-root">
                                            <a
                                                href="/"
                                                class="-m-2 block p-2 text-gray-500"
                                                >Product Pages</a
                                            >
                                        </li>
                                        <li class="flow-root">
                                            <a
                                                href="/"
                                                class="-m-2 block p-2 text-gray-500"
                                                >Category Pages</a
                                            >
                                        </li>
                                        <li class="flow-root">
                                            <a
                                                href="/"
                                                class="-m-2 block p-2 text-gray-500"
                                                >Shopping Cart Pages</a
                                            >
                                        </li>
                                        <li class="flow-root">
                                            <a
                                                href="/checkout"
                                                class="-m-2 block p-2 text-gray-500"
                                                >Checkout Pages</a
                                            >
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div hidden class="space-y-10 px-4 pt-10 pb-8">
                                <div class="grid grid-cols-2 gap-x-4">
                                    <div class="group relative text-sm">
                                        <img
                                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-05-menu-01.jpg"
                                            alt="Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background."
                                            class="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                        />
                                        <a
                                            href="/"
                                            class="mt-6 block font-medium text-gray-900"
                                        >
                                            <span
                                                aria-hidden="true"
                                                class="absolute inset-0 z-10"
                                            ></span>
                                            Application UI Pack
                                        </a>
                                        <p aria-hidden="true" class="mt-1">
                                            Shop now
                                        </p>
                                    </div>
                                    <div class="group relative text-sm">
                                        <img
                                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-05-menu-02.jpg"
                                            alt="Calendar user interface screenshot with icon buttons and orange-yellow theme."
                                            class="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                        />
                                        <a
                                            href="/"
                                            class="mt-6 block font-medium text-gray-900"
                                        >
                                            <span
                                                aria-hidden="true"
                                                class="absolute inset-0 z-10"
                                            ></span>
                                            Marketing Icon Pack
                                        </a>
                                        <p aria-hidden="true" class="mt-1">
                                            Shop now
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-tab-panels>
                    </el-tab-group>

                    <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                        <div class="flow-root">
                            <a
                                href="/"
                                class="-m-2 block p-2 font-medium text-gray-900"
                                >UI Kits</a
                            >
                        </div>
                        <div class="flow-root">
                            <a
                                href="/"
                                class="-m-2 block p-2 font-medium text-gray-900"
                                >Themes</a
                            >
                        </div>
                    </div>

                    <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                        <div class="flow-root">
                            <a
                                href="/"
                                class="-m-2 block p-2 font-medium text-gray-900"
                                >Sign in</a
                            >
                        </div>
                        <div class="flow-root">
                            <a
                                href="/"
                                class="-m-2 block p-2 font-medium text-gray-900"
                                >Create account</a
                            >
                        </div>
                    </div>
                </el-dialog-panel>
            </div>
        </dialog>
    </el-dialog>

    <header class="relative bg-white">
        <p
            class="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8"
        >
            Save 20% when you buy two or more kits
        </p>

        <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="border-b border-gray-200">
                <div class="flex h-16 items-center">
                    <button
                        type="button"
                        command="show-modal"
                        commandfor="mobile-menu"
                        class="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                    >
                        <span class="absolute -inset-0.5"></span>
                        <span class="sr-only">Open menu</span>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            data-slot="icon"
                            aria-hidden="true"
                            class="size-6"
                        >
                            <path
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>

                    <!-- Logo -->
                    <div class="ml-4 flex lg:ml-0">
                        <a href="/">
                            <span class="sr-only">Your Company</span>
                            <img
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                                class="h-8 w-auto"
                            />
                        </a>
                    </div>

                    <!-- Flyout menus -->
                    <el-popover-group
                        class="group/popover-group hidden lg:ml-8 lg:block lg:self-stretch"
                    >
                        <div class="flex h-full space-x-8">
                            <div class="group/popover flex">
                                <div class="relative flex">
                                    <button
                                        popovertarget="desktop-menu-wireframe-kits"
                                        class="relative flex items-center justify-center text-sm font-medium transition-colors duration-200 ease-out group-not-has-open/popover:text-gray-700 group-has-open/popover:text-indigo-600 group-not-has-open/popover:hover:text-gray-800"
                                    >
                                        Wireframe Kits
                                        <span
                                            aria-hidden="true"
                                            class="absolute inset-x-0 -bottom-px z-30 h-0.5 bg-transparent duration-200 ease-in group-has-open/popover:bg-indigo-600 group-has-open/popover-group:duration-150 group-has-open/popover-group:ease-out"
                                        ></span>
                                    </button>
                                </div>
                                <el-popover
                                    id="desktop-menu-wireframe-kits"
                                    anchor="bottom"
                                    popover
                                    class="w-full overflow-visible bg-white text-sm text-gray-500 transition transition-discrete [--anchor-gap:1px] backdrop:bg-transparent open:block data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                                >
                                    <div
                                        aria-hidden="true"
                                        class="absolute inset-0 top-1/2 bg-white shadow-sm"
                                    ></div>
                                    <div class="relative bg-white">
                                        <div
                                            class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                                        >
                                            <div
                                                class="grid grid-cols-2 gap-x-8 gap-y-10 py-16"
                                            >
                                                <div
                                                    class="col-start-2 grid grid-cols-2 gap-x-8"
                                                >
                                                    <div
                                                        class="group relative text-base sm:text-sm"
                                                    >
                                                        <img
                                                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-05-menu-03.jpg"
                                                            alt="Pricing page screenshot"
                                                            class="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                                        />
                                                        <a
                                                            href="/"
                                                            class="mt-6 block font-medium text-gray-900"
                                                        >
                                                            <span
                                                                aria-hidden="true"
                                                                class="absolute inset-0 z-10"
                                                            ></span>
                                                            Scaffold
                                                        </a>
                                                        <p
                                                            aria-hidden="true"
                                                            class="mt-1"
                                                        >
                                                            Shop now
                                                        </p>
                                                    </div>
                                                    <div
                                                        class="group relative text-base sm:text-sm"
                                                    >
                                                        <img
                                                            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-05-menu-04.jpg"
                                                            alt="Application screenshot"
                                                            class="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                                        />
                                                        <a
                                                            href="/"
                                                            class="mt-6 block font-medium text-gray-900"
                                                        >
                                                            <span
                                                                aria-hidden="true"
                                                                class="absolute inset-0 z-10"
                                                            ></span>
                                                            Bones
                                                        </a>
                                                        <p
                                                            aria-hidden="true"
                                                            class="mt-1"
                                                        >
                                                            Shop now
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </el-popover>
                            </div>

                            <a
                                href="/"
                                class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                >UI Kits</a
                            >
                            <a
                                href="/"
                                class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                >Themes</a
                            >
                        </div>
                    </el-popover-group>

                    <div class="ml-auto flex items-center">
                        <div
                            class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
                        >
                            <a
                                href="/"
                                class="text-sm font-medium text-gray-700 hover:text-gray-800"
                                >Sign in</a
                            >
                            <span
                                aria-hidden="true"
                                class="h-6 w-px bg-gray-200"
                            ></span>
                            <a
                                href="/"
                                class="text-sm font-medium text-gray-700 hover:text-gray-800"
                                >Create account</a
                            >
                        </div>

                        <!-- Cart -->
                        <div class="ml-4 flow-root lg:ml-6">
                            <a
                                href="/checkout"
                                class="group -m-2 flex items-center p-2"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    data-slot="icon"
                                    aria-hidden="true"
                                    class="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                                >
                                    <path
                                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                                <span
                                    class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
                                    >1</span
                                >
                                <span class="sr-only"
                                    >items in cart, view bag</span
                                >
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <main
        class="mx-auto px-4 pt-14 pb-24 sm:px-6 sm:pt-16 sm:pb-32 lg:max-w-7xl lg:px-8"
    >
        <!-- Product -->
        <div
            class="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16"
        >
            <!-- Product image -->
            <div class="lg:col-span-4 lg:row-end-1">
                <img
                    src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-05-product-01.jpg"
                    alt="Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles."
                    class="aspect-4/3 w-full rounded-lg bg-gray-100 object-cover"
                />
            </div>

            <!-- Product details -->
            <div
                class="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none"
            >
                <div class="flex flex-col-reverse">
                    <div class="mt-4">
                        <h1
                            class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
                        >
                            Application UI Icon Pack
                        </h1>

                        <h2 id="information-heading" class="sr-only">
                            Product information
                        </h2>
                        <p class="mt-2 text-sm text-gray-500">
                            Version 1.0 (Updated <time datetime="2021-06-05"
                                >June 5, 2021</time
                            >)
                        </p>
                    </div>
                </div>

                <p class="mt-6 text-gray-500">
                    The Application UI Icon Pack comes with over 200 icons in 3
                    styles: outline, filled, and branded. This playful icon pack
                    is tailored for complex application user interfaces with a
                    friendly and legible look.
                </p>

                <div
                    class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2"
                >
                    <a
                        href="/checkout"
                        class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
                        >Pay $220</a
                    >
                    <button
                        type="button"
                        class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
                        >Preview</button
                    >
                </div>
            </div>
        </div>
    </main>
</div>
