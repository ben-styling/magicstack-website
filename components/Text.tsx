import * as React from 'react'

const Text: React.FC<{ children: string; className: string }> = ({
    children,
    className,
}) => {
    return (
        <p className={className}>
            {children?.split?.('\n')?.map?.((item: string, index: number) => (
                <React.Fragment key={index}>
                    {item}
                    <br />
                </React.Fragment>
            ))}
        </p>
    )
}

export default Text
