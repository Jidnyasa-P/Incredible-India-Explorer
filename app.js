/* ==========================================================================
   INCREDIBLE INDIA EXPLORER - APPLICATION LOGIC
   Pure Vanilla JavaScript for dynamic content, modals, sliders, and games.
   ========================================================================== */

window.lazyLoadScript = function(src) {
    if (!window.lazyLoadedScriptsCache) {
        window.lazyLoadedScriptsCache = new Set();
    }
    if (window.lazyLoadedScriptsCache.has(src)) {
        return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            window.lazyLoadedScriptsCache.add(src);
            resolve();
        };
        script.onerror = (err) => {
            console.error(`Failed to lazy load script: ${src}`, err);
            reject(err);
        };
        document.body.appendChild(script);
    });
};

document.addEventListener('app:route-changed', () => {
    initNavigation();
    initThemeToggle();
    initRotatingText();

    // Page detection routing
    const pathname = window.location.pathname;

    if (pathname.includes('cuisine.html')) {
        window.lazyLoadScript('js-modules/cuisine.js').then(() => initCuisinePage());
    } else if (pathname.includes('festivals.html')) {
        window.lazyLoadScript('js-modules/festivals.js').then(() => initFestivalsPage());
    } else if (pathname.includes('culture.html')) {
        window.lazyLoadScript('js-modules/culture.js').then(() => initCulturePage());
    } else if (pathname.includes('literature.html')) {
        window.lazyLoadScript('js-modules/literature.js').then(() => initLiteraturePage());
    } else if (pathname.includes('dance.html')) {
        window.lazyLoadScript('js-modules/dance.js').then(() => initDancePage());
    } else if (pathname.includes('music.html')) {
        window.lazyLoadScript('js-modules/music.js').then(() => initMusicPage());
    } else if (pathname.includes('sports.html')) {
        window.lazyLoadScript('js-modules/sports.js').then(() => initSportsPage());
    } else if (pathname.includes('science.html')) {
        window.lazyLoadScript('js-modules/science.js').then(() => initSciencePage());
    } else if (pathname.includes('personalities.html')) {
        initScrollEffects();
        window.lazyLoadScript('js-modules/personalities.js').then(() => initPersonalitiesPage());
    } else if (pathname.includes('spiritual.html')) {
        initScrollEffects();
        window.lazyLoadScript('js-modules/spiritual.js').then(() => initSpiritualCarousel());
    } else if (pathname.includes('startup.html')) {
        window.lazyLoadScript('js-modules/startup.js').then(() => initStartupPage());
    } else if (pathname.includes('travel.html')) {
        window.lazyLoadScript('js-modules/roadtrip.js').then(() => initRoadTripFlipCards());
    } else if (pathname.includes('heritage.html')) {
        console.log('✅ Heritage page loaded successfully');
    } else if (pathname.includes('monuments.html')) {
        console.log('✅ Monuments page loaded successfully');
    } else if (pathname.includes('hidden-gems.html')) {
        console.log('✅ Hidden Gems page loaded successfully');
    } else if (pathname.includes('railways.html')) {
        console.log('✅ Railways Explorer page loaded successfully');
    } else if (pathname.includes('adventure.html')) {
        console.log('Adventure page loaded successfully');
    } else {
        // Main landing page (index.html or root)
        initScrollEffects();

        // Viewport-based lazy initialization of heavy landing page sections
        const lazyInit = (elementId, initFunc) => {
            const el = document.getElementById(elementId);
            if (el && 'IntersectionObserver' in window) {
                const obs = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            initFunc();
                            obs.disconnect();
                        }
                    });
                }, { rootMargin: '200px' });
                obs.observe(el);
            } else {
                initFunc();
            }
        };

        lazyInit('map-container', initInteractiveMap);
        lazyInit('cuisine-grid', initCuisineExplorer);
        lazyInit('festival-timeline', initFestivals);
        lazyInit('slider-container', initCultureSlider);
        lazyInit('quiz-card', initQuiz);
        lazyInit('fab-guide', initBharatGuide);
    }
});

/* ==========================================================================
   1. NAVIGATION & SCROLL EVENTS
   ========================================================================== */

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const btnScrollTop = document.getElementById('btn-scroll-top');
    const exploreDropdown = navMenu?.querySelector('.nav-dropdown .dropdown-menu');
    const currentPath = window.location.pathname;

    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (btnScrollTop) btnScrollTop.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            if (btnScrollTop) btnScrollTop.classList.remove('visible');
        }
    });

    // Keep the sports, science, music, and dance pages available across the shared navigation pattern.
    if (exploreDropdown && !exploreDropdown.querySelector('a[href="dance.html"]')) {
        const danceLink = document.createElement('a');
        danceLink.href = 'dance.html';
        danceLink.className = 'dropdown-item';
        danceLink.textContent = 'Dance';
        if (currentPath.includes('dance.html')) {
            danceLink.classList.add('active');
        }
        exploreDropdown.appendChild(danceLink);
    }

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="sports.html"]')) {
        const sportsLink = document.createElement('a');
        sportsLink.href = 'sports.html';
        sportsLink.className = 'dropdown-item';
        sportsLink.textContent = 'Sports';
        if (currentPath.includes('sports.html')) {
            sportsLink.classList.add('active');
        }
        exploreDropdown.appendChild(sportsLink);
    }

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="science.html"]')) {
        const scienceLink = document.createElement('a');
        scienceLink.href = 'science.html';
        scienceLink.className = 'dropdown-item';
        scienceLink.textContent = 'Science';
        if (currentPath.includes('science.html')) {
            scienceLink.classList.add('active');
        }
        exploreDropdown.appendChild(scienceLink);
    }

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="music.html"]')) {
        const musicLink = document.createElement('a');
        musicLink.href = 'music.html';
        musicLink.className = 'dropdown-item';
        musicLink.textContent = 'Music';
        if (currentPath.includes('music.html')) {
            musicLink.classList.add('active');
        }
        exploreDropdown.appendChild(musicLink);
    }

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="literature.html"]')) {
        const literatureLink = document.createElement('a');
        literatureLink.href = 'literature.html';
        literatureLink.className = 'dropdown-item';
        literatureLink.textContent = 'Literature';
        if (currentPath.includes('literature.html')) {
            literatureLink.classList.add('active');
        }
        exploreDropdown.appendChild(literatureLink);
    }

    // Mobile Hamburger Toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close mobile menu on nav link click (excluding dropdown toggles)
    navLinks.forEach(link => {
        if (link.classList.contains('dropdown-toggle')) return;
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // Dropdown toggles toggle interaction logic
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const parentDropdown = toggle.closest('.nav-dropdown');
            if (!parentDropdown) return;

            const isOpen = parentDropdown.classList.contains('open');

            // Close other dropdowns
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                if (dropdown !== parentDropdown) {
                    dropdown.classList.remove('open');
                    const otherToggle = dropdown.querySelector('.dropdown-toggle');
                    if (otherToggle) {
                        otherToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            });

            // Toggle current dropdown state
            if (isOpen) {
                parentDropdown.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            } else {
                parentDropdown.classList.add('open');
                toggle.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Close open dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                dropdown.classList.remove('open');
                const toggle = dropdown.querySelector('.dropdown-toggle');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });

    // Scroll to Top action
    if (btnScrollTop) {
        btnScrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    const setThemeIcon = (isLightTheme) => {
        if (isLightTheme) {
            themeBtn.innerHTML = `
                <svg class="theme-toggle-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M12 3v2M12 19v2M5 5l1.5 1.5M17.5 17.5L19 19M3 12h2M19 12h2M5 19l1.5-1.5M17.5 6.5L19 5" />
                    <circle cx="12" cy="12" r="4.5" />
                </svg>
            `;
            themeBtn.setAttribute('title', 'Toggle Dark Mode');
            themeBtn.setAttribute('aria-label', 'Toggle Dark Mode');
        } else {
            themeBtn.innerHTML = `
                <svg class="theme-toggle-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M21 12.8A8.8 8.8 0 0 1 11.2 3 8.8 8.8 0 1 0 21 12.8Z" fill="currentColor" />
                </svg>
            `;
            themeBtn.setAttribute('title', 'Toggle Light Mode');
            themeBtn.setAttribute('aria-label', 'Toggle Light Mode');
        }
    };

    // Check localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        setThemeIcon(true);
    } else {
        setThemeIcon(false);
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLightTheme = document.body.classList.contains('light-theme');
        setThemeIcon(isLightTheme);
        const theme = isLightTheme ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
    });
}

