// Navigation highlighting is optional; all content and links work without JavaScript.
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.site-header nav a[href^="#"]')];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of links) {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
  }, { rootMargin: '-10% 0px -60% 0px', threshold: 0 });
  document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
}

// A paper's optional data-image controls its figure. Missing or failed images
// leave the original text-only article intact.
let figureViewer;
let viewerImage;
let viewerTitle;
let lastFigureLink;

function openFigure(event, link, image, title) {
  if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  if (!('HTMLDialogElement' in window) || typeof HTMLDialogElement.prototype.showModal !== 'function') return;
  event.preventDefault();

  if (!figureViewer) {
    figureViewer = document.createElement('dialog');
    figureViewer.className = 'figure-viewer';
    figureViewer.setAttribute('aria-labelledby', 'figure-viewer-title');
    const toolbar = document.createElement('div');
    toolbar.className = 'viewer-toolbar';
    viewerTitle = document.createElement('p');
    viewerTitle.id = 'figure-viewer-title';
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'viewer-close';
    close.setAttribute('aria-label', 'Close figure');
    close.textContent = '×';
    close.addEventListener('click', () => figureViewer.close());
    toolbar.append(viewerTitle, close);
    viewerImage = document.createElement('img');
    figureViewer.append(toolbar, viewerImage);
    document.body.append(figureViewer);

    figureViewer.addEventListener('click', click => {
      const bounds = figureViewer.getBoundingClientRect();
      if (click.target === figureViewer && (
        click.clientX < bounds.left || click.clientX > bounds.right ||
        click.clientY < bounds.top || click.clientY > bounds.bottom
      )) figureViewer.close();
    });
    figureViewer.addEventListener('close', () => {
      document.body.classList.remove('figure-is-open');
      viewerImage.removeAttribute('src');
      lastFigureLink?.focus({ preventScroll: true });
    });
  }

  lastFigureLink = link;
  viewerTitle.textContent = title;
  viewerImage.src = image.src;
  viewerImage.alt = image.alt;
  figureViewer.showModal();
  document.body.classList.add('figure-is-open');
}

for (const paper of document.querySelectorAll('.publication')) {
  const source = paper.dataset.image?.trim();
  if (!source) continue;

  const title = paper.querySelector('.publication-body h3')?.textContent.trim() || 'Research figure';
  const figure = document.createElement('figure');
  figure.className = 'publication-figure';
  const link = document.createElement('a');
  link.className = 'figure-link';
  link.href = source;
  link.target = '_blank';
  link.rel = 'noopener';
  link.setAttribute('aria-label', `Enlarge figure: ${title}`);
  link.title = 'Enlarge figure';
  const image = document.createElement('img');
  image.alt = paper.dataset.imageAlt?.trim() || `Research figure for ${title}`;
  image.loading = 'lazy';
  image.decoding = 'async';
  const zoom = document.createElement('span');
  zoom.className = 'figure-zoom';
  zoom.setAttribute('aria-hidden', 'true');
  zoom.textContent = '↗';
  link.append(image, zoom);
  figure.append(link);
  paper.prepend(figure);
  paper.classList.add('has-image');

  if (paper.dataset.imageLayout === 'wide') paper.classList.add('has-wide-image');
  image.addEventListener('load', () => {
    image.width = image.naturalWidth;
    image.height = image.naturalHeight;
    if (!paper.dataset.imageLayout && image.naturalWidth / image.naturalHeight >= 2.4) {
      paper.classList.add('has-wide-image');
    }
  });
  image.addEventListener('error', () => {
    figure.remove();
    paper.classList.remove('has-image', 'has-wide-image');
  }, { once: true });
  link.addEventListener('click', event => openFigure(event, link, image, title));
  image.src = source;
}
