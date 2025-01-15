function LoginInput({ type, placeholder, name, handleData }) {
    return (
            <input
                type={type ?? 'text'}
                name={name}
                onChange={handleData}
                placeholder={placeholder ?? 'Placeholder'}
                className="input input-bordered w-full max-w-xs"
            />
    );
}

export { LoginInput }