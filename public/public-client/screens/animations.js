const animations = {
    updown: () => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = '<i class="loader --updown"></i>';
        return div;
    },
    leftright: () => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = '<i class="loader --leftright"></i>';
        return div;
    },
    click: () => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = '<i class="loader --click"></i>';
        return div;
    },
};
