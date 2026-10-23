/**
 * ============================================================
 *  KONFIGURASI PERSONALISASI — ubah bagian ini saja! ❤
 * ============================================================
 *  Ganti semua teks di bawah ini supaya website-nya benar-benar
 *  jadi hadiah spesial untuk pacarmu.
 * ============================================================
 */

export const birthdayConfig = {
  /** Nama panggilan pacarmu */
  herName: "Sayang",

  /** Nama panggilanmu (pengirim) */
  yourName: "Aku",

  /** Tanggal jadian (YYYY-MM-DD) — dipakai untuk penghitung hari bersama */
  anniversaryDate: "2023-02-14",

  /** Teks pembuka di layar amplop */
  envelopeHint: "Psst... ada kejutan buat kamu",

  /** Paragraf surat cinta (efek mesin ketik) */
  letterParagraphs: [
    "Hai, cintaku...",
    "Selamat ulang tahun ya, sayang. Hari ini dunia merayakan hari di mana orang terindah yang pernah kutemui dilahirkan.",
    "Terima kasih sudah jadi rumah paling nyaman untuk pulang, pelukan paling hangat di hari terbaik maupun terburukku, dan alasan aku tersenyum sendiri tanpa alasan yang jelas.",
    "Semoga di umurmu yang baru ini, semua mimpimu satu per satu jadi nyata. Dan aku akan selalu ada di sini — di setiap langkahmu, dukung kamu dari dekat maupun dari jauh.",
    "Selamat bertambah umur, ya. Aku sayang kamu, hari ini, besok, dan seterusnya. ❤",
  ],

  /** Alasan-alasan kenapa kamu sayang dia (tampil di kartu) */
  reasons: [
    { emoji: "😊", title: "Senyummu", text: "Senyummu adalah alasan hari-hariku selalu terasa lebih ringan." },
    { emoji: "🤗", title: "Pelukmu", text: "Pelukmu bikin semua masalah terasa selesai dalam sekejap." },
    { emoji: "😂", title: "Tawamu", text: "Tawamu adalah lagu favorit yang nggak pernah bosen kudengar." },
    { emoji: "🫶", title: "Hatimu", text: "Hatimu yang baik dan hangat, itu hal paling indah darimu." },
    { emoji: "🌙", title: "Waktu Malam", text: "Obrolan tengah malam denganmu nggak pernah kehabisan cerita." },
    { emoji: "☕", title: "Hal Kecil", text: "Caramu ngingetin aku minum, istirahat, dan jaga diri. Hal kecil, makna besar." },
  ],

  /** Caption galeri kenangan (sesuaikan dengan momen kalian) */
  memories: [
    { image: "/images/couple-sunset.png", caption: "Senja terindah adalah yang kulewati bersamamu", date: "Kita, selalu" },
    { image: "/images/roses.png", caption: "Setangkai bunga tak pernah seindah namamu", date: "Untukmu" },
    { image: "/images/couple-cozy.png", caption: "Hal favoritku: malam biasa bareng kamu", date: "Setiap hari" },
  ],
};

export type BirthdayConfig = typeof birthdayConfig;
