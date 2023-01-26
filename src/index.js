/* 
Event listener - to start game on DOM load
If DOM is still loading call "ready" function when DOM is loaded
If not then page is loaded and call "ready" function
*/
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}