


(function() {
  const scriptTag = document.currentScript;
  const company = scriptTag.getAttribute('data-company');
  const container = document.getElementById('wallfeedback-testimonials');

  if (!container) return;

  // Simulate API response for testing
  const mockTestimonials = [
    { message: "Great service! Highly recommend." },
    { message: "Loved the experience. Will come back for sure." },
    { message: "Amazing product quality and support." }
  ];

  container.innerHTML = '<h3>Testimonials for ' + company + '</h3>';
   mockTestimonials.forEach(t => {
    const p = document.createElement('p');
    p.textContent = t.message;
    container.appendChild(p);
  });
})();



// (function() {
//   const scriptTag = document.currentScript;
//   const company = scriptTag.getAttribute('data-company');
//   const container = document.getElementById('wallfeedback-testimonials');

//   if (!container) return;

//   // Example: fetch testimonial data and render
//   fetch(`http://localhost:8080/api/testimonials/${company}`)
//     .then(res => res.json())
//     .then(data => {
//       container.innerHTML = '<h3>Testimonials for ' + company + '</h3>';
//       data.forEach(t => {
//         const p = document.createElement('p');
//         p.textContent = t.message;
//         container.appendChild(p);
//       });
//     })
//     .catch(() => {
//       container.innerHTML = '<p>Failed to load testimonials.</p>';
//     });
// })();



// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <title>JS Embed Preview</title>
// </head>
// <body>
//   <h1>JavaScript Embed Preview</h1>
//   <div id="wallfeedback-testimonials"></div>

//   <script src="http://localhost:8080/embed.js" data-company="today-fun"></script>
// </body>
// </html>
