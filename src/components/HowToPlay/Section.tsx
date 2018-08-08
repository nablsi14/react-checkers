import React from "react";

export interface ISectionProps {
    children?: any;
    contents?: string[];
    level: number;
    id: string;
    title: string;
}
const Section = (props: ISectionProps) => {
    const TitleTag = `h${
        props.level < 6 ? (props.level > 0 ? props.level : 1) : 6
    }`;
    return (
        <div>
            <TitleTag id={props.id}>{props.title}</TitleTag>
            {props.contents && (
                <ul>
                    {props.contents.map((content, i) => (
                        <li
                            key={i}
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    ))}
                </ul>
            )}
            {props.children}
        </div>
    );
};

export default Section;