function initRotatingText() {
    const rotators = document.querySelectorAll('.rotating-text-wrapper');
    rotators.forEach(wrapper => {
        const wordsStr = wrapper.getAttribute('data-words');
        if (!wordsStr) return;

        const words = wordsStr.split(',').map(w => w.trim());
        if (words.length === 0) return;

        let currentIndex = 0;
        wrapper.innerHTML = `<span class="rotating-text">${words[0]}</span>`;

        setInterval(() => {
            const currentSpan = wrapper.querySelector('.rotating-text');
            currentSpan.style.animation = 'slideOutFade 0.5s ease-in forwards';

            setTimeout(() => {
                currentIndex = (currentIndex + 1) % words.length;
                wrapper.innerHTML = `<span class="rotating-text">${words[currentIndex]}</span>`;
            }, 500);
        }, 3500); // Rotate every 3.5 seconds
    });
}

function initScrollEffects() {
    const fadeSections = document.querySelectorAll('.fade-in-section, .story-step');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.scroll-section');

    // Section entry animations
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Unobserve after showing
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    fadeSections.forEach(section => {
        fadeObserver.observe(section);
    });

    // Active link highlighting on scroll
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/* ==========================================================================
   2. INTERACTIVE INDIA MAP
   ========================================================================== */

function initInteractiveMap() {
    const mapContainer = document.getElementById('map-container');
    const tooltip = document.getElementById('map-tooltip');
    const infoPanel = document.getElementById('quick-info-panel');
    const randomBtn = document.getElementById('btn-random-state');
    const viewMoreBtn = document.getElementById('btn-sidebar-view-more');

    // Overlay Selectors
    const storyOverlay = document.getElementById('state-story-overlay');
    const overlayBackBtn = document.getElementById('state-story-back-btn');
    const overlayAudioBtn = document.getElementById('state-story-audio-btn');
    const overlayTitle = document.getElementById('state-story-title');
    const overlayCapital = document.getElementById('state-story-capital');
    const overlayMainText = document.getElementById('state-story-main-text');
    const highlightsGrid = document.getElementById('state-story-highlights-grid');
    const svgContainer = document.getElementById('state-svg-container');

    // State Regions Map
    const stateRegions = {
        "an": "south", "ap": "south", "ar": "northeast", "as": "northeast", "br": "east",
        "ch": "north", "ct": "central", "dd": "west", "dl": "north", "dn": "west",
        "ga": "west", "gj": "west", "hp": "north", "hr": "north", "jh": "east",
        "jk": "north", "ka": "south", "kl": "south", "ld": "south", "mh": "west",
        "ml": "northeast", "mn": "northeast", "mp": "central", "mz": "northeast",
        "nl": "northeast", "or": "east", "pb": "north", "py": "south", "rj": "west",
        "sk": "northeast", "tg": "south", "tn": "south", "tr": "northeast", "up": "north",
        "ut": "north", "wb": "east"
    };

    // Clear loader
    if (!mapContainer) return;
    mapContainer.innerHTML = '';

    // Create SVG element
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svgElement = document.createElementNS(svgNamespace, 'svg');
    svgElement.setAttribute('viewBox', mapData.viewBox);
    svgElement.setAttribute('class', 'india-svg-map');

    // Create group for paths
    const gElement = document.createElementNS(svgNamespace, 'g');

    // Render paths
    mapData.locations.forEach(loc => {
        const pathElement = document.createElementNS(svgNamespace, 'path');
        pathElement.setAttribute('d', loc.path);
        pathElement.setAttribute('id', `state-${loc.id}`);
        pathElement.setAttribute('data-id', loc.id);
        pathElement.setAttribute('data-name', loc.name);

        // Hover effect listeners — rich tooltip
        pathElement.addEventListener('mouseenter', () => {
            const tooltipStateName = document.getElementById('tooltip-state-name');
            const tooltipCapital = document.getElementById('tooltip-capital');
            const tooltipFood = document.getElementById('tooltip-food');
            const tooltipFestival = document.getElementById('tooltip-festival');
            const tooltipDesc = document.getElementById('tooltip-description');

            if (tooltipStateName) tooltipStateName.innerText = loc.name;
            if (tooltipCapital) tooltipCapital.innerText = loc.capital;
            if (tooltipFood) tooltipFood.innerText = loc.food;
            if (tooltipFestival) tooltipFestival.innerText = loc.festival;
            if (tooltipDesc) {
                tooltipDesc.innerText = loc.description.substring(0, 120) + (loc.description.length > 120 ? '…' : '');
            }
            tooltip.style.opacity = '1';
        });

        pathElement.addEventListener('mousemove', (e) => {
            const tooltipW = 300;
            const tooltipH = tooltip.offsetHeight || 220;
            let x = e.clientX + 18;
            let y = e.clientY + 18;
            // Keep tooltip within viewport bounds
            if (x + tooltipW > window.innerWidth) x = e.clientX - tooltipW - 12;
            if (y + tooltipH > window.innerHeight) y = e.clientY - tooltipH - 12;
            if (x < 4) x = 4;
            if (y < 4) y = 4;
            tooltip.style.left = x + 'px';
            tooltip.style.top = y + 'px';
        });

        pathElement.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });

        // Click interaction listener
        pathElement.addEventListener('click', () => {
            // Remove highlight from other paths
            document.querySelectorAll('.india-svg-map path').forEach(p => {
                p.classList.remove('highlighted-active');
            });

            // Highlight current
            pathElement.classList.add('highlighted-active');

            // Open state modal
            showStateDetails(loc);
        });

        gElement.appendChild(pathElement);
    });

    svgElement.appendChild(gElement);
    mapContainer.appendChild(svgElement);

    // Bind Regional Filter Highlight events
    const filterButtons = document.querySelectorAll('#map-region-filter .map-filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedRegion = btn.dataset.region;
            const paths = document.querySelectorAll('.india-svg-map path');

            paths.forEach(path => {
                const stateId = path.dataset.id;
                const region = stateRegions[stateId];

                if (selectedRegion === 'all') {
                    path.classList.remove('dimmed', 'highlighted-region');
                } else if (region === selectedRegion) {
                    path.classList.remove('dimmed');
                    path.classList.add('highlighted-region');
                } else {
                    path.classList.remove('highlighted-region');
                    path.classList.add('dimmed');
                }
            });
        });
    });

    // Populate State Comparison selectors
    const compareA = document.getElementById('compare-state-a');
    const compareB = document.getElementById('compare-state-b');
    const compareBtn = document.getElementById('btn-compare-states');
    const comparisonOverlay = document.getElementById('state-comparison-overlay');
    const comparisonBackBtn = document.getElementById('comparison-back-btn');

    if (compareA && compareB) {
        compareA.innerHTML = '<option value="" disabled selected>Select First State</option>';
        compareB.innerHTML = '<option value="" disabled selected>Select Second State</option>';

        const sortedLocations = [...mapData.locations].sort((a, b) => a.name.localeCompare(b.name));
        sortedLocations.forEach(loc => {
            const optA = document.createElement('option');
            optA.value = loc.id;
            optA.textContent = loc.name;
            compareA.appendChild(optA);

            const optB = document.createElement('option');
            optB.value = loc.id;
            optB.textContent = loc.name;
            compareB.appendChild(optB);
        });
    }

    if (compareBtn) {
        compareBtn.addEventListener('click', () => {
            const idA = compareA.value;
            const idB = compareB.value;

            if (!idA || !idB) {
                alert('Please select two states to compare!');
                return;
            }

            const stateA = mapData.locations.find(loc => loc.id === idA);
            const stateB = mapData.locations.find(loc => loc.id === idB);

            if (stateA && stateB) {
                showComparison(stateA, stateB);
            }
        });
    }

    if (comparisonBackBtn) {
        comparisonBackBtn.addEventListener('click', () => {
            comparisonOverlay.classList.remove('open');
        });
    }

    /**
     * State comparison rating metrics and facts.
     * Evaluates four cultural and accessibility metrics on a 1-10 scale:
     * - heritage: Density of historical monuments and UNESCO World Heritage Sites.
     * - cuisine: Variety, uniqueness, and global prominence of regional culinary traditions.
     * - access: Transport infrastructure, tourist ease, and availability of transit options.
     * - art: Traditional dance forms, local music, painting styles, and folk festivals.
     * - fact: A short, highly engaging offline trivia highlight for side-by-side rendering.
     */
    const comparisonMetrics = {
        "an": { heritage: 7, cuisine: 8, access: 6, art: 7, fact: "Home to the historic British-era Cellular Jail and pristine Radhanagar Beach." },
        "ap": { heritage: 9, cuisine: 9, access: 8, art: 8, fact: "Famous for the richest temple in the world, Tirumala Venkateswara in Tirupati." },
        "ar": { heritage: 6, cuisine: 7, access: 5, art: 9, fact: "Houses India's largest Buddhist monastery in the high-altitude town of Tawang." },
        "as": { heritage: 8, cuisine: 8, access: 7, art: 8, fact: "Home of the endangered one-horned rhinoceros in Kaziranga National Park." },
        "br": { heritage: 10, cuisine: 7, access: 8, art: 9, fact: "The birthplace of Buddhism and the ancient international seat of Nalanda University." },
        "ch": { heritage: 7, cuisine: 8, access: 9, art: 6, fact: "India's first planned modernist city designed by architect Le Corbusier." },
        "ct": { heritage: 7, cuisine: 7, access: 6, art: 9, fact: "Known for the spectacular Chitrakote Falls, often called the Niagara of India." },
        "dd": { heritage: 7, cuisine: 8, access: 7, art: 6, fact: "Blends coastal Portuguese forts with modern beach tourism enclaves." },
        "dl": { heritage: 10, cuisine: 10, access: 10, art: 8, fact: "The historic capital of empires, containing Red Fort, Qutub Minar, and India Gate." },
        "dn": { heritage: 6, cuisine: 7, access: 7, art: 8, fact: "Known for scenic tribal enclaves and quiet Daman Ganga river walks." },
        "ga": { heritage: 8, cuisine: 9, access: 9, art: 7, fact: "World-famous for its golden sand beaches and UNESCO-listed Portuguese-era churches." },
        "gj": { heritage: 9, cuisine: 9, access: 9, art: 9, fact: "Features the world's tallest statue, Statue of Unity, and Gir Forest wildlife sanctuaries." },
        "hp": { heritage: 7, cuisine: 7, access: 7, art: 8, fact: "Known for breathtaking snowcapped valleys and Dharamshala, home of the Dalai Lama." },
        "hr": { heritage: 7, cuisine: 8, access: 9, art: 7, fact: "Mentioned heavily in ancient texts; contains the historic battlefield of Kurukshetra." },
        "jh": { heritage: 7, cuisine: 7, access: 7, art: 8, fact: "The mineral capital of India, rich in waterfalls and tribal traditions." },
        "jk": { heritage: 8, cuisine: 9, access: 7, art: 9, fact: "Often called 'Paradise on Earth', famous for Dal Lake houseboats and apple orchards." },
        "ka": { heritage: 10, cuisine: 9, access: 9, art: 9, fact: "Home to the glorious ruins of the Vijayanagara Empire in Hampi." },
        "kl": { heritage: 8, cuisine: 9, access: 8, art: 10, fact: "Called 'God's Own Country', famous for backwaters, Ayurveda, and Kathakali." },
        "ld": { heritage: 5, cuisine: 8, access: 5, art: 6, fact: "A coral archipelago featuring rich marine life and blue lagoons." },
        "mh": { heritage: 10, cuisine: 10, access: 10, art: 9, fact: "Home to the rock-cut masterpiece Ajanta and Ellora Caves." },
        "ml": { heritage: 6, cuisine: 8, access: 6, art: 8, fact: "Home of the cleanest village in Asia (Mawlynnong) and living root bridges." },
        "mn": { heritage: 6, cuisine: 7, access: 6, art: 9, fact: "Birthplace of Polo and home to Loktak, the world's only floating lake." },
        "mp": { heritage: 9, cuisine: 8, access: 8, art: 9, fact: "Known as the heart of India, featuring Khajuraho temples and tiger reserves." },
        "mz": { heritage: 5, cuisine: 7, access: 5, art: 8, fact: "Known for mist-covered hills and Bamboo Dance (Cheraw)." },
        "nl": { heritage: 6, cuisine: 7, access: 6, art: 9, fact: "Host of the world-famous Hornbill Festival, showcasing diverse tribal heritage." },
        "or": { heritage: 9, cuisine: 8, access: 8, art: 9, fact: "Famous for the Sun Temple in Konark and Jagannath Rath Yatra." },
        "pb": { heritage: 8, cuisine: 10, access: 9, art: 8, fact: "Contains the magnificent Golden Temple, the spiritual center of Sikhism." },
        "py": { heritage: 7, cuisine: 9, access: 8, art: 7, fact: "A scenic French-heritage enclave and home of the utopian city Auroville." },
        "rj": { heritage: 10, cuisine: 10, access: 9, art: 10, fact: "The land of kings, famous for massive desert hillforts and grand palaces." },
        "sk": { heritage: 7, cuisine: 8, access: 6, art: 8, fact: "India's first organic state, offering panoramic views of Mount Kanchenjunga." },
        "tg": { heritage: 9, cuisine: 9, access: 9, art: 8, fact: "Famous for Charminar, Hyderabadi Biryani, and Kakatiya architecture." },
        "tn": { heritage: 10, cuisine: 9, access: 9, art: 10, fact: "Home to the oldest surviving classical language, Tamil, and massive Gopuram temples." },
        "tr": { heritage: 7, cuisine: 7, access: 6, art: 8, fact: "Known for Neermahal, a spectacular water palace built in the center of Lake Rudrasagar." },
        "up": { heritage: 10, cuisine: 10, access: 9, art: 9, fact: "Contains the Taj Mahal, one of the Seven Wonders of the World, and holy Varanasi." },
        "ut": { heritage: 8, cuisine: 7, access: 8, art: 8, fact: "The Land of Gods, containing the Himalayan Valley of Flowers." },
        "wb": { heritage: 9, cuisine: 10, access: 9, art: 10, fact: "The cultural capital, home to Nobel laureate Rabindranath Tagore and Sundarbans." }
    };

    function showComparison(stateA, stateB) {
        const colA = document.getElementById('comparison-column-a');
        const colB = document.getElementById('comparison-column-b');

        const metricsA = comparisonMetrics[stateA.id] || { heritage: 7, cuisine: 7, access: 7, art: 7, fact: "" };
        const metricsB = comparisonMetrics[stateB.id] || { heritage: 7, cuisine: 7, access: 7, art: 7, fact: "" };

        function makeMeters(metrics) {
            return `
                <div style="margin-top:20px;">
                    <div style="margin-bottom:12px;">
                        <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px; font-weight:600; color:var(--muted-text);">
                            <span>Heritage Richness</span>
                            <span>${metrics.heritage}/10</span>
                        </div>
                        <div style="background:rgba(255,255,255,0.08); height:6px; border-radius:3px; overflow:hidden;">
                            <div style="background:var(--saffron); width:${metrics.heritage * 10}%; height:100%; border-radius:3px;"></div>
                        </div>
                    </div>
                    <div style="margin-bottom:12px;">
                        <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px; font-weight:600; color:var(--muted-text);">
                            <span>Culinary Diversity</span>
                            <span>${metrics.cuisine}/10</span>
                        </div>
                        <div style="background:rgba(255,255,255,0.08); height:6px; border-radius:3px; overflow:hidden;">
                            <div style="background:var(--primary-gold); width:${metrics.cuisine * 10}%; height:100%; border-radius:3px;"></div>
                        </div>
                    </div>
                    <div style="margin-bottom:12px;">
                        <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px; font-weight:600; color:var(--muted-text);">
                            <span>Tourist Access & Transit</span>
                            <span>${metrics.access}/10</span>
                        </div>
                        <div style="background:rgba(255,255,255,0.08); height:6px; border-radius:3px; overflow:hidden;">
                            <div style="background:#00f2fe; width:${metrics.access * 10}%; height:100%; border-radius:3px;"></div>
                        </div>
                    </div>
                    <div style="margin-bottom:20px;">
                        <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px; font-weight:600; color:var(--muted-text);">
                            <span>Artistic Traditions</span>
                            <span>${metrics.art}/10</span>
                        </div>
                        <div style="background:rgba(255,255,255,0.08); height:6px; border-radius:3px; overflow:hidden;">
                            <div style="background:var(--green); width:${metrics.art * 10}%; height:100%; border-radius:3px;"></div>
                        </div>
                    </div>
                </div>
            `;
        }

        if (colA && colB) {
            colA.innerHTML = `
                <h2 style="color:var(--primary-gold); margin-bottom:5px;">${stateA.name}</h2>
                <p style="color:var(--saffron); font-weight:600; margin-top:0; font-size:1.1rem;">🏛️ Capital: ${stateA.capital}</p>
                <div style="margin:20px 0; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:15px;">
                    <p style="color:var(--text-color); line-height:1.6; font-size: 0.95rem;">${stateA.description}</p>
                </div>
                <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size: 1rem; text-transform: uppercase; letter-spacing:1px;">🍲 Famous Food</h4>
                <p style="margin-top:0; margin-bottom:20px; font-size: 0.95rem;">${stateA.food}</p>
                <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size: 1rem; text-transform: uppercase; letter-spacing:1px;">🎉 Major Festival</h4>
                <p style="margin-top:0; margin-bottom:25px; font-size: 0.95rem;">${stateA.festival}</p>
                
                <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size: 1rem; text-transform: uppercase; letter-spacing:1px;">📊 Metric Analysis</h4>
                ${makeMeters(metricsA)}
                <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px; margin-bottom:25px; font-size:0.9rem; line-height:1.5; color:var(--muted-text);">
                    <strong>Key Fact:</strong> ${metricsA.fact}
                </div>
                
                <button class="btn btn-primary" onclick="window.appRouter ? window.appRouter.handleRoute('states/${stateA.id}.html', true) : window.location.href='states/${stateA.id}.html'" style="font-size:0.9rem; padding:8px 18px;">Explore Full Page</button>
            `;

            colB.innerHTML = `
                <h2 style="color:var(--primary-gold); margin-bottom:5px;">${stateB.name}</h2>
                <p style="color:var(--saffron); font-weight:600; margin-top:0; font-size:1.1rem;">🏛️ Capital: ${stateB.capital}</p>
                <div style="margin:20px 0; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:15px;">
                    <p style="color:var(--text-color); line-height:1.6; font-size: 0.95rem;">${stateB.description}</p>
                </div>
                <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size: 1rem; text-transform: uppercase; letter-spacing:1px;">🍲 Famous Food</h4>
                <p style="margin-top:0; margin-bottom:20px; font-size: 0.95rem;">${stateB.food}</p>
                <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size: 1rem; text-transform: uppercase; letter-spacing:1px;">🎉 Major Festival</h4>
                <p style="margin-top:0; margin-bottom:25px; font-size: 0.95rem;">${stateB.festival}</p>
                
                <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size: 1rem; text-transform: uppercase; letter-spacing:1px;">📊 Metric Analysis</h4>
                ${makeMeters(metricsB)}
                <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px; margin-bottom:25px; font-size:0.9rem; line-height:1.5; color:var(--muted-text);">
                    <strong>Key Fact:</strong> ${metricsB.fact}
                </div>
                
                <button class="btn btn-primary" onclick="window.appRouter ? window.appRouter.handleRoute('states/${stateB.id}.html', true) : window.location.href='states/${stateB.id}.html'" style="font-size:0.9rem; padding:8px 18px;">Explore Full Page</button>
            `;
        }

        comparisonOverlay.classList.add('open');
    }

    // Overlay Close Triggers
    overlayBackBtn.addEventListener('click', closeOverlay);

    // ESC key closes overlay
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeOverlay();
            comparisonOverlay.classList.remove('open');
        }
    });

    // View More Button Trigger - Navigate to individual state page via SPA router or standard href
    viewMoreBtn?.addEventListener('click', () => {
        const currentId = viewMoreBtn.getAttribute('data-active-id');
        const targetPath = `states/${currentId}.html`;
        if (window.appRouter && typeof window.appRouter.handleRoute === 'function') {
            window.appRouter.handleRoute(targetPath, true);
        } else {
            window.location.href = targetPath;
        }
    });

    // Helper functions
    function showStateDetails(loc) {
        // Set Details
        overlayTitle.innerText = loc.name;
        overlayCapital.innerText = loc.capital;

        // Format story text as paragraph lines
        const storyRaw = loc.story || loc.description;
        const paragraphs = storyRaw.split('\\n\\n').map(pText => `<p class="story-paragraph">${pText}</p>`).join('');
        overlayMainText.innerHTML = paragraphs;

        // Reapply Drop Cap on first paragraph
        const firstPara = overlayMainText.querySelector('.story-paragraph');
        if (firstPara) firstPara.classList.add('drop-cap');

        // Set up highlights
        highlightsGrid.innerHTML = `
            <div class="highlight-bullet"><span class="bullet-icon">&#127963;</span><span>Capital: ${loc.capital}</span></div>
            <div class="highlight-bullet"><span class="bullet-icon">&#127835;</span><span>Famous Food: ${loc.food}</span></div>
            <div class="highlight-bullet"><span class="bullet-icon">&#127881;</span><span>Major Festival: ${loc.festival}</span></div>
        `;

        // Render SVG in canvas
        svgContainer.innerHTML = `
             <svg viewBox="${mapData.viewBox}" style="width: 80%; height: auto; max-height: 50vh; filter: drop-shadow(0px 10px 20px rgba(0,0,0,0.5)); fill: var(--primary-gold);">
                 <path d="${loc.path}"></path>
             </svg>
         `;

        // Set dynamic theme class based on region or just a default vibrant state theme
        storyOverlay.className = 'story-overlay theme-default';

        // Open Overlay
        storyOverlay.classList.add('open');

        // Update Quick Info Sidebar Panel
        infoPanel.className = "info-card active-state";
        const infoContent = document.getElementById('info-panel-content');
        if (infoContent) {
            infoContent.innerHTML = `
                <div class="info-card-header">
                    <div class="icon-circle">IN</div>
                    <h3>${loc.name}</h3>
                </div>
                <p class="info-card-text">
                    <strong>Capital:</strong> ${loc.capital}<br>
                    <strong>Famous Food:</strong> ${loc.food}<br>
                    <strong>Festival:</strong> ${loc.festival}
                </p>
                <p class="info-card-text" style="font-size: 0.95rem; margin-top: -15px;">
                    ${loc.description.substring(0, 110)}...
                </p>
            `;
        }

        if (viewMoreBtn) {
            viewMoreBtn.classList.remove('hidden');
            viewMoreBtn.setAttribute('data-active-id', loc.id);
        }

        // Bind audio button
        overlayAudioBtn.classList.remove('playing');
        overlayAudioBtn.innerHTML = '<span class="audio-icon">&#128266;</span> Listen to Soundscape';
        stopSoundscape();

        overlayAudioBtn.onclick = () => {
            if (overlayAudioBtn.classList.contains('playing')) {
                overlayAudioBtn.classList.remove('playing');
                overlayAudioBtn.innerHTML = '<span class="audio-icon">&#128266;</span> Listen to Soundscape';
                stopSoundscape();
            } else {
                overlayAudioBtn.classList.add('playing');
                overlayAudioBtn.innerHTML = '<span class="audio-icon">&#128263;</span> Stop Soundscape';
                playStateSoundscape(loc.name);
            }
        };

        // Bind inner overlay tabs logic
        const tabButtons = document.querySelectorAll('#state-overlay-tabs .state-tab-btn');
        const tabPanels = document.querySelectorAll('.state-tab-panel');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                tabButtons.forEach(b => {
                    b.classList.remove('active');
                    b.style.color = 'var(--muted-text)';
                    b.style.fontWeight = 'normal';
                });
                btn.classList.add('active');
                btn.style.color = 'var(--primary-gold)';
                btn.style.fontWeight = 'bold';

                const targetTab = btn.dataset.tab;
                tabPanels.forEach(panel => {
                    if (panel.id === `state-tab-${targetTab}`) {
                        panel.classList.remove('hidden');
                    } else {
                        panel.classList.add('hidden');
                    }
                });
            });
        });

        // Initialize to first overview tab
        const defaultTab = document.querySelector('#state-overlay-tabs .state-tab-btn[data-tab="overview"]');
        if (defaultTab) {
            defaultTab.click();
        }

        setupScrollReveals();
        spawnStateParticles();
    }

    function spawnStateParticles() {
        const particlesContainer = document.getElementById('state-canvas-particles');
        if (!particlesContainer) return;
        particlesContainer.innerHTML = '';
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'canvas-particle';
            const size = Math.random() * 6 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = (Math.random() * 2) + 's';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            particle.style.background = 'rgba(255, 255, 255, 0.4)';
            particlesContainer.appendChild(particle);
        }
    }

    function closeOverlay() {
        storyOverlay.classList.remove('open');
        stopSoundscape();
    }

    // Explore Random State Action
    randomBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * mapData.locations.length);
        const randomLoc = mapData.locations[randomIndex];

        // Remove previous highlight
        document.querySelectorAll('.india-svg-map path').forEach(p => {
            p.classList.remove('highlighted-active');
        });

        // Trigger path element selection
        const pathEl = document.getElementById(`state-${randomLoc.id}`);
        if (pathEl) {
            pathEl.classList.add('highlighted-active');
            pathEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Show details
        showStateDetails(randomLoc);
    });
}

