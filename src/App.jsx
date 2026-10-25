import { useMemo, useState } from 'react'
import Students from './Students.jsx'
import teacherImage from './assets/Diana_Dp.jpg'

const initialStudents = [
  { id: 1, name: 'Amara Johnson', email: 'amara.j@email.com', grade: 'Grade 8', attendance: 98, progress: 86, status: 'On track', color: 'lilac', initials: 'AJ' },
  { id: 2, name: 'Noah Williams', email: 'noah.w@email.com', grade: 'Grade 8', attendance: 92, progress: 72, status: 'On track', color: 'peach', initials: 'NW' },
  { id: 3, name: 'Sofia Martinez', email: 'sofia.m@email.com', grade: 'Grade 8', attendance: 84, progress: 58, status: 'Needs support', color: 'mint', initials: 'SM' },
  { id: 4, name: 'Ethan Chen', email: 'ethan.c@email.com', grade: 'Grade 8', attendance: 96, progress: 91, status: 'On track', color: 'blue', initials: 'EC' },
  { id: 5, name: 'Zara Patel', email: 'zara.p@email.com', grade: 'Grade 8', attendance: 78, progress: 49, status: 'Needs support', color: 'rose', initials: 'ZP' },
]

const navigation = [
  { label: 'Overview', icon: 'grid' },
  { label: 'Students', icon: 'users' },
  { label: 'Attendance', icon: 'calendar' },
  { label: 'Insights', icon: 'chart' },
]

