// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Initialize home page components
  initHomepage();
  
  // Stats panel removed
  
  // Define map and markers as global variables to access throughout the app
  let map = null;
  let markers = null;
  
  // Initialize map when needed
  function initMap() {
    // If map already initialized, just return it
    if (map) return map;
    
    console.log("Initializing map..."); // Debug log
    
    try {
      // First, make sure the map container is visible
      const mapContainer = document.getElementById('map');
      if (!mapContainer) {
        console.error("Map container not found!");
        return null;
      }
      
      // Ensure map container has dimensions
      mapContainer.style.height = '100%';
      mapContainer.style.width = '100%';
      
      console.log("Map container dimensions:", 
                  mapContainer.clientWidth, "×", mapContainer.clientHeight);
      
      if (mapContainer.clientWidth === 0 || mapContainer.clientHeight === 0) {
        console.warn("Map container has zero dimensions, fixing...");
        // Force dimensions if container is hidden or collapsed
        mapContainer.style.height = 'calc(100vh - 70px)';
        mapContainer.style.width = '100%';
        mapContainer.style.display = 'block';
      }
      
      // Initialize map with modern styling - simplified for mobile
      map = L.map('map', {
        zoomControl: true, // Use default zoom controls for better mobile touch support
        minZoom: 10,  // Don't let users zoom out too far
        maxZoom: 18,  // Limit maximum zoom to maintain performance
        maxBoundsViscosity: 1.0,  // Keep map within NYC area bounds
        attributionControl: true,
        fadeAnimation: true
      }).setView([40.7500, -73.9700], 11);
      
      // Save map instance to DOM for external script access
      document.querySelector('#map').__leaflet_instance__ = map;
      
      // Add tile layer with high contrast styling for better mobile visibility
      // Restore the original light-styled map tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        maxZoom: 19,
        detectRetina: true  // Support high-DPI displays like iPhone
      }).addTo(map);
      
      // Initialize markers layer group
      markers = L.layerGroup().addTo(map);
      
      // Set up event handlers for the map
      setupMapEventHandlers();
      
      // Force a resize after initialization
      setTimeout(() => {
        map.invalidateSize();
        console.log("Forced map resize after initialization");
        
        // Remove the loading indicator if it exists
        const loadingEl = document.getElementById('map-loading');
        if (loadingEl) {
          loadingEl.style.display = 'none';
        }
      }, 100);
      
      console.log("Map initialized successfully");
      return map;
    } catch (error) {
      console.error("Error initializing map:", error);
      return null;
    }
  }
  
  // Initialize map on first load if starting on map view
  if (document.querySelector('#map-view.active')) {
    map = initMap();
  }
  
  // Custom Apple-style marker icon with refined touch target for mobile
  const customIcon = L.divIcon({
    className: 'custom-map-marker',
    html: '<div class="marker-inner"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10] // Position popup slightly above marker
  });

  // Markers group is now defined at the top as a global
  
  // Stats panel removed
  
  // Navigation event listeners
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = link.getAttribute('data-view');
      
      // Update active navigation link
      navLinks.forEach(el => el.classList.remove('active'));
      link.classList.add('active');
      
      // Update active view
      document.querySelectorAll('.view-container').forEach(el => {
        el.classList.remove('active');
      });
      document.getElementById(`${view}-view`).classList.add('active');
      
      // Handle classes for different views
      document.body.classList.remove('home-active', 'map-active');
      
      // View-specific logic
      if (view === 'home') {
        document.body.classList.add('home-active');
      } else if (view === 'map') {
        console.log("Switching to map view...");
        document.body.classList.add('map-active');
        
        // First ensure the map container has proper dimensions before initializing
        const mapContainer = document.getElementById('map');
        mapContainer.style.height = '100%';
        mapContainer.style.width = '100%'; 
        
        // Wait a tick for the DOM to update
        setTimeout(() => {
          // Initialize map if not done yet
          if (!map) {
            console.log("Initializing map for map view...");
            map = initMap();
          }
          
          // Important: wrap map usage in a try/catch to handle potential errors
          setTimeout(() => {
            try {
              if (map) {
                console.log("Resizing map...");
                map.invalidateSize();
                
                // Re-render deals to show markers
                console.log("Re-rendering deals for map view...");
                renderDeals();
              } else {
                console.error("Map not available, initialization may have failed");
                // Try one more time
                console.log("Attempting to initialize map again...");
                map = initMap();
                if (map) {
                  console.log("Map initialized on second attempt");
                  map.invalidateSize();
                  renderDeals();
                }
              }
            } catch (error) {
              console.error("Error updating map:", error);
            }
          }, 300); // Increased timeout for better reliability
        }, 100);
      }
    });
  });
  
  // Filter event listeners
  const neighborhoodFilter = document.getElementById('neighborhood');
  const dayFilter = document.getElementById('day');
  
  // Initial render
  renderDeals();
  
  // Filter event listeners
  neighborhoodFilter.addEventListener('change', () => {
    renderDeals();
    // Add subtle animation to indicate refresh
    document.body.classList.add('filters-changed');
    setTimeout(() => {
      document.body.classList.remove('filters-changed');
    }, 300);
  });
  
  dayFilter.addEventListener('change', () => {
    renderDeals();
    // Add subtle animation to indicate refresh
    document.body.classList.add('filters-changed');
    setTimeout(() => {
      document.body.classList.remove('filters-changed');
    }, 300);
  });
  
  // Function to render deals based on filters
  function renderDeals() {
    const selectedNeighborhood = neighborhoodFilter.value;
    const selectedDay = dayFilter.value;
    
    // Filter deals
    const filteredDeals = happyHourDeals.filter(deal => {
      const neighborhoodMatch = selectedNeighborhood === 'all' || deal.neighborhood === selectedNeighborhood;
      const dayMatch = selectedDay === 'all' || deal.days.includes(selectedDay);
      
      return neighborhoodMatch && dayMatch;
    });
    
    // Render map markers
    renderMapMarkers(filteredDeals);
    
    // Render list view
    renderListView(filteredDeals);
  }
  
  // Stats panel functionality removed
  
  // Use the confirmed working path pattern for all images
  function getImageUrl(imagePath) {
    if (!imagePath) return null;
    
    // We know the working path is "images/[filename]"
    return imagePath;
  }
  
  // Function to render map markers with Apple-style
  function renderMapMarkers(deals) {
    // Only attempt to render if the map view is active, otherwise wait
    if (!document.querySelector('#map-view.active')) {
      console.log("Map view is not active, skipping marker rendering");
      return;
    }
    
    // Make sure map is initialized
    if (!map) {
      console.log("Map not initialized yet, initializing now...");
      map = initMap();
      
      // If map initialization failed, don't proceed
      if (!map) {
        console.error("Failed to initialize map, cannot render markers");
        return;
      }
    }
    
    console.log(`Rendering ${deals.length} markers on map`);
    
    // Make sure markers group exists
    if (!markers) {
      markers = L.layerGroup().addTo(map);
    }
    
    // Clear existing markers
    markers.clearLayers();
    
    deals.forEach(deal => {
      const marker = L.marker(deal.location, { icon: customIcon })
        .bindPopup(`
          <div class="popup-content">
            ${deal.imagePath ? `<div class="popup-image-container">
              <img src="${getImageUrl(deal.imagePath)}" alt="${deal.name}" class="popup-image">
            </div>` : ''}
            <h3>${deal.name}</h3>
            <p>${deal.address}</p>
            <p><strong>${deal.hours}</strong></p>
            <p>${deal.deals}</p>
            ${deal.website ? `<a href="${deal.website}" target="_blank" class="website-link">Visit Website</a>` : ''}
            <a href="#" class="popup-link" data-id="${deal.id}">View Details</a>
          </div>
        `, {
          maxWidth: 300,
          className: 'custom-popup'
        });
      
      markers.addLayer(marker);
    });
    
    // If we have deals, fit bounds to see all markers
    if (deals.length > 0 && map) {
      try {
        const bounds = L.featureGroup(markers.getLayers()).getBounds();
        map.fitBounds(bounds, { padding: [50, 50] });
      } catch (e) {
        console.error('Error fitting bounds:', e);
        // Fallback to default view
        map.setView([40.7500, -73.9700], 11);
      }
    }
  }
  
  // Function to render list view with load animation
  function renderListView(deals) {
    const dealsContainer = document.getElementById('deals-list');
    dealsContainer.innerHTML = '';
    
    if (deals.length === 0) {
      dealsContainer.innerHTML = '<div class="no-results">No happy hour deals match your filters.</div>';
      return;
    }
    
    // Log for debugging
    console.log(`Rendering ${deals.length} deals in list view`);
    
    // Debug: Log image paths
    const dealsWithImages = deals.filter(deal => deal.imagePath);
    console.log(`Deals with images: ${dealsWithImages.length}`);
    
    // Debug removed - we know the working path pattern now
    
    // Create fragment for better performance
    const fragment = document.createDocumentFragment();
    
    deals.forEach((deal, index) => {
      const dealCard = document.createElement('div');
      dealCard.className = 'deal-card';
      dealCard.style.animationDelay = `${index * 0.05}s`;
      
      dealCard.innerHTML = `
        ${deal.imagePath ? `<div class="deal-image-container">
          <img src="${getImageUrl(deal.imagePath)}" alt="${deal.name}" class="deal-image">
        </div>` : ''}
        <div class="deal-info">
          <h3 class="deal-name">${deal.name}</h3>
          <p class="deal-location">${deal.subNeighborhood || deal.neighborhood}</p>
          <p class="deal-address">${deal.address}</p>
          <p class="deal-time">${deal.hours} • ${formatDays(deal.days)}</p>
          <p class="deal-description">${deal.description || ''}</p>
          <p class="deal-deals"><strong>Deals:</strong> ${deal.deals}</p>
          ${deal.website ? `<p class="deal-website"><a href="${deal.website}" target="_blank">Visit Website</a></p>` : ''}
        </div>
      `;
      
      fragment.appendChild(dealCard);
    });
    
    dealsContainer.appendChild(fragment);
    
    // Force reflow to ensure cards are added to DOM before animation
    window.getComputedStyle(dealsContainer).opacity;
    
    // Add animation class immediately after reflow
    document.querySelectorAll('.deal-card').forEach(card => {
      card.classList.add('fade-in');
    });
    
    // Fix for mobile: ensure the container has proper height
    if (window.innerWidth <= 768) {
      // Reset map-active class when in list view
      if (document.querySelector('#list-view.active')) {
        document.body.classList.remove('map-active');
      }
    }
  }
  
  // Helper function to format days
  function formatDays(days) {
    if (days.length === 7) {
      return 'Everyday';
    }
    
    // If days include the entire weekend
    if (days.includes('saturday') && days.includes('sunday') && days.length === 2) {
      return 'Weekends';
    }
    
    // If days are Monday through Friday
    if (days.length === 5 && 
        days.includes('monday') && 
        days.includes('tuesday') && 
        days.includes('wednesday') && 
        days.includes('thursday') && 
        days.includes('friday') && 
        !days.includes('saturday') && 
        !days.includes('sunday')) {
      return 'Weekdays';
    }
    
    // Otherwise, just list the days
    const dayMap = {
      'monday': 'Mon',
      'tuesday': 'Tue',
      'wednesday': 'Wed',
      'thursday': 'Thu',
      'friday': 'Fri',
      'saturday': 'Sat',
      'sunday': 'Sun'
    };
    
    return days.map(day => dayMap[day]).join(', ');
  }
  
  // Map event handlers - set up when map is initialized
  function setupMapEventHandlers() {
    if (!map) return;
    
    // Handle popup link clicks
    map.on('popupopen', function(e) {
      const popupLink = e.popup._contentNode.querySelector('.popup-link');
      
      if (popupLink) {
        popupLink.addEventListener('click', function(e) {
          e.preventDefault();
          const dealId = parseInt(this.getAttribute('data-id'));
          const deal = happyHourDeals.find(d => d.id === dealId);
          
          if (deal) {
            console.log("View details clicked for:", deal.name);
            
            // Switch to list view
            document.querySelector('nav a[data-view="list"]').click();
            
            // Scroll to the deal card after a short delay to allow view switching
            setTimeout(() => {
              // Get all deal cards after view has changed
              const dealCards = document.querySelectorAll('.deal-card');
              console.log("Found deal cards:", dealCards.length);
              
              // Find the card by name rather than index
              // This is more reliable as the cards might be filtered differently
              let targetCard = null;
              
              for (const card of dealCards) {
                const nameEl = card.querySelector('.deal-name');
                if (nameEl && nameEl.textContent.trim() === deal.name) {
                  targetCard = card;
                  break;
                }
              }
              
              if (targetCard) {
                console.log("Found matching card:", deal.name);
                
                // Add enlarged class for visual emphasis
                targetCard.classList.add('enlarged', 'highlight');
                
                // Make sure it's in view
                targetCard.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'center' 
                });
                
                // Remove effects after animation - longer duration for better visibility
                setTimeout(() => {
                  targetCard.classList.remove('highlight');
                  
                  // Keep enlarged even longer
                  setTimeout(() => {
                    targetCard.classList.remove('enlarged');
                  }, 2000);
                }, 3000);
              } else {
                console.log("Could not find card for:", deal.name);
              }
            }, 500);
          }
        });
      }
    });
  }
  
  // Add CSS for custom marker and mobile optimizations
  const style = document.createElement('style');
  style.innerHTML = `
    .custom-map-marker {
      background: transparent;
      border: none;
      contain: layout paint style;
    }
    .marker-inner {
      width: 14px; /* Smaller, more subtle size */
      height: 14px;
      background: #0071e3;
      border-radius: 50%;
      box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.2);
      transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
      will-change: transform, box-shadow;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .leaflet-marker-icon:hover .marker-inner {
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.15);
    }
    .filters-changed .deals-container {
      opacity: 0.8;
      transition: opacity 0.3s;
    }
    .deal-card {
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.5s, transform 0.5s;
    }
    .deal-card.fade-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* iOS Specific Enhancements */
    @supports (-webkit-touch-callout: none) {
      /* Smoother scrolling on iOS */
      body {
        -webkit-overflow-scrolling: touch;
      }
      
      /* Fix for iOS tap highlight color */
      a, button, select, .deal-card, .stats-panel-header {
        -webkit-tap-highlight-color: transparent;
      }
      
      /* Make dropdowns work better on iOS */
      select {
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='6'><path d='M0 0h12L6 6z' fill='%231d1d1f'/></svg>");
        background-repeat: no-repeat;
        background-position: right 8px center;
        padding-right: 24px !important;
      }
      
      /* Better touch scrolling for panels */
      .stats-panel-content {
        -webkit-overflow-scrolling: touch;
      }
      
      /* Prevent zooming on form elements */
      .filter select {
        font-size: 16px;
      }
      
      /* Fix dropdowns on iOS */
      @media (max-width: 768px) {
        .filter select {
          z-index: 1001;
        }
        
        /* Stop weird iOS form behavior */
        header.collapsed {
          pointer-events: none;
        }
        
        header.collapsed h1,
        header.collapsed .menu-toggle {
          pointer-events: auto;
        }
      }
    }
    
    /* Remove hover effects on touch devices */
    @media (hover: none) {
      .deal-website a:hover, .popup-link:hover, .website-link:hover {
        background-color: rgba(0, 113, 227, 0.1);
        color: #0071e3;
      }
      
      .leaflet-marker-icon:hover .marker-inner {
        transform: translate(-50%, -50%);
        box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.2);
      }
      
      .leaflet-marker-icon:active .marker-inner {
        transform: translate(-50%, -50%) scale(1.1);
        box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.15);
        transition: transform 0.1s ease-out, box-shadow 0.1s ease-out;
      }
      
      .deal-card:hover {
        transform: none;
        box-shadow: none;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Window resize handler to handle orientation changes
  window.addEventListener('resize', function() {
    // Only proceed if map view is active and map exists
    if (document.querySelector('#map-view.active')) {
      console.log("Window resize detected, map view is active");
      
      if (map) {
        console.log("Resizing map on window resize");
        setTimeout(() => {
          try {
            map.invalidateSize();
            console.log("Map resized successfully");
          } catch (error) {
            console.error("Error resizing map:", error);
          }
        }, 300); // Increased timeout for better reliability
      } else {
        console.log("Map not initialized yet, initializing on resize");
        // Try to initialize the map if not done yet
        map = initMap();
      }
    }
  });
  
  // Function to initialize homepage content and carousel
  function initHomepage() {
    // Create carousel items from featured deals
    const featuredDeals = getFeaturedDeals();
    populateCarousel(featuredDeals);
    initCarouselControls();
    
    // Set initial body class for homepage
    if (document.querySelector('#home-view.active')) {
      document.body.classList.add('home-active');
    }
    
    // Set up category and neighborhood clicks
    setupHomepageInteractions();
  }
  
  // Get featured deals - selecting some attractive ones with images
  function getFeaturedDeals() {
    // Find deals that have images and interesting descriptions
    return happyHourDeals
      .filter(deal => deal.imagePath && deal.description)
      .sort(() => 0.5 - Math.random()) // Randomize
      .slice(0, 6); // Take top 6
  }
  
  // Populate the carousel with featured deals
  function populateCarousel(deals) {
    const carousel = document.getElementById('featured-carousel');
    const carouselDots = document.getElementById('carousel-dots');
    
    if (!carousel || !carouselDots) return;
    
    // Clear existing content
    carousel.innerHTML = '';
    carouselDots.innerHTML = '';
    
    // Add items to carousel
    deals.forEach((deal, index) => {
      // Create carousel item
      const item = document.createElement('div');
      item.className = 'carousel-item';
      item.setAttribute('data-id', deal.id);
      
      // Format price indicator based on location
      const priceIndicator = 
        deal.neighborhood === 'west_village' || deal.neighborhood === 'soho' ? '$$$' : 
        deal.neighborhood === 'east_village' || deal.neighborhood === 'lower_east_side' ? '$$' : '$';
      
      item.innerHTML = `
        <img src="${deal.imagePath}" alt="${deal.name}" class="carousel-image">
        <div class="carousel-content">
          <h3 class="carousel-title">${deal.name}</h3>
          <p class="carousel-subtitle">${deal.subNeighborhood || getNeighborhoodDisplay(deal.neighborhood)}</p>
          <p class="carousel-description">${truncateText(deal.description || '', 80)}</p>
          <div class="carousel-details">
            <span class="carousel-time">${deal.hours}</span>
            <span class="carousel-price">${priceIndicator}</span>
          </div>
        </div>
      `;
      
      // Add click handler to go to this deal
      item.addEventListener('click', () => {
        // Set neighborhood and day filter
        document.getElementById('neighborhood').value = deal.neighborhood;
        
        // Switch to map view and center on this marker
        document.querySelector('nav a[data-view="map"]').click();
        
        // Find and open this marker's popup
        setTimeout(() => {
          const mapInstance = document.querySelector('#map').__leaflet_instance__;
          const layers = mapInstance._layers;
          
          for (const key in layers) {
            const layer = layers[key];
            if (layer._latlng && 
                layer._latlng.lat === deal.location[0] && 
                layer._latlng.lng === deal.location[1]) {
              mapInstance.setView(deal.location, 15);
              layer.openPopup();
              break;
            }
          }
        }, 500);
      });
      
      carousel.appendChild(item);
      
      // Create dot for this item
      const dot = document.createElement('div');
      dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
      dot.setAttribute('data-index', index);
      carouselDots.appendChild(dot);
    });
  }
  
  // Initialize carousel controls
  function initCarouselControls() {
    const carousel = document.getElementById('featured-carousel');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    // Previous button
    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -320, behavior: 'smooth' });
      updateActiveDot();
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: 320, behavior: 'smooth' });
      updateActiveDot();
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const items = carousel.querySelectorAll('.carousel-item');
        if (items[index]) {
          carousel.scrollLeft = items[index].offsetLeft - 40;
          updateActiveDot(index);
        }
      });
    });
    
    // Update active dot based on scroll position
    carousel.addEventListener('scroll', () => {
      updateActiveDot();
    });
    
    function updateActiveDot(forcedIndex = null) {
      // Calculate which item is most visible
      if (forcedIndex !== null) {
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === forcedIndex);
        });
        return;
      }
      
      const scrollLeft = carousel.scrollLeft;
      const itemWidth = 320; // Approximate width of item + gap
      const visibleIndex = Math.round(scrollLeft / itemWidth);
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === visibleIndex);
      });
    }
  }
  
  // Set up category and neighborhood clicks
  function setupHomepageInteractions() {
    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const category = card.getAttribute('data-category');
        
        // Set appropriate filters based on category
        switch (category) {
          case 'after-work':
            document.getElementById('day').value = 'monday';
            document.getElementById('neighborhood').value = 'all';
            break;
          case 'weekend':
            document.getElementById('day').value = 'saturday';
            document.getElementById('neighborhood').value = 'all';
            break;
          case 'late-night':
            document.getElementById('day').value = 'friday';
            document.getElementById('neighborhood').value = 'all';
            break;
          case 'rooftops':
            document.getElementById('day').value = 'all';
            document.getElementById('neighborhood').value = 'chelsea';
            break;
        }
        
        // Switch to list view
        document.querySelector('nav a[data-view="list"]').click();
      });
    });
    
    // Neighborhood items
    document.querySelectorAll('.neighborhood-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const neighborhood = item.getAttribute('data-neighborhood');
        
        // Set neighborhood filter
        document.getElementById('neighborhood').value = neighborhood;
        document.getElementById('day').value = 'all';
        
        // Switch to map view
        document.querySelector('nav a[data-view="map"]').click();
      });
    });
  }
  
  // Helper function to truncate text
  function truncateText(text, maxLength) {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
  
  // Helper function to get display name for neighborhood
  function getNeighborhoodDisplay(neighborhoodValue) {
    const option = document.querySelector(`#neighborhood option[value="${neighborhoodValue}"]`);
    return option ? option.textContent : neighborhoodValue;
  }
});