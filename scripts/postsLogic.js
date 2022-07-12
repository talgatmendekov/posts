let selectedIndex = 0;
let localStoragePosts = getFromLocalStorage("posts") || [];
let posts = [];

const changeSelectedIndex = (currentIndex) => {
  return (selectedIndex = currentIndex);
};

function movePaginationList(array, index) {
  changeSelectedIndex(index);
  renderPaginationCountries(posts);
  renderPosts(array[selectedIndex]);
}

function checkCountries(paginationItem, index) {
  if (selectedIndex === index) {
    paginationItem.style.borderBottom = "2px solid white";
  } else {
    paginationItem.style.borderBottom = null;
  }
}

function cutToArrayBySize(size, array, selectedArray) {
  for (let i = 0; i < Math.ceil(array.length / size); i++) {
    selectedArray[i] = array.slice(i * size, i * size + size);
  }
}

function cutToArrayAndMovePaginationList(array) {
  cutToArrayBySize(10, array, posts);
  if (posts.length > 0) {
    movePaginationList(posts, selectedIndex);
  }
}

function moveToPaginationByArrow(
  count,
  operator,
  conditionalCount,
  conditionalIndex
) {
  selectedIndex = selectedIndex + count;
  if (operator === ">") {
    if (selectedIndex > conditionalCount) {
      return movePaginationList(posts, conditionalIndex);
    }
  } else if (operator === "<") {
    if (selectedIndex < conditionalCount) {
      return movePaginationList(posts, conditionalIndex);
    }
  }
  movePaginationList(posts, selectedIndex);
}

function searchHandler(event) {
  const eventValue = event.target.value;
  if (eventValue === "") {
    cutToArrayAndMovePaginationList(localStoragePosts);
    return;
  }
  posts = [];
  changeSelectedIndex(0);
  const filteredArray = localStoragePosts.filter(
    (item) =>
      item.email.toLowerCase().includes(eventValue.toLowerCase()) ||
      item.name.toLowerCase().includes(eventValue.toLowerCase()) ||
      item.body.toLowerCase().includes(eventValue.toLowerCase())
  );
  cutToArrayAndMovePaginationList(filteredArray);
}

async function getMessages() {
  if (localStoragePosts.length === 0) {
    const response = await sendRequest({ url: "/comments?_limit=100" });
    localStoragePosts = [...response];
    saveToLocalStorage("posts", response);
  }
  cutToArrayAndMovePaginationList(localStoragePosts);
}

function redirectToPost(data) {
  saveToLocalStorage("post", data);
  window.location.href = "http://127.0.0.1:5500/post.html";
  // window.location;
}

function renderPosts(array = []) {
  postWrapper.innerHTML = "";
  if (array.length !== 0) {
    array?.map((item) => {
      const post = document.createElement("div");
      post.className = "post";

      const postName = document.createElement("p");
      postName.className = "postName";
      postName.innerText = `${item.name}`;
      postName.addEventListener("click", () => redirectToPost(item));

      const postAuthor = document.createElement("p");
      postAuthor.className = "postAuthor";
      postAuthor.innerText = `${item.email}`;

      const postBody = document.createElement("p");
      postBody.innerText = `${item.body}`;

      const btnContainer = document.createElement("div");
      btnContainer.className = "btnContainer";

      const editBtn = document.createElement("btn");
      editBtn.className = "editBtn";
      editBtn.innerText = "edit";
      editBtn.addEventListener("click", () => openEditModalWindow(item));

      const deleteBtn = document.createElement("btn");
      deleteBtn.className = "deleteBtn";
      deleteBtn.innerText = "delete";
      deleteBtn.addEventListener("click", () => openDeleteModalWindow(item));

      btnContainer.append(editBtn, deleteBtn);
      post.append(postAuthor, postName, postBody, btnContainer);

      return postWrapper.append(post);
    });
  }
}

function renderPaginationCountries(array = []) {
  paginationWrapper.innerHTML = null;
  array.map((item, index) => {
    const paginationItem = document.createElement("div");
    paginationItem.className = "paginationItem";
    paginationItem.innerText = `${index + 1}`;
    paginationItem.addEventListener("click", () =>
      movePaginationList(posts, index)
    );
    checkCountries(paginationItem, index);
    return paginationWrapper.append(paginationItem);
  });
}

leftBtn.addEventListener("click", () => moveToPaginationByArrow(-1, "<", 0, 9));
rightBtn.addEventListener("click", () => moveToPaginationByArrow(1, ">", 9, 0));
textField.addEventListener("input", searchHandler);

getMessages();
