import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointmentsList: [], title: '', date: '', isFiltered: false}

  onNameChange = event => {
    this.setState({title: event.target.value})
  }

  onDateChange = event => {
    this.setState({date: event.target.value})
    console.log(event.target.value)
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state

    const newAppointment = {
      id: v4(),
      title,
      date,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFiltered} = this.state

    this.setState({isFiltered: !isFiltered})
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFiltered} = this.state

    if (isFiltered) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  renderAppointmentsList = () => {
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return filteredAppointmentsList.map(eachAppointment => (
      <AppointmentItem
        key={eachAppointment.id}
        appointmentDetails={eachAppointment}
        toggleIsStarred={this.toggleIsStarred}
      />
    ))
  }

  render() {
    const {title, date, isFiltered} = this.state
    const filteredClass = isFiltered ? 'filter-filled' : 'filter-empty'

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="upper-section">
            <div className="title-form-combined-container">
              <h1 className="title">Add Appointment</h1>
              <form onSubmit={this.addAppointment} className="form-container">
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  placeholder="Title"
                  type="text"
                  id="title"
                  className="title-input"
                  onChange={this.onNameChange}
                  value={title}
                />

                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  placeholder="dd/mm/yyyy"
                  type="date"
                  id="date"
                  className="title-input"
                  onChange={this.onDateChange}
                  value={date}
                />
                <button type="submit" className="custom-btn">
                  Add
                </button>
              </form>
            </div>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-img"
            />
          </div>

          <hr className="partition-line" />

          <div className="bottom-section">
            <div className="title-button-container">
              <h1 className="bottom-title">Appointments</h1>
              <button
                onClick={this.onFilter}
                type="button"
                className={`starred-button ${filteredClass}`}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-container">
              {this.renderAppointmentsList()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
