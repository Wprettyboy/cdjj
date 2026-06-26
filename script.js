(function () {
  const navToggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const navLinks = document.querySelectorAll(".primary-nav a, .mobile-nav a");
  const anchorNavLinks = Array.from(navLinks).filter((link) => {
    const href = link.getAttribute("href") || "";
    return href.startsWith("#");
  });
  const filterButtons = document.querySelectorAll(".filter-tabs button");
  const scenarioCards = document.querySelectorAll(".scenario-card");
  const floatingQQ = document.querySelector(".float-qq");

  function updateFloatingQQ() {
    if (!floatingQQ) return;
    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    floatingQQ.classList.toggle("is-visible", !isMobile || window.scrollY > 620);
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mobileNav.addEventListener("click", (event) => {
      if (event.target.matches("a")) {
        mobileNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      scenarioCards.forEach((card) => {
        const shouldShow = filter === "all" || card.dataset.kind === filter;
        card.classList.toggle("is-hidden", !shouldShow);
      });

      if (window.ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    });
  });

  updateFloatingQQ();
  window.addEventListener("scroll", updateFloatingQQ, { passive: true });
  window.addEventListener("resize", updateFloatingQQ);

  if (!window.gsap || !window.ScrollTrigger) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ duration: 0.72, ease: "power2.out" });

  const mm = gsap.matchMedia();

  mm.add(
    {
      reduceMotion: "(prefers-reduced-motion: reduce)",
      desktop: "(min-width: 900px)",
      mobile: "(max-width: 899px)"
    },
    (context) => {
      const { reduceMotion, desktop } = context.conditions;

      if (reduceMotion) {
        gsap.set(".hero-copy, .hero-visual, .hero-collage-img, .home-service-card, .home-process-panel, .home-advantages-panel, .service-card, .workflow article, .scenario-card, .matrix-card, .process-card, .service-hero-copy, .service-hero-visual, .landing-card-grid article, .step-list article, .answer-panel", {
          clearProps: "all"
        });
        return;
      }

      const heroTimeline = gsap.timeline({
        defaults: { duration: 0.58, ease: "power3.out" }
      });

      heroTimeline
        .from(".site-header", { y: -18, autoAlpha: 0 }, 0)
        .from(".hero-copy h1", { y: 24, autoAlpha: 0 }, 0.12)
        .from(".hero-definition", { y: 18, autoAlpha: 0 }, 0.22)
        .from(".home-value-list span", { y: 18, autoAlpha: 0, stagger: 0.06 }, 0.32)
        .from(".hero-visual", { y: 30, scale: 0.985, autoAlpha: 0 }, 0.1)
        .from(".hero-collage-img", { y: 18, scale: 0.985, autoAlpha: 0 }, 0.26)
        .from(".home-service-card", { y: 20, autoAlpha: 0, stagger: 0.045 }, 0.62)
        .from(".home-process-panel, .home-advantages-panel, .home-faq-panel, .home-deliver-panel", { y: 20, autoAlpha: 0, stagger: 0.06 }, 0.76);

      gsap.from(".service-hero-copy > *", { y: 22, autoAlpha: 0, stagger: 0.08, duration: 0.6 }, 0.14);
      gsap.from(".service-hero-visual", { y: 28, scale: 0.985, autoAlpha: 0, duration: 0.68 }, 0.22);
      gsap.from(".answer-panel", {
        y: 22,
        autoAlpha: 0,
        scrollTrigger: {
          trigger: ".answer-panel",
          start: "top 84%",
          toggleActions: "play none none reverse"
        }
      });

      if (desktop) {
        gsap.to(".hero-collage-img", {
          y: -10,
          delay: 1.2,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          overwrite: "auto"
        });
      }

      ScrollTrigger.batch(".reveal-card", {
        start: "top 82%",
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            y: 36,
            autoAlpha: 0,
            stagger: 0.09,
            overwrite: true
          });
        }
      });

      ScrollTrigger.batch(".landing-card-grid article, .step-list article", {
        start: "top 84%",
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            y: 28,
            autoAlpha: 0,
            stagger: 0.07,
            overwrite: true
          });
        }
      });

      gsap.from(".ai-copy > *", {
        y: 28,
        autoAlpha: 0,
        stagger: 0.09,
        scrollTrigger: {
          trigger: ".ai-section",
          start: "top 72%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.from(".ai-console", {
        x: desktop ? 42 : 0,
        y: desktop ? 0 : 24,
        autoAlpha: 0,
        scrollTrigger: {
          trigger: ".ai-console",
          start: "top 78%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.from(".workflow article", {
        y: 28,
        autoAlpha: 0,
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".workflow",
          start: "top 82%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.from(".scenario-card", {
        y: 30,
        autoAlpha: 0,
        stagger: 0.06,
        scrollTrigger: {
          trigger: ".scenario-grid",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.from(".matrix-card, .process-card", {
        y: 34,
        autoAlpha: 0,
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".strength-grid",
          start: "top 78%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.from(".faq-list details", {
        y: 24,
        autoAlpha: 0,
        stagger: 0.07,
        scrollTrigger: {
          trigger: ".faq-list",
          start: "top 84%",
          toggleActions: "play none none reverse"
        }
      });
    }
  );

  const sections = ["home", "services", "ai-agent", "scenarios", "strength"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onToggle: (self) => {
        if (!self.isActive) return;
        const id = section.getAttribute("id");
        anchorNavLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("is-active", isActive);
        });
      }
    });
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
