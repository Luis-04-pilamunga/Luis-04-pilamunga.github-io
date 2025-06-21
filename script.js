document.addEventListener('DOMContentLoaded', function() {
    // Menú hamburguesa
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Cambiar header al hacer scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animaciones al hacer scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    // Validación del formulario
    const contactoForm = document.getElementById('contacto-form');
    
    if (contactoForm) {
        contactoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset errores
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
            });
            
            let isValid = true;
            
            // Validar nombre
            const nombre = document.getElementById('nombre');
            if (nombre.value.trim() === '') {
                document.getElementById('nombre-error').textContent = 'Por favor ingresa tu nombre';
                document.getElementById('nombre-error').style.display = 'block';
                isValid = false;
            }
            
            // Validar email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '') {
                document.getElementById('email-error').textContent = 'Por favor ingresa tu correo electrónico';
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                document.getElementById('email-error').textContent = 'Por favor ingresa un correo electrónico válido';
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            }
            
            // Validar mensaje
            const mensaje = document.getElementById('mensaje');
            if (mensaje.value.trim() === '') {
                document.getElementById('mensaje-error').textContent = 'Por favor ingresa tu mensaje';
                document.getElementById('mensaje-error').style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                // Aquí podrías enviar el formulario con AJAX o simular el envío
                alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
                this.reset();
            }
        });
    }
    
    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Añadir clase fade-in a elementos que deben animarse
    const sections = document.querySelectorAll('.section:not(#inicio)');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
});