let localStoragePost = getFromLocalStorage('post') || {}
let localStoragePosts = getFromLocalStorage('posts') || {}

const images = ["../images/lynz.gif","../images/original.jpg", "../images/smile.jpg"]

const main = document.createElement("main")
main.className = "main"

const profileContainer = document.createElement("div")
profileContainer.className = "profileContainer"

const profile = document.createElement("img")
profile.className = "profile"
profile.src = images[Math.floor(Math.random()*images.length)]

const email = document.createElement("p")
email.className = "email"
email.innerText = localStoragePost.email

const postContainer = document.createElement("postContainer")
postContainer.className = "postContainer"

const postName = document.createElement("postName")
postName.className = "postName"
postName.innerText = localStoragePost.name

const postBody = document.createElement("postBody")
postBody.className = "postBody"
postBody.innerText = localStoragePost.body

const btnContainer = document.createElement("div")
btnContainer.className = "btnContainer"

const editBtn = document.createElement("btn")
editBtn.className = "editBtn"
editBtn.innerText = "edit"
editBtn.addEventListener("click", ()=> openEditModalWindow(localStoragePost))

const deleteBtn = document.createElement("btn")
deleteBtn.className = "deleteBtn"
deleteBtn.innerText = "delete"
deleteBtn.addEventListener("click", ()=> openDeleteModalWindow(localStoragePost))

document.body.append(main)
main.append(profileContainer,postContainer)
profileContainer.append(profile, email)
postContainer.append(postName, postBody, btnContainer)
btnContainer.append(editBtn, deleteBtn)
console.log(window.location.pathname)
