function defaultHandler(letter) {
    if (letter === 'z') {
        renderQR();
        screenDefault.style.display = 'none';
        screenQr.style.display = 'block';
        return 'start';
    }
    return 'default';
}
