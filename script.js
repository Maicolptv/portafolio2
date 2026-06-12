/* =====================================================
   CYBERPUNK PORTFOLIO
   script.js
===================================================== */

/* =====================================================
   THEME TOGGLE + LOCAL STORAGE
===================================================== */

const html = document.documentElement;
const themeBtn = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
    updateThemeButton(savedTheme);
}

themeBtn?.addEventListener("click", () => {

    const currentTheme = html.getAttribute("data-theme");

    const newTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";

    html.setAttribute("data-theme", newTheme);

    localStorage.setItem("theme", newTheme);

    updateThemeButton(newTheme);
});

function updateThemeButton(theme) {

    if (!themeBtn) return;

    if (theme === "dark") {
        themeBtn.innerHTML = "☀️ Light Mode";
    } else {
        themeBtn.innerHTML = "🌙 Dark Mode";
    }
}

/* =====================================================
   PROJECT FILTERS
===================================================== */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectItems =
    document.querySelectorAll(".project-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filter =
            button.getAttribute("data-filter");

        projectItems.forEach(item => {

            if (
                filter === "all" ||
                item.classList.contains(filter)
            ) {

                item.style.display = "block";

                setTimeout(() => {
                    item.style.opacity = "1";
                    item.style.transform = "scale(1)";
                }, 100);

            } else {

                item.style.opacity = "0";
                item.style.transform = "scale(.8)";

                setTimeout(() => {
                    item.style.display = "none";
                }, 300);
            }
        });

    });

});

/* =====================================================
   SCROLL TO TOP
===================================================== */

const scrollTopBtn =
    document.getElementById("scrollTopBtn");

scrollTopBtn?.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/* =====================================================
   SCROLL ANIMATION
===================================================== */

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add(
                    "animate-visible"
                );

            }

        });

    },

    {
        threshold: 0.15
    }

);

document
    .querySelectorAll(
        ".tech-card, .project-card, .experience-card, .video-card, .contact-card"
    )
    .forEach(element => {

        element.classList.add(
            "animate-hidden"
        );

        observer.observe(element);

    });

/* =====================================================
   MATRIX EFFECT
===================================================== */

const canvas =
    document.getElementById("matrixCanvas");

if (canvas) {

    const ctx =
        canvas.getContext("2d");

    let width =
        canvas.width =
        window.innerWidth;

    let height =
        canvas.height =
        window.innerHeight;

    const letters =
        "アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>[]{}#$%&";

    const fontSize = 16;

    const columns =
        Math.floor(width / fontSize);

    const drops =
        Array(columns).fill(1);

    function drawMatrix() {

        const theme =
            document.documentElement.getAttribute(
                "data-theme"
            );

        if (theme === "dark") {

            ctx.fillStyle =
                "rgba(7,11,18,0.08)";

            ctx.fillRect(
                0,
                0,
                width,
                height
            );

            ctx.fillStyle =
                "rgba(0,255,120,0.35)";

        } else {

            ctx.fillStyle =
                "rgba(243,248,252,0.08)";

            ctx.fillRect(
                0,
                0,
                width,
                height
            );

            ctx.fillStyle =
                "rgba(0,120,255,0.25)";
        }

        ctx.font =
            fontSize + "px monospace";

        for (
            let i = 0;
            i < drops.length;
            i++
        ) {

            const text =
                letters.charAt(
                    Math.floor(
                        Math.random() *
                        letters.length
                    )
                );

            ctx.fillText(
                text,
                i * fontSize,
                drops[i] * fontSize
            );

            if (
                drops[i] * fontSize >
                height &&
                Math.random() > 0.975
            ) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(
        drawMatrix,
        45
    );

    window.addEventListener(
        "resize",
        () => {

            width =
                canvas.width =
                window.innerWidth;

            height =
                canvas.height =
                window.innerHeight;
        }
    );
}

/* =====================================================
   EMAILJS
===================================================== */

/*
=====================================================
PASOS:

1. Crear cuenta:
   https://www.emailjs.com/

2. Crear:
   - Service ID
   - Template ID
   - Public Key

3. Reemplazar valores.
=====================================================
*/

(function () {

    if (
        typeof emailjs !==
        "undefined"
    ) {

        emailjs.init(
            "YOUR_PUBLIC_KEY"
        );

    }

})();

const contactForm =
    document.getElementById(
        "contactForm"
    );

const successMessage =
    document.getElementById(
        "successMessage"
    );

contactForm?.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();

        const inputs =
            this.querySelectorAll(
                "input, textarea"
            );

        const formData = {

            from_name:
                inputs[0].value,

            from_email:
                inputs[1].value,

            phone:
                inputs[2].value,

            message:
                inputs[3].value,

            to_email:
                "juancito.pena@gmail.com"
        };

        emailjs
            .send(
                "YOUR_SERVICE_ID",
                "YOUR_TEMPLATE_ID",
                formData
            )

            .then(() => {

                successMessage.classList.remove(
                    "d-none"
                );

                successMessage.innerHTML =
                    "✅ Mensaje enviado correctamente";

                contactForm.reset();

                setTimeout(() => {

                    successMessage.classList.add(
                        "d-none"
                    );

                }, 5000);

            })

            .catch(error => {

                console.error(
                    error
                );

                successMessage.classList.remove(
                    "d-none"
                );

                successMessage.innerHTML =
                    "❌ Error enviando mensaje";

            });

    }
);

/* =====================================================
   NAVBAR ACTIVE LINK
===================================================== */

const sections =
    document.querySelectorAll(
        "section"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );

window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(
            section => {

                const sectionTop =
                    section.offsetTop - 120;

                const sectionHeight =
                    section.clientHeight;

                if (
                    pageYOffset >=
                    sectionTop
                ) {

                    current =
                        section.getAttribute(
                            "id"
                        );
                }
            }
        );

        navLinks.forEach(
            link => {

                link.classList.remove(
                    "active"
                );

                if (
                    link.getAttribute(
                        "href"
                    ) ===
                    "#" + current
                ) {

                    link.classList.add(
                        "active"
                    );
                }
            }
        );

    }
);

/* =====================================================
   SIMPLE TYPING EFFECT
===================================================== */

const heroTitle =
    document.querySelector(
        ".hero-title"
    );

if (heroTitle) {

    const originalText =
        heroTitle.textContent;

    heroTitle.textContent = "";

    let i = 0;

    function typeWriter() {

        if (
            i <
            originalText.length
        ) {

            heroTitle.textContent +=
                originalText.charAt(i);

            i++;

            setTimeout(
                typeWriter,
                80
            );
        }
    }

    window.addEventListener(
        "load",
        typeWriter
    );
}

/* =====================================================
   CONSOLE SIGNATURE
===================================================== */

console.log(`
██████╗██╗   ██╗██████╗ ███████╗██████╗
██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗
██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝
██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗
╚██████╗   ██║   ██████╔╝███████╗██║  ██║
 ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝

Cyberpunk Portfolio Ready ⚡
`);