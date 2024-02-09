let slideIndex = 1;

// Wywołanie funkcji aby wyświetlić pierwszy slajd
showSlides(slideIndex);

// Uruchomienie interwału, który co (2 sekundy) przesuwa slajd o 1 do przodu
setInterval(function() {
  plusSlides(1);
}, 2000);

// Funkcja przesuwa slajd o n miejsc do przodu lub do tyłu
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Funkcja ustawia slajd o indeksie n jako aktualny
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// Funkcja  wyświetla slajdy na podstawie indeksu n
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides"); // Pobranie wszystkich elementów slajdów
  let dots = document.getElementsByClassName("dot"); // Pobranie wszystkich elementów kropek
  

  if (n > slides.length) {slideIndex = 1} // Jeśli przekroczono górny zakres, ustaw na pierwszy slajd
  if (n < 1) {slideIndex = slides.length} // Jeśli przekroczono dolny zakres, ustaw na ostatni slajd
  
  // Pętla ukrywająca wszystkie slajdy
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; // Ukrycie slajdu
  }
  
  // Pętla usuwająca klasę "active" ze wszystkich kropek
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", ""); // Usunięcie klasy "active"
  }
  
  // Wyświetlenie aktualnego slajdu i ustawienie kropki jako aktywnej
  slides[slideIndex-1].style.display = "block"; // Wyświetlenie aktualnego slajdu
  dots[slideIndex-1].className += " active"; // Dodanie klasy "active" do kropki
}
