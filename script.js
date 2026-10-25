// Core content stays visible even when JavaScript is disabled.
document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});

const filters = [...document.querySelectorAll('[data-filter]')];
const publications = [...document.querySelectorAll('.publication')];
const publicationCount = document.querySelector('#publication-count');

// Keep filter totals accurate when publications are added or removed.
filters.forEach(button => {
  const kind = button.dataset.filter;
  const count = publications.filter(paper => kind === 'all' || paper.dataset.type === kind).length;
  button.querySelector('span').textContent = String(count);
  button.addEventListener('click', () => {
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    publications.forEach(paper => { paper.hidden = kind !== 'all' && paper.dataset.type !== kind; });
    publicationCount.textContent = `Showing ${count} ${kind === 'all' ? 'total' : kind} publications.`;
  });
});
publicationCount.textContent = `Showing all ${publications.length} publications.`;

// Highlight the section currently in view without changing browser history.
if ('IntersectionObserver' in window) {
  const sectionLinks = [...navigation.querySelectorAll('a[href^="#"]')];
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach(link => {
        if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('#about, #research, #publications, #background').forEach(section => sectionObserver.observe(section));
}
