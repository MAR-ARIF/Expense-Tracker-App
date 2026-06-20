function NavButton ({
    type="button",
    children,
    className,
    ...props
}){
    return (
        <button className={`px-2 py-2 ${className}`} {...props} type={type}>
            {children}
        </button>
    )
}
export default NavButton