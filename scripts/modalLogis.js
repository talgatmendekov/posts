let indicator = "";

function removeModalWrapper(actionType, data) {
  saveToLocalStorage("posts", localStoragePosts);
  checkLocationHandler(actionType, data);
  modalWindowWrapper.remove();
}

function checkLocationHandler(actionType, data) {
  if (window.location.pathname === "/post.html") {
    if (actionType === "delete") {
      window.location.pathname = "/";
    } else if (actionType === "edit") {
      console.log(data);
      email.innerText = data.email;
      postName.innerText = data.name;
      postBody.innerText = data.body;
      localStoragePost = data;
      saveToLocalStorage("post", data);
    }
  } else if (window.location.pathname === "/index.html") {
    cutToArrayAndMovePaginationList(localStoragePosts);
  }
}

function editPostHandler() {
  const FI = localStoragePosts.findIndex(
    (item) => item.postId === indicator.postId && item.id === indicator.id
  );
  const editedItem = {
    ...localStoragePosts[FI],
    email: emailField.value,
    name: nameField.value,
    body: bodyField.value,
  };
  localStoragePosts[FI] = editedItem;
  removeModalWrapper("edit", editedItem);
}

function deletePostHandler() {
    console.log(localStoragePosts, "before")
    const filteredArray = localStoragePosts.filter(
        (item) => item.email !== indicator
    );
    localStoragePosts = filteredArray;
    console.log(localStoragePosts, "after")
    removeModalWrapper("delete");
}

function openModalWindowLogic(
  indicatorData,
  questionInnerText,
  modalWindowType,
  modalWindowElements
) {
  modalWindowContainer.innerHTML = null;
  indicator = indicatorData;
  questionText.innerText = questionInnerText;
  document.body.prepend(modalWindowWrapper);
  modalWindowWrapper.append(modalWindowContainer);
  modalWindowContainer.append(modalWindowType);
  modalWindowType?.append(...modalWindowElements);
}

function openEditModalWindow(data) {
  emailField.value = data.email;
  nameField.value = data.name;
  bodyField.value = data.body;
  const text = "Are you sure you want to edit this post?";
  openModalWindowLogic(
    { postId: data.postId, id: data.id },
    text,
    editModalWindow,
    [questionText, emailField, nameField, bodyField, editAgreeBtn]
  );
}

function openDeleteModalWindow(data) {
  const text = "Are you sure you want to delete this post?";
  openModalWindowLogic(data.email, text, deleteModalWindow, [
    questionText,
    deleteAgreeBtn,
  ]);
}

editAgreeBtn.addEventListener("click", editPostHandler);
deleteAgreeBtn.addEventListener("click", deletePostHandler);

modalWindowWrapper.addEventListener("click", (event) => {
  if (event.target.className === "modalWindowWrapper") {
    modalWindowWrapper.remove();
  }
});