/* ==========================================================================
   3. CUISINE EXPLORER
   ========================================================================== */

function initCuisineExplorer() {
    const cuisineGrid = document.getElementById('cuisine-grid');
    const tabBtns = document.querySelectorAll('.tab-btn');

    // Initial render
    if (!cuisineGrid) return;
    renderCuisines('all');

    // Filter Trigger click
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active status
            tabBtns.forEach(b => b.classList.remove('active'));
            // Set current active
            btn.classList.add('active');

            const region = btn.getAttribute('data-region');

            // Fading grid animation
            cuisineGrid.style.opacity = '0';
            cuisineGrid.style.transform = 'translateY(15px)';
            cuisineGrid.style.transition = 'opacity 0.25s, transform 0.25s';

            setTimeout(() => {
                renderCuisines(region);
                cuisineGrid.style.opacity = '1';
                cuisineGrid.style.transform = 'translateY(0)';
            }, 250);
        });
    });

    function renderCuisines(regionFilter) {
        cuisineGrid.innerHTML = '';

        const filteredList = regionFilter === 'all'
            ? cuisinesData
            : cuisinesData.filter(item => item.region === regionFilter);

        filteredList.forEach(dish => {
            const card = document.createElement('div');
            card.className = 'cuisine-card glass-card';

            // Determine region badge color
            let badgeClass = 'saffron-bg';
            if (dish.region === 'south') badgeClass = 'gold-bg';
            if (dish.region === 'east') badgeClass = 'green-bg';
            if (dish.region === 'west') badgeClass = 'saffron-bg';
            if (dish.region === 'northeast') badgeClass = 'gold-bg';

            card.innerHTML = `
                <div class="cuisine-card-image">
                    <img src="${dish.image}" alt="${dish.name}" loading="lazy">
                    <span class="cuisine-region-badge ${badgeClass}">${dish.region} India</span>
                </div>
                <div class="cuisine-card-body">
                    <span class="cuisine-origin">${dish.state}</span>
                    <h3>${dish.name}</h3>
                    <p>${dish.description}</p>
                </div>
            `;

            cuisineGrid.appendChild(card);
        });
    }
}

