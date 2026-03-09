const html = document.querySelector('html')

const bestSellersTabs = document.querySelectorAll('.best-sellers__tab')

const addToCartButtons = document.querySelectorAll('.add-to-cart')
const bestSellersModal = document.querySelector('.best-sellers__modal')
const modalCardTitle = document.querySelector('.modal__card-title')
const closeModalBtn = document.querySelector('.modal__close-btn')

let isModalOpen = false

function renderModalInfo(event) {
  const button = event.target.closest('.add-to-cart')
  const name = button.dataset.name;

  modalCardTitle.textContent = `${name}`
}

function openBestSellersModal(event) {
  renderModalInfo(event)
  isModalOpen = true
  bestSellersModal.showModal()
  html.classList.add('scroll-lock')
}

function closeBestSellersModal() {
  isModalOpen = false
  bestSellersModal.close()
  html.classList.remove('scroll-lock')
}

function closeModalOnBackdropClick(event) {
  if (!isModalOpen) return

  if (event.target.closest('.best-sellers__modal')) {
    if (!event.target.closest('.modal__container')) {
      bestSellersModal.close()
    }
  }
}

addToCartButtons.forEach(btn => {
  btn.addEventListener('click', openBestSellersModal)
})

closeModalBtn.addEventListener('click', closeBestSellersModal)

document.addEventListener('click', closeModalOnBackdropClick)

// Для перегляду другого варіанту потрібно закоментувати код нижче і розкоментувати 
// function prohibitActiveTabClosure(e) {
//   const bestSellerTabContainer = e.target.closest('.best-sellers__tab-container')
//   if (bestSellerTabContainer.hasAttribute('open')) {
//     e.preventDefault();
//   }
//   return
// }

// bestSellersTabs.forEach(tab => {
//   tab.addEventListener('click', prohibitActiveTabClosure)
// })

const bestSellersCategories = document.querySelector('.best-sellers__categories')
const categoryButtons = document.querySelectorAll('.category__button')

const bestSellersCard = document.querySelectorAll('.best-sellers__card')

function activateFirstCategory() {
  const firstButton = categoryButtons[0]

  if (!firstButton) return

  firstButton.classList.add('category__button--active')
  bestSellersCard[0].classList.add('card-open')
}

function displayCard(event) {
  const button = event.target.closest('.category__button')
  const categoryId = button.dataset.id

  categoryButtons.forEach((btn, index) => {
    btn.ariaSelected = false
    btn.classList.remove('category__button--active')
    bestSellersCard[index].classList.remove('card-open')
  })

  bestSellersCard[categoryId].classList.add('card-open')
  button.classList.add('category__button--active')
  button.ariaSelected = true
}


categoryButtons.forEach(btn => {
  btn.addEventListener('click', displayCard)
})

activateFirstCategory()
