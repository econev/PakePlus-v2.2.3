window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// Оригинальный код для перехвата кликов (оставляем как было, раз внешние ссылки не работают)
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })

// ==========================================
// НОВЫЙ БЛОК: Добавление кнопок навигации
// ==========================================
const createNavButtons = () => {
    // Проверяем, нет ли уже кнопок (чтобы не дублировать)
    if (document.getElementById('custom-app-nav')) return;

    // Создаем контейнер для кнопок
    const navContainer = document.createElement('div');
    navContainer.id = 'custom-app-nav';
    
    // Стилизуем контейнер: фиксируем слева вверху
    // Используем safe-area-inset-top для учета "челки" и статус-бара на современных смартфонах, 
    // и 40px как запасной вариант, если safe-area не поддерживается
    navContainer.style.cssText = `
        position: fixed;
        top: max(env(safe-area-inset-top), 40px);
        left: 10px;
        z-index: 2147483647; /* Максимальный z-index, чтобы всегда быть поверх всего */
        display: flex;
        gap: 8px;
        pointer-events: auto;
    `;

    // Общие стили для кнопок (полупрозрачный темный фон, белые иконки)
    const btnStyle = `
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 18px;
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        cursor: pointer;
        padding: 0;
        margin: 0;
        line-height: 1;
    `;

    // Кнопка "Назад"
    const backBtn = document.createElement('button');
    backBtn.innerHTML = '&#8592;'; // Символ стрелки влево
    backBtn.style.cssText = btnStyle;
    backBtn.onclick = (e) => {
        e.preventDefault();
        window.history.back();
    };

    // Кнопка "Вперед"
    const fwdBtn = document.createElement('button');
    fwdBtn.innerHTML = '&#8594;'; // Символ стрелки вправо
    fwdBtn.style.cssText = btnStyle;
    fwdBtn.onclick = (e) => {
        e.preventDefault();
        window.history.forward();
    };

    // Добавляем кнопки в контейнер, а контейнер на страницу
    navContainer.appendChild(backBtn);
    navContainer.appendChild(fwdBtn);
    document.body.appendChild(navContainer);
};

// Запускаем создание кнопок после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createNavButtons);
} else {
    createNavButtons();
}