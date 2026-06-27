// ==========================================================================
// VAISHNAVI'S BUILD - GLOBAL ENGINE (THEME, NAV & INDUSTRIAL VALIDATION)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. STICKY INTERACTIVE NAVIGATION BAR
    const mainHeader = document.getElementById("main-header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add("shrink");
        } else {
            mainHeader.classList.remove("shrink");
        }
    });

    // 2. CORE LIGHT / DARK THEME TOGGLE MECHANISM
    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentSavedTheme = localStorage.getItem("portfolio-theme") || "dark-theme";
    
    document.body.className = currentSavedTheme;

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            if (document.body.classList.contains("dark-theme")) {
                document.body.className = "light-theme";
                localStorage.setItem("portfolio-theme", "light-theme");
            } else {
                document.body.className = "dark-theme";
                localStorage.setItem("portfolio-theme", "dark-theme");
            }
        });
    }

    // 3. FREELANCER ONBOARDING PIPELINE WITH AUTO-CLOSE POPUP
    const userForm = document.getElementById("secure-onboarding-form");
    const overlayNode = document.getElementById("statusModalOverlay");
    const modalCloseNode = document.getElementById("modalCloseBtn");
    
    let popupTimer = null;

    if (userForm) {
        // Safe Initialization of EmailJS Matrix Engine
        emailjs.init("YOUR_PUBLIC_KEY");

        const targetFields = ["clientName", "clientEmail", "clientPhone", "clientService", "clientMessage"];
        
        // Real-time listener nodes input activation
        targetFields.forEach(fieldId => {
            const inputField = document.getElementById(fieldId);
            if (inputField) {
                inputField.addEventListener("input", () => evaluateInputNode(fieldId));
                inputField.addEventListener("change", () => evaluateInputNode(fieldId));
            }
        });

        // Close button handler
        if (modalCloseNode) {
            modalCloseNode.addEventListener("click", hideResponseModal);
        }

        // Onboarding submit data mapping pipeline
        userForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let matrixPassed = true;

            targetFields.forEach(fieldId => {
                if (!evaluateInputNode(fieldId)) {
                    matrixPassed = false;
                }
            });

            if (matrixPassed) {
                const actionBtn = document.getElementById("onboarding-submit-btn");
                const txtNode = document.getElementById("btnText");
                const spinnerNode = document.getElementById("btnSpinner");

                // Set loading active sequence
                actionBtn.disabled = true;
                txtNode.innerText = "Submitting...";
                spinnerNode.style.display = "block";

                const transactionTemplate = {
                    from_name: document.getElementById("clientName").value.trim(),
                    reply_to: document.getElementById("clientEmail").value.trim(),
                    phone_num: document.getElementById("clientPhone").value.trim(),
                    service_requested: document.getElementById("clientService").value,
                    message_details: document.getElementById("clientMessage").value.trim()
                };

                emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", transactionTemplate)
                    .then(() => {
                        displayResponseModal(
                            "✔", 
                            "Transmission Successful!", 
                            "Thank You! Your request has been submitted successfully. We will contact you soon.", 
                            "success-mode"
                        );
                        userForm.reset();
                        targetFields.forEach(id => {
                            document.getElementById(id).style.borderColor = "var(--glass-border)";
                        });
                    })
                    .catch((err) => {
                        console.error("EmailJS Pipeline Error Stack:", err);
                        displayResponseModal(
                            "❌", 
                            "Submission Interrupted", 
                            "Unable to submit your request at the moment. Please try again later.", 
                            "error-mode"
                        );
                    })
                    .finally(() => {
                        actionBtn.disabled = false;
                        txtNode.innerText = "Initiate Launch Sequence";
                        spinnerNode.style.display = "none";
                    });
            }
        });
    }

    // Modal Display Functions Framework
    function displayResponseModal(iconSymbol, titleText, descText, stylingMode) {
        document.getElementById("modalIcon").innerText = iconSymbol;
        document.getElementById("modalTitle").innerText = titleText;
        document.getElementById("modalDesc").innerText = descText;
        
        overlayNode.className = `modal-overlay ${stylingMode} active`;

        clearTimeout(popupTimer);
        popupTimer = setTimeout(hideResponseModal, 5000);
    }

    function hideResponseModal() {
        if (overlayNode) {
            overlayNode.classList.remove("active");
        }
        clearTimeout(popupTimer);
    }

    // Comprehensive Industry Field Validation Engine
    function evaluateInputNode(fieldId) {
        const DOMNode = document.getElementById(fieldId);
        if (!DOMNode) return false;

        const stringVal = DOMNode.value.trim();
        const feedbackNode = document.getElementById(`err-${fieldId.toLowerCase()}`);
        let stateValid = true;
        let diagnosticString = "";

        switch (fieldId) {
            case "clientName":
                if (stringVal === "") {
                    stateValid = false; diagnosticString = "Full name is required.";
                } else if (stringVal.length < 3) {
                    stateValid = false; diagnosticString = "Full name must be at least 3 characters.";
                } else if (!/^[A-Za-z\s]+$/.test(stringVal)) {
                    stateValid = false; diagnosticString = "Alphabets and spaces only.";
                }
                break;

            case "clientEmail":
                if (stringVal === "") {
                    stateValid = false; diagnosticString = "Email address is required.";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringVal)) {
                    stateValid = false; diagnosticString = "Please enter a valid email address.";
                }
                break;

            case "clientPhone":
                if (stringVal === "") {
                    stateValid = false; diagnosticString = "Phone number is required.";
                } else if (!/^\d+$/.test(stringVal)) {
                    stateValid = false; diagnosticString = "Phone number must contain digits only.";
                } else if (stringVal.length !== 10) {
                    stateValid = false; diagnosticString = "Phone number must be exactly 10 digits.";
                } else if (!/^[6-9]/.test(stringVal)) {
                    stateValid = false; diagnosticString = "Phone number must start with 6, 7, 8, or 9.";
                }
                break;

            case "clientService":
                if (stringVal === "") {
                    stateValid = false; diagnosticString = "Please select a workflow tier service.";
                }
                break;

            case "clientMessage":
                if (stringVal === "") {
                    stateValid = false; diagnosticString = "Message description parameters required.";
                } else if (stringVal.length < 20) {
                    stateValid = false; diagnosticString = "Message must contain at least 20 characters.";
                } else if (stringVal.length > 500) {
                    stateValid = false; diagnosticString = "Message allocation length exceeded (Max 500 chars).";
                }
                break;
        }

        if (!stateValid) {
            feedbackNode.innerText = diagnosticString;
            feedbackNode.classList.add("visible");
            DOMNode.style.borderColor = "#FF4D4D";
        } else {
            feedbackNode.classList.remove("visible");
            DOMNode.style.borderColor = "var(--glass-border)";
            setTimeout(() => { if(!feedbackNode.classList.contains("visible")) feedbackNode.innerText = ""; }, 300);
        }

        return stateValid;
    }
});