import "./Card.css";

interface MyCardBasicIntroduceProps {
    imgItem: String,
    titleItem: String,
    contentItem: String,
}

export default function CardBasicIntroduce(props:MyCardBasicIntroduceProps) {
    return (
        <div className='card_basic-intro'>
            <p className="content-left">
                <img src={`${props.imgItem}`} alt="" />
            </p>

            <ul>
                <h1 className="title-card">{props.titleItem}</h1>
                <p>{props.contentItem}</p>
            </ul>
        </div>
    )
}
