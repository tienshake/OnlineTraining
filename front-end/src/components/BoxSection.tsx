import "./components.css";

interface MyPropBoxSection {
    auxiliaryTitle: string,
    mainTitle: string,
    content: string
}

export default function BoxSection(props:MyPropBoxSection) {
    return (
        <>
            <div className='box_favourite_course'>
                <ul className='section_header'>
                    <li>
                        <p>{props.auxiliaryTitle}</p>
                        <p>{props.mainTitle}</p>
                    </li>

                    <li>
                        buutpn
                    </li>
                </ul>
                <p className="content">{props.content}</p>
            </div>

        </>
    )
}
