function coloredTestImages() {
    if (location.pathname == '/student/student/test' || location.pathname == '/student/student/test/')
        document.querySelectorAll('img').forEach(img => img.classList.add('green-img'))
}