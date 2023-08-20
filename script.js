
var tl2 =gsap.timeline({
    scrollTrigger:{
        trigger:'#about',
        scroller:'body',
        //markers:true,
        start:'top 20%',
        end:'top -80%',
        scrub:3,
        toggleActions: 'play none none reverse',
    }
})
tl2.to('.main',{
    backgroundColor:"black",
    color:'white',
    toggleActions: 'play none none reverse',
})
tl2.from('#about',{
    autoAlpha:0,
    x:-80,
    delay:1,
    duration:10
})
tl2.to('#services, #team',{
    backgroundColor:"white",
    color:'black',
    duration:10,
    delay:1,

})


(function($bs) {
    const CLASS_NAME = 'has-child-dropdown-show';
        $bs.Dropdown.prototype.toggle = function(_orginal) {
            return function() {
                document.querySelectorAll('.' + CLASS_NAME).forEach(function(e) {
                    e.classList.remove(CLASS_NAME);
                });
                let dd = this._element.closest('.dropdown').parentNode.closest('.dropdown');
                for (; dd && dd !== document; dd = dd.parentNode.closest('.dropdown')) {
                    dd.classList.add(CLASS_NAME);
                }
                return _orginal.call(this);
            }
        }($bs.Dropdown.prototype.toggle);

        document.querySelectorAll('.dropdown').forEach(function(dd) {
            dd.addEventListener('hide.bs.dropdown', function(e) {
                if (this.classList.contains(CLASS_NAME)) {
                    this.classList.remove(CLASS_NAME);
                    e.preventDefault();
                }
                if(e.clickEvent && e.clickEvent.composedPath().some(el=>el.classList && el.classList.contains('dropdown-toggle'))){
                    e.preventDefault();
                }
                e.stopPropagation(); // do not need pop in multi level mode
            });
        });

        // for hover
        function getDropdown(element) {
            return $bs.Dropdown.getInstance(element) || new $bs.Dropdown(element);
        }

        document.querySelectorAll('.dropdown-hover, .dropdown-hover-all .dropdown').forEach(function(dd) {
            dd.addEventListener('mouseenter', function(e) {
                let toggle = e.target.querySelector(':scope>[data-bs-toggle="dropdown"]');
                if (!toggle.classList.contains('show')) {
                    getDropdown(toggle).toggle();
                }
            });
            dd.addEventListener('mouseleave', function(e) {
                let toggle = e.target.querySelector(':scope>[data-bs-toggle="dropdown"]');
                if (toggle.classList.contains('show')) {
                    getDropdown(toggle).toggle();
                }
            });
        });
    })(bootstrap);