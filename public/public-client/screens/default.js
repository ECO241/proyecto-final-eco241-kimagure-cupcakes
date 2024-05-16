function defaultHandler(letter) {
    if (letter === 'z') {
        screenDefault.style.display = 'none';
        screenStart.style.display = 'block';
        return 'start';
    }
    return 'default';
}