/* ==========================================================================
   4. FESTIVALS TIMELINE
   ========================================================================== */

function initFestivals() {
    const festivalTimeline = document.getElementById('festival-timeline');
    const stateModal = document.getElementById('state-modal');

    if (!festivalTimeline) return;
    festivalTimeline.innerHTML = '';

    festivalsData.forEach(fest => {
        const card = document.createElement('div');
        card.className = 'festival-card glass-card';
        card.innerHTML = `
            <img class="festival-card-img" src="${fest.image}" alt="${fest.name}" loading="lazy">
            <div class="festival-card-content">
                <span class="subtitle">${fest.subtitle}</span>
                <h3>${fest.name}</h3>
                <p>${fest.description}</p>
            </div>
        `;

        // Click festival to navigate to the detailed festivals page
        card.addEventListener('click', () => {
            window.location.href = 'festivals.html';
        });

        festivalTimeline.appendChild(card);
    });
}

/* ==========================================================================
   5. CULTURE SLIDER (CAROUSEL)
   ========================================================================== */

function initCultureSlider() {
    const track = document.getElementById('slider-track');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const dotsContainer = document.getElementById('slider-dots');

    let currentSlide = 0;

    // Render Culture Items
    if (!track) return;
    track.innerHTML = '';
    cultureData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'slider-card';
        card.innerHTML = `
            <img class="slider-card-img" src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="slider-card-body">
                <span class="slider-card-category">${item.category}</span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        track.appendChild(card);
    });

    // Render Navigation Dots
    dotsContainer.innerHTML = '';
    const totalCards = cultureData.length;

    // Determine responsive slide count limits
    function getVisibleSlidesCount() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function getMaxSlides() {
        return Math.max(0, totalCards - getVisibleSlidesCount());
    }

    function updateDots() {
        dotsContainer.innerHTML = '';
        const dotsCount = getMaxSlides() + 1;

        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('span');
            dot.className = `dot ${i === currentSlide ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                currentSlide = i;
                moveSlider();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function moveSlider() {
        // Limit slide bounds
        const maxSlides = getMaxSlides();
        if (currentSlide < 0) currentSlide = 0;
        if (currentSlide > maxSlides) currentSlide = maxSlides;

        const cardWidthPercent = 100 / getVisibleSlidesCount();
        const gapOffset = 30 * currentSlide / getVisibleSlidesCount(); // 30px is gap in CSS

        // Dynamic track translation calculation
        const percentTranslation = currentSlide * cardWidthPercent;

        // Apply styling transform
        track.style.transform = `translateX(calc(-${percentTranslation}% - ${currentSlide * 20}px))`;

        // Update dot highlights
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Button controls click listeners
    nextBtn.addEventListener('click', () => {
        currentSlide++;
        moveSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentSlide--;
        moveSlider();
    });

    // ------------------------------------------------------------------
    // TOUCH SWIPE SUPPORT (mobile)
    // Uses touchstart / touchmove / touchend â€” no external libraries.
    // Minimum threshold of 50px filters out accidental micro-drags.
    // The vertical guard prevents stealing vertical page-scroll gestures.
    // { passive: false } on touchmove lets us call preventDefault() to
    // stop page judder when a horizontal swipe is confirmed.
    // ------------------------------------------------------------------
    const sliderContainer = document.getElementById('slider-container');
    if (!sliderContainer) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false; // true once we've committed to a horizontal drag

    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        isSwiping = false;
    }, { passive: true });

    sliderContainer.addEventListener('touchmove', (e) => {
        const deltaX = e.changedTouches[0].screenX - touchStartX;
        const deltaY = e.changedTouches[0].screenY - touchStartY;

        // Commit to horizontal swipe only when horizontal movement is dominant
        if (!isSwiping && Math.abs(deltaX) > Math.abs(deltaY)) {
            isSwiping = true;
        }

        // Once committed to horizontal swipe, block vertical page scroll
        if (isSwiping) {
            e.preventDefault();
        }
    }, { passive: false });

    sliderContainer.addEventListener('touchend', (e) => {
        if (!isSwiping) return; // was a vertical scroll â€” do nothing

        const deltaX = e.changedTouches[0].screenX - touchStartX;
        const SWIPE_THRESHOLD = 50; // px â€” ignore accidental micro-drags

        if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
            if (deltaX < 0) {
                // Swiped left â†’ advance to next slide
                currentSlide++;
            } else {
                // Swiped right â†’ go back to previous slide
                currentSlide--;
            }
            moveSlider();
        }

        isSwiping = false;
    }, { passive: true });
    // ------------------------------------------------------------------

    // Initialize layout dots
    updateDots();

    // Re-adjust slider items on resize
    window.addEventListener('resize', () => {
        const max = getMaxSlides();
        if (currentSlide > max) {
            currentSlide = max;
        }
        updateDots();
        moveSlider();
    });
}

