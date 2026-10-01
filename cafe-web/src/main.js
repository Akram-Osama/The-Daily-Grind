const categoryLinks = [...document.querySelectorAll('.category-link')];
const menuSections = categoryLinks
	.map((link) => document.querySelector(link.getAttribute('href')))
	.filter(Boolean);

function setActiveCategory(sectionId) {
	for (const link of categoryLinks) {
		const isActive = link.getAttribute('href') === `#${sectionId}`;
		link.classList.toggle('active', isActive);

		if (isActive) {
			link.setAttribute('aria-current', 'location');
		} else {
			link.removeAttribute('aria-current');
		}
	}
}

for (const link of categoryLinks) {
	link.addEventListener('click', () => {
		setActiveCategory(link.getAttribute('href').slice(1));
	});
}

if ('IntersectionObserver' in window) {
	const sectionObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					setActiveCategory(entry.target.id);
				}
			}
		},
		{ rootMargin: '-30% 0px -60% 0px' },
	);

	for (const section of menuSections) {
		sectionObserver.observe(section);
	}
}
