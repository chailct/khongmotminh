KHÔNG MỘT MÌNH — ĐĂNG NHẬP / ĐĂNG KÝ FIREBASE AUTHENTICATION
================================================================

TÍNH NĂNG ĐÃ TÍCH HỢP
---------------------
- Đăng ký bằng email + mật khẩu: Họ và tên thật, tên đăng nhập, email, mật khẩu, nhập lại mật khẩu.
- Đăng nhập bằng email + mật khẩu.
- Tiếp tục bằng Google (tài khoản Gmail/Google).
- Sau khi xác thực Google lần đầu, người dùng phải hoàn tất tên thật và tên đăng nhập.
- Có gửi email đặt lại mật khẩu.
- Tên đăng nhập duy nhất (3–20 ký tự: chữ thường không dấu, số, dấu gạch dưới).
- Tên thật lưu trong userProfiles/{uid}, chỉ chính tài khoản đó đọc được theo Firestore Rules.
- Tên thật, email, username và UID không được đưa lên Bức tường; lời nhắn trên tường vẫn ẩn danh.
- Khách vẫn có thể xem trang, chơi game và đọc tường; cần đăng nhập + hoàn tất hồ sơ để gửi/báo cáo lời nhắn.

QUAN TRỌNG VỀ QUYỀN RIÊNG TƯ
----------------------------
Website hướng tới nội dung giáo dục cho thanh thiếu niên. Không hiển thị họ tên thật hoặc email công khai. Firestore Rules giới hạn việc đọc userProfiles cho chính chủ tài khoản. Chỉ dùng tên thật khi thực sự cần; có thể thay nhãn thành tên gọi muốn dùng nếu ban tổ chức không cần họ tên pháp lý. Không yêu cầu người dùng nhập địa chỉ, trường/lớp, số điện thoại hoặc dữ liệu nhạy cảm.

LƯU Ý VỀ TÊN ĐĂNG NHẬP
----------------------
- Tên đăng nhập là biệt danh duy nhất dùng để nhận diện trong khu vực tài khoản, không hiển thị trên Bức tường.
- Đăng nhập email/mật khẩu hiện dùng EMAIL đã đăng ký. Không dùng username để đăng nhập vì Firebase Authentication client SDK yêu cầu email; hỗ trợ username/password cần backend an toàn (ví dụ Cloud Function) để đổi username thành tài khoản mà không công khai email người dùng.

CÁC BƯỚC CẦN BẬT TRONG FIREBASE CONSOLE
---------------------------------------
1. Mở Firebase Console > dự án khongmotminh-cc6b4.
2. Chọn Authentication > Sign-in method (Phương thức đăng nhập).
3. Bật Email/Password (Email/Mật khẩu) > Save.
4. Bật Google > chọn Support email nếu Firebase yêu cầu > Save.
5. Tắt mọi nhà cung cấp xác thực không còn sử dụng trong danh sách Sign-in providers.
6. Authentication > Settings > Authorized domains:
   - Thêm hostname GitHub Pages của bạn, ví dụ TEN-GITHUB.github.io (không gồm https:// và đường dẫn dự án).
   - Khi chạy local, thêm localhost nếu chưa có.

CẬP NHẬT FIRESTORE SECURITY RULES — BẮT BUỘC
---------------------------------------------
Do bổ sung profile riêng tư và tên đăng nhập duy nhất, Rules cũ cần được thay bằng file firestore.rules trong gói này:
1. Firebase Console > Firestore Database > Rules.
2. Sao chép toàn bộ firestore.rules mới, dán thay mã cũ.
3. Nhấn Publish.
Rules mới:
- Cho mọi người đọc wallMessages công khai.
- Chỉ tài khoản Firebase có userProfiles hoàn tất mới gửi/báo cáo.
- userProfiles chỉ chủ tài khoản được đọc; tên thật không công khai.
- usernames chỉ cho tài khoản đã đăng nhập kiểm tra từng tên; không cho list toàn bộ.
- Mỗi username được giữ duy nhất; không cho khách sửa/xóa claim.
- Giữ giới hạn 1 hành động trên tường mỗi 20 giây / tài khoản.
- Không cho người dùng sửa/xóa lời nhắn của người khác.

CẤU TRÚC DỮ LIỆU MỚI
--------------------
userProfiles/{uid} (chỉ chủ tài khoản được đọc):
  realName, username, usernameLower, provider, createdAt
usernames/{usernameLower}:
  uid, createdAt (không lưu email hoặc tên thật)
wallMessages/{autoId}:
  message, category, createdAt
wallRateLimits/{uid}:
  lastSentAt, lastActionId
wallReports/{autoId}:
  messageId, reason, createdAt

CHẠY VÀ TRIỂN KHAI
------------------
- Giữ index.html, style.css, script.js, firestore.rules và assets cùng cấu trúc.
- Dùng VS Code Live Server; không mở bằng file://.
- GitHub Pages cần hostname được thêm vào Firebase Authentication > Settings > Authorized domains.
- Khi deploy, tải toàn bộ file đã cập nhật lên GitHub và commit.

THỬ NGHIỆM
----------
1. Đăng ký email: nhập tên thật, username, email và mật khẩu (tối thiểu 8 ký tự).
2. Đăng xuất, đăng nhập lại bằng email + mật khẩu.
3. Thử Google. Lần đầu sẽ chuyển về trang và yêu cầu tên thật + username.
4. Mở hai trình duyệt, đăng nhập hai tài khoản khác nhau và kiểm tra Bức tường cập nhật theo thời gian thực.
5. Kiểm tra userProfiles: người khác không được đọc hồ sơ riêng của bạn.

LƯU Ý BẢO MẬT
-------------
- Tên thật là thông tin cá nhân. Không hiển thị tên thật trên Bức tường hoặc trong URL.
- Không đưa mật khẩu, Service Account Key hay private key vào mã frontend/GitHub.
- Firebase Web API key là cấu hình client, nhưng Firestore Rules và Authorized domains vẫn phải cấu hình đúng.
- Đăng nhập OAuth có thể không hoạt động cho tới khi bạn bật đúng nhà cung cấp trong Firebase Console.

TÀI LIỆU CHÍNH THỨC
-------------------
Email/password: https://firebase.google.com/docs/auth/web/password-auth
Google: https://firebase.google.com/docs/auth/web/google-signin
Firestore Rules: https://firebase.google.com/docs/firestore/security/get-started
