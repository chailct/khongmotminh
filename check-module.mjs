
    import { initializeApp } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-app.js";
    import {
      getAuth, onAuthStateChanged, createUserWithEmailAndPassword,
      signInWithEmailAndPassword, signInWithRedirect, getRedirectResult,
      GoogleAuthProvider, FacebookAuthProvider, sendPasswordResetEmail,
      signOut
    } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js";
    import {
      getFirestore, collection, query, orderBy, limit, onSnapshot,
      doc, writeBatch, serverTimestamp, getDoc, runTransaction
    } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-firestore.js";

    const firebaseConfig = {
      apiKey: "AIzaSyCDGGW6LgfqUYrr80Vh83dvXedruyKlAJU",
      authDomain: "khongmotminh-cc6b4.firebaseapp.com",
      projectId: "khongmotminh-cc6b4",
      storageBucket: "khongmotminh-cc6b4.firebasestorage.app",
      messagingSenderId: "200170370605",
      appId: "1:200170370605:web:d1555350e0d9f6502a2aa4",
      measurementId: "G-95L5J90VDL"
    };

    const MAX_MESSAGE_LENGTH = 150;
    const MIN_MESSAGE_LENGTH = 4;
    const WALL_CATEGORIES = ["Lời động viên", "Lời cảm ơn", "Điều tích cực", "Cam kết tử tế"];
    const USERNAME_PATTERN = /^[a-z0-9_]{3,20}$/;
    const MIN_PASSWORD_LENGTH = 8;

    const el = (id) => document.getElementById(id);
    const wallInput = el("wallMessage");
    const sendButton = el("sendMessage");
    const wallMessages = el("wallMessages");
    const wallStatus = el("wallStatus");
    const wallCount = el("wallCount");
    const charCount = el("charCount");
    const wallConnection = el("wallConnection");
    const categorySelect = el("wallCategory");

    const authModal = el("authModal");
    const authOpenButton = el("authOpenButton");
    const accountActions = el("accountActions");
    const accountName = el("accountName");
    const signOutButton = el("signOutButton");
    const authTitle = el("authTitle");
    const authIntro = el("authIntro");
    const authEyebrow = el("authEyebrow");
    const authTabs = el("authTabs");
    const loginForm = el("loginForm");
    const registerForm = el("registerForm");
    const profileForm = el("profileForm");
    const authDivider = el("authDivider");
    const authSocials = el("authSocials");
    const authPrivacyNote = el("authPrivacyNote");
    const authStatus = el("authStatus");

    let app = null;
    let auth = null;
    let firestore = null;
    let currentUser = null;
    let currentProfile = null;
    let pendingProfileUser = null;
    let sending = false;
    let authActionInProgress = false;
    let authObserverSequence = 0;

    function setWallStatus(message, type = "info") {
      wallStatus.textContent = message;
      wallStatus.dataset.kind = type;
    }
    function setConnection(message, connected = false) {
      wallConnection.textContent = `● ${message}`;
      wallConnection.classList.toggle("is-offline", !connected);
    }
    function setAuthStatus(message, type = "info") {
      authStatus.textContent = message;
      authStatus.dataset.kind = type;
    }
    function codePointLength(value) { return Array.from(value).length; }
    function updateCharacterCount() {
      let characters = Array.from(wallInput.value);
      if (characters.length > MAX_MESSAGE_LENGTH) {
        wallInput.value = characters.slice(0, MAX_MESSAGE_LENGTH).join("");
        characters = Array.from(wallInput.value);
      }
      charCount.textContent = `${characters.length} / ${MAX_MESSAGE_LENGTH}`;
      charCount.classList.toggle("is-over-limit", characters.length > MAX_MESSAGE_LENGTH);
    }
    function showEmptyWall(message) {
      wallMessages.replaceChildren();
      const empty = document.createElement("div");
      empty.className = "wall-empty";
      empty.textContent = message;
      wallMessages.appendChild(empty);
      wallCount.textContent = "0";
    }
    function formatMessageTime(timestamp) {
      if (!timestamp || typeof timestamp.toDate !== "function") return "VỪA GỬI";
      return timestamp.toDate().toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
    }
    function renderWall(documents) {
      wallMessages.replaceChildren();
      wallCount.textContent = String(documents.length);
      if (!documents.length) {
        showEmptyWall("Chưa có lời nhắn nào. Bạn có thể là người đầu tiên gửi một điều tử tế. ✦");
        return;
      }
      documents.forEach((item, index) => {
        const card = document.createElement("article");
        card.className = "message-note";
        card.style.setProperty("--tilt", `${((index % 3) - 1) * 0.55}deg`);
        const message = document.createElement("p");
        message.textContent = item.message || "";
        const footer = document.createElement("div");
        footer.className = "message-note-foot";
        const meta = document.createElement("small");
        meta.textContent = `✦ ${item.category || "Điều tích cực"} · ẨN DANH · ${formatMessageTime(item.createdAt)}`;
        const reportButton = document.createElement("button");
        reportButton.type = "button";
        reportButton.className = "message-report";
        reportButton.textContent = "BÁO CÁO";
        reportButton.dataset.reportId = item.id;
        reportButton.setAttribute("aria-label", "Báo cáo lời nhắn này");
        footer.append(meta, reportButton);
        card.append(message, footer);
        wallMessages.appendChild(card);
      });
    }
    function friendlyFirebaseError(error) {
      const code = error?.code || (String(error?.message || "").startsWith("username/") ? error.message : "");
      if (code === "username/already-taken") return "Tên đăng nhập này đã có người sử dụng. Hãy chọn tên khác nhé.";
      if (code === "permission-denied") return "Firebase từ chối thao tác. Hãy kiểm tra Firestore Rules đã được cập nhật và Publish chưa.";
      if (code === "auth/operation-not-allowed") return "Phương thức đăng nhập này chưa được bật trong Firebase Authentication.";
      if (code === "auth/unauthorized-domain") return "Tên miền hiện tại chưa được thêm vào Authentication → Settings → Authorized domains.";
      if (code === "auth/email-already-in-use") return "Email này đã có tài khoản. Hãy đăng nhập hoặc dùng chức năng quên mật khẩu.";
      if (code === "auth/invalid-email") return "Địa chỉ email chưa đúng định dạng.";
      if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") return "Email hoặc mật khẩu chưa chính xác.";
      if (code === "auth/weak-password") return "Mật khẩu chưa đủ mạnh. Hãy dùng ít nhất 8 ký tự.";
      if (code === "auth/account-exists-with-different-credential") return "Email này đã được đăng ký bằng phương thức khác. Hãy đăng nhập bằng phương thức cũ trước.";
      if (code === "auth/popup-blocked") return "Trình duyệt đã chặn cửa sổ đăng nhập. Hãy cho phép chuyển hướng hoặc thử lại.";
      if (code === "auth/cancelled-popup-request" || code === "auth/popup-closed-by-user") return "Quá trình đăng nhập đã được đóng. Bạn có thể thử lại.";
      if (code === "auth/network-request-failed" || code === "unavailable") return "Không kết nối được Firebase. Hãy kiểm tra mạng rồi thử lại.";
      if (code === "resource-exhausted") return "Dự án đã chạm giới hạn sử dụng miễn phí hiện tại. Hãy kiểm tra Usage trong Firebase Console.";
      return `Có lỗi (${code || "unknown"}). Hãy thử lại hoặc kiểm tra cấu hình Firebase.`;
    }
    function configIsComplete(config) {
      return ["apiKey", "authDomain", "projectId", "appId"].every((key) => typeof config[key] === "string" && config[key].trim().length > 0);
    }
    function containsContactDetails(text) {
      return /(https?:\/\/|www\.)/i.test(text)
        || /[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(text)
        || /(?:\+?84|0)[ .-]?(?:\d[ .-]?){8,10}/.test(text);
    }
    function cleanText(value) { return String(value || "").trim().replace(/\s+/g, " "); }
    function normalizeUsername(value) { return cleanText(value).toLowerCase(); }
    function validateProfile(realName, username) {
      if (codePointLength(realName) < 2 || codePointLength(realName) > 60) return "Tên thật cần có từ 2 đến 60 ký tự.";
      if (!USERNAME_PATTERN.test(username)) return "Tên đăng nhập cần có 3–20 ký tự: chữ thường không dấu, số hoặc dấu gạch dưới.";
      return "";
    }

    function setAuthView(view) {
      authModal.dataset.view = view;
      const isProfile = view === "profile";
      loginForm.hidden = view !== "login";
      registerForm.hidden = view !== "register";
      profileForm.hidden = !isProfile;
      authTabs.hidden = isProfile;
      authDivider.hidden = isProfile;
      authSocials.hidden = isProfile;
      authPrivacyNote.hidden = false;
      document.querySelectorAll("[data-auth-tab]").forEach((button) => {
        const active = button.dataset.authTab === view;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-selected", String(active));
      });
      if (view === "login") {
        authEyebrow.textContent = "YOUR ACCOUNT / TÀI KHOẢN";
        authTitle.innerHTML = 'Chào mừng bạn<br><span>trở lại.</span>';
        authIntro.textContent = "Đăng nhập để lưu hồ sơ và gửi lời nhắn ẩn danh trên Bức tường.";
      } else if (view === "register") {
        authEyebrow.textContent = "JOIN THE COMMUNITY / TẠO TÀI KHOẢN";
        authTitle.innerHTML = 'Cùng tạo nên<br><span>kết nối tử tế.</span>';
        authIntro.textContent = "Tạo tài khoản bằng email và mật khẩu, hoặc tiếp tục với Google / Facebook.";
      } else {
        authEyebrow.textContent = "ONE LAST STEP / HOÀN TẤT HỒ SƠ";
        authTitle.innerHTML = 'Cho chúng mình<br><span>biết cách gọi bạn.</span>';
        authIntro.textContent = "Hãy nhập tên thật và tạo tên đăng nhập trước khi sử dụng các chức năng cần tài khoản.";
      }
    }
    function openAuthModal(view = "login") {
      if (view !== "profile" && currentUser && !currentProfile) view = "profile";
      setAuthView(view);
      authModal.classList.add("is-open");
      authModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("auth-open");
      setAuthStatus("");
      window.setTimeout(() => {
        const first = view === "login" ? el("loginEmail") : view === "register" ? el("registerRealName") : el("profileRealName");
        first?.focus();
      }, 60);
    }
    function closeAuthModal() {
      authModal.classList.remove("is-open");
      authModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("auth-open");
    }
    function updateAccountUI() {
      const ready = Boolean(currentUser && currentProfile);
      authOpenButton.hidden = ready;
      accountActions.hidden = !ready;
      if (ready) accountName.textContent = `@${currentProfile.username}`;
      authOpenButton.textContent = currentUser && !currentProfile ? "HOÀN TẤT HỒ SƠ" : "ĐĂNG NHẬP";
      sendButton.textContent = sending ? "ĐANG GỬI…" : ready ? "GỬI LỜI NHẮN ↗" : "ĐĂNG NHẬP ĐỂ GỬI ↗";
      sendButton.disabled = sending;
    }
    function showProfileCompletion(user, prefill = {}) {
      pendingProfileUser = user;
      currentProfile = null;
      updateAccountUI();
      el("profileRealName").value = prefill.realName || "";
      el("profileUsername").value = prefill.username || "";
      openAuthModal("profile");
      setAuthStatus("Hồ sơ chưa hoàn tất. Tên thật chỉ lưu riêng, không hiển thị công khai.", "info");
    }
    async function persistProfile(user, realNameInput, usernameInput) {
      const realName = cleanText(realNameInput);
      const username = normalizeUsername(usernameInput);
      const validation = validateProfile(realName, username);
      if (validation) throw new Error(`profile/invalid:${validation}`);

      const profileRef = doc(firestore, "userProfiles", user.uid);
      const usernameRef = doc(firestore, "usernames", username);
      const providerId = user.providerData?.map((item) => item.providerId).find((id) => ["password", "google.com", "facebook.com"].includes(id)) || "password";

      await runTransaction(firestore, async (transaction) => {
        const profileSnapshot = await transaction.get(profileRef);
        const usernameSnapshot = await transaction.get(usernameRef);
        if (profileSnapshot.exists()) return;
        if (usernameSnapshot.exists() && usernameSnapshot.data().uid !== user.uid) {
          throw new Error("username/already-taken");
        }
        if (!usernameSnapshot.exists()) {
          transaction.set(usernameRef, { uid: user.uid, createdAt: serverTimestamp() });
        }
        transaction.set(profileRef, {
          realName,
          username,
          usernameLower: username,
          provider: providerId,
          createdAt: serverTimestamp()
        });
      });
      const saved = await getDoc(profileRef);
      if (!saved.exists()) throw new Error("profile/not-created");
      currentUser = user;
      currentProfile = saved.data();
      pendingProfileUser = null;
      updateAccountUI();
      closeAuthModal();
      setWallStatus("Bạn đã đăng nhập. Lời nhắn trên Bức tường vẫn được hiển thị ẩn danh. 💜", "success");
    }
    async function completeProfileFromForm(event) {
      event.preventDefault();
      const user = pendingProfileUser || currentUser;
      if (!user) {
        setAuthStatus("Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại nhé.", "error");
        return;
      }
      const realName = el("profileRealName").value;
      const username = el("profileUsername").value;
      const validation = validateProfile(cleanText(realName), normalizeUsername(username));
      if (validation) { setAuthStatus(validation, "error"); return; }
      const submit = profileForm.querySelector("button[type='submit']");
      submit.disabled = true;
      submit.textContent = "ĐANG LƯU…";
      try {
        await persistProfile(user, realName, username);
        setAuthStatus("Hồ sơ đã được lưu an toàn.", "success");
      } catch (error) {
        console.error("Save private profile:", error);
        const message = error.message?.startsWith("profile/invalid:") ? error.message.split(":").slice(1).join(":") : friendlyFirebaseError(error);
        setAuthStatus(message, "error");
      } finally {
        submit.disabled = false;
        submit.innerHTML = 'LƯU HỒ SƠ <span>↗</span>';
      }
    }
    async function handleRegister(event) {
      event.preventDefault();
      const realName = cleanText(el("registerRealName").value);
      const username = normalizeUsername(el("registerUsername").value);
      const email = cleanText(el("registerEmail").value).toLowerCase();
      const password = el("registerPassword").value;
      const confirm = el("registerPasswordConfirm").value;
      const validation = validateProfile(realName, username);
      if (validation) { setAuthStatus(validation, "error"); return; }
      if (password.length < MIN_PASSWORD_LENGTH) { setAuthStatus("Mật khẩu cần có ít nhất 8 ký tự.", "error"); return; }
      if (password !== confirm) { setAuthStatus("Hai lần nhập mật khẩu chưa trùng khớp.", "error"); return; }
      const submit = registerForm.querySelector("button[type='submit']");
      submit.disabled = true;
      submit.textContent = "ĐANG TẠO TÀI KHOẢN…";
      authActionInProgress = true;
      let createdUser = null;
      try {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        createdUser = credential.user;
        currentUser = createdUser;
        await persistProfile(createdUser, realName, username);
        setAuthStatus("Tạo tài khoản thành công! Chào mừng bạn đến với Không Một Mình. 💜", "success");
      } catch (error) {
        console.error("Register:", error);
        authActionInProgress = false;
        if (createdUser) {
          showProfileCompletion(createdUser, { realName, username });
          setAuthStatus(error.message === "username/already-taken" ? "Tên đăng nhập đã có người sử dụng. Hãy chọn tên khác." : friendlyFirebaseError(error), "error");
        } else {
          setAuthStatus(friendlyFirebaseError(error), "error");
        }
      } finally {
        authActionInProgress = false;
        submit.disabled = false;
        submit.innerHTML = 'TẠO TÀI KHOẢN <span>↗</span>';
      }
    }
    async function handleLogin(event) {
      event.preventDefault();
      const email = cleanText(el("loginEmail").value).toLowerCase();
      const password = el("loginPassword").value;
      const submit = loginForm.querySelector("button[type='submit']");
      submit.disabled = true;
      submit.textContent = "ĐANG ĐĂNG NHẬP…";
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setAuthStatus("Đăng nhập thành công. Đang tải hồ sơ…", "success");
      } catch (error) {
        console.error("Login:", error);
        setAuthStatus(friendlyFirebaseError(error), "error");
      } finally {
        submit.disabled = false;
        submit.innerHTML = 'ĐĂNG NHẬP <span>↗</span>';
      }
    }
    async function startSocialLogin(providerName) {
      try {
        setAuthStatus("Đang chuyển đến trang xác thực an toàn…", "info");
        let provider;
        if (providerName === "google") {
          provider = new GoogleAuthProvider();
          provider.setCustomParameters({ prompt: "select_account" });
        } else {
          provider = new FacebookAuthProvider();
          provider.addScope("email");
        }
        await signInWithRedirect(auth, provider);
      } catch (error) {
        console.error(`${providerName} sign-in:`, error);
        setAuthStatus(friendlyFirebaseError(error), "error");
      }
    }
    async function handleAuthState(user) {
      const sequence = ++authObserverSequence;
      if (authActionInProgress) return;
      if (user?.isAnonymous) {
        // Chuyển các phiên ẩn danh cũ của bản trước về trạng thái khách; giờ gửi tường cần hồ sơ.
        await signOut(auth).catch((error) => console.warn("Sign out old anonymous session:", error));
        return;
      }
      currentUser = user || null;
      currentProfile = null;
      if (!user) {
        pendingProfileUser = null;
        updateAccountUI();
        return;
      }
      updateAccountUI();
      try {
        const profileSnapshot = await getDoc(doc(firestore, "userProfiles", user.uid));
        if (sequence !== authObserverSequence) return;
        if (profileSnapshot.exists()) {
          currentProfile = profileSnapshot.data();
          pendingProfileUser = null;
          updateAccountUI();
          if (authModal.classList.contains("is-open") && authModal.dataset.view === "profile") closeAuthModal();
        } else {
          showProfileCompletion(user);
        }
      } catch (error) {
        console.error("Load profile:", error);
        setAuthStatus(friendlyFirebaseError(error), "error");
        if (!authModal.classList.contains("is-open")) openAuthModal("login");
      }
    }
    async function requestSignOut() {
      try {
        await signOut(auth);
        currentUser = null;
        currentProfile = null;
        pendingProfileUser = null;
        updateAccountUI();
        setWallStatus("Bạn đã đăng xuất. Bạn vẫn có thể xem các lời nhắn công khai.", "info");
      } catch (error) {
        setWallStatus(friendlyFirebaseError(error), "error");
      }
    }

    async function sendWallMessage() {
      if (!currentUser || !currentProfile) {
        openAuthModal(currentUser ? "profile" : "login");
        setWallStatus("Hãy đăng nhập và hoàn tất hồ sơ để gửi lời nhắn nhé.", "info");
        return;
      }
      if (!firestore || sending) return;
      const message = wallInput.value.trim();
      const category = categorySelect.value;
      const length = codePointLength(message);
      if (length < MIN_MESSAGE_LENGTH) { setWallStatus("Hãy viết lời nhắn ít nhất 4 ký tự nhé.", "error"); wallInput.focus(); return; }
      if (length > MAX_MESSAGE_LENGTH) { setWallStatus("Lời nhắn đã vượt quá 150 ký tự. Hãy rút gọn nhé.", "error"); wallInput.focus(); return; }
      if (!WALL_CATEGORIES.includes(category)) { setWallStatus("Chủ đề không hợp lệ. Hãy chọn lại nhé.", "error"); return; }
      if (containsContactDetails(message)) { setWallStatus("Đừng đăng đường dẫn, email hoặc số điện thoại lên bức tường nhé.", "error"); wallInput.focus(); return; }
      sending = true;
      updateAccountUI();
      setWallStatus("Đang gửi lời nhắn lên Bức tường Không Một Mình…");
      try {
        const messageRef = doc(collection(firestore, "wallMessages"));
        const rateLimitRef = doc(firestore, "wallRateLimits", currentUser.uid);
        const batch = writeBatch(firestore);
        batch.set(messageRef, { message, category, createdAt: serverTimestamp() });
        batch.set(rateLimitRef, { lastSentAt: serverTimestamp(), lastActionId: messageRef.id });
        await batch.commit();
        wallInput.value = "";
        updateCharacterCount();
        setWallStatus("Đã gửi thành công! Lời nhắn sẽ xuất hiện ẩn danh trên bức tường. 💜", "success");
      } catch (error) {
        console.error("Send wall message:", error);
        setWallStatus(friendlyFirebaseError(error), "error");
      } finally {
        sending = false;
        updateAccountUI();
      }
    }
    async function reportWallMessage(messageId, button) {
      if (!currentUser || !currentProfile) {
        openAuthModal(currentUser ? "profile" : "login");
        setWallStatus("Đăng nhập để gửi báo cáo an toàn nhé.", "info");
        return;
      }
      if (!firestore || button.disabled) return;
      const confirmed = window.confirm("Báo cáo lời nhắn này để ban tổ chức kiểm tra? Chỉ báo cáo nội dung có dấu hiệu spam, xâm phạm riêng tư hoặc gây tổn thương.");
      if (!confirmed) return;
      button.disabled = true;
      try {
        const reportRef = doc(collection(firestore, "wallReports"));
        const rateLimitRef = doc(firestore, "wallRateLimits", currentUser.uid);
        const batch = writeBatch(firestore);
        batch.set(reportRef, { messageId, reason: "inappropriate", createdAt: serverTimestamp() });
        batch.set(rateLimitRef, { lastSentAt: serverTimestamp(), lastActionId: reportRef.id });
        await batch.commit();
        setWallStatus("Đã gửi báo cáo. Cảm ơn bạn đã giúp giữ bức tường an toàn.", "success");
      } catch (error) {
        console.error("Report wall message:", error);
        setWallStatus(friendlyFirebaseError(error), "error");
        button.disabled = false;
      }
    }

    // Auth UI events
    authOpenButton.addEventListener("click", () => openAuthModal(currentUser && !currentProfile ? "profile" : "login"));
    signOutButton.addEventListener("click", requestSignOut);
    document.querySelectorAll("[data-close-auth]").forEach((node) => node.addEventListener("click", closeAuthModal));
    document.querySelectorAll("[data-auth-tab]").forEach((button) => button.addEventListener("click", () => setAuthView(button.dataset.authTab)));
    loginForm.addEventListener("submit", handleLogin);
    registerForm.addEventListener("submit", handleRegister);
    profileForm.addEventListener("submit", completeProfileFromForm);
    el("googleAuthButton").addEventListener("click", () => startSocialLogin("google"));
    el("facebookAuthButton").addEventListener("click", () => startSocialLogin("facebook"));
    el("forgotPasswordButton").addEventListener("click", async () => {
      const email = cleanText(el("loginEmail").value).toLowerCase();
      if (!email) { setAuthStatus("Hãy nhập email trước, rồi chọn Quên mật khẩu nhé.", "error"); el("loginEmail").focus(); return; }
      try {
        await sendPasswordResetEmail(auth, email);
        setAuthStatus("Đã gửi hướng dẫn đặt lại mật khẩu đến email nếu tài khoản tồn tại.", "success");
      } catch (error) { setAuthStatus(friendlyFirebaseError(error), "error"); }
    });
    el("registerUsername").addEventListener("input", (event) => {
      event.target.value = event.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20);
    });
    el("profileUsername").addEventListener("input", (event) => {
      event.target.value = event.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20);
    });
    wallInput.addEventListener("input", updateCharacterCount);
    sendButton.addEventListener("click", sendWallMessage);
    wallMessages.addEventListener("click", (event) => {
      const button = event.target.closest("[data-report-id]");
      if (button) reportWallMessage(button.dataset.reportId, button);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && authModal.classList.contains("is-open")) closeAuthModal();
    });
    updateCharacterCount();

    async function startFirebase() {
      try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        firestore = getFirestore(app);
        setConnection("ĐANG KẾT NỐI");
        setWallStatus("Đang kết nối Bức tường Không Một Mình…");

        // Nội dung trên tường có thể đọc công khai; cần tài khoản đã hoàn tất hồ sơ để gửi/báo cáo.
        const wallQuery = query(collection(firestore, "wallMessages"), orderBy("createdAt", "desc"), limit(40));
        onSnapshot(wallQuery, (snapshot) => {
          const entries = snapshot.docs.map((snapshotDoc) => ({ id: snapshotDoc.id, ...snapshotDoc.data() }));
          renderWall(entries);
          setConnection("LIVE · ĐANG CẬP NHẬT", true);
        }, (error) => {
          console.error("Firestore live listener:", error);
          setConnection("MẤT KẾT NỐI");
          setWallStatus(friendlyFirebaseError(error), "error");
        });

        onAuthStateChanged(auth, handleAuthState);
        try {
          await getRedirectResult(auth);
        } catch (error) {
          console.error("OAuth redirect result:", error);
          setAuthStatus(friendlyFirebaseError(error), "error");
          openAuthModal("login");
        }
        setConnection("FIRESTORE · ĐÃ KẾT NỐI", true);
        if (!currentUser) setWallStatus("Bạn có thể đọc lời nhắn. Đăng nhập để gửi hoặc báo cáo nội dung.", "info");
      } catch (error) {
        console.error("Firebase initialization:", error);
        setConnection("CHƯA KẾT NỐI");
        setWallStatus(friendlyFirebaseError(error), "error");
        sendButton.disabled = true;
      }
    }

    if (!configIsComplete(firebaseConfig)) {
      setConnection("CHỜ CẤU HÌNH");
      setWallStatus("Chưa cấu hình Firebase. Hãy kiểm tra firebaseConfig trong index.html.", "error");
      showEmptyWall("Bức tường sẽ hiển thị lời nhắn chung sau khi bạn cấu hình Firebase.");
    } else {
      startFirebase();
    }
  