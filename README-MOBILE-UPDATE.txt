KHÔNG MỘT MÌNH — HƯỚNG DẪN CẬP NHẬT BẢN AUTH + MOBILE
=======================================================

Bản này giữ nguyên tối ưu giao diện điện thoại/máy tính, game vuốt 5 giây đầu, giao diện nền sáng/tối và tích hợp thêm đăng nhập/đăng ký Firebase.

CẤU TRÚC
--------
index.html, style.css, script.js, firestore.rules, assets/poster-tham-khao.png

ĐĂNG NHẬP / ĐĂNG KÝ
-------------------
Xem README-AUTH.txt để bật Email/Password, Google và Facebook trong Firebase Console, thiết lập Facebook OAuth Redirect URI, thêm Authorized Domains và cập nhật Firestore Rules.

LƯU Ý QUAN TRỌNG
----------------
- Tên thật được lưu riêng trong userProfiles/{uid}, chỉ chủ tài khoản đọc được theo Rules. Không hiển thị tên thật trên Bức tường.
- Bức tường vẫn ẩn danh; cần đăng nhập và hoàn tất hồ sơ để gửi/báo cáo.
- Đăng nhập email/mật khẩu bằng email; username là tên tài khoản/biệt danh duy nhất.
- Không đưa Facebook App Secret hoặc Service Account/private key vào HTML, JavaScript hoặc repository công khai.
