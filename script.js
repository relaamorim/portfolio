// ===== Script do Portfólio =====

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa ícones do Lucide
  lucide.createIcons();

  // --- Navbar: adiciona fundo ao rolar ---
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  };
  window.addEventListener('scroll', handleScroll);

  // --- Menu mobile: abre e fecha ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Fecha menu ao clicar em um link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // --- Destaca link ativo conforme a seção visível ---
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => item.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }

  // --- Animações ao rolar (Intersection Observer) ---
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Adiciona delay escalonado para elementos irmãos
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        // Para de observar após animar (anima apenas uma vez)
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Aplica delays escalonados nos cards de serviço
  document.querySelectorAll('.services-grid .service-card').forEach((card, i) => {
    card.dataset.delay = i * 100;
  });

  // Aplica delays escalonados em elementos dentro de grids
  document.querySelectorAll('.about-grid .about-card').forEach((card, i) => {
    card.classList.add('animate-on-scroll');
    card.dataset.delay = i * 150;
  });

  // Observa todos os elementos animáveis
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Dispara verificação inicial
  handleScroll();
});