function Icon({ name, size = 20 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M16 3v4M8 3v4M3 11h18" /><path d="m9 16 2 2 4-4" /></>,
    chart: <><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-5 5" /><path d="M19 14V9h-5" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5M12 15V3" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    sparkle: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" /><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  }

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

function App() {
  const today = new Date()
  const formattedDate = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(today)
  const schoolYearStart = today.getMonth() >= 6 ? today.getFullYear() : today.getFullYear() - 1
  const schoolYear = `${schoolYearStart}–${String(schoolYearStart + 1).slice(-2)}`
  const [students, setStudents] = useState(initialStudents)
  const [activePage, setActivePage] = useState('Overview')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Everyone')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const filteredStudents = useMemo(() => students.filter((student) => {
    const matchesSearch = `${student.name} ${student.email}`.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'Everyone' || student.status === filter
    return matchesSearch && matchesFilter
  }), [filter, search, students])

  const averageAttendance = students.length
    ? Math.round(students.reduce((sum, student) => sum + student.attendance, 0) / students.length)
    : 0

  function addStudent(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name').trim()
    const email = formData.get('email').trim()
    const grade = formData.get('grade')
    if (!name || !email || !grade) return

    const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
    setStudents((current) => [
      { id: Date.now(), name, email, grade, attendance: 100, progress: 0, status: 'On track', color: 'lilac', initials },
      ...current,
    ])
    setFilter('Everyone')
    setSearch('')
    setActivePage('Students')
    setIsModalOpen(false)
  }

  function exportStudents() {
    const rows = [
      ['Name', 'Email', 'Grade', 'Attendance', 'Progress', 'Status'],
      ...filteredStudents.map(({ name, email, grade, attendance, progress, status }) => [name, email, grade, `${attendance}%`, `${progress}%`, status]),
    ]
    const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'little-steps-students.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  const pageCopy = {
    Overview: ['Your classroom, in bloom.', 'A little progress each day adds up to big things. Here’s how your class is doing.'],
    Students: ['All your brilliant minds.', 'Get to know your learners and celebrate every step forward.'],
    Attendance: ['Showing up is a big step.', 'A quick look at the routines helping your students thrive.'],
    Insights: ['Small steps, big stories.', 'Your class is growing. Here are a few lovely things we noticed.'],
  }
  const [title, description] = pageCopy[activePage]
  const needsSupport = students.filter((student) => student.status === 'Needs support').length

  return (
    <div className="app-shell">
      {isSidebarOpen && <button className="sidebar-backdrop" aria-label="Close navigation" onClick={() => setIsSidebarOpen(false)} />}
      <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <a className="brand" href="#overview" onClick={() => { setActivePage('Overview'); setIsSidebarOpen(false) }}>
          <span className="brand-mark"><Icon name="sparkle" size={21} /></span>
          <span>little<span className="brand-light">steps</span><small>TEACHER SPACE</small></span>
        </a>

        <div className="nav-label">YOUR CLASSROOM</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map(({ label, icon }) => (
            <button
              className={`nav-link ${activePage === label ? 'nav-link-active' : ''}`}
              key={label}
              aria-label={label}
              onClick={() => { setActivePage(label); setIsSidebarOpen(false) }}
            >
              <Icon name={icon} size={19} />
              <span>{label}</span>
              {label === 'Students' && <span className="nav-count">{students.length}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-note">
          <span className="note-icon"><Icon name="sparkle" size={18} /></span>
          <p>Little wins matter.</p>
          <span>Keep noticing the good stuff. It adds up.</span>
          <div className="note-decoration">✳</div>
        </div>

        <button className="teacher-profile" onClick={() => setActivePage('Insights')}>
          <img src={teacherImage} alt="Ms. Diana" />
          <span><strong>Ms. Diana</strong><small>Class teacher</small></span>
          <Icon name="chevron" size={17} />
        </button>
      </aside>

      <main className="main-content" id="overview">
        <header className="topbar">
          <button className="mobile-menu" aria-label="Open navigation" onClick={() => setIsSidebarOpen(true)}><span /><span /><span /></button>
          <div className="breadcrumb">My classroom <Icon name="chevron" size={15} /> <span>{activePage}</span></div>
          <div className="topbar-actions">
            <span className="term-pill"><span /> {schoolYear} school year</span>
            <button className="avatar-button" aria-label="Open Ms. Diana's insights" onClick={() => setActivePage('Insights')}>
              <img src={teacherImage} alt="" />
            </button>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><span className="eyebrow-dot" /> {formattedDate.toUpperCase()}</div>
              <h1>{title}</h1>
              <p className="welcome-copy">{description}</p>
            </div>
            <button className="primary-button" onClick={() => setIsModalOpen(true)}><Icon name="plus" size={18} /> Add a student</button>
          </section>

          {activePage === 'Attendance' ? (
            <section className="attendance-page">
              <div className="section-heading"><div><h2>Attendance at a glance</h2><p>Every day in class is a chance to grow.</p></div><span className="quiet-pill"><Icon name="calendar" size={15} /> This week</span></div>
              <div className="attendance-overview">
                <div className="attendance-highlight"><span className="highlight-icon"><Icon name="calendar" size={20} /></span><span className="stat-label">CLASS ATTENDANCE</span><strong>{averageAttendance}%</strong><span>Looking good, team!</span></div>
                <div className="attendance-bars"><div className="bars-heading"><strong>This week</strong><span>Daily class attendance</span></div><div className="bar-chart">{[92, 96, 84, 98, 90].map((height, index) => <div className="bar-column" key={index}><span className="bar-tooltip">{height}%</span><div className={`bar-fill ${index === 3 ? 'bar-fill-highlight' : ''}`} style={{ height: `${height}%` }} /><small>{['M', 'T', 'W', 'T', 'F'][index]}</small></div>)}</div></div>
              </div>
              <div className="section-heading attendance-student-heading"><div><h2>Attendance by student</h2><p>A little check-in goes a long way.</p></div></div>
              <div className="student-table-card"><StudentTable students={students} /></div>
            </section>
          ) : activePage === 'Insights' ? (
            <section className="insights-page">
              <div className="insight-feature"><span className="feature-sparkle">✳</span><div className="insight-kicker">A LITTLE CLASSROOM MAGIC</div><h2>Every learner has<br />their own kind of bright.</h2><p>Your class is showing up, leaning in, and finding their rhythm. That’s something worth celebrating.</p><span className="feature-signoff">Keep growing, Ms. Diana <span>♡</span></span></div>
              <div className="insight-cards"><div className="insight-card"><span className="insight-icon lilac-icon"><Icon name="chart" /></span><span className="stat-label">AVERAGE PROGRESS</span><strong>{students.length ? Math.round(students.reduce((sum, student) => sum + student.progress, 0) / students.length) : 0}%</strong><p>Your class is moving forward, one step at a time.</p></div><div className="insight-card"><span className="insight-icon peach-icon"><Icon name="sparkle" /></span><span className="stat-label">LITTLE WINS</span><strong>{students.filter((student) => student.progress >= 80).length} learners</strong><p>Making wonderful progress this term.</p></div><div className="insight-card"><span className="insight-icon mint-icon"><Icon name="users" /></span><span className="stat-label">READY FOR A CHECK-IN</span><strong>{needsSupport} learners</strong><p>A little extra encouragement can go a long way.</p></div></div>
            </section>
          ) : (
            <>
              <section className="stats-grid" aria-label="Classroom summary">
                <StatCard icon="users" label="TOTAL STUDENTS" value={students.length} detail="Wonderful minds in your class" color="lilac-icon" trend="this term" />
                <StatCard icon="calendar" label="CLASS ATTENDANCE" value={`${averageAttendance}%`} detail="Your class is showing up" color="mint-icon" trend="looking good" />
                <StatCard icon="chart" label="ON TRACK" value={`${students.length - needsSupport} learners`} detail="Making lovely progress" color="peach-icon" trend="keep it up" />
              </section>

              <section className="roster-section">
                <div className="section-heading">
                  <div><h2>{activePage === 'Students' ? 'Meet your students' : 'Your lovely learners'}</h2><p>Everyone grows at their own pace.</p></div>
                  <button className="text-button" onClick={exportStudents}><Icon name="download" size={16} /> Export list</button>
                </div>

                <div className="roster-card">
                  <div className="roster-toolbar">
                    <label className="search-box"><Icon name="search" size={18} /><input aria-label="Search students" placeholder="Find a student..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
                    <div className="filter-group" aria-label="Filter students">
                      {['Everyone', 'On track', 'Needs support'].map((option) => <button key={option} className={`filter-button ${filter === option ? 'filter-active' : ''}`} onClick={() => setFilter(option)}>{option}</button>)}
                    </div>
                  </div>
                  <StudentTable students={filteredStudents} />
                  {filteredStudents.length === 0 && <div className="empty-state"><span>✳</span><strong>No little learners found</strong><p>Try another name or choose a different filter.</p></div>}
                  <div className="table-footer"><span>Showing <strong>{filteredStudents.length}</strong> of <strong>{students.length}</strong> students</span><button className="view-all-button" onClick={() => setActivePage('Students')}>View all students <Icon name="arrow" size={15} /></button></div>
                </div>
              </section>

              <section className="bottom-grid">
                <div className="attendance-card">
                  <div className="mini-card-heading"><div><span className="mini-icon mint-icon"><Icon name="calendar" size={17} /></span><div><h3>Little by little</h3><span>Class attendance this week</span></div></div><button className="icon-button" aria-label="View attendance" onClick={() => setActivePage('Attendance')}><Icon name="arrow" size={17} /></button></div>
                  <div className="mini-chart"><div className="chart-gridlines"><span /><span /><span /></div><div className="chart-bars">{[66, 82, 74, 96, 86, 100, 78].map((height, index) => <div className={`chart-bar ${index === 5 ? 'chart-bar-active' : ''}`} style={{ height: `${height}%` }} key={index}><span>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span></div>)}</div></div>
                  <div className="chart-footnote"><span><i /> This week</span><strong>{averageAttendance}% average</strong></div>
                </div>
                <div className="teacher-tip"><div className="tip-top"><span className="tip-icon"><Icon name="sparkle" size={19} /></span><span>YOUR LITTLE REMINDER</span></div><h3>Progress isn’t always a straight line.</h3><p>Noticing the effort matters just as much as celebrating the outcome. You’re doing a lovely job.</p><button onClick={() => setActivePage('Insights')}>A little more inspiration <Icon name="arrow" size={15} /></button><div className="tip-flower">✿</div></div>
              </section>
            </>
          )}
          <footer className="page-footer"><span>Made with a little love, for the people who help us grow.</span><span>✿ &nbsp; LITTLE STEPS CLASSROOM</span></footer>
        </div>
      </main>

      {isModalOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsModalOpen(false) }}><section className="student-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-heading"><span className="modal-icon"><Icon name="sparkle" size={20} /></span><button className="icon-button" aria-label="Close dialog" onClick={() => setIsModalOpen(false)}><Icon name="close" size={19} /></button></div><h2 id="modal-title">A new little learner!</h2><p>There’s always room for one more bright mind.</p><form onSubmit={addStudent}><label>Student’s name<input name="name" placeholder="e.g. Jamie Rivera" required autoFocus /></label><label>Email address<input name="email" type="email" placeholder="jamie@email.com" required /></label><label>Grade<select name="grade" defaultValue="Grade 8"><option>Grade 6</option><option>Grade 7</option><option>Grade 8</option><option>Grade 9</option><option>Grade 10</option></select></label><div className="modal-actions"><button type="button" className="cancel-button" onClick={() => setIsModalOpen(false)}>Maybe later</button><button type="submit" className="primary-button"><Icon name="plus" size={17} /> Add student</button></div></form></section></div>}
    </div>
  )
}

function StatCard({ icon, label, value, detail, color, trend }) {
  return <article className="stat-card"><div className="stat-card-top"><span className={`stat-icon ${color}`}><Icon name={icon} size={19} /></span><span className="stat-trend"><span>↗</span> {trend}</span></div><span className="stat-label">{label}</span><strong className="stat-value">{value}</strong><span className="stat-detail">{detail}</span></article>
}

function StudentTable({ students }) {
  return <div className="table-scroll"><table className="student-table"><thead><tr><th>STUDENT</th><th>GRADE</th><th>ATTENDANCE</th><th>PROGRESS</th><th>STATUS</th></tr></thead><tbody>{students.map((student) => <Students key={student.id} student={student} />)}</tbody></table></div>
}

export default App
