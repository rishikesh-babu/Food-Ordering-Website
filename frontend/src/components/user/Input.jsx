function LoginInput({ type, placeholder, name, handleData, className }) {
    return (
            <input
                type={type ?? 'text'}
                name={name}
                onChange={handleData}
                placeholder={placeholder ?? 'Placeholder'}
                className={className}
            />
    );
}

export { LoginInput }