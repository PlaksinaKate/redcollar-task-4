import { getPosts, getUser, slipPosts } from './api.min.js'
import { POSTS_LIST } from './contst.min.js'
const postsContainer = document.getElementsByClassName(POSTS_LIST)[0];

async function posts() {
  const posts = await getPosts()
  if (slipPosts !== posts.total) {

    posts.posts.forEach(async (item) => {
      const { userId } = item
      const userName = await getUserName(userId);
      setPostHTML(item, userName)
    });
  }
}

function setPostHTML(item, userName) {
  const { title, body, reactions, tags } = item;

  const newDiv = document.createElement('div')
  newDiv.classList.add('posts__item')
  newDiv.innerHTML = `<div class="posts__item-tags row">${getTags(tags)}</div>
                        <h2 class="posts__item-title">${title}</h2>
                        <div class="posts__item-text">${body}</div>
                        <div class="row space-between">
                          <div class="posts__item-reactions">
                            <div class="posts__item-reactions-icon"></div>
                            <div class="posts__item-reactions-number">${reactions}</div>
                          </div>
                          <div class="posts__item-author">${userName}</div>
                        </div>`

  postsContainer.appendChild(newDiv)
}

function getTags(tags) {
  let htmlTag = ''
  tags.forEach(tag => {
    htmlTag += `<div class="posts__item-tag">${tag}</div>`
  })

  return htmlTag;
}

async function getUserName(userId) {
  try {
    const user = await getUser(userId)
    const { maidenName, lastName } = user
    return `${maidenName} ${lastName}`
  } catch (error) {
    throw new Error(error)
  }
}

const options = {
  root: document.querySelector(POSTS_LIST),
  rootMargin: '10px',
  threshold: 0.25
}

async function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      posts()
    }
  });
}

const observer = new IntersectionObserver(handleIntersect, options);
const triggerBtn = document.getElementsByClassName('loading')[0]
observer.observe(triggerBtn);