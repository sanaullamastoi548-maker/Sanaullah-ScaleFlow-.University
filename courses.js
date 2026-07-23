/* ============================================================
   ScaleFlow University — Courses Module Script (courses.js)
   Version: 1.0 FINAL LOCKED
   ============================================================ */

(function() {
    "use strict";

    function initCoursesModule() {
        const searchInput = document.getElementById('courseSearchInput');
        const filterBtns = document.querySelectorAll('.category-filters .filter-btn');
        const courseCards = document.querySelectorAll('.courses-grid .course-card');

        if (!searchInput && filterBtns.length === 0) {
            return; // اگر اس پیج پر کورس عناصر موجود نہ ہوں تو فنکشن روک دیں
        }

        // 1. Search Engine Functionality
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const query = this.value.toLowerCase().trim();
                courseCards.forEach(card => {
                    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                    const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
                    if (title.includes(query) || desc.includes(query)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }

        // 2. Category Filter Engine Functionality
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // ایکٹیو کلاس کو ہٹانا اور نئی پر لگانا
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                courseCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || !category || category === filterValue) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // 3. Button Click Actions for Course Cards
        courseCards.forEach(card => {
            const btn = card.querySelector('button');
            if (btn) {
                btn.addEventListener('click', function() {
                    const courseTitle = card.querySelector('h3')?.textContent || 'Course';
                    if (window.ScaleFlow && typeof window.ScaleFlow.showToast === 'function') {
                        window.ScaleFlow.showToast(`🚀 Opening: ${courseTitle}`, 'success');
                    } else {
                        alert(`Opening: ${courseTitle}`);
                    }
                });
            }
        });

        console.log("✅ Courses Module JS initialized successfully and locked.");
    }

    // جب ڈوم لوڈ ہو جائے تو اسکول/کورس ماڈیول کو رن کریں
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCoursesModule);
    } else {
        initCoursesModule();
    }

    // گلوبাল ابجیکٹ کے طور پر محفوظ کرنا
    window.ScaleFlowCoursesModule = {
        init: initCoursesModule
    };

})();
