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


/*document.addEventListener('DOMContentLoaded', () => {
    const reviewsContainer = document.getElementById('reviews-container');
    const reviewForm = document.getElementById('review-form');
    const formMessage = document.getElementById('form-message');

    // Загрузка отзывов
async function loadReviews() {
    try {
        const response = await fetch('/reviews');
        const reviews = await response.json();
        reviewsContainer.innerHTML = ''; // очищаем старые отзывы

        reviews.forEach(({ name, review }) => { // email исключен
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            reviewItem.innerHTML = `
                <p><strong>${name}</strong></p>
                <p>${review}</p>
            `;
            reviewsContainer.appendChild(reviewItem);
        });
    } catch (error) {
        console.error('Ошибка загрузки отзывов:', error);
    }
}


    // Обработчик формы
    reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(reviewForm);
        const reviewData = {
            name: formData.get('name'),
            email: formData.get('email'),
            review: formData.get('review'),
        };

        try {
            const response = await fetch('/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData),
            });

            if (response.ok) {
                formMessage.style.display = 'block';
                setTimeout(() => (formMessage.style.display = 'none'), 3000);
                reviewForm.reset(); // Очистка формы
                loadReviews(); // Обновление отзывов
            } else {
                console.error('Ошибка при добавлении отзыва:', await response.json());
            }
        } catch (error) {
            console.error('Ошибка отправки отзыва:', error);
        }
    });

    // Загрузка отзывов при загрузке страницы
    loadReviews();
}); */


document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('review-form');
    const reviewsContainer = document.getElementById('reviews-container');
    const formMessage = document.getElementById('form-message');

    // Отображение закрепленных отзывов
    const staticReviews = [
        { name: 'Анна', review: 'Эти игрушки такие мягкие и милые. Сделаны очень качественно, нигде ничего не торчит, стежки аккуратные. Видно, что автор делал с любовью' },
        { name: 'Иван', review: 'Игрушка замечательная. Дочка получила на день рождения зайчика. Она в полном восторге. Спасибо за такой классный подарок!' },
        { name: 'Мария', review: 'Получить такой подарок на день рождения это круто. мне очень нравится творчество Лизы. Хочется пожелать продолжать творить чудо и нести прекрасное в этот мир' },
    ];

    function renderReviews(reviews) {
        reviewsContainer.innerHTML = '';
        reviews.forEach(({ name, review }) => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            reviewItem.innerHTML = `
                <p><strong>${name}</strong></p>
                <p>${review}</p>
            `;
            reviewsContainer.appendChild(reviewItem);
        });
    }

    // Отобразить предварительно добавленные отзывы
    renderReviews(staticReviews);

    // Отправка отзыва через Getform.io
    document.addEventListener('DOMContentLoaded', () => {
        const feedbackForm = document.getElementById('review-form');
        const formMessage = document.getElementById('form-message');
    
        feedbackForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Остановить стандартное поведение формы
    
            // Отправка данных формы через Fetch API
            fetch('https://getform.io/f/bxoopwla', {
                method: 'POST',
                body: new FormData(feedbackForm),
            })
            .then((response) => {
                if (response.ok) {
                    formMessage.style.display = 'block'; // Показать сообщение об успехе
                    feedbackForm.reset(); // Очистить форму
                    setTimeout(() => {
                        formMessage.style.display = 'none'; // Скрыть сообщение через 3 секунды
                    }, 3000);
                } else {
                    alert('Ошибка при отправке. Попробуйте еще раз.');
                }
            })
            .catch((error) => {
                console.error('Ошибка:', error);
                alert('Не удалось отправить сообщение. Проверьте соединение.');
            });
        });
    });  
    
    
});