/* ==========================================================================
   6. FOOD QUIZ GAME
   ========================================================================== */

function initQuiz() {
    // Screen containers
    const introScreen = document.getElementById('quiz-intro-screen');
    const questionScreen = document.getElementById('quiz-question-screen');
    const resultScreen = document.getElementById('quiz-result-screen');

    // Buttons
    const startBtn = document.getElementById('btn-start-quiz');
    const restartBtn = document.getElementById('btn-restart-quiz');
    const heroStartBtn = document.getElementById('btn-start-quiz-hero');

    // Gameplay fields
    const currentQNum = document.getElementById('current-q-num');
    const progressFill = document.getElementById('quiz-progress-fill');
    const questionText = document.getElementById('quiz-question-text');
    const optionsGrid = document.getElementById('quiz-options-grid');
    const feedback = document.getElementById('quiz-feedback');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackText = document.getElementById('feedback-text');
    const finalScore = document.getElementById('quiz-final-score');
    const resultMsg = document.getElementById('quiz-result-message');

    let currentQuestionIndex = 0;
    let score = 0;
    let locked = false;

    // Start triggers
    if (startBtn) startBtn.addEventListener('click', startQuiz);
    if (restartBtn) restartBtn.addEventListener('click', startQuiz);

    if (heroStartBtn) {
        heroStartBtn.addEventListener('click', () => {
            // Scroll to quiz and start
            document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
            startQuiz();
        });
    }

    function startQuiz() {
        if (!introScreen) return;
        currentQuestionIndex = 0;
        score = 0;
        locked = false;

        introScreen.classList.add('hidden');
        resultScreen.classList.add('hidden');
        questionScreen.classList.remove('hidden');

        loadQuestion();
    }

    function loadQuestion() {
        locked = false;
        feedback.classList.add('hidden');

        const q = quizQuestions[currentQuestionIndex];
        const shuffledOptions = [...q.options];
        for (let i = shuffledOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
        }

        // Set texts and fills
        currentQNum.innerText = currentQuestionIndex + 1;
        progressFill.style.width = ((currentQuestionIndex + 1) / 8 * 100) + '%';
        questionText.innerText = q.question;

        // Load Options buttons
        optionsGrid.innerHTML = '';
        shuffledOptions.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt;
            btn.addEventListener('click', () => selectOption(btn, opt));
            optionsGrid.appendChild(btn);
        });
    }

    function selectOption(clickedBtn, selectedVal) {
        if (locked) return;
        locked = true;

        const q = quizQuestions[currentQuestionIndex];
        const isCorrect = (selectedVal === q.answer);

        const optionBtns = optionsGrid.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            btn.classList.add('disabled');
            // Show correct solution regardless
            if (btn.innerText === q.answer) {
                btn.classList.add('correct');
            }
        });

        if (isCorrect) {
            clickedBtn.classList.add('correct');
            score++;
            showFeedback(true);
        } else {
            clickedBtn.classList.add('wrong');
            showFeedback(false, q.answer);
        }

        // Delay loading next stage
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizQuestions.length) {
                loadQuestion();
            } else {
                showResults();
            }
        }, 1800);
    }

    function showFeedback(isCorrect, correctAnswer) {
        feedback.classList.remove('hidden', 'correct', 'wrong');

        if (isCorrect) {
            feedback.classList.add('correct');
            feedbackIcon.innerText = '✅';
            feedbackText.innerText = 'Correct! Great job!';
        } else {
            feedback.classList.add('wrong');
            feedbackIcon.innerText = '❌';
            feedbackText.innerText = `Incorrect. The answer is ${correctAnswer}`;
        }
    }

    function showResults() {
        questionScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');

        finalScore.innerText = score;

        // Select message matching rank
        if (score === 8) {
            resultMsg.innerText = "Incredible Mastermind!  🥳 You scored a perfect 8/8! You are an expert on India's vast culinary heritage!";
            document.getElementById('quiz-result-icon').innerText = '🎉';
        } else if (score >= 5) {
            resultMsg.innerText = `Great score! 👍 You got ${score}/8 correct. You have a solid grasp of Indian cuisine!`;
            document.getElementById('quiz-result-icon').innerText = '🎉';
        } else {
            resultMsg.innerText = `You scored ${score}/8. Keep exploring the interactive map and food lists to discover more flavors! 🍛`;
            document.getElementById('quiz-result-icon').innerText = '🍛';
        }
    }
}

