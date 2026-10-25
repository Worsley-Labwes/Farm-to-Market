function Students({ student }) {
  const progressColor = student.progress < 55 ? 'progress-low' : student.progress >= 80 ? 'progress-high' : ''
  const attendanceColor = student.attendance < 85 ? 'progress-low' : student.attendance >= 95 ? 'progress-high' : ''

  return (
    <tr>
      <td>
        <div className="student-identity">
          <span className={`student-avatar avatar-${student.color}`}>{student.initials}</span>
          <span className="student-name-wrap"><strong>{student.name}</strong><small>{student.email}</small></span>
        </div>
      </td>
      <td><span className="grade-pill">{student.grade}</span></td>
      <td><div className="attendance-cell"><div className="progress-track"><span className={attendanceColor} style={{ width: `${student.attendance}%` }} /></div><span>{student.attendance}%</span></div></td>
      <td><div className="progress-cell"><div className="progress-track"><span className={progressColor} style={{ width: `${student.progress}%` }} /></div><span>{student.progress}%</span></div></td>
      <td><span className={`status-pill ${student.status === 'Needs support' ? 'status-support' : 'status-track'}`}><i />{student.status}</span></td>
    </tr>
  )
}

export default Students
