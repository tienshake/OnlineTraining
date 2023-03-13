import { MdPriceChange } from 'react-icons/md';

export default function QuantityPrice() {
    return (
        <div>
            <ul style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <p style={{ marginTop: '7px' }}> <MdPriceChange /></p>
                <p>15 Days</p>
            </ul>
        </div>
    )
}
