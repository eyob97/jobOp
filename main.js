
document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.menu-link');

  function setActiveLink() {
    const currentHash = window.location.hash || "#home";
    links.forEach(link => {
      if (link.getAttribute('href') === currentHash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  setActiveLink();

  links.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });

        history.pushState(null, null, targetId);
      }

      setActiveLink();
    });
  });

  window.addEventListener('hashchange', setActiveLink);
});
