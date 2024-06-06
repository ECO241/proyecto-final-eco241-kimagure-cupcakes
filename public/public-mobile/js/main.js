const PORT = 'https://a8d0-200-3-193-228.ngrok-free.app';

document.addEventListener('touchstart', () => {}, { passive: true });
document.addEventListener('touchmove', () => {}, { passive: true });

$(document).ready(() => {
    // Inicializa el carrusel principal
    $('#carousel').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        dotsClass: 'slick-dots',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    });

    // Obtén los datos de la API y genera el HTML dinámico
    async function loadCarousel() {
        try {
            const response = await fetch(`${PORT}/coupon/carousel}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            let carouselContent = '';
            data.forEach((item) => {
                carouselContent += `
                    <div>
                        <img src="${item.image}" alt="${item.name}">
                        <h2>${item.name}</h2>
                        <p>${item.short_description}</p>
                        <p>${item.price}</p>
                    </div>
                `;
            });

            $('#carousel2').html(carouselContent);

            // Inicializa el segundo carrusel si es necesario
            $('#carousel2').slick({
                autoplay: false,
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: false,
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Carga los datos para el segundo carrusel
    loadCarousel();

    // Obtén los datos de la API y genera el HTML dinámico
    async function loadCarousel2() {
        try {
            const response = await fetch(`${PORT}/coupon/carousel2`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            let carousel2Content = '';
            data.forEach((item) => {
                carousel2Content += `
                    <div>
                        <img src="${item.image}" alt="${item.name}">
                        <h2>${item.name}</h2>
                        <p>${item.short_description}</p>
                        <p>${item.price}</p>
                    </div>
                `;
            });

            $('#carousel3').html(carousel2Content);

            // Inicializa el segundo carrusel si es necesario
            $('#carousel3').slick({
                autoplay: false,
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: false,
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Carga los datos para el segundo carrusel
    loadCarousel2();

    // Obtén los datos de la API y genera el HTML dinámico
    async function loadCarousel3() {
        try {
            const response = await fetch(`${PORT}/coupon/carousel3`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            let carousel3Content = '';
            data.forEach((item) => {
                carousel3Content += `
                    <div>
                        <img src="${item.image}" alt="${item.name}">
                        <h2>${item.name}</h2>
                        <p>${item.short_description}</p>
                        <p>${item.price}</p>
                    </div>
                `;
            });

            $('#carousel4').html(carousel3Content);

            // Inicializa el segundo carrusel si es necesario
            $('#carousel4').slick({
                autoplay: false,
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: false,
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Carga los datos para el segundo carrusel
    loadCarousel3();
});

// Función para obtener el valor de un parámetro de la URL
function getParameterByName(name) {
    const url = window.location.href;
    // eslint-disable-next-line no-param-reassign
    name = name.replace(/[[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Obtener el código del cupón de la URL
const couponCode = getParameterByName('couponCode');

// Mostrar el código del cupón en el div correspondiente
if (couponCode) {
    document.getElementById('code_coupon').innerText = `Your coupon code is: ${couponCode}`;
} else {
    document.getElementById('code_coupon').innerText = 'No coupon code found.';
}