/* ==========================================================================
   SUB-PAGES INITIALIZATION LOGIC & MAPPINGS
   ========================================================================== */

// Stubs for lazy-loaded pages
function initCuisinePage() {}
function initFestivalsPage() {}



/* ==========================================================================
   WEB AUDIO API SOUNDSCAPE SYNTHESIZER
   ========================================================================== */
var audioCtx = null;
var soundscapeActive = false;
var audioTimeout = null;
var currentFestivalPlaying = '';
var activeAudioNodes = [];

function initAudioSynth() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playSoundscape(festName, drumElement) {
    initAudioSynth();
    stopSoundscape();

    soundscapeActive = true;
    currentFestivalPlaying = festName;

    if (festName === "Diwali") {
        playDiwaliSoundscape(drumElement);
    } else if (festName === "Holi") {
        playHoliSoundscape();
    } else if (festName === "Eid") {
        playEidSoundscape();
    } else if (festName === "Pongal") {
        playPongalSoundscape();
    } else if (festName === "Navratri") {
        playNavratriSoundscape(drumElement);
    } else if (festName === "Bihu") {
        playBihuSoundscape(drumElement);
    }
}

function stopSoundscape() {
    soundscapeActive = false;
    currentFestivalPlaying = '';
    if (audioTimeout) {
        clearTimeout(audioTimeout);
        audioTimeout = null;
    }
    // Stop all active running nodes to prevent leaks (especially Eid drone)
    activeAudioNodes.forEach(node => {
        try {
            node.stop();
        } catch (e) {
            // Already stopped or not started
        }
    });
    activeAudioNodes = [];
}

