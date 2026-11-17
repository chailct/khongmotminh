KHÔNG MỘT MÌNH ARCADE — FIREBASE FIRESTORE WALL
================================================

CẤU TRÚC THƯ MỤC
----------------
index.html               Trang web; Firebase SDK CDN 13.3.0 được import trực tiếp trong file này.
style.css                Giao diện hiện tại + giao diện Bức tường Firestore.
script.js                Gameplay 4 trò chơi; phần lưu bức tường cục bộ đã được gỡ bỏ.
firestore.rules          Security Rules cần dán vào Firebase Console.
assets/poster-tham-khao.png

PHẦN 1 — TẠO FIREBASE PROJECT
-----------------------------
1. Mở https://console.firebase.google.com/ và đăng nhập Google.
2. Chọn Add project / Tạo dự án, đặt tên dự án (ví dụ: khong-mot-minh-arcade).
3. Đi theo các bước tạo dự án. Google Analytics có thể tắt nếu không cần.
4. Trong trang dự án, chọn biểu tượng Web </> để đăng ký ứng dụng web.
5. Đặt tên ứng dụng, ví dụ: Khong Mot Minh Website. Không bắt buộc bật Firebase Hosting.
6. Sau khi đăng ký, Firebase hiển thị đoạn cấu hình có dạng:

   const firebaseConfig = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "...",
     measurementId: "..."
   };

7. Nếu bạn dùng đúng bộ ZIP "firebase-ready" này, firebaseConfig của dự án khongmotminh-cc6b4 đã được điền sẵn trong index.html; không cần dán lại.
   Nếu dùng một bản index.html cũ, hãy sao chép cấu hình Web app của chính dự án và thay vào khối const firebaseConfig.
   Không dán Service Account JSON, private key hoặc mật khẩu vào website.
   Lưu ý: Firebase Web config (gồm apiKey) là cấu hình dành cho client và có thể xuất hiện trong mã nguồn công khai; nó không thay thế Security Rules. Không bao giờ đưa Service Account/private key vào trình duyệt.

PHẦN 2 — BẬT ĐĂNG NHẬP ẨN DANH
------------------------------
1. Trong Firebase Console, mở Build > Authentication.
2. Chọn Get started nếu đây là lần đầu.
3. Mở tab Sign-in method.
4. Chọn Anonymous (Ẩn danh), bật Enable và Save.

Website không yêu cầu người chơi tạo tài khoản hoặc nhập tên. Firebase tạo một phiên ẩn danh để Security Rules có thể giới hạn việc gửi.

PHẦN 3 — TẠO CLOUD FIRESTORE
----------------------------
1. Mở Build > Firestore Database.
2. Chọn Create database.
3. Chọn Standard edition và chế độ Production mode.
4. Chọn vị trí database gần nhóm người dùng chính; vị trí database không thể đổi sau khi tạo.
5. Hoàn tất quá trình tạo database.
6. Mở tab Rules.
7. Mở file firestore.rules trong thư mục này, sao chép toàn bộ nội dung và dán thay Rules hiện tại.
8. Nhấn Publish.

Rules này:
- Cho phép mọi người đọc các lời nhắn công khai.
- Chỉ cho người dùng đã đăng nhập ẩn danh tạo lời nhắn hợp lệ.
- Giới hạn nội dung 4–150 ký tự và chỉ chấp nhận 4 chủ đề được chọn.
- Giới hạn 1 hành động (gửi hoặc báo cáo) mỗi tài khoản ẩn danh trong 20 giây.
- Không cho người dùng thường sửa hoặc xóa lời nhắn của người khác.
- Lưu báo cáo riêng trong wallReports; người dùng công khai không thể đọc báo cáo.

PHẦN 4 — DÁN firebaseConfig
---------------------------
1. Vào Project settings (biểu tượng bánh răng cạnh Project Overview).
2. Trong tab General, kéo xuống Your apps.
3. Chọn ứng dụng Web vừa đăng ký.
4. Ở mục SDK setup and configuration, chọn Config.
5. Bộ mã nguồn firebase-ready đã có cấu hình này. Chỉ cần kiểm tra Project ID trong Firebase Console là khongmotminh-cc6b4.
6. Không cần bật Google Analytics để Bức tường hoạt động; website chỉ dùng App, Authentication và Firestore.

Chỉ cần thay các giá trị cấu hình; giữ nguyên tên các thuộc tính. Đối với website này không cần thêm Analytics.

PHẦN 5 — THÊM TÊN MIỀN ĐƯỢC PHÉP
--------------------------------
1. Vào Authentication > Settings > Authorized domains.
2. Thêm domain triển khai website (ví dụ: domain Hosting/GitHub Pages của bạn).
3. Khi thử trên máy cá nhân, thêm localhost nếu chưa có.
4. Không mở index.html trực tiếp bằng đường dẫn file:// để thử Firebase module. Hãy dùng VS Code Live Server hoặc một máy chủ web local để mở trang.

