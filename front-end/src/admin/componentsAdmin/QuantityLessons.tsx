import { MdOutlinePlayLesson } from 'react-icons/md'

export default function QuantityLessons() {
    return (
        <>
            <ul style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <p style={{ marginTop: '7px' }}> <MdOutlinePlayLesson /></p>
                <p>5 Lessons</p>
            </ul>
        </>
    )
}
