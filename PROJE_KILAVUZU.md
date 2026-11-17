# Yemekhane Takip Projesi — Proje Kılavuzu

Son güncelleme: 17 Kasım 2026

## 1. Proje bilgileri

- GitHub deposu: https://github.com/erkan2384-glitch/YEMEKHANE-TAK-P
- Ana dal: `main`
- Yayın adresi: https://erkan2384-glitch.github.io/YEMEKHANE-TAK-P/
- Ana uygulama dosyası: `index.html`
- Veritabanı: Supabase
- Supabase proje adresi: https://gkfcibfetpespnopyeaz.supabase.co

Uygulama sohbet geçmişine bağlı değildir. Kod GitHub deposunda, çevrim içi öğrenci ve yoklama kayıtları Supabase veritabanındadır.

## 2. Korunan çalışan sürüm

17 Kasım 2026 tarihinde ana dalın çalışan kodu aşağıdaki commit ile sabitlenmiştir:

- Commit: `23e71d51aa72ce4b88836d63b736fcce6bd9e3d4`
- Yedek dal: `yedek-calismayan-surum-oncesi-2026-11-17`

Bu dal, ana dalın bu tarihteki kod halini korur. Yeni değişiklikler bu yedek dal üzerinde yapılmamalıdır.

Önceki 11 Kasım temel sürümü üzerine daha sonra istenen öğrenci pasife alma / yeniden aktifleştirme özelliği eklenmiştir. Bu özellik öğrenciyi silmek yerine `öğrenciler.aktif` alanını güncellemeyi amaçlar. Son kullanıcı arayüzü metni: “Yemekhane kullanımını durdur”.

## 3. Veritabanı yapısı

Bilinen tablolar:

### `öğrenciler`
- `id`
- `ogrenci_adi`
- `sinif`
- `veli_telefon`
- `aktif`

### `yoklamalar`
- `attendance_date`
- `student_id`
- `student_name`
- `class_name`
- `created_at`
- `created_by`

Uygulamanın tarayıcı yerel depolama anahtarları:
- `yemekhane_demo_v1` — yoklama
- `yemekhane_students_v1` — öğrenci

Yerel depolama, Supabase veritabanı yedeği değildir.

## 4. Değişiklik yapma kuralları

1. Kullanıcı açıkça istemeden çalışan uygulama dosyalarını değiştirme.
2. Her değişiklikten önce `main` dalındaki güncel `index.html` dosyasını ve SHA bilgisini al.
3. Değişiklik öncesi yeni bir yedek dalı oluştur veya mevcut sürümü ayrı bir commit ile sabitle.
4. Tek seferde yalnızca tek amaçlı, küçük bir değişiklik yap.
5. Her değişikliği ayrı commit olarak kaydet.
6. Önce test et; test edilmemiş özelliği çalışıyor diye bildirme.
7. Hata görülürse yeni özellik ekleme. Son sağlam commit'e geri dön.
8. `sw.js`, Supabase bağlantısı, kimlik doğrulama ve tablo yapısını açık talep olmadan değiştirme.
9. Gizli anahtarları, parolaları veya erişim tokenlarını koda ya da bu dosyaya yazma.

## 5. Geri dönüş (rollback)

- GitHub deposunda **Commits** bölümünden son sağlam commit'i bul.
- Sorunlu commit için GitHub'ın **Revert** işlemini kullan veya sağlam commit'ten yeni bir düzeltme commit'i oluştur.
- Geçmişi zorla değiştirme (force push) ve yedek dalı silme.
- Kod geri dönüşü Supabase verilerini geri almaz; veritabanı geri yüklemesi ayrı işlemdir.

## 6. Supabase veritabanı yedeği — henüz kurulmadı

Bu proje için otomatik Supabase yedeklemesi kurulduğu doğrulanmış değildir. Bu nedenle öğrenci ve yoklama kayıtlarının ayrı yedeği alınmalıdır.

Önerilen asgari rutin:
- Her gün: Supabase Table Editor üzerinden `öğrenciler` ve `yoklamalar` tablolarını CSV olarak dışa aktar.
- Dosyaları tarih içeren adlarla sakla; ör. `ogrenciler-2026-11-17.csv`, `yoklamalar-2026-11-17.csv`.
- Haftalık: CSV dosyalarını ikinci, bağımsız bir konumda da sakla.
- Yedek dosyalarının açılabildiğini ve satır sayılarının makul olduğunu kontrol et.
- Geri yükleme işlemini canlı veritabanında denemeden önce ayrı bir test ortamında doğrula.

Not: CSV dışa aktarma manuel yedektir; otomatik günlük yedekleme veya tam veritabanı geri yükleme planı yerine geçmez. Supabase planının sunduğu yedekleme/PITR seçenekleri ayrıca kontrol edilmelidir.

## 7. Günlük kullanım öncesi kontrol

- Uygulama açılıyor mu?
- Öğrenci listesi Supabase'den geliyor mu?
- Yoklama kaydı eklenebiliyor mu?
- Geçmiş yoklamalar görüntüleniyor mu?
- Pasife alma ve yeniden aktifleştirme tek bir deneme öğrenci kaydıyla doğru çalışıyor mu?

Canlı veride test yaparken gerçek öğrenci kaydını silme. İlk denemeyi izinli bir test kaydıyla yap.

## 8. Bilinmeyen / doğrulanması gerekenler

- Supabase `aktif` kolonunun canlı tabloda mevcut olduğu ve yazma izinlerinin doğru olduğu ayrıca test edilmelidir.
- Günlük otomatik veritabanı yedeği şu anda kurulmuş olarak kabul edilmemelidir.
- GitHub `main` dalı için koruma kuralı etkin görünmüyor; bu kılavuz tek başına dal koruması sağlamaz.
