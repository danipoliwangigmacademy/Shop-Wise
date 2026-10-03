/**
* Template Name: ShopWise
* Template URL: https://bootstrapmade.com/shopwise-bootstrap-ecommerce-template/
* Updated: Apr 08 2026 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Scroll up sticky header to headers with .scroll-up-sticky class
   */
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky')) return;

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = `-${header.offsetHeight + 50}px`;
    } else if (scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = "0";
    } else {
      selectHeader.style.removeProperty('top');
      selectHeader.style.removeProperty('position');
    }
    lastScrollTop = scrollTop;
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active') && !navmenu.classList.contains('toggle-dropdown')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Countdown timer
   */
  function updateCountDown(countDownItem) {
    const timeleft = new Date(countDownItem.getAttribute('data-count')).getTime() - new Date().getTime();

    const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    const daysElement = countDownItem.querySelector('.count-days');
    const hoursElement = countDownItem.querySelector('.count-hours');
    const minutesElement = countDownItem.querySelector('.count-minutes');
    const secondsElement = countDownItem.querySelector('.count-seconds');

    if (daysElement) daysElement.innerHTML = days;
    if (hoursElement) hoursElement.innerHTML = hours;
    if (minutesElement) minutesElement.innerHTML = minutes;
    if (secondsElement) secondsElement.innerHTML = seconds;

  }

  document.querySelectorAll('.countdown').forEach(function(countDownItem) {
    updateCountDown(countDownItem);
    setInterval(function() {
      updateCountDown(countDownItem);
    }, 1000);
  });

  /**
   * Product Image Zoom and Thumbnail Functionality
   */

  function productDetailFeatures() {
    // Initialize Drift for image zoom
    function initDriftZoom() {
      // Check if Drift is available
      if (typeof Drift === 'undefined') {
        console.error('Drift library is not loaded');
        return;
      }

      const driftOptions = {
        paneContainer: document.querySelector('.image-zoom-container'),
        inlinePane: window.innerWidth < 768 ? true : false,
        inlineOffsetY: -85,
        containInline: true,
        hoverBoundingBox: false,
        zoomFactor: 3,
        handleTouch: false
      };

      // Initialize Drift on the main product image
      const mainImage = document.getElementById('main-product-image');
      if (mainImage) {
        new Drift(mainImage, driftOptions);
      }
    }

    // Thumbnail click functionality
    function initThumbnailClick() {
      const thumbnails = document.querySelectorAll('.thumbnail-item');
      const mainImage = document.getElementById('main-product-image');

      if (!thumbnails.length || !mainImage) return;

      thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
          // Get image path from data attribute
          const imageSrc = this.getAttribute('data-image');

          // Update main image src and zoom attribute
          mainImage.src = imageSrc;
          mainImage.setAttribute('data-zoom', imageSrc);

          // Update active state
          thumbnails.forEach(item => item.classList.remove('active'));
          this.classList.add('active');

          // Reinitialize Drift for the new image
          initDriftZoom();
        });
      });
    }

    // Image navigation functionality (prev/next buttons)
    function initImageNavigation() {
      const prevButton = document.querySelector('.image-nav-btn.prev-image');
      const nextButton = document.querySelector('.image-nav-btn.next-image');

      if (!prevButton || !nextButton) return;

      const thumbnails = Array.from(document.querySelectorAll('.thumbnail-item'));
      if (!thumbnails.length) return;

      // Function to navigate to previous or next image
      function navigateImage(direction) {
        // Find the currently active thumbnail
        const activeIndex = thumbnails.findIndex(thumb => thumb.classList.contains('active'));
        if (activeIndex === -1) return;

        let newIndex;
        if (direction === 'prev') {
          // Go to previous image or loop to the last one
          newIndex = activeIndex === 0 ? thumbnails.length - 1 : activeIndex - 1;
        } else {
          // Go to next image or loop to the first one
          newIndex = activeIndex === thumbnails.length - 1 ? 0 : activeIndex + 1;
        }

        // Simulate click on the new thumbnail
        thumbnails[newIndex].click();
      }

      // Add event listeners to navigation buttons
      prevButton.addEventListener('click', () => navigateImage('prev'));
      nextButton.addEventListener('click', () => navigateImage('next'));
    }

    // Initialize all features
    initDriftZoom();
    initThumbnailClick();
    initImageNavigation();
  }

  productDetailFeatures();

  /**
   * Ecommerce Cart Functionality
   * Handles quantity changes and item removal
   */

  function ecommerceCartTools() {
    // Get all quantity buttons and inputs directly
    const decreaseButtons = document.querySelectorAll('.quantity-btn.decrease');
    const increaseButtons = document.querySelectorAll('.quantity-btn.increase');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const removeButtons = document.querySelectorAll('.remove-item');

    // Decrease quantity buttons
    decreaseButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const quantityInput = btn.closest('.quantity-selector').querySelector('.quantity-input');
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
          quantityInput.value = currentValue - 1;
        }
      });
    });

    // Increase quantity buttons
    increaseButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const quantityInput = btn.closest('.quantity-selector').querySelector('.quantity-input');
        let currentValue = parseInt(quantityInput.value);
        if (currentValue < parseInt(quantityInput.getAttribute('max'))) {
          quantityInput.value = currentValue + 1;
        }
      });
    });

    // Manual quantity inputs
    quantityInputs.forEach(input => {
      input.addEventListener('change', function() {
        let currentValue = parseInt(input.value);
        const min = parseInt(input.getAttribute('min'));
        const max = parseInt(input.getAttribute('max'));

        // Validate input
        if (isNaN(currentValue) || currentValue < min) {
          input.value = min;
        } else if (currentValue > max) {
          input.value = max;
        }
      });
    });

    // Remove item buttons
    removeButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        btn.closest('.cart-item').remove();
      });
    });
  }

  ecommerceCartTools();

  /**
   * Price range slider implementation for price filtering.
   */
  function priceRangeWidget() {
    const priceRangeWidgets = document.querySelectorAll('.price-range-container');

    priceRangeWidgets.forEach(widget => {
      const minRange = widget.querySelector('.min-range');
      const maxRange = widget.querySelector('.max-range');
      const sliderProgress = widget.querySelector('.slider-progress');
      const minPriceDisplay = widget.querySelector('.current-range .min-price');
      const maxPriceDisplay = widget.querySelector('.current-range .max-price');
      const minPriceInput = widget.querySelector('.min-price-input');
      const maxPriceInput = widget.querySelector('.max-price-input');
      const applyButton = widget.querySelector('.filter-actions .btn-primary');

      if (!minRange || !maxRange || !sliderProgress || !minPriceDisplay || !maxPriceDisplay || !minPriceInput || !maxPriceInput) return;

      const sliderMin = parseInt(minRange.min) || 0;
      const sliderMax = parseInt(minRange.max) || 1000000;

      let minValue = parseInt(minRange.value) || sliderMin;
      let maxValue = parseInt(maxRange.value) || sliderMax;

      updateSliderProgress();
      updateDisplays();

      function notifyFilter() {
        if (window.ShopWiseFilter && typeof window.ShopWiseFilter.applyFilters === 'function') {
          window.ShopWiseFilter.applyFilters();
        }
      }

      minRange.addEventListener('input', function() {
        minValue = parseInt(this.value);
        if (minValue > maxValue) {
          minValue = maxValue;
          this.value = minValue;
        }
        minPriceInput.value = minValue;
        updateDisplays();
        updateSliderProgress();
        notifyFilter();
      });

      maxRange.addEventListener('input', function() {
        maxValue = parseInt(this.value);
        if (maxValue < minValue) {
          maxValue = minValue;
          this.value = maxValue;
        }
        maxPriceInput.value = maxValue;
        updateDisplays();
        updateSliderProgress();
        notifyFilter();
      });

      minPriceInput.addEventListener('change', function() {
        let value = parseInt(this.value) || sliderMin;
        value = Math.max(sliderMin, Math.min(sliderMax, value));
        if (value > maxValue) {
          value = maxValue;
        }
        minValue = value;
        this.value = value;
        minRange.value = value;
        updateDisplays();
        updateSliderProgress();
        notifyFilter();
      });

      maxPriceInput.addEventListener('change', function() {
        let value = parseInt(this.value) || sliderMax;
        value = Math.max(sliderMin, Math.min(sliderMax, value));
        if (value < minValue) {
          value = minValue;
        }
        maxValue = value;
        this.value = value;
        maxRange.value = value;
        updateDisplays();
        updateSliderProgress();
        notifyFilter();
      });

      if (applyButton) {
        applyButton.addEventListener('click', function(e) {
          e.preventDefault();
          notifyFilter();
        });
      }

      function updateSliderProgress() {
        const range = sliderMax - sliderMin;
        if (range <= 0) return;
        const minPercent = ((minValue - sliderMin) / range) * 100;
        const maxPercent = ((maxValue - sliderMin) / range) * 100;

        sliderProgress.style.left = `${minPercent}%`;
        sliderProgress.style.width = `${maxPercent - minPercent}%`;
      }

      function updateDisplays() {
        minPriceDisplay.textContent = `Rp ${Number(minValue).toLocaleString('id-ID')}`;
        maxPriceDisplay.textContent = `Rp ${Number(maxValue).toLocaleString('id-ID')}`;
      }

      // Expose helper to set values programmatically
      widget.setRangeValues = function(min, max) {
        minValue = Math.max(sliderMin, Math.min(sliderMax, min));
        maxValue = Math.max(sliderMin, Math.min(sliderMax, max));
        minRange.value = minValue;
        maxRange.value = maxValue;
        minPriceInput.value = minValue;
        maxPriceInput.value = maxValue;
        updateSliderProgress();
        updateDisplays();
      };
    });
  }
  priceRangeWidget();

  /**
   * Live Interactive Category & Product Filter System
   */
  function initCategoryFilter() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    const productItems = Array.from(productsGrid.querySelectorAll('.product-item'));
    const totalProducts = productItems.length;
    const noProductsFound = document.getElementById('noProductsFound');
    const resultsLabel = document.querySelector('.results-label');
    const activeTagsContainer = document.getElementById('activeTagsContainer');
    const activeTagsList = document.getElementById('activeTagsList');

    const brandCheckboxes = document.querySelectorAll('.filter-widget input[type="checkbox"]');
    const colorCheckboxes = document.querySelectorAll('.filter-widget-2 input[type="checkbox"]');
    const brandSearchInput = document.querySelector('.brand-search-input');
    const topPriceSelect = document.getElementById('priceRange');
    const topSortSelect = document.getElementById('sortBy');
    const productSearchInput = document.getElementById('productSearch');
    const searchSubmitBtn = document.querySelector('.search-submit');
    const clearFiltersBtn = document.querySelector('.clear-filters-btn');
    const resetAllBtn = document.getElementById('resetAllFiltersBtn');
    const emptyResetBtn = document.getElementById('emptyResetFilterBtn');
    const clearBrandBtn = document.querySelector('.clear-brand-filters');
    const clearColorBtn = document.querySelector('.clear-color-filters');
    const categoryLinks = document.querySelectorAll('.category-tree a[data-cat]');

    let activeCategory = 'all';

    function getSelectedBrands() {
      const selected = [];
      brandCheckboxes.forEach(cb => {
        if (cb.checked && cb.value) selected.push(cb.value.toLowerCase());
      });
      return selected;
    }

    function getSelectedColors() {
      const selected = [];
      colorCheckboxes.forEach(cb => {
        if (cb.checked && cb.value) selected.push(cb.value.toLowerCase());
      });
      return selected;
    }

    function getPriceRange() {
      const minRange = document.querySelector('.price-range-container .min-range');
      const maxRange = document.querySelector('.price-range-container .max-range');
      const min = minRange ? parseInt(minRange.value) || 0 : 0;
      const max = maxRange ? parseInt(maxRange.value) || 1000000 : 1000000;
      return { min, max };
    }

    function applyFilters() {
      const selectedBrands = getSelectedBrands();
      const selectedColors = getSelectedColors();
      const { min: minPrice, max: maxPrice } = getPriceRange();
      const query = productSearchInput ? productSearchInput.value.trim().toLowerCase() : '';
      const sortVal = topSortSelect ? topSortSelect.value : 'featured';

      let visibleCount = 0;
      const visibleProducts = [];

      productItems.forEach(item => {
        const itemPrice = parseInt(item.dataset.price) || 0;
        const itemBrand = (item.dataset.brand || '').toLowerCase();
        const itemColors = (item.dataset.colors || '').toLowerCase().split(' ');
        const itemCategory = (item.dataset.category || '').toLowerCase();
        const itemTitle = (item.dataset.title || '').toLowerCase();

        let match = true;

        // Price match
        if (itemPrice < minPrice || itemPrice > maxPrice) {
          match = false;
        }

        // Category match
        if (match && activeCategory !== 'all') {
          if (!itemCategory.includes(activeCategory.toLowerCase())) {
            match = false;
          }
        }

        // Brand match
        if (match && selectedBrands.length > 0) {
          if (!selectedBrands.includes(itemBrand)) {
            match = false;
          }
        }

        // Color match
        if (match && selectedColors.length > 0) {
          const hasColor = selectedColors.some(color => itemColors.includes(color));
          if (!hasColor) {
            match = false;
          }
        }

        // Search query match
        if (match && query) {
          if (!itemTitle.includes(query) && !itemCategory.includes(query) && !itemBrand.includes(query)) {
            match = false;
          }
        }

        if (match) {
          item.style.display = '';
          visibleCount++;
          visibleProducts.push(item);
        } else {
          item.style.display = 'none';
        }
      });

      // Sorting
      sortProducts(visibleProducts, sortVal);

      // Empty state
      if (noProductsFound) {
        noProductsFound.style.display = visibleCount === 0 ? 'block' : 'none';
      }

      // Update results count label
      if (resultsLabel) {
        resultsLabel.innerHTML = `Menampilkan <span class="fw-bold">${visibleCount}</span> dari <span class="fw-bold">${totalProducts}</span> produk`;
      }

      // Update active tags
      renderActiveTags({
        selectedBrands,
        selectedColors,
        minPrice,
        maxPrice,
        query,
        activeCategory
      });
    }

    function sortProducts(items, sortKey) {
      if (!items || items.length === 0) return;

      items.sort((a, b) => {
        const priceA = parseInt(a.dataset.price) || 0;
        const priceB = parseInt(b.dataset.price) || 0;
        const ratingA = parseFloat(a.dataset.rating) || 0;
        const ratingB = parseFloat(b.dataset.rating) || 0;
        const idA = parseInt(a.dataset.id) || 0;
        const idB = parseInt(b.dataset.id) || 0;
        const dateA = new Date(a.dataset.date || '2026-01-01').getTime();
        const dateB = new Date(b.dataset.date || '2026-01-01').getTime();

        switch (sortKey) {
          case 'price-asc':
            return priceA - priceB;
          case 'price-desc':
            return priceB - priceA;
          case 'rating-desc':
            return ratingB - ratingA;
          case 'newest':
            return dateB - dateA;
          case 'featured':
          default:
            return idA - idB;
        }
      });

      items.forEach(el => productsGrid.appendChild(el));
      if (noProductsFound) {
        productsGrid.appendChild(noProductsFound);
      }
    }

    function renderActiveTags(filterState) {
      if (!activeTagsContainer || !activeTagsList) return;

      activeTagsList.innerHTML = '';
      const tags = [];

      if (filterState.activeCategory !== 'all') {
        const catName = filterState.activeCategory.replace(/-/g, ' ');
        tags.push({
          label: `Kategori: ${catName.charAt(0).toUpperCase() + catName.slice(1)}`,
          onRemove: () => {
            activeCategory = 'all';
            categoryLinks.forEach(l => l.classList.remove('text-primary', 'fw-bold'));
            applyFilters();
          }
        });
      }

      filterState.selectedBrands.forEach(brand => {
        tags.push({
          label: `Merek: ${brand.charAt(0).toUpperCase() + brand.slice(1)}`,
          onRemove: () => {
            const cb = Array.from(brandCheckboxes).find(b => b.value.toLowerCase() === brand);
            if (cb) cb.checked = false;
            applyFilters();
          }
        });
      });

      filterState.selectedColors.forEach(color => {
        tags.push({
          label: `Warna: ${color.charAt(0).toUpperCase() + color.slice(1)}`,
          onRemove: () => {
            const cb = Array.from(colorCheckboxes).find(c => c.value.toLowerCase() === color);
            if (cb) cb.checked = false;
            applyFilters();
          }
        });
      });

      if (filterState.minPrice > 0 || filterState.maxPrice < 1000000) {
        tags.push({
          label: `Rp ${filterState.minPrice.toLocaleString('id-ID')} - Rp ${filterState.maxPrice.toLocaleString('id-ID')}`,
          onRemove: () => {
            const container = document.querySelector('.price-range-container');
            if (container && container.setRangeValues) {
              container.setRangeValues(0, 1000000);
            }
            if (topPriceSelect) topPriceSelect.value = 'all';
            applyFilters();
          }
        });
      }

      if (filterState.query) {
        tags.push({
          label: `Cari: "${filterState.query}"`,
          onRemove: () => {
            if (productSearchInput) productSearchInput.value = '';
            applyFilters();
          }
        });
      }

      if (tags.length > 0) {
        activeTagsContainer.style.display = 'flex';
        tags.forEach(tag => {
          const tagSpan = document.createElement('span');
          tagSpan.className = 'tag-item';
          tagSpan.textContent = tag.label + ' ';
          const removeBtn = document.createElement('button');
          removeBtn.className = 'tag-remove';
          removeBtn.setAttribute('aria-label', 'Hapus filter');
          removeBtn.innerHTML = '<i class="bi bi-x"></i>';
          removeBtn.addEventListener('click', tag.onRemove);
          tagSpan.appendChild(removeBtn);
          activeTagsList.appendChild(tagSpan);
        });
      } else {
        activeTagsContainer.style.display = 'none';
      }
    }

    function resetAllFilters() {
      activeCategory = 'all';
      categoryLinks.forEach(l => l.classList.remove('text-primary', 'fw-bold'));
      brandCheckboxes.forEach(cb => { cb.checked = false; });
      colorCheckboxes.forEach(cb => { cb.checked = false; });
      if (productSearchInput) productSearchInput.value = '';
      if (topSortSelect) topSortSelect.value = 'featured';
      if (topPriceSelect) topPriceSelect.value = 'all';

      const container = document.querySelector('.price-range-container');
      if (container && container.setRangeValues) {
        container.setRangeValues(0, 1000000);
      }

      applyFilters();
    }

    // Attach event listeners for instant filtering
    brandCheckboxes.forEach(cb => {
      cb.addEventListener('change', applyFilters);
    });

    colorCheckboxes.forEach(cb => {
      cb.addEventListener('change', applyFilters);
    });

    if (brandSearchInput) {
      brandSearchInput.addEventListener('input', function() {
        const term = this.value.toLowerCase();
        document.querySelectorAll('.filter-widget .brand-item').forEach(item => {
          const label = item.textContent.toLowerCase();
          item.style.display = label.includes(term) ? '' : 'none';
        });
      });
    }

    categoryLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const cat = this.dataset.cat;
        if (activeCategory === cat) {
          activeCategory = 'all';
          this.classList.remove('text-primary', 'fw-bold');
        } else {
          categoryLinks.forEach(l => l.classList.remove('text-primary', 'fw-bold'));
          activeCategory = cat;
          this.classList.add('text-primary', 'fw-bold');
        }
        applyFilters();
      });
    });

    if (topPriceSelect) {
      topPriceSelect.addEventListener('change', function() {
        const val = this.value;
        const container = document.querySelector('.price-range-container');
        if (!container || !container.setRangeValues) return;

        if (val === 'all') {
          container.setRangeValues(0, 1000000);
        } else if (val === '0-50000') {
          container.setRangeValues(0, 50000);
        } else if (val === '50000-100000') {
          container.setRangeValues(50000, 100000);
        } else if (val === '100000-150000') {
          container.setRangeValues(100000, 150000);
        } else if (val === '150000-up') {
          container.setRangeValues(150000, 1000000);
        }
        applyFilters();
      });
    }

    if (topSortSelect) {
      topSortSelect.addEventListener('change', applyFilters);
    }

    if (productSearchInput) {
      productSearchInput.addEventListener('input', applyFilters);
    }

    if (searchSubmitBtn) {
      searchSubmitBtn.addEventListener('click', applyFilters);
    }

    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', resetAllFilters);
    }

    if (resetAllBtn) {
      resetAllBtn.addEventListener('click', resetAllFilters);
    }

    if (emptyResetBtn) {
      emptyResetBtn.addEventListener('click', resetAllFilters);
    }

    if (clearBrandBtn) {
      clearBrandBtn.addEventListener('click', function() {
        brandCheckboxes.forEach(cb => { cb.checked = false; });
        applyFilters();
      });
    }

    if (clearColorBtn) {
      clearColorBtn.addEventListener('click', function() {
        colorCheckboxes.forEach(cb => { cb.checked = false; });
        applyFilters();
      });
    }

    window.ShopWiseFilter = {
      applyFilters,
      resetAllFilters
    };

    // Initial run
    applyFilters();
  }

  // Initialize category filter
  initCategoryFilter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

})();