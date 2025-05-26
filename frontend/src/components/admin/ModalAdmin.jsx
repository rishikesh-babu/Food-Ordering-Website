import React from "react";
import { ImageTag, InputTag, TextArea } from "./InputAdmin";
import { CreateFoodButton, CreateHotelButton } from "./ButtonAdmin";

export function ModalHotelAdmin({
    selectedHotelDetails,
    handleDetails,
    previewImage,
    handleFile,
    handleSubmit,
    clearFile,
}) {
    const classname =
        "p-2.5 text-lg text-gray-500 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500";

    function clearFileData() {
        clearFile.current.value = null;
        handleFile(null);
    }

    return (
        <dialog id="hotelAdmin_modal" className="modal ">
            <div className="modal-box p-0 size-fit">
                <div className="mx-auto p-6 sm:max-w-xl shadow-lg rounded-lg dark:bg-gray-700">
                    <div className="text-3xl font-semibold text-center mb-6">
                        Update Hotel
                    </div>
                    <form className="flex flex-col gap-6">
                        <div className="space-y-2">
                            <div className="text-lg font-medium ">Hotel Name</div>
                            <InputTag
                                onInputChange={handleDetails}
                                name={"name"}
                                value={selectedHotelDetails?.name}
                                placeholder={"Enter hotel name"}
                                type={"text"}
                                classname={classname}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="text-lg font-medium">Hotel Address</div>
                            <InputTag
                                onInputChange={handleDetails}
                                name={"address"}
                                value={selectedHotelDetails?.address}
                                placeholder={"Enter hotel address"}
                                type={"text"}
                                classname={classname}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="text-lg font-medium">Hotel Image</div>
                            <img
                                src={previewImage || selectedHotelDetails?.image}
                                alt="hotel image "
                                className="border-2 border-sky-600 rounded-lg w-[50%]"
                            />
                            <div className="flex justify-center items-center">
                                <ImageTag
                                    ref={clearFile}
                                    onInputChange={handleFile}
                                    className="p-3 border border-gray-300 rounded-lg"
                                />
                                <div className="btn btn-outline" onClick={clearFileData}>
                                    Clear
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-row justify-between items-center">
                            <CreateHotelButton
                                handleSubmit={handleSubmit}
                                value={"Update"}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <form method="dialog">
                                <button
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Close
                                </button>
                            </form>
                        </div>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export function ModalFoodAdmin({
    selectFoodDetails,
    handleDetails,
    handleFile,
    previewImage,
    handleSubmit,
    clearFile,
}) {
    const classname =
        "p-2.5 text-lg text-gray-500 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500";
    return (
        <dialog id="foodAdmin_modal" className="modal">
            <div className="modal-box size-fit mx-auto p-6 sm:max-w-xl shadow-lg rounded-lg dark:bg-gray-700">
                <div className="text-3xl font-semibold text-center mb-8">
                    Update Food
                </div>
                <div className="flex flex-col gap-6">
                    <div>
                        <div className="text-lg font-medium">Name</div>
                        <InputTag
                            onInputChange={handleDetails}
                            name={"name"}
                            value={selectFoodDetails?.name}
                            placeholder={"Enter Food Name"}
                            type={"text"}
                            classname={classname}
                        />
                    </div>
                    <div>
                        <div className="text-lg font-medium">Price</div>
                        <InputTag
                            onInputChange={handleDetails}
                            name={"price"}
                            value={selectFoodDetails?.price}
                            placeholder={"Enter price"}
                            type={"number"}
                            classname={classname}
                        />
                    </div>
                    <div>
                        <div className="text-lg font-medium">Description</div>
                        <TextArea
                            onInputChange={handleDetails}
                            name={"description"}
                            value={selectFoodDetails?.description}
                            placeholder={"Enter Description"}
                            classname="p-2.5 min-h-[8em] text-lg text-gray-500 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="text-lg font-medium">Food Image</div>
                        <img
                            src={previewImage || selectFoodDetails?.image}
                            alt="Selected food image"
                            className="border-2 border-sky-600 rounded-lg w-[50%]"
                        />
                        <ImageTag
                            className="p-3 border border-gray-300 rounded-lg"
                            ref={clearFile}
                            onInputChange={handleFile}
                        />
                    </div>
                    <div className="flex justify-between ">
                        <CreateFoodButton value={"Update"} handleSubmit={handleSubmit} />
                        <form method="dialog">
                            <button
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ref={clearFile}
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
