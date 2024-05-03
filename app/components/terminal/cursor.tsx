export const Cursor = ({ position }: { position: number }) => {
    const cursorStyle = {
        left: `calc(${position}ch )`,
    };
    return (
        <span
            id="cursor"
            style={cursorStyle}
        >
            &nbsp;
        </span>
    );
}
