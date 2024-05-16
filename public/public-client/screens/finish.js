function renderFinish() {
    const img = screenFinish.querySelector('#cupcakefinsh');
    img.src = '';

    setTimeout(() => {
        screenFinish.style.display = 'none';
        screenQr.style.display = 'block';
    }, 10000);
}
