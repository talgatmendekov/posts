const header = document.createElement('header')
header.className = 'header'

const main = document.createElement('main')
main.className = 'main'

const search = document.createElement('div')
search.className = 'search'

const textField = document.createElement('input')
textField.className = 'textField'
textField.placeholder = 'search the posts...'

const magnifier = document.createElement('img')
magnifier.src = '../images/magnifier.png'
magnifier.className = 'magnifier'

const logotypeContainer = document.createElement('div')
logotypeContainer.className = 'logotypeContainer'

const logotypeText = document.createElement('span')
logotypeText.className = 'logotypeText'
logotypeText.innerText = 'MEOW POSTS'

const logoCat = document.createElement('img')
logoCat.src = '../images/cat.gif'
logoCat.className = 'logoCat'

const postContainer = document.createElement('div')
postContainer.className = 'postContainer'

const postWrapper = document.createElement('div')
postWrapper.className = 'postWrapper'

const paginationContainer = document.createElement('div')
paginationContainer.className = 'paginationContainer'

const paginationWrapper = document.createElement('div')
paginationWrapper.className = 'paginationWrapper'

const leftBtn = document.createElement('img')
leftBtn.src = '../images/arrow.png'
leftBtn.className = 'leftBtn'

const rightBtn = document.createElement('img')
rightBtn.src = '../images/arrow.png'
rightBtn.className = 'rightBtn'

document.body.append(header, main)
logotypeContainer.append(logoCat, logotypeText)
search.append(textField, magnifier)
header.append(logotypeContainer, search)
main.append(postContainer)
postContainer.append(postWrapper, paginationContainer)
paginationContainer.append(leftBtn, paginationWrapper, rightBtn)
