import './index.css'

const AppointmentItem = props => {
  const {data, changeIsStarred} = props
  const {titleInput, appointmentDate, isStarred, id} = data
  console.log(isStarred)
  const onClickStar = () => {
    changeIsStarred(id)
  }
  const starImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="appointmentItem">
      <div className="name-container">
        <p className="appointment-name">{titleInput}</p>
        <button
          type="button"
          className="start-btn"
          testid="star"
          onClick={onClickStar}
        >
          <img src={starImg} alt="star" className="star-icon" />
        </button>
      </div>
      <p className="date-display">{`Date: ${appointmentDate}`}</p>
    </li>
  )
}

export default AppointmentItem
