import React from "react";

function InputTag({ placeholder, name, type, onInputChange, value, classname }) {
    return (
        <div className="flex flex-col">
            <input
                onChange={onInputChange}
                value={value}
                name={name}
                type={type ?? "text"}
                placeholder={placeholder ?? "placeholder"}
                className={classname ?? classname}
            />
        </div>
    );
}

export function TextArea({ placeholder, name, onInputChange, value, classname }) {
    return (
        <div className="flex flex-col">
            <textarea
                name={name}
                id="foodDescriptionArea"
                onChange={onInputChange}
                value={value}
                placeholder={placeholder ?? "placeholder"}
                className={classname}
            ></textarea>
        </div>
    )
}

const ImageTag = React.forwardRef(function ImageTag({ onInputChange, classname }, ref) {

    function handleFile(event) {
        const selectedFile = event?.target?.files[0] || ''
        console.log('selectedFile :>> ', selectedFile);
        if (selectedFile) {
            onInputChange(selectedFile)
        } else {
            onInputChange(null)
        }
    }
    return (
        <input
            onChange={handleFile}
            type="file"
            ref={ref}
            className={"file-input file-input-bordered w-full"}
        />
    )
})


export { InputTag, ImageTag };
