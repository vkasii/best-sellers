const cards = [
  {
    id: 1,
    categoryName: 'Mantra Rings',
    cardData: {
      name: 'VIP Ring',
      oldPrice: '₴1,998.00',
      newPrice: '₴999.00',
      tags: ['New', 'Sale', 'Ring'],
      mobileImage: '../assets/images/mantra-rings-mobile.webp',
      mobileImage2x: '../assets/images/mantra-rings-mobile@2x.webp',
      tabletImage: '../assets/images/mantra-rings-tablet.webp',
      tabletImage2x: '../assets/images/mantra-rings-tablet@2x.webp',
      desktopImage: '../assets/images/mantra-rings.webp',
      desktopImage2x: '../assets/images/mantra-rings@2x.webp',
      fallbackImage: '../assets/images/mantra-rings.jpg',
      fallbackImage2x: '../assets/images/mantra-rings@2x.jpg',
    }
  },
  {
    id: 2,
    categoryName: 'CharityBands®',
    cardData: {
      name: 'Butterfly - Hope And Rebirth',
      oldPrice: '₴1,424.00',
      newPrice: '₴1,424.00',
      tags: ['New', 'Sale'],
      mobileImage: '../assets/images/charity-bands-mobile.webp',
      mobileImage2x: '../assets/images/charity-bands-mobile@2x.webp',
      tabletImage: '../assets/images/charity-bands-tablet.webp',
      tabletImage2x: '../assets/images/charity-bands-tablet@2x.webp',
      desktopImage: '../assets/images/charity-bands.webp',
      desktopImage2x: '../assets/images/charity-bands@2x.webp',
      fallbackImage: '../assets/images/charity-bands.jpg',
      fallbackImage2x: '../assets/images/charity-bands@2x.jpg',
    }
  },
  {
    id: 3,
    categoryName: 'Statement Collection',
    cardData: {
      name: 'Best Statement Ever',
      oldPrice: '₴2,424.00',
      newPrice: '₴1,600.00',
      tags: ['New', 'Sale', 'Top'],
      mobileImage: '../assets/images/statement-collection-mobile.webp',
      mobileImage2x: '../assets/images/statement-collection-mobile@2x.webp',
      tabletImage: '../assets/images/statement-collection-tablet.webp',
      tabletImage2x: '../assets/images/statement-collection-tablet@2x.webp',
      desktopImage: '../assets/images/statement-collection.webp',
      desktopImage2x: '../assets/images/statement-collection@2x.webp',
      fallbackImage: '../assets/images/statement-collection.jpg',
      fallbackImage2x: '../assets/images/statement-collection@2x.jpg',
    }
  }
]

const html = document.querySelector('html')

const bestSellersCategories = document.querySelector('.best-sellers__categories')
const bestSellersCard = document.querySelector('.best-sellers__card')

const bestSellersModalContainer = document.querySelector('.best-sellers__modal-container')
const backdrop = document.querySelector('.backdrop')

const modalContent = document.querySelector('.modal__content')

const PRODUCT_ICONS = '../assets/icons/product-icons.svg'

function renderCategories() {
  bestSellersCategories.innerHTML = cards.map(item => `
    <li class="best-sellers__category category">
      <button class="category__button" data-id="${item.id}" onclick="displayCard(event)">
        <h3 class="category__title">${item.categoryName}</h3>
        <svg class="category__icon">
          <use href="${PRODUCT_ICONS}#arrow"></use>
        </svg>
      </button>
    </li>
    `).join('')
}

function renderCard(cardData) {
  bestSellersCard.innerHTML = `
  <a href="#">
    <picture>
      <source 
        media="(max-width: 352px)"
        srcset="
          ${cardData.mobileImage} 1x,
          ${cardData.mobileImage2x} 2x"
      />
      <source 
        media="(max-width: 991px)"
        srcset="
          ${cardData.tabletImage} 1x,
          ${cardData.tabletImage2x} 2x"
      />

      <source 
        media="(min-width: 992px)"
        srcset="
          ${cardData.desktopImage} 1x,
          ${cardData.desktopImage2x} 2x"
      />
      <img
        class="card__image"
        src="${cardData.fallbackImage}"
        srcset="${cardData.fallbackImage} 1x,
          ${cardData.fallbackImage2x} 2x"
        alt="${cardData.name}"
      />
    </picture>
  </a>
  <div class="card__content">
    <header class="card__header">
      <ul class="card__tags">
        ${renderTags(cardData.tags)}
      </ul>
      <div class="card__actions">
        <button type="button" class="card__button">
          <svg class="card__icon">
            <use href="${PRODUCT_ICONS}#heart"></use>
          </svg>
        </button>
        <button type="button" class="card__button" onclick="openBestSellersModal('${cardData.name}')">
          <svg class="card__icon">
            <use href="${PRODUCT_ICONS}#eye"></use>
          </svg>
        </button>
      </div>
    </header>
    <footer class="card__footer">
      <a href="#" class="card__name">${cardData.name}</a>
      <div class="card__prices">
        <p class="card__price">${cardData.newPrice}</p>
        <del class="card__price card__price--old">${cardData.oldPrice}</del>
      </div>
    </footer>
  </div>
  `
}

function renderTags(tags) {
  return tags.map(tag => `
      <li class="card__tag ${tag.toLowerCase() === 'sale' ? 'card__tag--sale' : ''}">${tag}</li>
    `).join('')
}

function displayCard(event) {
  const button = event.target.closest('.category__button')

  const categoryButtons = document.querySelectorAll('.category__button')
  categoryButtons.forEach(btn => {
    btn.classList.remove('category__button--active')
  })

  button.classList.add('category__button--active')
  const cardId = button.dataset.id

  const cardData = cards.find(card => card.id === Number(cardId))
  renderCard(cardData.cardData)
}


function openBestSellersModal(productName) {
  renderModalContent(productName)
  bestSellersModalContainer.classList.add('open-modal')
  backdrop.classList.add('open-backdrop')
  html.classList.add('scroll-lock')

}

function closeBestSellersModal() {
  bestSellersModalContainer.classList.remove('open-modal')
  backdrop.classList.remove('open-backdrop')
  html.classList.remove('scroll-lock')
}

function renderModalContent(name) {
  modalContent.innerHTML = `
    <p class="modal__info"><strong>${name}</strong> has been added to the your cart.</p>
  `
}

function activateFirstCategory() {
  const firstButton = document.querySelector('.category__button')
  if (!firstButton) return

  firstButton.classList.add('category__button--active')
}

renderCategories()
activateFirstCategory()
renderCard(cards[0].cardData)


