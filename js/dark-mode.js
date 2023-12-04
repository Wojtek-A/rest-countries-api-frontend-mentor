const darkModeBtn = document.querySelector('.header__dark-mode-button');
const darkModeIcon = document.querySelector('.header__dark-mode-icon');
const localStorageTheme = localStorage.getItem('theme');
document.querySelector('html').setAttribute('data-theme', localStorageTheme);

const toggleDarkMode = () => {
  const localStorageTheme = localStorage.getItem('theme');

  const calculateSettingAsThemeString = localStorageTheme => {
    if (localStorageTheme !== null) {
      return localStorageTheme;
    }
    return 'light';
  };

  let currentThemeSetting = calculateSettingAsThemeString(localStorageTheme);

  const newTheme = currentThemeSetting === 'dark' ? 'light' : 'dark';

  const changeIcon = newTheme =>
    (darkModeIcon.innerHTML = `<use href="./images/icons.svg#icon-moon-${newTheme}" />`);
  changeIcon(newTheme);

  document.querySelector('html').setAttribute('data-theme', newTheme);

  localStorage.setItem('theme', newTheme);
};

darkModeBtn.addEventListener('click', toggleDarkMode);
