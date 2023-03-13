import { AiOutlineClockCircle } from 'react-icons/ai'

export default function NumberTime() {
    return (
        <div>
            <ul style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <p style={{ marginTop: '7px' }}> <AiOutlineClockCircle /></p>
                <p>15 Month</p>
            </ul>
        </div>
    )
}
