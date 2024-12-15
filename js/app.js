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
        popup.style.opacity = "1";
        popup.style.visibility = "visible";
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
