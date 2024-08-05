const allInputBoxDiv = document.querySelectorAll('.input-box-div')
allInputBoxDiv.forEach((inputBoxDiv) => {
  const inputBox = inputBoxDiv.querySelector('.input-box')
  const inputBoxTextDiv = inputBoxDiv.querySelector('.input-box-text-div')

  inputBox.addEventListener('focus', () => {
    inputBoxTextDiv.style.display = 'none'
    inputBoxDiv.style.border = '1px solid #007bff'
  })
  function materialsymbolsoutlined() {
    window.location.href = "index.html";
}

  inputBoxDiv.addEventListener('focusout', (e) => {
    inputBoxDiv.style.border = '1px solid #ced4da'
    if (e.target.value === '') {
      inputBoxTextDiv.style.display = 'flex'
    }
  })
})



