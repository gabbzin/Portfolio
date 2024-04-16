var menu = document.querySelector('.menu-links')

// Função para abrir o menu
function clicarMenu(){
    if (menu.style.display == 'none'){
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}