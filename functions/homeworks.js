function homeworks() {
  if (!(location.pathname === '/student/homework/list'))
    return

  const radioButtons = document.querySelectorAll('#homeworktreadform-id_sem .radio')
  const searchHomeworksFrom = document.getElementById('w0')
  const yearSelect = document.getElementById('homeworktreadform-id_sem')
  if (yearSelect)
    yearSelect.onchange = () => {
      searchHomeworksFrom.submit()
    }
  for (const radioButton of radioButtons) {
    radioButton.onclick = () => {
      searchHomeworksFrom.submit()
    }
  }
}