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


// const reviewsContainer = document.getElementById('reviews-container');
// const reviewForm = document.getElementById('review-form');
// const reviewName = document.getElementById('review-name');
// const reviewInput = document.getElementById('review-input');

// // Загрузка отзывов с сервера
// const loadReviews = async () => {
//     try {
//         const response = await fetch('/reviews');
//         const reviews = await response.json();
//         reviews.forEach(({ name, review }) => addReviewToPage(name, review));
//     } catch (error) {
//         console.error('Ошибка загрузки отзывов:', error);
//     }
// };

// // Добавление отзыва на страницу
// const addReviewToPage = (name, review) => {
//     const reviewItem = document.createElement('div');
//     reviewItem.className = 'review-item';
//     reviewItem.innerHTML = `
//         <p><strong>${name}</strong></p>
//         <p>${review}</p>
//     `;
//     reviewsContainer.appendChild(reviewItem);
// };

// // Отправка нового отзыва
// reviewForm.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const name = reviewName.value.trim();
//     const review = reviewInput.value.trim();

//     if (!name || !review) return;

//     const newReview = { name, review };

//     try {
//         const response = await fetch('/reviews', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(newReview),
//         });

//         if (response.ok) {
//             addReviewToPage(name, review);
//             reviewName.value = '';
//             reviewInput.value = '';
//         }
//     } catch (error) {
//         console.error('Ошибка отправки отзыва:', error);
//     }
// });

// // Загрузка отзывов при загрузке страницы
// document.addEventListener('DOMContentLoaded', loadReviews);

document.addEventListener('DOMContentLoaded', () => {
    const reviewsContainer = document.getElementById('reviews-container');

    // Функция для загрузки отзывов с сервера
    async function loadReviews() {
        try {
            const response = await fetch('/reviews');
            if (response.ok) {
                const reviews = await response.json();
                reviews.forEach(({ name, review }) => {
                    addReviewToPage(name, review);
                });
            }
        } catch (error) {
            console.error('Ошибка загрузки отзывов:', error);
        }
    }

    // Функция для добавления отзыва на страницу
    function addReviewToPage(name, review) {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        reviewItem.innerHTML = `
            <p><strong>${name}</strong></p>
            <p>${review}</p>
        `;
        reviewsContainer.appendChild(reviewItem);
    }

    // Обработка формы отправки отзыва
    document.getElementById('review-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const reviewData = {
            name: formData.get('name'),
            email: formData.get('email'),
            review: formData.get('review')
        };

        try {
            const response = await fetch('/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData)
            });

            if (response.ok) {
                document.getElementById('form-message').style.display = 'block';
                addReviewToPage(reviewData.name, reviewData.review);
                e.target.reset(); // очищаем форму после успешной отправки
            }
        } catch (error) {
            console.error('Ошибка отправки отзыва:', error);
        }
    });

    // Загрузка отзывов при загрузке страницы
    loadReviews();
});

