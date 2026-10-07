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
    if (typeof Swiper === 'undefined') return;
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      const configEl = swiperElement.querySelector(".swiper-config");
      if (!configEl) return;
      let config = JSON.parse(configEl.innerHTML.trim());

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
   * Product Image Zoom and Thumbnail Functionality (Hanya berjalan di halaman detail produk)
   */
  function productDetailFeatures() {
    const mainImage = document.getElementById('main-product-image');
    if (!mainImage) return;

    // Initialize Drift for image zoom
    function initDriftZoom() {
      if (typeof Drift === 'undefined') return;

      const driftOptions = {
        paneContainer: document.querySelector('.image-zoom-container'),
        inlinePane: window.innerWidth < 768 ? true : false,
        inlineOffsetY: -85,
        containInline: true,
        hoverBoundingBox: false,
        zoomFactor: 3,
        handleTouch: false
      };

      if (mainImage) {
        new Drift(mainImage, driftOptions);
      }
    }

    // Thumbnail click functionality
    function initThumbnailClick() {
      const thumbnails = document.querySelectorAll('.thumbnail-item');
      if (!thumbnails.length || !mainImage) return;

      thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
          const imageSrc = this.getAttribute('data-image');
          mainImage.src = imageSrc;
          mainImage.setAttribute('data-zoom', imageSrc);

          thumbnails.forEach(item => item.classList.remove('active'));
          this.classList.add('active');

          // Sync with variant color dots if available
          const thumbColor = this.getAttribute('data-color');
          const colorDots = document.querySelectorAll('.variant-picker .color-dots .dot');
          if (colorDots.length) {
            colorDots.forEach(dot => {
              const dotColor = dot.getAttribute('data-color') || '';
              const dotImg = dot.getAttribute('data-image') || '';
              const isMatch = (dotImg && dotImg === imageSrc) ||
                              (thumbColor && dotColor.toLowerCase() === thumbColor.toLowerCase()) ||
                              (dotColor && imageSrc.toLowerCase().includes(dotColor.toLowerCase()));
              if (isMatch) {
                colorDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                const chosenVariantEl = document.querySelector('.variant-picker .chosen-variant');
                if (chosenVariantEl) {
                  chosenVariantEl.textContent = dotColor;
                }
              }
            });
          }

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

      function navigateImage(direction) {
        const activeIndex = thumbnails.findIndex(thumb => thumb.classList.contains('active'));
        if (activeIndex === -1) return;

        let newIndex;
        if (direction === 'prev') {
          newIndex = activeIndex === 0 ? thumbnails.length - 1 : activeIndex - 1;
        } else {
          newIndex = activeIndex === thumbnails.length - 1 ? 0 : activeIndex + 1;
        }

        thumbnails[newIndex].click();
      }

      prevButton.addEventListener('click', () => navigateImage('prev'));
      nextButton.addEventListener('click', () => navigateImage('next'));
    }

    initDriftZoom();
    initThumbnailClick();
    initImageNavigation();
  }

  productDetailFeatures();

  /**
   * Product Quantity Selector
   * Mengatur jumlah pesanan di halaman detail produk
   */
  function initQuantitySelectors() {
    const decreaseButtons = document.querySelectorAll('.quantity-btn.decrease');
    const increaseButtons = document.querySelectorAll('.quantity-btn.increase');
    const quantityInputs = document.querySelectorAll('.quantity-input');

    decreaseButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const selector = btn.closest('.quantity-selector');
        if (!selector) return;
        const quantityInput = selector.querySelector('.quantity-input');
        if (!quantityInput) return;
        let currentValue = parseInt(quantityInput.value) || 1;
        if (currentValue > 1) {
          quantityInput.value = currentValue - 1;
        }
      });
    });

    increaseButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const selector = btn.closest('.quantity-selector');
        if (!selector) return;
        const quantityInput = selector.querySelector('.quantity-input');
        if (!quantityInput) return;
        let currentValue = parseInt(quantityInput.value) || 1;
        const maxVal = parseInt(quantityInput.getAttribute('max')) || 999;
        if (currentValue < maxVal) {
          quantityInput.value = currentValue + 1;
        }
      });
    });

    quantityInputs.forEach(input => {
      input.addEventListener('change', function() {
        let currentValue = parseInt(input.value) || 1;
        const min = parseInt(input.getAttribute('min')) || 1;
        const max = parseInt(input.getAttribute('max')) || 999;

        if (isNaN(currentValue) || currentValue < min) {
          input.value = min;
        } else if (currentValue > max) {
          input.value = max;
        }
      });
    });
  }

  initQuantitySelectors();

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

    // Check if query param exists in URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchVal = urlParams.get('search') || urlParams.get('q');
    if (searchVal && productSearchInput) {
      productSearchInput.value = searchVal;
    }

    // Initial run
    applyFilters();
  }

  // Initialize category filter
  initCategoryFilter();

  /**
   * Initiate glightbox (Hanya jika library termuat dan elemen ada)
   */
  if (typeof GLightbox !== 'undefined' && document.querySelector('.glightbox')) {
    GLightbox({
      selector: '.glightbox'
    });
  }

  /**
   * Initiate Pure Counter (Hanya jika library termuat dan elemen ada)
   */
  if (typeof PureCounter !== 'undefined' && document.querySelector('.purecounter')) {
    new PureCounter();
  }

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * ==========================================
   * PENGATURAN WHATSAPP & INTEGRASI PEMESANAN
   * ==========================================
   * Ganti nomor di bawah ini dengan nomor WhatsApp Admin Anda:
   * Format: Nomor internasional tanpa tanda + atau spasi (contoh: 62895639068080)
   */
  const WHATSAPP_PHONE = '62895639068080';

  function formatWhatsAppUrl(message) {
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  }

  function sendProductOrderViaWA(data) {
    const title = data.title || 'Produk ShopWise';
    const price = data.price ? data.price.trim() : '';
    const variant = data.variant ? data.variant.trim() : '';
    const qty = data.qty || 1;
    const url = data.url || window.location.href;

    let msg = `Halo Admin ShopWise, saya ingin memesan produk berikut:\n\n`;
    msg += `📦 *Nama Produk:* ${title}\n`;
    if (price) msg += `💰 *Harga Satuan:* ${price}\n`;
    if (variant) msg += `🎨 *Pilihan Warna/Varian:* ${variant}\n`;
    msg += `🔢 *Jumlah:* ${qty}\n`;
    msg += `🔗 *Link Produk:* ${url}\n\n`;
    msg += `Mohon info ketersediaan stok dan prosedur pembayarannya. Terima kasih!`;

    window.open(formatWhatsAppUrl(msg), '_blank');
  }

  function sendProductInquiryViaWA(data) {
    const title = data.title || 'Produk ShopWise';
    const price = data.price ? data.price.trim() : '';
    const url = data.url || window.location.href;

    let msg = `Halo Admin ShopWise, saya ingin konsultasi mengenai produk:\n\n`;
    msg += `📦 *Produk:* ${title}\n`;
    if (price) msg += `💰 *Harga:* ${price}\n`;
    msg += `🔗 *Link:* ${url}\n\n`;
    msg += `Apakah produk ini masih tersedia dan bisa dikirim ke alamat saya? Terima kasih!`;

    window.open(formatWhatsAppUrl(msg), '_blank');
  }

  // Variant color picker in Product Details page
  document.querySelectorAll('.variant-picker .color-dots .dot').forEach(dot => {
    dot.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = this.closest('.variant-picker');
      if (parent) {
        parent.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
        this.classList.add('active');
        const chosenVariantEl = parent.querySelector('.chosen-variant');
        const colorName = this.getAttribute('data-color') || '';
        if (chosenVariantEl) {
          chosenVariantEl.textContent = colorName;
        }

        // Change main product image if data-image or matching thumbnail exists
        const mainImage = document.getElementById('main-product-image');
        const targetImage = this.getAttribute('data-image');
        const thumbnails = document.querySelectorAll('.thumbnail-item');

        if (mainImage) {
          let matchedThumb = null;

          if (targetImage) {
            mainImage.src = targetImage;
            mainImage.setAttribute('data-zoom', targetImage);
            if (thumbnails.length) {
              matchedThumb = Array.from(thumbnails).find(t => t.getAttribute('data-image') === targetImage);
            }
          } else if (colorName && thumbnails.length) {
            matchedThumb = Array.from(thumbnails).find(t => {
              const tColor = t.getAttribute('data-color');
              const tImg = t.getAttribute('data-image') || '';
              return (tColor && tColor.toLowerCase() === colorName.toLowerCase()) ||
                     tImg.toLowerCase().includes(colorName.toLowerCase());
            });
            if (matchedThumb) {
              const imgSrc = matchedThumb.getAttribute('data-image');
              if (imgSrc) {
                mainImage.src = imgSrc;
                mainImage.setAttribute('data-zoom', imgSrc);
              }
            }
          }

          if (matchedThumb) {
            thumbnails.forEach(t => t.classList.remove('active'));
            matchedThumb.classList.add('active');
          }

          // Re-initialize Drift zoom if available
          if (typeof Drift !== 'undefined') {
            const zoomContainer = document.querySelector('.image-zoom-container');
            if (zoomContainer) {
              zoomContainer.innerHTML = '';
            }
            new Drift(mainImage, {
              paneContainer: document.querySelector('.image-zoom-container'),
              inlinePane: window.innerWidth < 768,
              inlineOffsetY: -85,
              containInline: true,
              hoverBoundingBox: false,
              zoomFactor: 3,
              handleTouch: false
            });
          }
        }
      }
    });
  });

  // Attach WhatsApp Order click handlers
  document.addEventListener('click', function(e) {
    // 1. Detail Page Order Button
    const detailOrderBtn = e.target.closest('#btnOrderWhatsapp, .whatsapp-order-btn, .primary-action-btn');
    if (detailOrderBtn) {
      e.preventDefault();
      e.stopPropagation();

      const titleEl = document.querySelector('.product-heading') || document.querySelector('h1');
      const priceEl = document.querySelector('.pricing-area .price-now') || document.querySelector('.product-price');
      const variantEl = document.querySelector('.chosen-variant');
      const qtyInput = document.querySelector('.quantity-input');

      sendProductOrderViaWA({
        title: titleEl ? titleEl.textContent.trim() : document.title,
        price: priceEl ? priceEl.textContent.trim() : '',
        variant: variantEl ? variantEl.textContent.trim() : '',
        qty: qtyInput ? qtyInput.value : 1,
        url: window.location.href
      });
      return;
    }

    // 2. Detail Page Consultation / Chat Button
    const detailChatBtn = e.target.closest('#btnChatWhatsapp, .whatsapp-checkout-btn, .checkout-now-btn');
    if (detailChatBtn) {
      e.preventDefault();
      e.stopPropagation();

      const titleEl = document.querySelector('.product-heading') || document.querySelector('h1');
      const priceEl = document.querySelector('.pricing-area .price-now') || document.querySelector('.product-price');

      sendProductInquiryViaWA({
        title: titleEl ? titleEl.textContent.trim() : document.title,
        price: priceEl ? priceEl.textContent.trim() : '',
        url: window.location.href
      });
      return;
    }

    // 3. Product Cards Order Button (Catalog / Category / Search / Deals)
    const cardOrderBtn = e.target.closest('.cart-btn, .add-cart-btn, [aria-label*="keranjang" i], [aria-label*="whatsapp" i]');
    if (cardOrderBtn) {
      e.preventDefault();
      e.stopPropagation();

      const card = cardOrderBtn.closest('.product-card, .product-item, .product-tile, .slide-card, .deal-card, .search-card, tr, li');
      let title = '';
      let price = '';
      let prodUrl = window.location.href;

      if (card) {
        const titleEl = card.querySelector('.product-title a, .product-title, h4 a, h4, h3 a, h3, .item-title a, .item-title') || card.querySelector('[data-title]');
        if (titleEl) {
          title = titleEl.getAttribute('data-title') || titleEl.textContent.trim();
          if (titleEl.hasAttribute('href') && titleEl.getAttribute('href') !== '#' && !titleEl.getAttribute('href').startsWith('javascript:')) {
            prodUrl = new URL(titleEl.getAttribute('href'), window.location.href).href;
          }
        }

        const priceEl = card.querySelector('.price-current, .current, .price-now, .product-price, .item-price') || card.querySelector('[data-price]');
        if (priceEl) {
          price = priceEl.getAttribute('data-price') ? `Rp ${parseInt(priceEl.getAttribute('data-price')).toLocaleString('id-ID')}` : priceEl.textContent.trim();
        }
      }

      sendProductOrderViaWA({
        title: title || 'Produk ShopWise',
        price: price || '',
        qty: 1,
        url: prodUrl
      });
      return;
    }
  });

  /**
   * ==========================================
   * INTEGRASI FORM KONTAK VIA WHATSAPP
   * ==========================================
   */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();

      if (!this.checkValidity()) {
        this.classList.add('was-validated');
        return;
      }

      this.classList.add('was-validated');

      const name = (this.querySelector('[name="name"]') || {}).value || '';
      const email = (this.querySelector('[name="email"]') || {}).value || '';
      const phone = (this.querySelector('[name="phone"]') || {}).value || '';
      const subject = (this.querySelector('[name="subject"]') || {}).value || '';
      const message = (this.querySelector('[name="message"]') || {}).value || '';

      let text = `Halo Admin ShopWise, ada pesan baru melalui form kontak website:\n\n`;
      text += `👤 *Nama:* ${name}\n`;
      text += `📧 *Email:* ${email}\n`;
      if (phone) text += `📱 *Telepon:* ${phone}\n`;
      text += `📌 *Subjek:* ${subject}\n\n`;
      text += `💬 *Pesan:*\n${message}\n\n`;
      text += `Mohon responnya. Terima kasih!`;

      window.open(formatWhatsAppUrl(text), '_blank');
      this.reset();
      this.classList.remove('was-validated');
    });
  }

  /**
   * ==========================================
   * NEWSLETTER STATIS (FEEDBACK BOOTSTRAP TOAST)
   * ==========================================
   */
  document.querySelectorAll('.newsletter-form-static').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (!emailInput || !emailInput.checkValidity()) {
        if (emailInput) emailInput.reportValidity();
        return;
      }

      let toastContainer = document.getElementById('shopwise-toast-container');
      if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'shopwise-toast-container';
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
      }

      const toastId = 'toast-' + Date.now();
      const toastHtml = `
        <div id="${toastId}" class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body">
              <i class="bi bi-check-circle-fill me-2"></i> Terima kasih telah berlangganan newsletter ShopWise!
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Tutup"></button>
          </div>
        </div>
      `;
      toastContainer.insertAdjacentHTML('beforeend', toastHtml);
      const toastEl = document.getElementById(toastId);
      if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
        const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
        bsToast.show();
      } else {
        alert('Terima kasih telah berlangganan newsletter ShopWise!');
      }

      form.reset();
    });
  });

  /**
   * ==========================================
   * GLOBAL SEARCH ROUTING (HEADER & MOBILE)
   * ==========================================
   */
  document.querySelectorAll('form.search-bar, form.mobile-search').forEach(searchForm => {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const input = searchForm.querySelector('input[type="text"], input[name="search"], input[name="q"], .search-field');
      const val = input ? input.value.trim() : '';
      if (!val) return;

      const isSubfolder = window.location.pathname.includes('/artikel/') || window.location.pathname.includes('/detail-produk/');
      const targetCategory = isSubfolder ? '../category.html' : 'category.html';

      const isCategoryPage = window.location.pathname.endsWith('category.html');
      const catSearchInput = document.getElementById('productSearch');
      if (isCategoryPage && catSearchInput) {
        catSearchInput.value = val;
        if (window.ShopWiseFilter && typeof window.ShopWiseFilter.applyFilters === 'function') {
          window.ShopWiseFilter.applyFilters();
        }
        catSearchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        window.location.href = `${targetCategory}?search=${encodeURIComponent(val)}`;
      }
    });
  });

})();