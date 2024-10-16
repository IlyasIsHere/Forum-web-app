<template>
    <footer class="bg-gradient-to-r from-purple-600 to-blue-500 p-4 shadow-lg text-white py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        <!-- Left Section: Logo and Credits -->
        <div class="text-center md:text-left">
          <p class="text-sm font-light">
            &copy; {{ new Date().getFullYear() }} All Rights Reserved.
          </p>
          <p class="text-sm font-light">
            Developed by <span class="font-bold">Yassir Fri</span> & <span class="font-bold">Ilyas Hakkou</span>
          </p>
        </div>
        
        <!-- Right Section: Social Links -->
        <div class="flex space-x-6">
          <a href="https://www.facebook.com" target="_blank" rel="noopener" aria-label="Facebook" class="hover:text-blue-500">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener" aria-label="Twitter" class="hover:text-blue-400">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener" aria-label="Instagram" class="hover:text-pink-500">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn" class="hover:text-blue-700">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="https://www.github.com" target="_blank" rel="noopener" aria-label="GitHub" class="hover:text-gray-400">
            <i class="fab fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent'
  };
  </script>
  
  <style scoped>
  /* Font Awesome icons are used for social media links */
  /* Add hover effects and transitions to social icons */
  a {
    transition: color 0.3s ease;
  }
  </style>
  