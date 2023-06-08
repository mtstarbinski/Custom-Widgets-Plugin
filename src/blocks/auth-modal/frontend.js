document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.querySelectorAll('.open-modal');
    const modalElement = document.querySelector('.wp-block-wordpress-plus-auth-modal');
    const modalCloseElement = document.querySelectorAll('.modal-overlay, .modal-btn-close')

    openModalBtn.forEach( element => {
        element.addEventListener('click', event => {
            event.preventDefault();
            modalElement.classList.add('modal-show');
        })
    })

    modalCloseElement.forEach(element => {
        element.addEventListener('click', event => {
            event.preventDefault();
            modalElement.classList.remove('modal-show');
        })
    })

    const tabs = document.querySelectorAll('.tabs a');
    const signinForm = document.querySelector('#signin-tab');
    const signupForm = document.querySelector('#signup-tab');


    tabs.forEach(tab => {
        tab.addEventListener('click', event => {
            event.preventDefault();

            tabs.forEach(currentTab => {
                currentTab.classList.remove('active-tab')
            })

            event.currentTarget.classList.add('active-tab');
            const activeTab = event.currentTarget.getAttribute('href');

            if(activeTab === '#signin-tab') {
                signinForm.style.display = 'block';
                signupForm.style.display = 'none';
            } else {
                signinForm.style.display = 'none';
                signupForm.style.display = 'block';
            }

        })
    })

    signinForm.addEventListener('submit', async event => {
        event.preventDefault()

        const signinFieldset = signinForm.querySelector('fieldset');
        signinFieldset.setAttribute('disabled', true);

        const signinStatus = signinForm.querySelector('#signin-status');
        signinStatus.innerHTML = `
            <div class="modal-status modal-status-info">
                Please wait! We are logging you into your account.
            </div>
        `

        const formData = {
            user_login: signinForm.querySelector('#si-email').value,
            password: signinForm.querySelector('#si-password').value
        }

        const response = await fetch(up_auth_rest.signin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(formData)
        });

        const responseJSON = await response.json();
        if(responseJSON.status === 2) {
            signinStatus.innerHTML = `
                <div class="modal-status modal-status-success">
                    Success! You have been logged into your account.
                </div>
            `
            location.reload();
        } else {
            signinFieldset.removeAttribute('disabled')
            signinStatus.innerHTML = `
                <div class="modal-status modal-status-danger">
                    Unable to login! Invalid credentials.
                </div>
            `
        }

    })

    signupForm.addEventListener('submit', async event => {
        event.preventDefault()

        const signupFieldset = signupForm.querySelector('fieldset');
        signupFieldset.setAttribute('disabled', true)

        const signupStatus = signupForm.querySelector('#signup-status');
        signupStatus.innerHTML = `
            <div class="modal-status modal-status-info">
                Please wait! We are creating your account.
            </div>
        `

        const formData = {
            username: signupForm.querySelector('#su-name').value,
            email: signupForm.querySelector('#su-email').value,
            password: signupForm.querySelector('#su-password').value
        }

        const response = await fetch(up_auth_rest.signup, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(formData)
        });

        const responseJSON = await response.json();
        if(responseJSON.status === 2) {
            signupStatus.innerHTML = `
                <div class="modal-status modal-status-success">
                    Success! Your account has been created.
                </div>
            `
            location.reload();
        } else {
            signupFieldset.removeAttribute('disabled')
            signupStatus.innerHTML = `
                <div class="modal-status modal-status-danger">
                    Unable to create account! Please try again later.
                </div>
            `
        }
    })
})