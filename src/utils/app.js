// Global variables to be used throughout the application
let map = null;
let markers = null;
let customIcon = null;
let showActiveHappyHoursOnly = false;
let useFakeTime = true; // Set to true to enable fake time for testing
const fakeTime = {
  // Set to Wednesday at 5:30pm - prime happy hour time
  day: 3, // 0 = Sunday, 3 = Wednesday
  hours: 17,
  minutes: 30
};

// Log fake time setting for debugging
console.log("FAKE TIME ENABLED:", useFakeTime);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // First, ensure correct view is shown on mobile
  // Check URL hash or default to home
  const hash = window.location.hash.substring(1) || 'home';
  const viewToActivate = document.getElementById(`${hash}-view`) ? hash : 'home';
  
  // Ensure only the correct view is shown
  document.querySelectorAll('.view-container').forEach(view => {
    view.classList.remove('active');
  });
  document.getElementById(`${viewToActivate}-view`).classList.add('active');
  
  // Update nav links
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-view') === viewToActivate) {
      link.classList.add('active');
    }
  });
  
  // Set body class
  document.body.classList.remove('home-active', 'map-active');
  if (viewToActivate === 'home') {
    document.body.classList.add('home-active');
  } else if (viewToActivate === 'map') {
    document.body.classList.add('map-active');
  }
  
  // Set up active happy hour filter buttons
  const activeNowNavBtn = document.getElementById('active-now-nav-btn');
  
  if (activeNowNavBtn) {
    activeNowNavBtn.addEventListener('click', () => {
      showActiveHappyHoursOnly = !showActiveHappyHoursOnly;
      renderDeals();
      
      // Show active count in console for debugging
      if (showActiveHappyHoursOnly) {
        countActiveHappyHours();
      }
      
      // Update all button states
      updateActiveHappyHourButtonState();
    });
  }
  
  // Count active happy hours on initial load for debugging and set up initial map view
  setTimeout(() => {
    // Turn off verbose logging for production - too noisy
    const verboseLogging = false;
    
    // Store original console methods
    const originalLog = console.log;
    const originalError = console.error;
    
    // If verbose logging is disabled, temporarily silence console
    if (!verboseLogging) {
      console.log = function() {};
      console.error = function() {};
    }
    
    console.log("=== Active Happy Hours Debug Info ===");
    const activeDeals = countActiveHappyHours();
    
    // Restore console methods
    console.log = originalLog;
    console.error = originalError;
    
    // Log summary info even if verbose logging is off
    console.log("=== SUMMARY ===");
    console.log("Active happy hours found:", activeDeals.length);
    console.log("First few active deals:", activeDeals.slice(0, 5).map(d => d.name));
    
    // Test 5 specific deals to verify time parsing
    console.log("\n=== TESTING SPECIFIC DEALS ===");
    const testDeals = [
      happyHourDeals[0],  // First deal
      happyHourDeals[10], // Random spot check
      happyHourDeals[20], // Random spot check
      happyHourDeals[30], // Random spot check
      happyHourDeals[50]  // Random spot check
    ];
    
    testDeals.forEach(deal => {
      console.log(`Testing ${deal.name}: ${deal.hours}`);
      const timeRange = parseTimeRange(deal.hours);
      console.log(`  Parsed as: ${timeRange ? `${timeRange.startTime}-${timeRange.endTime} minutes` : 'FAILED TO PARSE'}`);
    });
    
    // Force a render to show active happy hours button count
    updateActiveHappyHourButtonState();
    
    // Set initial map view regardless of current state
    if (map) {
      console.log("Forcing initial map view to reasonable zoom level");
      // Force a reasonable zoom level
      map.setView([40.7500, -73.9700], 10);
      map.invalidateSize();
    }
  }, 2000);
  
  // Initialize home page components
  initHomepage();
  
  // Stats panel removed
  
  // Map and markers are now defined globally at the top of the file
  
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
      
      // Initialize map with simplified options for better performance
      map = L.map('map', {
        zoomControl: true,
        minZoom: 10,
        maxZoom: 18,
        attributionControl: false, // Hide attribution for better performance
        fadeAnimation: false, // Disable animations for better performance
        zoomAnimation: false, // Disable animations for better performance
        markerZoomAnimation: false, // Disable animations for better performance
        preferCanvas: true // Use canvas renderer for better performance
      }).setView([40.7500, -73.9700], 10);
      
      // Save map instance to DOM for external script access
      document.querySelector('#map').__leaflet_instance__ = map;
      
      // Add light-themed map tiles for faster loading
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '',
        subdomains: 'abcd',
        maxZoom: 19,
        detectRetina: false  // Disable high-DPI support for better performance
      }).addTo(map);
      
      // Initialize marker clusters instead of simple layer group
      markers = L.markerClusterGroup({
        showCoverageOnHover: false,
        spiderfyOnMaxZoom: true,
        disableClusteringAtZoom: 16,
        maxClusterRadius: 50,
        iconCreateFunction: function(cluster) {
          const count = cluster.getChildCount();
          const currentZoom = map.getZoom();
          let html, className;
          
          // City overview (minimal info)
          if (currentZoom < 13) {
            html = `<div class="marker-cluster-inner"><span>${count}</span></div>`;
            className = 'cluster-minimal';
          } 
          // District view (add neighborhood info)
          else if (currentZoom < 15) {
            // Get most common neighborhood in this cluster
            const neighborhoods = getClusterNeighborhoods(cluster);
            const primaryNeighborhood = getMostCommon(neighborhoods);
            html = `<div class="marker-cluster-inner">
                      <span>${count}</span>
                      <div class="cluster-neighborhood">${primaryNeighborhood}</div>
                    </div>`;
            className = 'cluster-neighborhood';
          } 
          // Neighborhood view (more detailed)
          else {
            // Get active happy hours count
            const activeCount = getActiveHappyHours(cluster);
            html = `<div class="marker-cluster-inner">
                      <span>${count}</span>
                      ${activeCount > 0 ? `<div class="active-now">${activeCount} active</div>` : ''}
                    </div>`;
            className = activeCount > 0 ? 'cluster-active' : 'cluster-detailed';
          }
          
          // Size classes based on marker count
          let sizeClass;
          if (count < 10) {
            sizeClass = 'marker-cluster-small';
          } else if (count < 30) {
            sizeClass = 'marker-cluster-medium';
          } else {
            sizeClass = 'marker-cluster-large';
          }
          
          return L.divIcon({
            html: html,
            className: `custom-cluster-icon ${className} ${sizeClass}`,
            iconSize: L.point(40, 40)
          });
        }
      }).addTo(map);
      
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
      }, 500);
      
      console.log("Map initialized successfully");
      return map;
    } catch (error) {
      console.error("Error initializing map:", error);
      return null;
    }
  }
  
  // Initialize map immediately to have it ready
  // Even if not visible, it will be ready to show instantly when needed
  function initializeMapImmediately() {
    console.log("Initializing map immediately for instant access");
    
    try {
      // Use optimized initialization
      const mapEl = document.getElementById('map');
      if (!mapEl) return;
      
      // Already initialized, don't do it again
      if (mapEl.__leaflet_instance__) {
        map = mapEl.__leaflet_instance__;
        return;
      }
      
      // Make sure dimensions are set
      mapEl.style.height = 'calc(100vh - 70px)';
      mapEl.style.width = '100%';
      
      // Create map with most performance-focused options
      const mymap = L.map('map', {
        zoomControl: true,
        fadeAnimation: false,
        zoomAnimation: false,
        markerZoomAnimation: false,
        preferCanvas: true,
        renderer: L.canvas()
      }).setView([40.7500, -73.9700], 10);
      
      // Add dark-themed map tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '',
        subdomains: 'abcd',
        maxZoom: 18,
        crossOrigin: false,
        updateWhenIdle: true,
        updateWhenZooming: false
      }).addTo(mymap);
      
      // Store map reference globally
      map = mymap;
      mapEl.__leaflet_instance__ = mymap;
      
      // Use marker clusters instead of simple layer group
      markers = L.markerClusterGroup({
        showCoverageOnHover: false,
        spiderfyOnMaxZoom: true,
        disableClusteringAtZoom: 16,
        maxClusterRadius: 50,
        iconCreateFunction: function(cluster) {
          const count = cluster.getChildCount();
          const currentZoom = map.getZoom();
          let html, className;
          
          // City overview (minimal info)
          if (currentZoom < 13) {
            html = `<div class="marker-cluster-inner"><span>${count}</span></div>`;
            className = 'cluster-minimal';
          } 
          // District view (add neighborhood info)
          else if (currentZoom < 15) {
            // Get most common neighborhood in this cluster
            const neighborhoods = getClusterNeighborhoods(cluster);
            const primaryNeighborhood = getMostCommon(neighborhoods);
            html = `<div class="marker-cluster-inner">
                      <span>${count}</span>
                      <div class="cluster-neighborhood">${primaryNeighborhood}</div>
                    </div>`;
            className = 'cluster-neighborhood';
          } 
          // Neighborhood view (more detailed)
          else {
            // Get active happy hours count
            const activeCount = getActiveHappyHours(cluster);
            html = `<div class="marker-cluster-inner">
                      <span>${count}</span>
                      ${activeCount > 0 ? `<div class="active-now">${activeCount} active</div>` : ''}
                    </div>`;
            className = activeCount > 0 ? 'cluster-active' : 'cluster-detailed';
          }
          
          // Size classes based on marker count
          let sizeClass;
          if (count < 10) {
            sizeClass = 'marker-cluster-small';
          } else if (count < 30) {
            sizeClass = 'marker-cluster-medium';
          } else {
            sizeClass = 'marker-cluster-large';
          }
          
          return L.divIcon({
            html: html,
            className: `custom-cluster-icon ${className} ${sizeClass}`,
            iconSize: L.point(40, 40)
          });
        }
      }).addTo(map);
      
      // Create markers right away but keep map hidden until needed
      if (!document.querySelector('#map-view.active')) {
        mapEl.style.display = 'none';
      } else {
        // If map view is active, show it
        mapEl.style.display = 'block';
        setTimeout(() => map.invalidateSize(), 0);
      }
      
      // Set up event handlers
      setupMapEventHandlers();
      
      // Pre-render markers
      renderDeals();
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }
  
  // Initialize map immediately after page load
  initializeMapImmediately();
  
  // Custom marker icon is now defined globally
  
  // Create custom marker icon function to ensure it's created when needed
  function createCustomIcon() {
    // Create icon only once and cache it
    if (!customIcon) {
      customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: '<div class="marker-inner"><div class="marker-pulse"></div></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12] // Position popup slightly above marker
      });
    }
    return customIcon;
  }
  
  // Initialize the icon immediately
  createCustomIcon();

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
        
        // Ensure map is truly hidden on homepage
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
          mapContainer.style.height = '0';
          mapContainer.style.width = '0';
          mapContainer.style.display = 'none';
        }
        
        // Ensure map view is hidden
        const mapView = document.getElementById('map-view');
        if (mapView) {
          mapView.style.visibility = 'hidden';
          mapView.style.opacity = '0';
          mapView.style.position = 'absolute';
          mapView.style.left = '-9999px';
        }
        
      } else if (view === 'map') {
        console.log("Switching to map view...");
        document.body.classList.add('map-active');
        
        // Make sure map view is visible first
        const mapView = document.getElementById('map-view');
        if (mapView) {
          mapView.style.visibility = 'visible';
          mapView.style.opacity = '1';
          mapView.style.position = 'relative';
          mapView.style.left = '0';
          mapView.style.display = 'block';
        }
        
        // Force main container to have proper dimensions
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
          // Force dimensions and make visible
          mapContainer.style.height = 'calc(100vh - 70px)';
          mapContainer.style.width = '100%';
          mapContainer.style.display = 'block';
          mapContainer.style.visibility = 'visible';
          mapContainer.style.opacity = '1';
          
          // Since map is already initialized, just need to make it visible and refresh
          if (map) {
            // Let the browser render the container first
            setTimeout(() => {
              map.invalidateSize();
              // Make sure markers are showing
              renderDeals();
            }, 10);
          }
        }
      } else if (view === 'list') {
        console.log("Switching to list view...");
        
        // Make sure list view is visible and styled correctly
        const listView = document.getElementById('list-view');
        if (listView) {
          listView.style.visibility = 'visible';
          listView.style.opacity = '1';
          listView.style.position = 'relative';
          listView.style.display = 'block';
          listView.style.left = '0';
        }
        
        // Force re-render the deals for the list view
        renderDeals();
        
        // Map should already be initialized - just make sure it's visible and refreshed
        if (map) {
          console.log("Map already initialized, refreshing...");
          setTimeout(() => {
            map.invalidateSize();
            renderDeals();
          }, 10);
        } else {
          // In case map wasn't initialized yet
          console.log("Map not initialized yet, initializing now...");
          initializeMapImmediately();
          setTimeout(() => {
            if (map) {
              map.invalidateSize();
              renderDeals();
            }
          }, 50);
        }
      }
    });
  });
  
  // Get filter elements for both list and map views
  const neighborhoodFilter = document.getElementById('neighborhood');
  const dayFilter = document.getElementById('day');
  const mapNeighborhoodFilter = document.getElementById('map-neighborhood');
  const mapDayFilter = document.getElementById('map-day');
  
  // Initial render
  renderDeals();
  
  // List view filter event listeners
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
  
  // Map view filter event listeners
  mapNeighborhoodFilter.addEventListener('change', () => {
    // Sync with list view filter
    neighborhoodFilter.value = mapNeighborhoodFilter.value;
    renderDeals();
    // Add subtle animation to indicate refresh
    document.body.classList.add('filters-changed');
    setTimeout(() => {
      document.body.classList.remove('filters-changed');
    }, 300);
  });
  
  mapDayFilter.addEventListener('change', () => {
    // Sync with list view filter
    dayFilter.value = mapDayFilter.value;
    renderDeals();
    // Add subtle animation to indicate refresh
    document.body.classList.add('filters-changed');
    setTimeout(() => {
      document.body.classList.remove('filters-changed');
    }, 300);
  });
  
  // Active happy hour filter state and fake time are now defined globally
  
  // Function to check if a deal has an active happy hour
  function isHappyHourActive(deal) {
    if (!deal || !deal.days || !deal.hours) {
      console.log(`Deal has missing data: ${deal ? deal.name : 'undefined deal'}`);
      return false;
    }
    
    console.log(`\nChecking if happy hour is active for: ${deal.name}`);
    console.log(`  Hours: ${deal.hours}, Days: ${deal.days.join(', ')}`);
    
    // Use either real time or fake time for testing
    const now = new Date();
    
    // Get the day of week (0-6, where 0 is Sunday)
    const currentDay = useFakeTime 
      ? ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][fakeTime.day]
      : ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
    
    console.log(`  Current day: ${currentDay}`);
    
    // First check if the deal is active today
    if (!deal.days.includes(currentDay)) {
      console.log(`  Not active today (${currentDay})`);
      return false;
    }
    
    console.log(`  Day matches: YES`);
    
    // Get current time in 24-hour format
    const hours = useFakeTime ? fakeTime.hours : now.getHours();
    const minutes = useFakeTime ? fakeTime.minutes : now.getMinutes();
    const currentTime = hours * 60 + minutes; // Convert to minutes for comparison
    
    console.log(`  Current time: ${hours}:${minutes} (${currentTime} minutes)`);
    
    // Parse happy hour time range
    const timeRange = parseTimeRange(deal.hours);
    if (!timeRange) {
      console.log(`  Could not parse time range: ${deal.hours}`);
      return false;
    }
    
    // Check if current time is within happy hour
    const isActive = isTimeInRange(currentTime, timeRange);
    console.log(`  Result: ${isActive ? "ACTIVE NOW" : "not active"}`);
    return isActive;
  }
  
  // Function to render deals based on filters
  function renderDeals() {
    const selectedNeighborhood = neighborhoodFilter.value;
    const selectedDay = dayFilter.value;
    
    // Filter deals
    const filteredDeals = happyHourDeals.filter(deal => {
      const neighborhoodMatch = selectedNeighborhood === 'all' || deal.neighborhood === selectedNeighborhood;
      const dayMatch = selectedDay === 'all' || deal.days.includes(selectedDay);
      const activeMatch = !showActiveHappyHoursOnly || isHappyHourActive(deal);
      
      return neighborhoodMatch && dayMatch && activeMatch;
    });
    
    // Render map markers
    renderMapMarkers(filteredDeals);
    
    // Render list view
    renderListView(filteredDeals);
    
    // Update UI to show filter state
    updateActiveHappyHourButtonState();
  }
  
  // Function to update the active happy hour button state
  function updateActiveHappyHourButtonState() {
    const navButton = document.getElementById('active-now-nav-btn');
    
    // Get count of active happy hours for display
    let activeCount = 0;
    happyHourDeals.forEach(deal => {
      if (isHappyHourActive(deal)) activeCount++;
    });
    
    if (navButton) {
      navButton.classList.toggle('active', showActiveHappyHoursOnly);
    }
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
    // Always render markers regardless of active view 
    // This allows markers to be ready when switching views
    
    // Make sure map is initialized
    if (!map) {
      console.log("Map not initialized yet, initializing...");
      initializeMapImmediately();
      
      // If still no map, can't render markers
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
    
    // Create custom icon if not already created
    if (!customIcon) {
      customIcon = createCustomIcon();
    }
    
    deals.forEach(deal => {
      // Verify location exists and is valid
      if (deal.location && Array.isArray(deal.location) && deal.location.length === 2) {
        try {
          const marker = L.marker(deal.location, { icon: customIcon })
            .bindPopup(`
              <div class="popup-content">
                ${deal.imagePath ? `<div class="popup-image-container">
                  <img src="${getImageUrl(deal.imagePath)}" alt="${deal.name}" class="popup-image">
                </div>` : ''}
                <h3>${deal.name}</h3>
                <div class="popup-info">
                  <p>${deal.address}</p>
                  <p><strong>${deal.hours}</strong></p>
                  <p>${deal.deals}</p>
                  <div class="popup-actions">
                    ${deal.website ? `<a href="${deal.website}" target="_blank" class="website-link">Visit Website</a>` : ''}
                    <a href="#" class="popup-link" data-id="${deal.id}">View Details</a>
                  </div>
                </div>
              </div>
            `, {
              maxWidth: 300,
              className: 'custom-popup'
            });
          
          // Store deal data with the marker for easy access in cluster functions
          marker.options.dealData = deal;
          markers.addLayer(marker);
        } catch (e) {
          console.error(`Error creating marker for deal ${deal.id} (${deal.name}):`, e);
        }
      } else {
        console.warn(`Invalid location for deal ${deal.id} (${deal.name}):`, deal.location);
      }
    });
      
    // Check if we need to adjust the view based on markers
    if (deals.length > 0 && map) {
      try {
        // Store current zoom level before any changes
        const currentZoom = map.getZoom();
        
        // Important: If we're toggling active happy hours, don't change the zoom
        if (showActiveHappyHoursOnly) {
          // Don't change the zoom level at all when showing active happy hours
          console.log("Keeping current zoom level for active happy hours view");
        } 
        else {
          // For initial load or regular filter changes - ensure a reasonable view
          console.log("Setting initial map view - zoom level 10");
          // Always set a reasonable default zoom for initial load
          map.setView([40.7500, -73.9700], 10);
          
          // If there are a lot of markers (> 20), consider showing them all
          const markerLayers = markers.getLayers();
          if (markerLayers && markerLayers.length > 20) {
            console.log(`Showing fit bounds for ${markerLayers.length} markers`);
            const bounds = L.featureGroup(markerLayers).getBounds();
            // Use a maxZoom option to prevent excessive zooming
            map.fitBounds(bounds, { 
              padding: [50, 50],
              maxZoom: 12  // Never zoom in more than level 12
            });
          }
        }
      } catch (e) {
        console.error('Error handling map view:', e);
        // Safe fallback view
        map.setView([40.7500, -73.9700], 10);
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
    
    // Add zoom change handler to refresh clusters with progressive disclosure
    map.on('zoomend', function() {
      // Force marker clusters to update their icons
      if (markers) {
        markers.refreshClusters();
      }
    });
    
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
  
  /* Helper functions for progressive disclosure clusters */
  function getClusterNeighborhoods(cluster) {
    const markers = cluster.getAllChildMarkers();
    return markers.map(marker => {
      const data = marker.options.dealData;
      return data && data.neighborhood ? 
        formatNeighborhoodName(data.neighborhood) : 'Unknown';
    });
  }
  
  function formatNeighborhoodName(neighborhood) {
    // Convert snake_case to Title Case
    if (!neighborhood) return 'Unknown';
    return neighborhood
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  function getMostCommon(array) {
    if (!array || array.length === 0) return 'Unknown';
    
    const counts = {};
    let maxCount = 0;
    let maxItem = array[0];
    
    for (const item of array) {
      counts[item] = (counts[item] || 0) + 1;
      if (counts[item] > maxCount) {
        maxCount = counts[item];
        maxItem = item;
      }
    }
    
    return maxItem;
  }
  
  function getActiveHappyHours(cluster) {
    const markers = cluster.getAllChildMarkers();
    const now = new Date();
    const day = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
    
    // Get current time in 24-hour format (e.g., 14:30)
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes; // Convert to minutes for easier comparison
    
    let activeCount = 0;
    
    markers.forEach(marker => {
      const deal = marker.options.dealData;
      if (deal && deal.days && deal.days.includes(day) && deal.hours) {
        // Parse happy hour time range
        const timeRange = parseTimeRange(deal.hours);
        if (timeRange && isTimeInRange(currentTime, timeRange)) {
          activeCount++;
        }
      }
    });
    
    return activeCount;
  }
  
  function parseTimeRange(timeString) {
    if (!timeString) return null;
    
    console.log("Parsing time range:", timeString);
    
    // Handle formats like "4pm-7pm", "4PM - 7PM", "4:00 PM - 7:00 PM"
    const regex = /(\d+)(?::(\d+))?\s*(am|pm|AM|PM)?\s*[-–—]\s*(\d+)(?::(\d+))?\s*(am|pm|AM|PM)?/;
    const match = timeString.match(regex);
    
    if (!match) {
      console.log("  No match found for regex pattern");
      return null;
    }
    
    console.log("  Match found:", match);
    
    let startHour = parseInt(match[1], 10);
    const startMinute = match[2] ? parseInt(match[2], 10) : 0;
    let startPeriod = match[3] ? match[3].toLowerCase() : 'pm'; // Default to PM if not specified
    
    let endHour = parseInt(match[4], 10);
    const endMinute = match[5] ? parseInt(match[5], 10) : 0;
    let endPeriod = match[6] ? match[6].toLowerCase() : 'pm'; // Default to PM if not specified
    
    // Convert to 24-hour format
    if (startPeriod === 'pm' && startHour < 12) startHour += 12;
    if (startPeriod === 'am' && startHour === 12) startHour = 0;
    if (endPeriod === 'pm' && endHour < 12) endHour += 12;
    if (endPeriod === 'am' && endHour === 12) endHour = 0;
    
    // Convert to minutes since midnight for easier comparison
    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;
    
    console.log(`  Parsed result: ${startHour}:${startMinute} (${startTime} mins) - ${endHour}:${endMinute} (${endTime} mins)`);
    
    return { startTime, endTime };
  }
  
  function isTimeInRange(currentTime, timeRange) {
    if (!timeRange) return false;
    
    const { startTime, endTime } = timeRange;
    
    // Log comparison for debugging
    console.log(`  Checking if ${currentTime} is in range ${startTime}-${endTime}`);
    
    // Handle ranges that cross midnight
    let result;
    if (endTime < startTime) {
      result = currentTime >= startTime || currentTime <= endTime;
      console.log(`  Crosses midnight: ${result ? "IN RANGE" : "not in range"}`);
    } else {
      result = currentTime >= startTime && currentTime <= endTime;
      console.log(`  Standard range: ${result ? "IN RANGE" : "not in range"}`);
    }
    
    return result;
  }
  
  // Debug function to display active happy hours count in console
  function countActiveHappyHours() {
    let count = 0;
    let activeDeals = [];
    
    // Check if happyHourDeals exists
    if (!happyHourDeals || !Array.isArray(happyHourDeals)) {
      console.error("ERROR: happyHourDeals is not available or not an array");
      console.log("happyHourDeals type:", typeof happyHourDeals);
      console.log("happyHourDeals:", happyHourDeals);
      return [];
    }
    
    // Log the first few deals for debugging structure
    console.log("Sample of deals:", happyHourDeals.slice(0, 3));
    
    happyHourDeals.forEach(deal => {
      if (isHappyHourActive(deal)) {
        count++;
        activeDeals.push({
          name: deal.name,
          neighborhood: deal.neighborhood,
          hours: deal.hours,
          days: deal.days
        });
        console.log(`Active: ${deal.name}, ${deal.neighborhood}, ${deal.hours}`);
      }
    });
    
    // Display summary info
    if (useFakeTime) {
      console.log(`TESTING MODE: Using fake time - ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][fakeTime.day]} at ${fakeTime.hours}:${fakeTime.minutes < 10 ? '0' + fakeTime.minutes : fakeTime.minutes}`);
    } else {
      console.log("Using real current time");
    }
    
    console.log(`Total active happy hours: ${count} / ${happyHourDeals.length}`);
    
    // If no active happy hours found, suggest changing fake time
    if (count === 0 && useFakeTime) {
      console.log("No active happy hours found with current fake time. Try adjusting the fakeTime settings.");
    }
    
    return activeDeals;
  }
  
  // Add CSS for custom marker and mobile optimizations
  const style = document.createElement('style');
  style.innerHTML = `
    /* Individual marker styles */
    .custom-map-marker {
      background: transparent;
      border: none;
      contain: layout paint style;
    }
    .marker-inner {
      width: 12px;
      height: 12px;
      background: var(--primary-color);
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgba(10, 132, 255, 0.3), 0 0 10px rgba(10, 132, 255, 0.5);
      transition: all 0.2s ease-out;
      will-change: transform, box-shadow;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }
    .marker-pulse {
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: rgba(10, 132, 255, 0.2);
      border: 1px solid rgba(10, 132, 255, 0.3);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: markerPulse 1.5s infinite ease-out;
      z-index: 0;
    }
    @keyframes markerPulse {
      0% {
        transform: translate(-50%, -50%) scale(0.5);
        opacity: 1;
      }
      100% {
        transform: translate(-50%, -50%) scale(1.5);
        opacity: 0;
      }
    }
    .leaflet-marker-icon:hover .marker-inner {
      transform: translate(-50%, -50%) scale(1.2);
      box-shadow: 0 0 0 5px rgba(10, 132, 255, 0.4), 0 0 15px rgba(10, 132, 255, 0.6);
      background: #ffffff;
    }
    
    /* Custom marker cluster styles */
    .custom-cluster-icon {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
    }
    .marker-cluster-inner {
      background-color: rgba(10, 132, 255, 0.8);
      border-radius: 50%;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      box-shadow: 0 0 0 4px rgba(10, 132, 255, 0.2), 0 4px 15px rgba(0, 0, 0, 0.3);
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
      color: white;
      font-weight: 600;
      transition: all 0.2s ease-out;
      padding: 2px;
      text-align: center;
    }
    .marker-cluster-inner span {
      font-size: 14px;
      line-height: 1;
      margin-bottom: 2px;
    }
    
    /* Cluster size styling */
    .custom-cluster-icon.marker-cluster-small .marker-cluster-inner {
      background-color: rgba(10, 132, 255, 0.75);
    }
    .custom-cluster-icon.marker-cluster-medium .marker-cluster-inner {
      background-color: rgba(10, 132, 255, 0.85);
      box-shadow: 0 0 0 5px rgba(10, 132, 255, 0.25), 0 6px 20px rgba(0, 0, 0, 0.4);
    }
    .custom-cluster-icon.marker-cluster-large .marker-cluster-inner {
      background-color: rgba(10, 132, 255, 0.95);
      box-shadow: 0 0 0 6px rgba(10, 132, 255, 0.3), 0 8px 25px rgba(0, 0, 0, 0.5);
    }
    
    /* Progressive disclosure styles */
    /* Minimal styling (city level) */
    .custom-cluster-icon.cluster-minimal .marker-cluster-inner {
      width: 40px;
      height: 40px;
    }
    
    /* Neighborhood styling (district level) */
    .custom-cluster-icon.cluster-neighborhood .marker-cluster-inner {
      width: 50px;
      height: 50px;
    }
    .cluster-neighborhood .cluster-neighborhood {
      font-size: 8px;
      line-height: 1.1;
      margin-top: -2px;
      opacity: 0.9;
      font-weight: 500;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    /* Active happy hours styling */
    .custom-cluster-icon.cluster-active .marker-cluster-inner {
      background-color: rgba(48, 209, 88, 0.85);
      box-shadow: 0 0 0 4px rgba(48, 209, 88, 0.25), 0 4px 15px rgba(0, 0, 0, 0.3);
    }
    .active-now {
      font-size: 8px;
      background-color: rgba(0, 0, 0, 0.3);
      padding: 2px 5px;
      border-radius: 8px;
      margin-top: -2px;
      color: rgba(255, 255, 255, 0.95);
      font-weight: 500;
    }
    
    /* Detailed styling (neighborhood level) */
    .custom-cluster-icon.cluster-detailed .marker-cluster-inner {
      width: 44px;
      height: 44px;
    }
    
    /* Hover effects for clusters */
    .custom-cluster-icon:hover .marker-cluster-inner {
      transform: scale(1.05);
      box-shadow: 0 0 0 6px rgba(10, 132, 255, 0.3), 0 8px 25px rgba(0, 0, 0, 0.4);
    }
    
    /* Hover effects for active clusters */
    .custom-cluster-icon.cluster-active:hover .marker-cluster-inner {
      transform: scale(1.05);
      box-shadow: 0 0 0 6px rgba(48, 209, 88, 0.3), 0 8px 25px rgba(0, 0, 0, 0.4);
    }
    
    /* Hide default cluster styles */
    .marker-cluster-small, .marker-cluster-medium, .marker-cluster-large {
      background-color: transparent !important;
    }
    .marker-cluster-small div, .marker-cluster-medium div, .marker-cluster-large div {
      background-color: transparent !important;
    }
    
    /* Other UI animations */
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
      
      .custom-cluster-icon:hover .marker-cluster-inner {
        transform: none;
      }
      
      .custom-cluster-icon:active .marker-cluster-inner {
        transform: scale(0.95);
        transition: transform 0.1s ease-out;
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
    
    // Set random background image for category section
    setRandomCategoryBackground();
    
    // Set up category and neighborhood clicks
    setupHomepageInteractions();
  }
  
  // Function to set a random background image for the category section
  function setRandomCategoryBackground() {
    try {
      // Get all deals with images
      const dealsWithImages = happyHourDeals.filter(deal => deal.imagePath);
      
      // If we have deals with images, pick a random one
      if (dealsWithImages.length > 0) {
        const randomIndex = Math.floor(Math.random() * dealsWithImages.length);
        const randomDeal = dealsWithImages[randomIndex];
        
        // Set the background image on the category section
        const categorySection = document.querySelector('.category-section');
        if (categorySection) {
          categorySection.style.backgroundImage = `url('${randomDeal.imagePath}')`;
          console.log('Set random category background:', randomDeal.imagePath);
        }
      }
    } catch (error) {
      console.error('Error setting random category background:', error);
    }
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
    // Explore Map button in hero section
    const exploreButton = document.querySelector('.hero-content .explore-button');
    if (exploreButton) {
      exploreButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("Explore Map button clicked");
        
        // Reset filters to show all
        document.getElementById('neighborhood').value = 'all';
        document.getElementById('day').value = 'all';
        
        // Switch to map view using the nav link click handler
        const mapNavLink = document.querySelector('nav a[data-view="map"]');
        if (mapNavLink) {
          mapNavLink.click();
        }
      });
    }
    
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