PHẦN 6 — (KHUYẾN NGHỊ) BẬT APP CHECK
-----------------------------------
Đăng nhập ẩn danh và giới hạn gửi giúp bảo vệ dữ liệu, nhưng bot vẫn có thể thử tạo nhiều phiên ẩn danh. Với website triển khai công khai, nên cấu hình thêm Firebase App Check (reCAPTCHA v3) theo tài liệu chính thức:
https://firebase.google.com/docs/app-check/web/recaptcha-provider

Chỉ bật Enforce cho Cloud Firestore sau khi đã đăng ký app, thêm đúng domain và tích hợp App Check client-side. Nếu bật Enforce trước khi tích hợp, người dùng thật có thể bị từ chối truy cập. App Check giúp giảm request ngoài ứng dụng nhưng không thay thế kiểm duyệt nội dung.

PHẦN 7 — CHẠY THỬ
------------------
1. Giữ index.html, style.css, script.js và thư mục assets cùng cấp.
2. Mở thư mục bằng VS Code và chạy bằng Live Server, hoặc đưa các file lên static hosting.
3. Mở website ở hai trình duyệt/thiết bị khác nhau.
4. Gửi một lời nhắn từ trình duyệt thứ nhất; lời nhắn cần xuất hiện ở trình duyệt thứ hai mà không cần tải lại trang.
5. Thử nhập quá 150 ký tự, dán email/đường dẫn/số điện thoại, hoặc gửi liên tiếp để kiểm tra giới hạn.

DỮ LIỆU ĐƯỢC LƯU NHƯ THẾ NÀO?
------------------------------
wallMessages/{autoId}
  message: string
  category: string
  createdAt: timestamp

wallRateLimits/{anonymousUid}
  lastSentAt: timestamp
  lastActionId: string

wallReports/{autoId}
  messageId: string
  reason: "inappropriate"
  createdAt: timestamp

QUAN TRỌNG VỀ KIỂM DUYỆT VÀ AN TOÀN
----------------------------------
- Lời nhắn được công khai ngay khi gửi và sẽ đồng bộ real-time với người đang mở website.
- Đây là bức tường ẩn danh công khai. Bộ lọc ở trình duyệt chỉ chặn một số dạng thông tin liên hệ; nó KHÔNG thể nhận diện đầy đủ lời lẽ xúc phạm, nội dung gây tổn thương hoặc thông tin cá nhân được viết theo cách khác.
- Nút BÁO CÁO tạo document trong collection wallReports. Ban tổ chức cần có người lớn phụ trách kiểm tra collection này định kỳ.
- Khi cần gỡ nội dung, quản trị viên mở Firestore Database > Data > wallMessages, chọn document và xóa trong Console. Rules chặn khách truy cập tự xóa/sửa.
- Không thu thập tên, trường/lớp, số điện thoại hay thông tin nhạy cảm. Nên có người phụ trách kiểm duyệt trong suốt thời gian chiến dịch.
- Không công khai đường dẫn Firebase Console hoặc cấp quyền quản trị cho người tham gia.

FIREBASE SPARK — GIỚI HẠN MIỄN PHÍ
---------------------------------
Tại thời điểm tạo hướng dẫn, Cloud Firestore có hạn mức miễn phí tham khảo: 1 GiB dữ liệu lưu trữ, 50.000 lượt đọc/ngày, 20.000 lượt ghi/ngày, 20.000 lượt xóa/ngày và 10 GiB truyền dữ liệu ra/tháng. Hạn mức có thể thay đổi theo chính sách Firebase.

Mỗi lần gửi/báo cáo trong mẫu này tạo 2 lượt ghi Firestore (nội dung + rate limit). Mỗi người đang mở tường real-time cũng tạo lượt đọc khi nhận dữ liệu mới. Hãy theo dõi Usage trong Firebase Console, giới hạn số lời nhắn hiển thị (mẫu này tải 40 lời nhắn mới nhất) và không mở quyền đọc/ghi toàn bộ database.

SDK
---
Đang dùng Firebase JavaScript SDK 13.3.0 qua gstatic CDN cho App, Authentication và Firestore. Phiên bản này được đối chiếu với trang Firebase JS SDK Release Notes ngày 17/11/2026.

TÀI LIỆU CHÍNH THỨC
-------------------
Firebase Web CDN: https://firebase.google.com/docs/web/alt-setup
Firebase Authentication ẩn danh: https://firebase.google.com/docs/auth/web/anonymous-auth
Firestore Security Rules: https://firebase.google.com/docs/firestore/security/get-started
Firestore Pricing: https://firebase.google.com/docs/firestore/pricing
Firebase JS SDK Release Notes: https://firebase.google.com/support/release-notes/js
