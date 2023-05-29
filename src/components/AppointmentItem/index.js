import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails
  const star =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const filledStar =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
  console.log(formattedDate)

  const URL = isStarred ? filledStar : star

  return (
    <li className="appointment-container">
      <div className="title-star-container">
        <p className="doctor-title">{title}</p>
        <button
          data-testid="star"
          onClick={onClickStar}
          type="button"
          className="star-btn"
        >
          <img src={URL} alt="star" className="star-img" />
        </button>
      </div>
      <p className="date-cls">{`Date ${formattedDate}`}</p>
    </li>
  )
}

export default AppointmentItem
