<div>
    <div class="row">
        <h3>Multi Step form</h3>
    </div>
    <div class="row">
        <div class="col-xl-2">Aside</div>
        <div class="col-xl-10">
            <div class="row">
                <!--step 1 Start-->
                <div class="col-xl-12">
                    Step-1
                </div>
                <!--step 1 Stop-->

                <!--step 2 Start-->
                <div class="col-xl-12">
                    Step-2
                </div>
                <!--step 2 Stop-->
                
                <!--step 3 Start-->
                <div class="col-xl-12">
                    Step-3
                </div>
                <!--step 3 Stop-->
                
                <!--step 4 Start-->
                <div class="col-xl-12">
                    Step-4
                </div>
                <!--step 4 Stop-->
                
                <!--step 5 Start-->
                <div class="col-xl-12">
                    Step-5
                </div>
                <!--step 5 Stop-->
            </div>
        </div>
    </div>

    <div class="py-12">
        <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
            <div class="mt-10 sm:mt-0">
                <div class="md:grid md:grid-cols-3 md:gap-6">
                    <div class="md:col-span-1">
                    <div class="px-4 sm:px-0">
                        {{-- <h3 class="text-lg font-medium leading-6 text-gray-900">{{ $pages[$currentPage]['heading'] }}</h3> --}}
                        {{-- <p class="mt-1 text-sm text-gray-600">{{ $pages[$currentPage]['subheading'] }}</p> --}}
                    </div>
                    </div>
                    <div class="mt-5 md:mt-0 md:col-span-2">
                        @if ($errors->isNotEmpty())
                            <div class="text-sm bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                <strong class="font-bold">Oops!</strong>
                                <span class="block sm:inline">There are some errors with your submission.</span>
                            </div>
                        @endif
                        @if ($success)
                            <div class="text-sm bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                                <span class="block sm:inline">{{ $success }}</span>
                                <span wire:click="resetSuccess" class="absolute top-0 bottom-0 right-0 px-4 py-3">
                                    <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                                </span>
                            </div>
                        @endif
                        <form wire:submit.prevent="submit">
                            <div class="shadow overflow-hidden sm:rounded-md">
                                <div class="px-4 py-5 bg-primary sm:p-6">
                                    @if ($currentPage === 1)mu
                                        <h2>Step 01</h2>
                                    @elseif ($currentPage === 2)
                                        <h2>step 02</h2>
                                    @elseif ($currentPage === 3)
                                        <h2>step 03</h2>
                                    @elseif ($currentPage === 4)
                                        <h2>step 04</h2>
                                    @elseif ($currentPage === 5)
                                        <h2>step 05</h2>
                                    @endif
                                </div>
                                <div class="flex items-center justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    @if ($currentPage === 1)
                                        <div></div>
                                    @else
                                        <button wire:click="goToPreviousPage" type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
                                            Back
                                        </button>
                                    @endif
                                    @if ($currentPage === count($pages))
                                        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Submit
                                        </button>
                                    @else
                                        <button wire:click="goToNextPage" type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Next
                                        </button>
                                    @endif
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
