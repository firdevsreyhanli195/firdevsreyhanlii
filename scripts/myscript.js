
const sorular = [
    {
        soru: "Aşağıdakilerden hangisi sabah rutininde mutlaka olmalıdır?",
        secenekler: ["Güneş Kremi", "Ağır Gece Kremi", "Kil Maskesi"],
        dogruCevap: 0 
    },
    {
        soru: "Sivilceyi sıkmak neye yol açabilir?",
        secenekler: ["Hızlı iyileşmesine", "Leke ve skar oluşumuna", "Nemlenmeye"],
        dogruCevap: 1
    },
    {
        soru: "Yağlı ciltler nemlendirici kullanmalı mıdır?",
        secenekler: ["Hayır, gerek yoktur", "Evet, su bazlı kullanmalıdır", "Sadece kışın"],
        dogruCevap: 1
    }
];

let mevcutSoruIndeksi = 0;
let skor = 0;

const soruMetni = document.getElementById("soru-metni");
const seceneklerKutusu = document.getElementById("secenekler");
const sonucMesaji = document.getElementById("sonuc-mesaji");
const siradakiBtn = document.getElementById("siradaki-btn");

function quiziBaslat() {
    soruGoster();
}

function soruGoster() {
    seceneklerKutusu.innerHTML = "";
    sonucMesaji.classList.add("hidden-message");
    siradakiBtn.classList.add("hidden-message");

    let guncelSoru = sorular[mevcutSoruIndeksi];
    soruMetni.innerText = guncelSoru.soru;

    for (let i = 0; i < guncelSoru.secenekler.length; i++) {
        let btn = document.createElement("button");
        btn.innerText = guncelSoru.secenekler[i];
        btn.classList.add("quiz-btn");
        
        btn.onclick = function() {
            cevapKontrol(i);
        };
        seceneklerKutusu.appendChild(btn);
    }
}

function cevapKontrol(secilenIndeks) {
    let dogruIndeks = sorular[mevcutSoruIndeksi].dogruCevap;

    if (secilenIndeks === dogruIndeks) {
        skor++;
        sonucMesaji.innerText = "Tebrikler, Doğru Cevap! 🌟";
        sonucMesaji.style.color = "green";
    } else {
        sonucMesaji.innerText = "Yanlış Cevap. Doğrusu: " + sorular[mevcutSoruIndeksi].secenekler[dogruIndeks];
        sonucMesaji.style.color = "red";
    }

    sonucMesaji.classList.remove("hidden-message");
    siradakiBtn.classList.remove("hidden-message");

    let butonlar = document.querySelectorAll(".quiz-btn");
    butonlar.forEach(b => b.disabled = true);
}

if (siradakiBtn) { 
    siradakiBtn.addEventListener("click", function() {
        mevcutSoruIndeksi++;
        
        if (mevcutSoruIndeksi < sorular.length) {
            soruGoster();
        } else {
            soruMetni.innerText = "Quiz Bitti! Toplam Skorunuz: " + skor + "/" + sorular.length;
            seceneklerKutusu.innerHTML = "";
            siradakiBtn.classList.add("hidden-message");
            sonucMesaji.classList.add("hidden-message");
        }
    });
}


if (document.getElementById("quiz-area")) {
    quiziBaslat();
}


const sepeteEkleButonlari = document.querySelectorAll(".add-to-cart-btn");

if (sepeteEkleButonlari.length > 0) {
    sepeteEkleButonlari.forEach(buton => {
        buton.addEventListener("click", function(e) {
            e.preventDefault(); 
            
            
            const urunKutusu = this.closest(".product-detail-container");
            const urunAdi = urunKutusu.querySelector("h1").innerText;
            const resimYolu = urunKutusu.querySelector("img").getAttribute("src");
            const fiyatMetni = urunKutusu.querySelector(".price").innerText;
            
            const urunFiyati = parseInt(fiyatMetni); 

            const eklenecekUrun = {
                adi: urunAdi,
                resim: resimYolu,
                fiyat: urunFiyati
            };

            
            let sepet = JSON.parse(localStorage.getItem("glowCareSepet")) || [];
            sepet.push(eklenecekUrun);
            localStorage.setItem("glowCareSepet", JSON.stringify(sepet));

            
            alert("Ürün sepetinize başarıyla eklendi! 🛍️ Şimdi diğer ürünleri incelemeye devam edebilirsiniz.");
            window.location.href = "urunler.html";
        });
    });
}


const sepetKonteyneri = document.getElementById("cart-items-container");
const toplamTutarGostergesi = document.getElementById("cart-total");

if (sepetKonteyneri) {
    let sepet = JSON.parse(localStorage.getItem("glowCareSepet")) || [];
    let toplamTutar = 0;

    if (sepet.length === 0) {
        sepetKonteyneri.innerHTML = "<h4 style='text-align:center; padding:30px; color:#666;'>Sepetiniz şu an boş. Ürünler sayfasından sepetinize ürün ekleyebilirsiniz.</h4>";
        toplamTutarGostergesi.innerText = "Ara Toplam: 0 TL";
    } else {
        sepetKonteyneri.innerHTML = ""; 
        
        sepet.forEach(urun => {
            toplamTutar += urun.fiyat; 
            
            sepetKonteyneri.innerHTML += `
                <div class="cart-item">
                    <img src="${urun.resim}" alt="${urun.adi}">
                    <div class="item-details">
                        <h3>${urun.adi}</h3>
                        <p>Adet: 1</p>
                    </div>
                    <div class="item-price">${urun.fiyat} TL</div>
                </div>
            `;
        });
        
        toplamTutarGostergesi.innerText = "Ara Toplam: " + toplamTutar + " TL";
    }
}


const tamamlaButonu = document.querySelector(".checkout-btn");

if (tamamlaButonu) {
    tamamlaButonu.addEventListener("click", function() {
        let sepet = JSON.parse(localStorage.getItem("glowCareSepet")) || [];
        
        if (sepet.length === 0) {
            alert("Sepetiniz zaten boş!");
            return;
        }

        alert("Siparişiniz başarıyla oluşturuldu! Glow & Care'i tercih ettiğiniz için teşekkür ederiz. 💖");
        
        localStorage.removeItem("glowCareSepet");
        
        sepetKonteyneri.innerHTML = "<h3 style='text-align:center; margin: 40px 0; color:#d14777;'>Siparişiniz yola çıkmak üzere hazır! Yeni ürünler keşfetmeye ne dersiniz?</h3>";
        toplamTutarGostergesi.innerText = "Ara Toplam: 0 TL";
    });
}


const sepetiSilButonu = document.querySelector(".clear-cart-btn");

if (sepetiSilButonu) {
    sepetiSilButonu.addEventListener("click", function() {
        let sepet = JSON.parse(localStorage.getItem("glowCareSepet")) || [];
        
        if (sepet.length === 0) {
            alert("Sepetiniz zaten boş!");
            return;
        }

        let onay = confirm("Sepetinizdeki tüm ürünleri silmek istediğinize emin misiniz?");
        
        if (onay) {
            localStorage.removeItem("glowCareSepet");
            sepetKonteyneri.innerHTML = "<h4 style='text-align:center; padding:30px; color:#666;'>Sepetiniz boşaltıldı. Ürünler sayfasından sepetinize yeni ürün ekleyebilirsiniz.</h4>";
            toplamTutarGostergesi.innerText = "Ara Toplam: 0 TL";
        }
    });
}