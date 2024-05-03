interface CursorProps {
    position: number,
    inputValue: string,
}

export const Cursor = ({ position, inputValue }: CursorProps) => {
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