// 1. Diwali Sparkler crackles & dynamic flame flickers
function playDiwaliSoundscape(flameElement) {
    if (!soundscapeActive || currentFestivalPlaying !== "Diwali") return;

    const time = audioCtx.currentTime;
    const bufferSize = audioCtx.sampleRate * 0.08;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() > 0.985 ? (Math.random() * 2 - 1) : 0;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 5000;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.06, time);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    noise.start();

    // Sparkle flicker visual sync
    if (flameElement && Math.random() > 0.5) {
        flameElement.style.transform = `scale(${Math.random() * 0.2 + 0.95}) rotate(${Math.random() * 4 - 2}deg)`;
        setTimeout(() => {
            if (flameElement) flameElement.style.transform = '';
        }, 100);
    }

    audioTimeout = setTimeout(() => playDiwaliSoundscape(flameElement), 80 + Math.random() * 150);
}

// 2. Holi Dhol strike rhythm
function playHoliSoundscape() {
    let beatIndex = 0;
    const tempo = 120;
    const beatDuration = 60 / tempo;

    function playBeatLoop() {
        if (!soundscapeActive || currentFestivalPlaying !== "Holi") return;

        const pattern = [1, 0, 0.6, 1, 1, 0, 0.6, 0.4];
        const strength = pattern[beatIndex % pattern.length];

        if (strength > 0) {
            synthesizeDholStrike(strength);
        }

        beatIndex++;
        audioTimeout = setTimeout(playBeatLoop, (beatDuration * 1000) / 2);
    }
    playBeatLoop();
}

function synthesizeDholStrike(strength) {
    const time = audioCtx.currentTime;

    // Low drum body
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(strength >= 1 ? 65 : 85, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.35);

    gain.gain.setValueAtTime(strength * 0.45, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.35);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(time);
    osc.stop(time + 0.4);

    // High head snap
    const snapOsc = audioCtx.createOscillator();
    const snapGain = audioCtx.createGain();
    snapOsc.type = "triangle";
    snapOsc.frequency.setValueAtTime(280, time);
    snapOsc.frequency.exponentialRampToValueAtTime(80, time + 0.07);

    snapGain.gain.setValueAtTime(strength * 0.1, time);
    snapGain.gain.exponentialRampToValueAtTime(0.01, time + 0.07);

    snapOsc.connect(snapGain);
    snapGain.connect(audioCtx.destination);
    snapOsc.start(time);
    snapOsc.stop(time + 0.08);
}

// 3. Eid Serene ambient drone & hanging chimes
function playEidSoundscape() {
    let chimeIndex = 0;

    // Continuous ambient drone oscillators
    const drone1 = audioCtx.createOscillator();
    const drone2 = audioCtx.createOscillator();
    const droneGain = audioCtx.createGain();

    drone1.type = "sine";
    drone1.frequency.value = 110; // A2
    drone2.type = "triangle";
    drone2.frequency.value = 165; // E3
    droneGain.gain.value = 0.035;

    drone1.connect(droneGain);
    drone2.connect(droneGain);
    droneGain.connect(audioCtx.destination);

    drone1.start();
    drone2.start();

    activeAudioNodes.push(drone1, drone2);

    function playChimeLoop() {
        if (!soundscapeActive || currentFestivalPlaying !== "Eid") {
            try { drone1.stop(); } catch (e) { }
            try { drone2.stop(); } catch (e) { }
            return;
        }

        const scale = [440, 494, 554, 659, 740]; // Pentatonic Major
        const freq = scale[chimeIndex % scale.length];

        const time = audioCtx.currentTime;
        const chime = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        chime.type = "sine";
        chime.frequency.value = freq;
        gain.gain.setValueAtTime(0.12, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 1.5);

        chime.connect(gain);
        gain.connect(audioCtx.destination);
        chime.start(time);
        chime.stop(time + 1.6);

        chimeIndex++;
        audioTimeout = setTimeout(playChimeLoop, 1500 + Math.random() * 2000);
    }
    playChimeLoop();
}

