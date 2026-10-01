const categoryLinks = [...document.querySelectorAll('.category-link')];
const menuSections = categoryLinks
	.map((link) => document.querySelector(link.getAttribute('href')))
	.filter(Boolean);

function setActiveCategory(sectionId) {
	for (const link of categoryLinks) {
		const isActive = link.getAttribute('href') === `#${sectionId}`;
		link.classList.toggle('active', isActive);

		if (isActive) {
			link.setAttribute('aria-current', 'location');
		} else {
			link.removeAttribute('aria-current');
		}
	}
}

for (const link of categoryLinks) {
	link.addEventListener('click', () => {
		setActiveCategory(link.getAttribute('href').slice(1));
	});
}

if ('IntersectionObserver' in window) {
	const sectionObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					setActiveCategory(entry.target.id);
				}
			}
		},
		{ rootMargin: '-30% 0px -60% 0px' },
	);

	for (const section of menuSections) {
		sectionObserver.observe(section);
	}
}

/* =========================
    CONTACT FORM
========================= */

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

if (contactForm) {

    const fields = {
        name: {
            input: document.querySelector("#name"),
            message: "Please enter your name."
        },

        email: {
            input: document.querySelector("#email"),
            message: "Please enter a valid email address."
        },

        subject: {
            input: document.querySelector("#subject"),
            message: "Please enter a subject."
        },

        message: {
            input: document.querySelector("#message"),
            message: "Please write your message."
        }
    };


    function clearError(input) {

        const group = input.closest(".form-group");

        group.classList.remove("error");

        const errorMessage =
            group.querySelector(".error-message");

        errorMessage.textContent = "";
    }


    function showError(input, message) {

        const group = input.closest(".form-group");

        group.classList.add("error");

        const errorMessage =
            group.querySelector(".error-message");

        errorMessage.textContent = message;
    }


    function validateEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }


    function validateField(fieldName) {

        const field = fields[fieldName];

        const input = field.input;

        const value = input.value.trim();


        clearError(input);


        if (!value) {

            showError(
                input,
                field.message
            );

            return false;
        }


        if (
            fieldName === "email" &&
            !validateEmail(value)
        ) {

            showError(
                input,
                "Please enter a valid email address."
            );

            return false;
        }


        return true;
    }


    Object.keys(fields).forEach((fieldName) => {

        const input = fields[fieldName].input;

        input.addEventListener("input", () => {

            clearError(input);

            formStatus.textContent = "";

        });

    });


    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const isValid = Object.keys(fields)
            .map(validateField)
            .every(Boolean);


        if (!isValid) {

            formStatus.textContent =
                "Please check the highlighted fields.";

            formStatus.style.color = "#d9957b";

            return;
        }


        const button =
            contactForm.querySelector(".send-button");

        const buttonText =
            contactForm.querySelector(".button-text");


        button.disabled = true;

        buttonText.textContent = "Sending...";


        setTimeout(() => {

            formStatus.textContent =
                "Thanks! Your message has been received.";

            formStatus.style.color = "#d1a36a";


            contactForm.reset();

            button.disabled = false;

            buttonText.textContent = "Send Message";


        }, 900);

    });

}