KHÔNG MỘT MÌNH — BẢN TỐI ƯU ĐIỆN THOẠI, MÁY TÍNH VÀ GIAO DIỆN SÁNG/TỐI
==========================================================================

CÁC THAY ĐỔI CHÍNH
------------------
1. GAME 01 — ĐƯỜNG CHẠY CHIẾN LƯỢC
   - Trên điện thoại: vuốt lên / xuống để chuyển giữa 3 làn.
   - 5 giây đầu tiên là phần làm quen có đếm ngược và hướng dẫn vuốt.
   - Thời gian thử thách chỉ bắt đầu sau khi hết 5 giây làm quen.
   - Trên máy tính: dùng phím mũi tên lên/xuống hoặc A/S/D; có thể nhấp vào làn.
   - Người chơi cũng có thể chạm vào thẻ kế hoạch trên điện thoại để chọn làn.

2. CẢ 4 TRÒ CHƠI TRÊN ĐIỆN THOẠI
   - Thay chữ canvas nhỏ bằng giao diện HTML riêng, chữ lớn và thẻ dễ chạm.
   - Tình huống, manh mối, lựa chọn và phản hồi đều hiển thị thành thẻ.
   - Vùng nút thao tác lớn, dễ dùng bằng một tay.
   - Trên máy tính vẫn giữ giao diện canvas và điều khiển hiện có.

3. TỐI ƯU CỠ CHỮ VÀ BỐ CỤC
   - Bố cục thẻ trò chơi một cột trên điện thoại.
   - Tăng cỡ chữ ở phần giới thiệu, hướng dẫn, bức tường, phần trợ giúp.
   - Hộp thoại game trên điện thoại chiếm toàn màn hình và có thể cuộn.
   - Điều hướng nhanh tới Nhiệm vụ, Bức tường và Tìm hỗ trợ.

4. NỀN SÁNG / NỀN TỐI
   - Nút NỀN TỐI / NỀN SÁNG ở góc trên trang.
   - Ghi nhớ lựa chọn trên thiết bị bằng localStorage.
   - Mặc định là nền sáng.

5. NHẬN DIỆN CHIẾN DỊCH
   - Dùng bảng màu xanh tím, đỏ và trắng dựa trên poster tham khảo.
   - Nhấn mạnh thông điệp “Kết nối không tổn thương”.
   - Giữ poster chiến dịch ở phần mở đầu.

CẤU TRÚC THƯ MỤC
----------------
index.html
style.css
script.js
firestore.rules
README-FIREBASE.txt
README-MOBILE-UPDATE.txt
assets/poster-tham-khao.png

CÁCH CẬP NHẬT TRÊN VS CODE
-------------------------
1. Giải nén gói ZIP mới.
2. Thay index.html, style.css, script.js và firestore.rules trong thư mục dự án cũ bằng các file mới.
3. Giữ thư mục assets/poster-tham-khao.png.
4. Không đổi tên các file vì index.html đang liên kết tới style.css và script.js.
5. Mở thư mục trong VS Code và chạy index.html bằng Live Server.
6. Nếu đang dùng GitHub Pages, tải các file mới lên cùng repository và commit/push để website được cập nhật.

FIREBASE
--------
- Cấu hình Firebase web app của dự án khongmotminh-cc6b4 được giữ nguyên trong index.html.
- Firebase Authentication Anonymous và Firestore được giữ nguyên.
- Security Rules được đóng gói cùng website. Nếu bạn đã Publish rules trước đó và file mới không yêu cầu thay đổi rules, không cần Publish lại.
- Kiểm tra Firebase Authentication > Settings > Authorized domains và thêm hostname GitHub Pages của bạn.
- Kiểm tra Firestore Rules đã Publish thành công trước khi mở Bức tường công khai.

KIỂM TRA TRƯỚC KHI PHÁT HÀNH
----------------------------
- Mở trên điện thoại thật, thử vuốt lên/xuống trong 5 giây làm quen của game 1.
- Chơi thử từng game trên điện thoại để kiểm tra nút, thẻ, cuộn trang và cỡ chữ.
- Chuyển nền sáng/tối và tải lại trang để kiểm tra lựa chọn được ghi nhớ.
- Mở website trên máy tính để kiểm tra canvas và bàn phím vẫn hoạt động.
- Mở website trên hai thiết bị để kiểm tra lời nhắn Firestore cập nhật thời gian thực.

LƯU Ý
-----
Bộ mã nguồn đã được kiểm tra cú pháp JavaScript và cấu trúc HTML/CSS ở mức tĩnh. Kết nối Firebase thực tế cần được kiểm tra trên tên miền đã thêm vào Authorized domains, sau khi Authentication Anonymous và Firestore Rules đã được bật.
