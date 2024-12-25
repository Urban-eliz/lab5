// Данные об игрушках
const toyData = {
    rafic: {
        title: "Жирафик Рафик",
        description: "Этого жирафика я подарила на рождение моей племянницы. А сейчас девочка подрастает и с радостью играется с ним.",
        image: "img/gir.jpg",
    },
    dino: {
        title: "Цветочный Дино",
        description: "Это моя первая игрушка, схему которой составляла я сама.",
        image: "img/dino.jpg",
    },
    duck: {
        title: "Модная уточка",
        description: "Игрушка является моей последней работой. Уточка связана с любовью в подарок моей соседке. Она была очень рада.",
        image: "img/ut.jpg",
    },
};

// Показать всплывающее окно
function showDetails(toyId) {
    const popup = document.getElementById("popup");
    const toy = toyData[toyId];

    if (toy) {
        document.getElementById("popup-title").textContent = toy.title;
        document.getElementById("popup-description").textContent = toy.description;
        document.getElementById("popup-image").src = toy.image;

        popup.classList.remove("hidden");
        popup.style.opacity = "1"; // прозрачность
        popup.style.visibility = "visible"; // отображение окна
    }
}

// Скрыть всплывающее окно
function hideDetails() {
    const popup = document.getElementById("popup");
    popup.style.opacity = "0";
    popup.style.visibility = "hidden";
    setTimeout(() => {
        popup.classList.add("hidden");
    }, 300); // Задержка для завершения анимации
}



document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('.main-nav');

    burgerMenu.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
});


const reviewsContainer = document.getElementById('reviews-container');
const reviewForm = document.getElementById('review-form');
const reviewName = document.getElementById('review-name');
const reviewInput = document.getElementById('review-input');

const LOCAL_STORAGE_KEY = 'reviews'; // Ключ для хранения отзывов в LocalStorage

// Загрузка отзывов из LocalStorage
const loadReviews = () => {
    const reviews = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    reviews.forEach((review) => addReviewToPage(review));
};

// Добавление отзыва на страницу
const addReviewToPage = ({ name, text }) => {
    const reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';
    reviewItem.innerHTML = `
        <p><strong>${name}</strong></p>
        <p>${text}</p>
    `;
    reviewsContainer.appendChild(reviewItem);
};

// Сохранение отзыва в LocalStorage
const saveReview = (review) => {
    const reviews = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    reviews.push(review);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reviews));
};

// Обработчик отправки формы
reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Останавливаем стандартное поведение формы

    const name = reviewName.value.trim();
    const text = reviewInput.value.trim();

    if (name && text) {
        const review = { name, text };

        // Добавляем отзыв на страницу
        addReviewToPage(review);

        // Сохраняем отзыв в LocalStorage
        saveReview(review);

        // Отправляем данные на getform.io
        try {
            const formData = new FormData(reviewForm);
            await fetch(reviewForm.action, {
                method: 'POST',
                body: formData,
            });
        } catch (error) {
            console.error('Ошибка отправки на getform.io:', error);
        }

        // Очищаем поля формы
        reviewName.value = '';
        reviewInput.value = '';
        document.getElementById('review-email').value = '';
    }
});

// Загрузка отзывов при старте страницы
document.addEventListener('DOMContentLoaded', loadReviews);
