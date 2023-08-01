import './styles.scss';
import './DropImages';

function updateTheme(mediaMatch) {
    if (mediaMatch.matches) {
        document.body.setAttribute("data-bs-theme", "dark")
    } else {
        document.body.setAttribute("data-bs-theme", "light")
    }
}

// Set the theme based on the user's preference
if (window.matchMedia) {
    updateTheme(window.matchMedia('(prefers-color-scheme: dark)'));

    window.matchMedia('(prefers-color-scheme: dark)').addListener(updateTheme);
}