// 4. Pongal Harvest syncopations
function playPongalSoundscape() {
    let beatIndex = 0;
    const tempo = 96;
    const beatDuration = 60 / tempo;

    function playPongalLoop() {
        if (!soundscapeActive || currentFestivalPlaying !== "Pongal") return;

        const pattern = [1, 0, 0, 1, 0.5, 0, 1, 0.4];
        const strength = pattern[beatIndex % pattern.length];

        if (strength > 0) {
            synthesizeClap(strength);
        }

        beatIndex++;
        audioTimeout = setTimeout(playPongalLoop, (beatDuration * 1000) / 2);
    }
    playPongalLoop();
}

function synthesizeClap(strength) {
    const time = audioCtx.currentTime;
    const bufferSize = audioCtx.sampleRate * 0.08;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1100;
    filter.Q.value = 3;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(strength * 0.16, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.07);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    noise.start(time);
}

// 5. Navratri Dandiya tapping sticks
function playNavratriSoundscape(sticksElement) {
    let beatIndex = 0;
    const tempo = 124;
    const beatDuration = 60 / tempo;

    function playNavratriLoop() {
        if (!soundscapeActive || currentFestivalPlaying !== "Navratri") return;

        const pattern = [1, 1, 0.6, 1, 0, 1, 1, 0.6];
        const strength = pattern[beatIndex % pattern.length];

        if (strength > 0) {
            synthesizeDandiyaStrike(strength);
            if (sticksElement) {
                sticksElement.classList.add('beat-pulse');
                setTimeout(() => sticksElement.classList.remove('beat-pulse'), 150);
            }
        }

        beatIndex++;
        audioTimeout = setTimeout(playNavratriLoop, (beatDuration * 1000) / 2);
    }
    playNavratriLoop();
}

function synthesizeDandiyaStrike(strength) {
    const time = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(1350, time);
    osc.frequency.exponentialRampToValueAtTime(750, time + 0.04);

    gain.gain.setValueAtTime(strength * 0.14, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(time);
    osc.stop(time + 0.05);
}

// 6. Bihu High-tempo Assamese Dhol beat
function playBihuSoundscape(drumElement) {
    let beatIndex = 0;
    const tempo = 142;
    const beatDuration = 60 / tempo;

    function playBihuLoop() {
        if (!soundscapeActive || currentFestivalPlaying !== "Bihu") return;

        const pattern = [1, 0.5, 1, 0.5, 1, 1, 0.5, 1];
        const strength = pattern[beatIndex % pattern.length];

        if (strength > 0) {
            synthesizeDholStrike(strength * 1.1);
            if (drumElement) {
                drumElement.classList.add('beat-pulse');
                setTimeout(() => drumElement.classList.remove('beat-pulse'), 150);
            }
        }

        beatIndex++;
        audioTimeout = setTimeout(playBihuLoop, (beatDuration * 1000) / 2);
    }
    playBihuLoop();
}

// 7. Generic State Ambient Drone
function playStateSoundscape(stateName) {
    initAudioSynth();
    stopSoundscape();

    soundscapeActive = true;
    currentFestivalPlaying = "State";

    // Play a mystical sitar/flute-like ambient drone
    const drone1 = audioCtx.createOscillator();
    const drone2 = audioCtx.createOscillator();
    const droneGain = audioCtx.createGain();

    drone1.type = "sine";
    drone1.frequency.value = 146.83; // D3
    drone2.type = "triangle";
    drone2.frequency.value = 220.00; // A3

    droneGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    droneGain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 2); // Fade in

    drone1.connect(droneGain);
    drone2.connect(droneGain);
    droneGain.connect(audioCtx.destination);

    drone1.start();
    drone2.start();

    activeAudioNodes.push(drone1, drone2);

    // Add occasional wind chimes/bells
    function playStateChime() {
        if (!soundscapeActive || currentFestivalPlaying !== "State") return;

        const scale = [587.33, 659.25, 739.99, 880.00, 987.77]; // D Major Pentatonic
        const freq = scale[Math.floor(Math.random() * scale.length)];

        const time = audioCtx.currentTime;
        const chime = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        chime.type = "sine";
        chime.frequency.value = freq;
        gain.gain.setValueAtTime(0.08, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 2);

        chime.connect(gain);
        gain.connect(audioCtx.destination);
        chime.start(time);
        chime.stop(time + 2.1);

        audioTimeout = setTimeout(playStateChime, 2000 + Math.random() * 4000);
    }
    playStateChime();
}


/* ==========================================================================
   SUB-PAGES INITIALIZATION LOGIC STUBS
   ========================================================================== */
function initCulturePage() { console.log("Culture page stub called"); }
function initSportsPage() { console.log("Sports page stub called"); }
function initSciencePage() { console.log("Science page stub called"); }
function initMusicPage() { console.log("Music page stub called"); }
function initLiteraturePage() { console.log("Literature page stub called"); }
function initDancePage() { console.log("Dance page stub called"); }
function initStartupPage() { console.log("Startup page stub called"); }
function initPersonalitiesPage() { console.log("Personalities page stub called"); }
function initSpiritualCarousel() { console.log("Spiritual page stub called"); }
function initRoadTripFlipCards() { console.log("Roadtrip page stub called"); }


function initBharatGuide() {
    const fabGuide = document.getElementById('fab-guide');
    const chatWindow = document.getElementById('guide-chat-window');
    const btnCloseChat = document.getElementById('btn-close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const btnSendMsg = document.getElementById('btn-send-msg');

    if (!fabGuide) return; // Not on this page

    // Knowledge Graph is now loaded from chatbot-data.js

    let isSynthesizing = false;

    // Toggle Chat
    fabGuide.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open')) {
            chatInput.focus();
        }
    });

    btnCloseChat.addEventListener('click', () => {
        chatWindow.classList.remove('open');
        if (isSynthesizing) {
            window.speechSynthesis.cancel();
            isSynthesizing = false;
        }
    });

    // Send Message
    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add user message
        addMessage(text, 'user-message');
        chatInput.value = '';

        // Determine bot response using external knowledge base
        let response = "I'm sorry, I seem to be having trouble accessing my knowledge base. Let's try again later.";
        if (typeof findBestResponse === 'function') {
            response = findBestResponse(text);
        }

        // Show typing indicator
        const typingId = showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator(typingId);
            addMessage(response, 'bot-message');
            speakResponse(response);
        }, 1200 + Math.random() * 800);
    }

    btnSendMsg.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Chat UI helpers
    function addMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${className}`;
        msgDiv.innerHTML = `<div class="message-content">${text}</div>`;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot-message';
        msgDiv.id = id;
        msgDiv.innerHTML = `
            <div class="message-content typing-indicator">
                <span></span><span></span><span></span>
            </div>
        `;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
        return id;
    }

    function removeTypingIndicator(id) {
        const indicator = document.getElementById(id);
        if (indicator) {
            indicator.remove();
        }
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Web Speech API (Text-to-Speech)
    function speakResponse(text) {
        if (!('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel(); // Cancel any ongoing speech

        const utterance = new SpeechSynthesisUtterance(text);

        // Try to find an Indian English voice for authenticity
        const voices = window.speechSynthesis.getVoices();
        const indianVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India'));

        if (indianVoice) {
            utterance.voice = indianVoice;
        }

        utterance.rate = 0.95;
        utterance.pitch = 1.0;

        isSynthesizing = true;
        utterance.onend = () => { isSynthesizing = false; };

        window.speechSynthesis.speak(utterance);
    }

    // Ensure voices are loaded (Chrome issue)
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.getVoices();
        };
    }
}


// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

