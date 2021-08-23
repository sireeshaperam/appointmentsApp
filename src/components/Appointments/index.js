import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    date: '',
    buttonStatus: false,
  }

  onChangeTitle = event => {
    console.log(event.target.value)
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeDate = event => {
    console.log(event.target.value)
    this.setState({
      date: event.target.value,
    })
  }

  onClickAdd = event => {
    event.preventDefault()
    const {titleInput, date} = this.state
    const appointmentDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    console.log(appointmentDate)
    const newAppointment = {
      id: uuidv4(),
      titleInput,
      appointmentDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      date: '',
    }))
  }

  changeIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  filterList = () => {
    const {appointmentList} = this.state
    const filtered = appointmentList.filter(each => each.isStarred === true)
    return filtered
  }

  displaysList = () => {
    const {appointmentList} = this.state
    return appointmentList
  }

  onClickStarredBtn = () => {
    const {buttonStatus} = this.state
    this.setState({
      buttonStatus: !buttonStatus,
    })
  }

  render() {
    const {titleInput, date, buttonStatus} = this.state
    const filteredList = buttonStatus ? this.filterList() : this.displaysList()
    return (
      <div className="app-container">
        <div className="appointments-section">
          <div className="appointments-write-container">
            <form className="form" onSubmit={this.onClickAdd}>
              <h1 className="heading">Add Appointment</h1>
              <label className="para" htmlFor="title-input">
                Title
              </label>
              <br />
              <input
                type="text"
                className="input-style"
                placeholder="Title"
                value={titleInput}
                id="title-input"
                onChange={this.onChangeTitle}
              />
              <br />
              <label className="para" htmlFor="date-input">
                Date
              </label>
              <br />
              <input
                type="date"
                className="input-style"
                id="date-input"
                value={date}
                onChange={this.onChangeDate}
              />
              <br />
              <button className="button-styling" type="submit">
                Add
              </button>
            </form>
            <div className="image-container">
              <img
                className="image"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr className="hr-style" />
          <div className="appointment-bar">
            <h1 className="heading">Appointments</h1>
            <button
              className="stared"
              type="button"
              onClick={this.onClickStarredBtn}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-container">
            {filteredList.map(each => (
              <AppointmentItem
                data={each}
                key={each.id}
                changeIsStarred={this.changeIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
