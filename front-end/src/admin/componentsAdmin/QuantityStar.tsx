import { AiFillStar } from "react-icons/ai";

export default function QuantityStar() {
    return (
        <div>
            <ul style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <p style={{ marginTop: '7px' }}> <AiFillStar /></p>
                <p>4.5</p>
            </ul>
        </div>
    )
}
