function InputTag({ placeholder, name, type, onInputChange, value }) {
    return (
        <div className="flex flex-col">
            <input
                onChange={onInputChange}
                value={value}
                name={name}
                type={type ?? "text"}
                placeholder={placeholder ?? "placeholder"}
                className="input input-bordered w-full max-w-xs"
            />
        </div>
    );
}

function ImageTag({ onInputChange }) {

    function handleFile(event) {
        const selectedFile = event.target.files[0]
        if (selectedFile) {
            onInputChange(selectedFile)
        }
    }
    return (
        <div className="flex flex-col">
            <input onChange={handleFile} type="file" className="file-input file-input-bordered w-full max-w-xs" />
        </div>
    )
}

export { InputTag, ImageTag };
