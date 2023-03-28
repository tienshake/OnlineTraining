import { AiFillStar } from "react-icons/ai";

const amountSart = [1, 2, 3, 5];
const style = {
  display: 'flex',
  color: "#FFB800"
}

export default function StarGroup() {
  return (
    <div style={style}>
      {
        amountSart.map((index) => <p key={index}>
          <AiFillStar />
        </p>)
      }
      <p style={{ fontSize: '13px', marginLeft: '5px'}}>5.0 (15) </p>
    </div>
  )
}