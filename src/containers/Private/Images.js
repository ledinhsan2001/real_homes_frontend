import React, { useEffect, useState } from "react";
import icons from "../../utils/icons";
import { apiUploadImages, apidelImagOnCloud } from "../../services";
import { RotatingLines } from "react-loader-spinner";
const { FcAddImage, BsTrash } = icons;

const Images = ({ payload, setpayload, errors, seterrors, name }) => {
    const [imagesSelected, setimagesSelected] = useState(() => {
        const init = payload.images.url || [];
        return init;
    });
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        if (payload?.images?.url?.length === 0) {
            setimagesSelected([]);
        }
    }, [payload]);

    const handleUploadImages = async (e) => {
        e.stopPropagation();
        setisLoading(true);
        try {
            const files = e.target.files;
            const images = new FormData();
            let urls = [];
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                images.append(
                    "upload_preset",
                    process.env.REACT_APP_UPLOAD_ASSETS_NAME
                );
                images.append("folder", process.env.REACT_APP_FOLDER_NAME);
                images.append("file", file);
                const response = await apiUploadImages(images);
                if (response.status === 200) {
                    urls.push({
                        url: response.data.secure_url,
                        public_id: response.data.public_id,
                    });
                }
            }

            setimagesSelected((prev) => [...prev, ...urls]);
            setpayload((prev) => ({
                ...prev,
                images: {
                    url: [...payload.images.url, ...urls],
                },
            }));
            setisLoading(false);
        } catch (error) {
            setisLoading(false);
        }
    };

    const handleDelImage = async (image) => {
        // delete img on cloudinary err should do not use
        const response = await apidelImagOnCloud(image?.public_id);
        if (response.data.success === true) {
            alert(response.data.message);
        } else {
            alert(response.data.message);
        }
        setimagesSelected((prev) =>
            prev?.filter((item) => item?.url !== image?.url)
        );
        setpayload((prev) => ({
            ...prev,
            images: {
                url: payload?.images.url?.filter(
                    (item) => item?.url !== image?.url
                ),
            },
        }));
    };

    const MessageErr = () => {
        let mess = errors.find((item) => item.name === name);
        return mess?.message;
    };

    return (
        <div className="flex flex-col bg-white p-3 mt-4 rounded-md w-full">
            <div className="font-bold text-gray-500 py-2 px-3 font-serif text-lg">
                Hình ảnh
            </div>
            <div className="flex my-3 px-3 flex-col w-full items-center justify-center border-dashed border-gray-400 border-[2px] bg-blue-200 p-4 rounded-md">
                <input
                    id="images"
                    hidden
                    type="file"
                    multiple
                    onChange={handleUploadImages}
                    onFocus={() => seterrors([])}
                />
                {isLoading ? (
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                    />
                ) : (
                    <label
                        className="text-lg p-2 justify-center items-center cursor-pointer"
                        htmlFor="images"
                    >
                        <FcAddImage size={150} />
                        <p className="justify-center ml-8">Chọn ảnh</p>
                    </label>
                )}
            </div>
            <p className="text-red-500">{errors && MessageErr()}</p>
            <div className="flex flex-col mt-2">
                <p className="text-xl font-bold">Các ảnh đã upload</p>
                <div className="flex flex-wrap mt-2 w-full">
                    {imagesSelected?.map((item) => {
                        return (
                            <div
                                key={item?.url}
                                className="relative h-[150px] w-1/6 z-10 mx-2 rounded-md"
                            >
                                <img
                                    src={item?.url}
                                    alt="Ảnh đã chọn"
                                    className="object-contain w-full h-full rounded-md "
                                ></img>
                                <p
                                    className="absolute z-20 bottom-0 justify-center items-center bg-slate-300 text-red-500 flex p-2 w-full rounded-sm gap-2 cursor-pointer"
                                    onClick={() => {
                                        handleDelImage(item);
                                    }}
                                >
                                    <BsTrash color="red" /> Xóa
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Images;
