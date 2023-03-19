import { AiOutlineClose } from 'react-icons/ai'

interface MyProps {
    handleClose: () => void
}

export default function CloseTab(props: MyProps) {
    return (
        <>
            <p onClick={props.handleClose} style={{ cursor: 'pointer' }}><AiOutlineClose /></p>
        </>
    )
}
