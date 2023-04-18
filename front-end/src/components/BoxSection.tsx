import Button from "./Button";
import "./components.css";

interface MyPropBoxSection {
    auxiliaryTitle: string,
    mainTitle: string,
    content: string
}

export default function BoxSection(props: MyPropBoxSection) {
    return (
        <>
            <div className='box_favourite_course'>
                <ul className='section_header'>
                    <li>
                        <p>{props.auxiliaryTitle}</p>
                        <p>{props.mainTitle}</p>
                    </li>

                    <li>
                        <Button
                            variant="outlined"
                            title="All Courses"
                            path={`/course`}
                            circle
                        />
                    </li>
                </ul>
                <p className="content">{props.content}</p>
            </div>

        </>
    )
}
