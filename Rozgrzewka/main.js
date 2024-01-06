//const liczba1 = document.querySelector('#liczba1')
//const liczba2 = document.querySelector('#liczba2')
//const liczba3 = document.querySelector('#liczba3')
//const liczba4 = document.querySelector('#liczba4')

//const przelicz = document.querySelector('#przelicz')
//const wynik = document.querySelector('#przelicz')

function przelicz() {
    const liczba1 = document.getElementById('liczba1').value;
    const liczba2 = document.getElementById('liczba2').value;
    const liczba3 = document.getElementById('liczba3').value;
    const liczba4 = document.getElementById('liczba4').value;
    const wyniksuma1 = parseInt(liczba1) + parseInt(liczba2) + parseInt(liczba3) + parseInt(liczba4); // dodawanie
    const wyniksrednia1 = wyniksuma1 / 4; //średnia
    const wynikmax = Math.max(liczba1, liczba2, liczba3, liczba4); 
    const wynikmix = Math.min(liczba1, liczba2, liczba3, liczba4);

    document.getElementById("wyniksuma").textContent = wyniksuma1;
    document.getElementById("wyniksrednia").textContent = wyniksrednia1;
    document.getElementById("wmax").textContent = wynikmax;
    document.getElementById("wmix").textContent = wynikmix;

    return false;
}