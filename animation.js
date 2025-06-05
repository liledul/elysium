// Three.js Animation for Elysium Family Office

// Canvas setup
const canvas = document.getElementById("animation-canvas");
const loadingScreen = document.getElementById("loading-screen");
const loaderLogo = document.querySelector(".loader-logo");
const loaderContent = document.querySelector(".loader-content"); // The div holding loaderLogo etc.

// Create Scene
const scene = new THREE.Scene();

// Create Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Create Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfffcf7, 0.95); // Increased background opacity for cleaner look

// Create Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Reduced intensity
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7); // Reduced intensity
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

let helixGroup, particlesMaterial, accentHelix; // Declare here to be accessible
let originalMaterials = {}; // Declare here

// Create the golden helix - an elegant symbol of growth and wealth management
const createGoldenHelix = () => {
  helixGroup = new THREE.Group(); // Assign to outer scope variable
  scene.add(helixGroup);

  // Create the central line of the helix - ADJUSTED PARAMETERS
  const helixPath = new THREE.CurvePath();
  const helixSegments = 1650;
  const helixRadius = 2.3; // Increased from 1.1
  const helixHeight = 6.5; // Increased from 3.2
  const helixTurns = 3.0;

  // Create line material with gold color - EVEN MORE SUBTLE
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xd4b982, // Gold color
    transparent: true,
    opacity: 0.65, // Further refined opacity
  });

  // Create the helix curve
  const points = [];
  for (let i = 0; i <= helixSegments; i++) {
    const t = i / helixSegments;
    const angle = 2 * Math.PI * helixTurns * t;
    const x = helixRadius * Math.cos(angle);
    const y = helixHeight * (t - 0.5);
    const z = helixRadius * Math.sin(angle);
    points.push(new THREE.Vector3(x, y, z));
  }

  const helixGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const mainHelixLine = new THREE.Line(helixGeometry, lineMaterial);
  helixGroup.add(mainHelixLine);

  // Add particles along the helix - FURTHER REDUCED COUNT
  const particlesCount = 45; // Further reduced from 70
  const particlesGeometryBuffer = new THREE.BufferGeometry();
  const particlesPositions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++) {
    const t = i / particlesCount;
    const angle = 2 * Math.PI * helixTurns * t;
    const x = helixRadius * Math.cos(angle);
    const y = helixHeight * (t - 0.5);
    const z = helixRadius * Math.sin(angle);

    const i3 = i * 3;
    particlesPositions[i3] = x;
    particlesPositions[i3 + 1] = y;
    particlesPositions[i3 + 2] = z;
  }

  particlesGeometryBuffer.setAttribute(
    "position",
    new THREE.BufferAttribute(particlesPositions, 3)
  );

  // Create shader material for particles - FURTHER REFINED
  particlesMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      uniform float uTime;
      
      void main() {
        vec3 newPosition = position;
        
        // Add even more subtle movement to particles
        float offset = uTime * 0.2 + position.y; // Further slowed movement
        newPosition.x += sin(offset) * 0.008; // Further reduced movement
        newPosition.z += cos(offset) * 0.008; // Further reduced movement
        
        vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
        gl_PointSize = 3.5 * (2.0 / -mvPosition.z); // Smaller points
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      void main() {
        float strength = distance(gl_PointCoord, vec2(0.5));
        strength = 1.0 - strength;
        strength = pow(strength, 3.0);
        
        vec3 color = mix(
          vec3(0.83, 0.69, 0.51), // Light gold
          vec3(0.55, 0.22, 0.12), // Dark primary
          strength
        );
        gl_FragColor = vec4(color, strength * 0.7); // Further reduced opacity
      }
    `,
    uniforms: {
      uTime: { value: 0 },
    },
  });

  const particles = new THREE.Points(
    particlesGeometryBuffer,
    particlesMaterial
  );
  helixGroup.add(particles);

  // Create accent smaller helix with primary color - ADJUSTED PARAMETERS
  const accentPoints = [];
  const accentRadius = helixRadius * 0.55; // Increased from 0.5, proportional to new helixRadius
  for (let i = 0; i <= helixSegments / 2; i++) {
    const t = i / (helixSegments / 2);
    const angle = 2 * Math.PI * helixTurns * t + Math.PI / 2;
    const x = accentRadius * Math.cos(angle);
    const y = helixHeight * (t - 0.5);
    const z = accentRadius * Math.sin(angle);
    accentPoints.push(new THREE.Vector3(x, y, z));
  }

  const accentGeometry = new THREE.BufferGeometry().setFromPoints(accentPoints);
  const accentMaterial = new THREE.LineBasicMaterial({
    color: 0x8b381e, // Primary color
    transparent: true,
    opacity: 0.4, // Further reduced opacity
  });

  accentHelix = new THREE.Line(accentGeometry, accentMaterial);
  helixGroup.add(accentHelix);

  // Store materials for fading
  originalMaterials.helix = mainHelixLine.material;
  originalMaterials.particles = particlesMaterial;
  originalMaterials.accent = accentHelix.material;
};

createGoldenHelix(); // Call it to initialize

// Animation - ADJUSTED
const animate = () => {
  requestAnimationFrame(animate);

  const time = performance.now() * 0.004; // Slightly faster base time for more noticeable animation

  // Update particle time uniform
  if (particlesMaterial) particlesMaterial.uniforms.uTime.value = time;

  // Rotate the main helix group - SLIGHTLY MORE DYNAMIC
  if (helixGroup) {
    helixGroup.rotation.y = time * 0.22; // Increased from 0.08
    helixGroup.rotation.z = Math.sin(time * 0.1) * 0.05; // Increased amplitude and slightly faster sine wave
  }

  // Animate the accentHelix independently for more life
  if (accentHelix) {
    accentHelix.rotation.y = time * -0.2; // Counter-rotation or different speed
    accentHelix.rotation.x = Math.cos(time * 0.15) * 0.1; // Gentle oscillation on x-axis
  }

  renderer.render(scene, camera);
};

animate();

// --- Animation Setup ---
const header = document.querySelector("header");
const heroSection = document.getElementById("hero"); // Restore reference
const heroContent = document.querySelector("#hero .hero-content"); // The empty container in #hero

// References to text elements *within* loader-content
const subtitleLoader = document.querySelector(".hero-subtitle-loader");
const paragraphLoader = document.querySelector(".hero-paragraph-loader");
const ctaLoader = document.querySelector(".hero-cta-loader");
const loaderBar = document.querySelector(".loader-bar");

window.addEventListener("load", () => {
  // Initial GSAP states
  if (header) gsap.set(header, { opacity: 0 });
  // Set initial state for the destination hero section container
  if (heroSection) gsap.set(heroSection, { opacity: 1, y: 0 }); // Ensure hero is visible
  // Set initial state for GSAP control
  [subtitleLoader, paragraphLoader, ctaLoader].forEach((el) => {
    // Set initial opacity to 0 and y to 0 (no initial offset)
    if (el) gsap.set(el, { opacity: 0, y: 0 });
  });

  setTimeout(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Ensure scroll position is at the very top after animation completes
        window.scrollTo(0, 0);
        // Optional: Stop Three.js animation loop once sequence is done
        // cancelAnimationFrame(animate); // If animate is globally accessible ID
      },
    });

    if (loaderBar) {
      tl.to(loaderBar, { opacity: 0, duration: 0.3, ease: "power1.out" });
    }
    tl.to(
      camera.position,
      { z: 1.8, duration: 1.0, ease: "power2.inOut" },
      "-=0.2"
    );

    if (originalMaterials.helix) {
      // Check materials exist
      tl.to(
        [
          originalMaterials.helix,
          originalMaterials.particles,
          originalMaterials.accent,
        ],
        {
          opacity: 0,
          duration: 0.8,
          ease: "power1.inOut",
          stagger: 0.05,
          onStart: () => {
            [
              originalMaterials.helix,
              originalMaterials.particles,
              originalMaterials.accent,
            ].forEach((mat) => {
              if (mat && mat.isMaterial) mat.transparent = true;
            });
          },
        },
        "-=0.7"
      );
    }

    // Move canvas and loader content to hero section before fading loading screen
    const moveTime = "-=0.4"; // Timing relative to end of helix fade
    tl.add(() => {
      if (canvas && heroSection) {
        heroSection.insertBefore(canvas, heroSection.firstChild);
        // Style canvas to act as hero background
        gsap.set(canvas, { position: "absolute", top: 0, left: 0, zIndex: 0 });
      }
      if (loaderContent && heroContent) {
        heroContent.appendChild(loaderContent);
        // Ensure loaderContent fits well within heroContent
        gsap.set(loaderContent, { position: "relative", zIndex: 1 }); // Ensure text is above canvas
      }
      // Adjust logo margin AFTER it has been moved (or use CSS)
      if (loaderLogo) {
        gsap.to(loaderLogo, {
          marginBottom: "var(--spacing-sm)",
          duration: 0.1,
        });
      }
    }, moveTime);
    window.scrollTo(0, 0);
    // Fade out loading screen (now empty)
    tl.to(
      loadingScreen,
      {
        opacity: 0,
        duration: 0.4,
        ease: "power1.out",
        onComplete: () => {
          if (loadingScreen) loadingScreen.style.display = "none";
          // Animate in Hero Text Elements (now inside heroContent > loaderContent)
          // Only animate opacity, no Y transform
          const heroTextElements = [
            subtitleLoader,
            paragraphLoader,
            ctaLoader,
          ].filter((el) => el);
          if (heroTextElements.length > 0) {
            // Instead of animating all elements together, animate them one by one with more refined timing
            if (subtitleLoader) {
              tl.fromTo(
                subtitleLoader,
                { opacity: 0, y: 10 }, // Start slightly offset
                {
                  opacity: 1,
                  y: 0,
                  duration: 1.2,
                  ease: "power2.out",
                },
                "-=0.1" // Slight overlap
              );
            }

            if (paragraphLoader) {
              tl.fromTo(
                paragraphLoader,
                { opacity: 0, y: 8 }, // Slightly less offset than subtitle
                {
                  opacity: 1,
                  y: 0,
                  duration: 1.4,
                  ease: "power3.out", // More refined easing
                },
                "-=0.8" // Start before subtitle animation fully completes
              );
            }

            if (ctaLoader) {
              tl.fromTo(
                ctaLoader,
                { opacity: 0 },
                {
                  opacity: 1,
                  duration: 1.0,
                  ease: "power1.inOut",
                },
                "-=0.6"
              );
            }
          }
        },
      },
      moveTime + "+=0.1"
    ); // Start slightly after move starts

    // Reveal Header
    if (header) {
      tl.to(header, { opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2"); // Overlap end of loading fade
    }
  }, 1000);
});

// Mouse movement effect (leave as is for now)
let mouseX = 0,
  mouseY = 0,
  targetX = 0,
  targetY = 0;
const windowHalfX = window.innerWidth / 2,
  windowHalfY = window.innerHeight / 2;
document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
});
const updateScene = () => {
  targetX = mouseX * 0.0003;
  targetY = mouseY * 0.0003;
  if (helixGroup) {
    helixGroup.rotation.x += 0.01 * (targetY - helixGroup.rotation.x);
    helixGroup.rotation.y += 0.005 * (targetX - helixGroup.rotation.y);
  }
  requestAnimationFrame(updateScene);
};
updateScene();

// Smooth Scrolling for Anchor Links
document.addEventListener("DOMContentLoaded", () => {
  // Attempt to register GSAP ScrollToPlugin if it's available
  // If you're using a modular GSAP (npm), you'd import and register it:
  // import { ScrollToPlugin } from "gsap/ScrollToPlugin";
  // gsap.registerPlugin(ScrollToPlugin);
  // For CDN, it might be globally available or need a specific include.
  // This is a common way to check and register if available via a general GSAP CDN include.
  if (gsap.plugins && gsap.plugins.ScrollToPlugin) {
    gsap.registerPlugin(gsap.plugins.ScrollToPlugin);
  } else if (window.ScrollToPlugin) {
    // Some CDNs might expose it globally
    gsap.registerPlugin(ScrollToPlugin);
  }
  // If neither, smooth scroll might not work as expected with GSAP,
  // but the rest of the code won't break. We can add a fallback later if needed.

  const links = document.querySelectorAll(
    'nav a[href^="#"], .footer-links a[href^="#"], .hero-cta-loader a[href^="#"]'
  );

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      // Check if it's just "#" (top of page) or a specific ID
      if (targetId === "#") {
        if (gsap.plugins && gsap.plugins.ScrollToPlugin) {
          gsap.to(window, { duration: 1, scrollTo: 0, ease: "power2.inOut" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calculate target position, considering fixed header if any
        // For now, direct scroll to element. Header offset can be added later if needed.
        if (gsap.plugins && gsap.plugins.ScrollToPlugin && gsap.getProperty) {
          // Check for getProperty too
          gsap.to(window, {
            duration: 1.2, // Adjust duration as desired
            scrollTo: {
              y: targetElement,
              // offsetY: (document.querySelector('header') ? document.querySelector('header').offsetHeight : 0) * -1 // Example header offset
            },
            ease: "power2.inOut",
          });
        } else {
          // Fallback to native smooth scroll if GSAP ScrollToPlugin isn't available
          const targetPosition =
            targetElement.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });
});

// Ensure body is marked as loaded for initial fade-in (if this script runs late)
// This is likely already handled in index.html script tag
/*
window.addEventListener("load", function () {
  setTimeout(function () {
    document.body.classList.add("loaded");
  }, 200); 
});
*/
