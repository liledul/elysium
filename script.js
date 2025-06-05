document.addEventListener("DOMContentLoaded", function () {
  // Improved mobile menu toggle with better handling
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("active");

      // Prevent body scrolling when menu is open
      if (navLinks.classList.contains("active")) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "";
      }
    });

    // Close mobile menu when clicking on a nav link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
        body.style.overflow = "";
      });
    });

    // Close mobile menu when clicking anywhere outside
    document.addEventListener("click", function (e) {
      if (
        !menuToggle.contains(e.target) &&
        !navLinks.contains(e.target) &&
        navLinks.classList.contains("active")
      ) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
        body.style.overflow = "";
      }
    });
  }

  // Initialize Three.js animations for each section
  const initSectionAnimations = () => {
    // Setup canvas backgrounds for key sections
    setupServicesCanvas();
    setupPhilosophyCanvas();
    setupHelixAnimation();
  };

  // Helper function for services canvas
  const setupServicesCanvas = () => {
    const canvas = document.getElementById("services-canvas");
    if (!canvas) return;

    createServiceParticles(canvas);
  };

  // Helper function for philosophy canvas
  const setupPhilosophyCanvas = () => {
    const canvas = document.getElementById("philosophy-canvas");
    if (!canvas) return;

    createInsightParticles(canvas);
  };

  // Function to setup the helix animation container
  const setupHelixAnimation = () => {
    const container = document.getElementById("helix-container");
    if (!container) {
      console.error("Helix container not found!");
      return;
    }
    createHelixAnimation(container);
  };

  // Function to create the new helix animation
  const createHelixAnimation = (container) => {
    const canvas = document.createElement("canvas");
    canvas.id = "helix-canvas";
    container.appendChild(canvas);

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15); // Positioned to view the helix

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Transparent background

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 3, 2);
    scene.add(directionalLight);

    // Helix Geometry (using TubeGeometry for thickness)
    class CustomHelixCurve extends THREE.Curve {
      constructor(scale = 1, turns = 2, height = 10, radius = 3) {
        super();
        this.scale = scale;
        this.turns = turns;
        this.height = height;
        this.radius = radius;
      }

      getPoint(t, optionalTarget = new THREE.Vector3()) {
        const angle = 2 * Math.PI * this.turns * t;
        const x = this.radius * Math.cos(angle);
        const y = this.height * (t - 0.5);
        const z = this.radius * Math.sin(angle);
        return optionalTarget.set(x, y, z).multiplyScalar(this.scale);
      }
    }

    const path = new CustomHelixCurve(1, 2.5, 12, 4); // Adjust turns, height, radius as needed
    const tubularSegments = 200;
    const tubeRadius = 0.1;
    const radialSegments = 8;
    const closed = false;
    const tubeGeometry = new THREE.TubeGeometry(
      path,
      tubularSegments,
      tubeRadius,
      radialSegments,
      closed
    );

    // Helix Material (Gold)
    const helixMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4b982, // Gold color
      metalness: 0.6,
      roughness: 0.4,
    });
    const helixMesh = new THREE.Mesh(tubeGeometry, helixMaterial);
    scene.add(helixMesh);

    // Particle System (Flowing along helix)
    const particleCount = 300;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleData = []; // Store t-value and speed for each particle

    for (let i = 0; i < particleCount; i++) {
      const t = Math.random();
      const point = path.getPoint(t);
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
      particleData.push({ t: t, speed: 0.01 + Math.random() * 0.02 });
    }
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x8b381e, // Primary color
      size: 0.15,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Resize Handler
    function onWindowResize() {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener("resize", onWindowResize);
    onWindowResize(); // Set initial size

    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);

      const time = performance.now() * 0.0005;

      // Rotate helix
      helixMesh.rotation.y = time * 0.3;
      particles.rotation.y = time * 0.3;

      // Animate particles along the curve
      const currentPositions = particleGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        particleData[i].t += particleData[i].speed;
        if (particleData[i].t > 1) {
          particleData[i].t = 0; // Loop back to the start
        }
        const point = path.getPoint(particleData[i].t);
        currentPositions[i * 3] = point.x;
        currentPositions[i * 3 + 1] = point.y;
        currentPositions[i * 3 + 2] = point.z;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }
    animate();
  };

  // Service section particles (gold particles flowing in a circle) - FURTHER REFINED
  const createServiceParticles = (canvas) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xfffcf7, 0);

    // Create particles - FURTHER REDUCED COUNT
    const particlesCount = 50; // Further reduced from 80
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesPositions = new Float32Array(particlesCount * 3);

    // Create an even more elegant, minimal spiral pattern
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      const angle = (i / particlesCount) * Math.PI * 6; // Reduced spiral density
      const radiusGrowth = (i / particlesCount) * 2;
      const radius = 0.5 + radiusGrowth * 0.8; // Slightly compressed spiral

      particlesPositions[i3] = Math.cos(angle) * radius;
      particlesPositions[i3 + 1] = Math.sin(angle) * radius * 0.4; // Flatter ellipse
      particlesPositions[i3 + 2] = (Math.random() - 0.5) * 0.02; // Further reduced randomness
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlesPositions, 3)
    );

    // Gold particle material - MORE SUBTLE
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xd4b982,
      size: 0.02, // Smaller particles
      transparent: true,
      opacity: 0.4, // Further reduced opacity
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation - EVEN SLOWER ROTATION
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.z += 0.0003; // Further reduced from 0.0005
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  };

  // Why Us section (connected network) - REFINED FOR ELEGANCE
  const createInsightParticles = (canvas) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xfffcf7, 0);

    // Create stationary nodes - FURTHER REDUCED COUNT
    const nodesCount = 12; // Further reduced from 20
    const nodesGeometry = new THREE.BufferGeometry();
    const nodesPositions = new Float32Array(nodesCount * 3);
    const nodesMaterial = new THREE.PointsMaterial({
      color: 0xd4b982,
      size: 0.06, // Smaller size
      transparent: true,
      opacity: 0.6, // Further reduced
      blending: THREE.AdditiveBlending,
    });

    // Define main nodes in a more structured pattern
    for (let i = 0; i < nodesCount; i++) {
      const i3 = i * 3;
      // Create a more structured, intentional arrangement
      const angle = (i / nodesCount) * Math.PI * 2;
      // Place nodes in spiral with central node
      const radius = i === 0 ? 0 : 1.5 + (i / nodesCount) * 1.5;

      nodesPositions[i3] = Math.cos(angle) * radius;
      nodesPositions[i3 + 1] = Math.sin(angle) * radius * 0.6; // Flatter ellipse
      nodesPositions[i3 + 2] = 0;
    }

    nodesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(nodesPositions, 3)
    );

    const nodes = new THREE.Points(nodesGeometry, nodesMaterial);
    scene.add(nodes);

    // Lines connecting nodes - SIMPLIFIED
    const connectionsMaterial = new THREE.LineBasicMaterial({
      color: 0xd4b982,
      transparent: true,
      opacity: 0.15, // Very subtle connections
    });

    const connectionsGeometry = new THREE.BufferGeometry();
    const connections = new THREE.LineSegments(
      connectionsGeometry,
      connectionsMaterial
    );
    scene.add(connections);

    // Update connections between nodes
    const updateConnections = () => {
      const positions = nodesGeometry.attributes.position.array;
      // Only connect major nodes to minor nodes, with max 3 connections per node
      const indices = [];

      // Connect central node to all outer nodes
      for (let i = 1; i < nodesCount; i++) {
        indices.push(0, i);
      }

      // Connect some outer nodes to each other (but not all - keeps it cleaner)
      for (let i = 1; i < nodesCount; i++) {
        // Connect each outer node to at most 2 neighbors
        const next = (i % (nodesCount - 1)) + 1;
        const next2 = ((i + 1) % (nodesCount - 1)) + 1;
        if (i !== next) indices.push(i, next);
        if (i !== next2 && next !== next2 && Math.random() > 0.5)
          indices.push(i, next2);
      }

      connectionsGeometry.setIndex(indices);
      connectionsGeometry.setAttribute(
        "position",
        nodesGeometry.attributes.position
      );
      connectionsGeometry.attributes.position.needsUpdate = true;
    };

    updateConnections();

    // Animation - SLOWER, MORE SUBTLE
    const animate = () => {
      requestAnimationFrame(animate);

      const time = performance.now() * 0.0003; // Further reduced timing
      const positions = nodesGeometry.attributes.position.array;

      // Add very subtle movement to nodes
      for (let i = 0; i < nodesCount; i++) {
        const i3 = i * 3;
        if (i > 0) {
          // Keep central node stable
          const angle = (i / nodesCount) * Math.PI * 2;
          const radius = 1.5 + (i / nodesCount) * 1.5;
          const offset = time + i;

          // Apply subtle oscillation to position
          positions[i3] =
            Math.cos(angle + Math.sin(offset * 0.2) * 0.1) * radius; // Further reduced movement
          positions[i3 + 1] =
            Math.sin(angle + Math.sin(offset * 0.2) * 0.1) * radius * 0.6;
        }
      }

      nodesGeometry.attributes.position.needsUpdate = true;
      connections.rotation.z = Math.sin(time * 0.1) * 0.02; // Extremely subtle rotation

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  };

  // Initialize any new elements
  const founderImage = document.querySelector(".founder-image-combined");
  if (founderImage) {
    founderImage.addEventListener("mouseenter", function () {
      this.classList.add("hover-pulse");
    });

    founderImage.addEventListener("mouseleave", function () {
      this.classList.remove("hover-pulse");
    });
  }

  // Improved smooth scroll for navigation links with better offset handling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Close mobile menu if open
      if (navLinks && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
      }

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Adjust offset based on viewport size for better mobile experience
        let offset = 90;
        if (window.innerWidth <= 768) offset = 70;
        if (window.innerWidth <= 480) offset = 60;

        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: "smooth",
        });
      }
    });
  });

  // Header scroll behavior with improved handling
  let lastScrollTop = 0;
  const header = document.querySelector("header");

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    // Header opacity based on scroll - more refined
    if (header) {
      const opacity = Math.min(0.98, 0.92 + scrollY * 0.0003); // More subtle change
      header.style.backgroundColor = `rgba(255, 252, 247, ${opacity})`;

      // Only hide header when scrolling down significantly and not near the top
      if (currentScrollTop > lastScrollTop && currentScrollTop > 150) {
        header.classList.add("hidden");
      } else {
        header.classList.remove("hidden");
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    }

    // Hero background parallax and fade effect
    const hero = document.getElementById("hero");
    if (hero && scrollY < window.innerHeight) {
      const heroBg = hero.querySelector(":before") || hero; // Fallback to hero if :before can't be selected
      const heroOpacity = Math.max(0.2, 0.45 - scrollY * 0.0004); // Start fading from 0.45 but maintain minimum 0.2 opacity
      hero.style.setProperty("--hero-bg-opacity", heroOpacity);
    }

    // Better parallax effect for hero pattern
    const heroPattern = document.querySelector(".hero-pattern");
    if (heroPattern && scrollY < window.innerHeight) {
      const parallaxSpeed = window.innerWidth <= 768 ? 0.3 : 0.4; // Less intense on mobile
      heroPattern.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
    }

    // Improved reveal animations for gold accents
    document.querySelectorAll(".gold-line").forEach((line) => {
      const rect = line.getBoundingClientRect();
      const viewportThreshold = window.innerWidth <= 768 ? 0.75 : 0.85; // Trigger earlier on mobile
      if (rect.top < window.innerHeight * viewportThreshold) {
        line.style.width = "120px";
        line.style.opacity = "1";
      }
    });
  });

  // Improved intersection observer for better mobile responsiveness
  const handleScrollAnimations = () => {
    const sections = document.querySelectorAll("section");

    // Different thresholds for different viewport sizes
    const getThreshold = () => {
      if (window.innerWidth <= 480) return 0.1;
      if (window.innerWidth <= 768) return 0.15;
      return 0.2;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: getThreshold() }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    // Update observer threshold on resize
    window.addEventListener("resize", () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });

      const newObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold: getThreshold() }
      );

      sections.forEach((section) => {
        newObserver.observe(section);
      });
    });
  };

  // Diversification chart
  const renderDiversificationChart = () => {
    const ctx = document.getElementById("diversification-chart");

    if (!ctx) return;

    // Generate data for the curve showing how risk decreases as position count increases
    const labels = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);
    const riskData = labels.map((x) => 100 / Math.sqrt(x));

    // Create gradient
    const chartContext = ctx.getContext("2d");
    const gradient = chartContext.createLinearGradient(0, 0, 0, 350);
    gradient.addColorStop(0, "rgba(139, 56, 30, 0.2)");
    gradient.addColorStop(1, "rgba(139, 56, 30, 0)");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Portfolio Risk",
            data: riskData,
            borderColor: "#8B381E",
            backgroundColor: gradient,
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            pointBackgroundColor: "#FFFFFF",
            pointBorderColor: "#8B381E",
            pointBorderWidth: 1.5,
            pointRadius: 4,
            // Add animation
            animation: {
              duration: 2000,
              easing: "easeOutQuart",
            },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: "Number of Positions",
              font: {
                family: "'EB Garamond', serif",
                size: 14,
              },
              padding: {
                top: 10,
              },
            },
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              font: {
                family: "'Inter', sans-serif",
                size: 12,
              },
            },
          },
          y: {
            title: {
              display: true,
              text: "Portfolio Risk (%)",
              font: {
                family: "'EB Garamond', serif",
                size: 14,
              },
            },
            min: 0,
            max: 100,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
              drawBorder: false,
            },
            ticks: {
              font: {
                family: "'Inter', sans-serif",
                size: 12,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            titleColor: "#262626",
            bodyColor: "#8B381E",
            titleFont: {
              family: "'EB Garamond', serif",
              size: 14,
            },
            bodyFont: {
              family: "'Inter', sans-serif",
              size: 13,
            },
            padding: 12,
            borderColor: "rgba(139, 56, 30, 0.1)",
            borderWidth: 1,
            displayColors: false,
            callbacks: {
              title: function (context) {
                return `${context[0].label} Positions`;
              },
              label: function (context) {
                return `Risk: ${context.raw.toFixed(1)}%`;
              },
            },
          },
        },
      },
    });
  };

  // Improved mobile-focused animations and styles
  const addGlobalAnimations = () => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      /* Reduced spacing between sections */
      section {
        padding: 7rem 0;
      }
      
      section .container {
        padding: 3.5rem 2rem;
      }
      
      /* Mobile adjustments */
      @media (max-width: 992px) {
        section {
          padding: 5rem 0;
        }
        
        section .container {
          padding: 3rem 1.5rem;
        }
        
        /* Fix global presence card alignment */
        .global-presence {
          margin: var(--spacing-xl) auto 0;
          width: 90%;
        }
      }
      
      @media (max-width: 768px) {
        section {
          padding: 4rem 0;
        }
        
        section .container {
          padding: 2.5rem 1rem;
        }
        
        /* Better mobile card alignment */
        .services-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-md);
        }
        
        .service-card {
          width: 100%;
          max-width: 450px;
        }
        
        /* Fix contact container alignment */
        .contact-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-lg);
        }
        
        .contact-info, .contact-form-container {
          width: 100%;
          max-width: 500px;
        }
      }
      
      @media (max-width: 480px) {
        section {
          padding: 3rem 0;
        }
        
        section .container {
          padding: 2rem 1rem;
        }
      }
      
      /* World map container styling */
      .world-map {
        width: 100%;
        height: 300px;
        position: relative;
        margin: var(--spacing-md) 0 var(--spacing-lg);
        background: transparent;
      }
      
      #world-map-canvas {
        width: 100%;
        height: 100%;
        display: block;
      }
      
      /* Smooth transition logo */
      .transition-logo {
        position: fixed;
        z-index: 2000;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: opacity 0.5s ease;
      }
      
      .section-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        opacity: 0;
        transition: opacity 1s ease;
      }
            
      .visible .section-canvas {
        opacity: 1;
      }
            
      @keyframes btnHighlight {
        0% { box-shadow: 0 0 0 0 rgba(139, 56, 30, 0.4); }
        70% { box-shadow: 0 0 0 15px rgba(139, 56, 30, 0); }
        100% { box-shadow: 0 0 0 0 rgba(139, 56, 30, 0); }
      }
            
      .btn-highlight {
        animation: btnHighlight 0.7s ease-out;
      }
            
      @keyframes thumbPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
      }
            
      .thumb-pulse::-webkit-slider-thumb {
        animation: thumbPulse 0.4s ease-out;
      }
            
      @keyframes activeInput {
        0% { box-shadow: 0 0 0 0 rgba(139, 56, 30, 0.2); }
        70% { box-shadow: 0 0 0 8px rgba(139, 56, 30, 0); }
        100% { box-shadow: 0 0 0 0 rgba(139, 56, 30, 0); }
      }
            
      .active-input {
        animation: activeInput 0.5s ease-out;
      }
            
      @keyframes hoverPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
            
      .hover-pulse {
        animation: hoverPulse 0.8s infinite alternate ease-in-out;
      }
            
      .button-ripple {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: var(--border-radius);
        transform: scale(0);
        animation: ripple 0.6s linear;
        transform-origin: center;
      }
            
      @keyframes ripple {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
            
      .label-focus {
        color: var(--primary) !important;
        transform: translateY(-3px) scale(0.9);
        transform-origin: left;
        transition: transform 0.3s ease, color 0.3s ease;
      }
      
      /* Loading transition improvements */
      #loading-screen {
        transition: background-color 1.2s ease;
      }
      
      .loader-logo, .loader-content {
        transition: opacity 0.8s ease;
      }
    `;

    document.head.appendChild(styleSheet);
  };

  // Form submission handling with enhanced animations
  const handleFormSubmission = () => {
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Validate form
        const formValid = this.checkValidity();
        if (!formValid) {
          this.reportValidity();
          return;
        }

        // Add loading state to button with ripple effect
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.innerHTML =
          '<span class="loading-indicator"></span> Sending...';
        submitButton.disabled = true;

        // Create ripple effect
        const ripple = document.createElement("span");
        ripple.classList.add("button-ripple");
        submitButton.appendChild(ripple);

        // Get form data
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());

        // Simulate server delay with sophisticated success animation
        setTimeout(() => {
          // Remove form with fade-out
          contactForm.style.opacity = 0;
          contactForm.style.transform = "translateY(20px)";

          // Replace form with success message after fade-out
          setTimeout(() => {
            contactForm.innerHTML = `
              <div class="form-success">
                <h3>Request Received</h3>
                <p>Thank you for your inquiry. We will review your request and contact you discreetly to arrange a private consultation.</p>
              </div>
            `;

            // Fade in success message
            contactForm.style.opacity = 1;
            contactForm.style.transform = "translateY(0)";

            // Log form data to console (for demo purposes)
            console.log("Form submitted:", formValues);
          }, 400);
        }, 1500);
      });

      // Add focus animations to inputs
      contactForm
        .querySelectorAll("input, textarea, select")
        .forEach((input) => {
          // Label animation on focus
          input.addEventListener("focus", () => {
            const label = input.previousElementSibling;
            if (label && label.tagName === "LABEL") {
              label.classList.add("label-focus");
            }
          });

          input.addEventListener("blur", () => {
            const label = input.previousElementSibling;
            if (label && label.tagName === "LABEL") {
              if (!input.value) {
                label.classList.remove("label-focus");
              }
            }
          });

          // If input already has value (e.g. on page reload)
          if (input.value) {
            const label = input.previousElementSibling;
            if (label && label.tagName === "LABEL") {
              label.classList.add("label-focus");
            }
          }
        });
    }
  };

  // Language Switcher Logic
  const langSwitcherOptions = document.querySelectorAll(
    ".lang-switcher .lang-option"
  );
  const translatableElements = document.querySelectorAll(
    "[data-en], [data-lt]"
  );

  const setLanguage = (lang) => {
    translatableElements.forEach((el) => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        if (el.tagName === "TITLE") {
          document.title = text;
        } else if (
          el.hasAttribute("placeholder") &&
          el.getAttribute(`data-${lang}-placeholder`)
        ) {
          el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
        } else if (
          el.hasAttribute("value") &&
          el.tagName === "INPUT" &&
          el.getAttribute(`data-${lang}-value`)
        ) {
          el.value = el.getAttribute(`data-${lang}-value`);
        } else {
          el.textContent = text;
        }
      }
    });

    langSwitcherOptions.forEach((opt) => {
      opt.classList.remove("active");
      if (opt.getAttribute("data-lang") === lang) {
        opt.classList.add("active");
      }
    });
    localStorage.setItem("language", lang);
    document.documentElement.setAttribute("lang", lang);
  };

  langSwitcherOptions.forEach((option) => {
    option.addEventListener("click", function (e) {
      e.preventDefault();
      const selectedLang = this.getAttribute("data-lang");
      setLanguage(selectedLang);
    });
  });

  // Load initial language
  const preferredLang = localStorage.getItem("language") || "en";
  setLanguage(preferredLang);

  // Initialize all functions
  initSectionAnimations();
  handleScrollAnimations();
  addGlobalAnimations();
  renderDiversificationChart();
  handleFormSubmission();

  // Add scroll indicator interaction
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const offset =
        window.innerWidth <= 768
          ? window.innerHeight * 0.9
          : window.innerHeight;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    });
  }

  // Ensure proper resize handling for all elements
  window.addEventListener("resize", () => {
    // Update canvas animations
    const canvases = document.querySelectorAll("canvas");
    canvases.forEach((canvas) => {
      if (
        canvas.width !== window.innerWidth ||
        canvas.height !== window.innerHeight
      ) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    });
  });
});
