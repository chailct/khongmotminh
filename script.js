'use strict';

(() => {
  const $ = (selector) => document.querySelector(selector);
  const modal = $('#gameModal');
  const canvas = $('#gameCanvas');
  const ctx = canvas.getContext('2d');
  const overlay = $('#stageOverlay');
  const pauseShade = $('#pauseShade');
  const startButton = $('#startGame');
  const touchControls = $('#touchControls');
  const W = 960;
  const H = 540;
  const STORE = { scores: 'komm_arcade_scores_v3', played: 'komm_arcade_played_v3' };

  const GAME_INFO = {
    runner: {
      title: 'ĐƯỜNG CHẠY CHIẾN LƯỢC', icon: '🏁',
      intro: 'Năm cổng quyết định đang lao tới. Đọc kỹ tình huống, so sánh ba kế hoạch xử lý và đổi làn trước khi cổng đến vạch. Các phương án sai có thể nghe có vẻ hợp lý — hãy xét cả thứ tự hành động và hậu quả.',
      instructions: ['A / S / D HOẶC ↑ / ↓: ĐỔI LÀN', '5 TÌNH HUỐNG · 3 KẾ HOẠCH MỖI CỔNG', 'CHỌN ĐÚNG TRƯỚC KHI CỔNG CHẠM VẠCH'],
      hint: 'Chọn làn 1, 2 hoặc 3 bằng A/S/D, phím mũi tên hoặc nút cảm ứng. Đọc cả chuỗi hành động, không chỉ nhìn một từ khóa.',
      tip: 'Một kế hoạch tốt phải an toàn theo cả nội dung lẫn thứ tự: dừng, không phát tán, lưu thông tin cần thiết, báo cáo và chia sẻ với người đáng tin.',
      learningTitle: 'Đọc tình huống · So sánh kế hoạch · Chọn đúng thứ tự',
      learningText: 'Mỗi cổng là một tình huống nhiều dữ kiện. Hãy cân nhắc quyền riêng tư, sự đồng ý, dấu hiệu ép buộc và hậu quả của từng cách xử lý.',
      learningTags: ['SUY LUẬN TÌNH HUỐNG','THỨ TỰ HÀNH ĐỘNG','5 BƯỚC XỬ LÝ']
    },
    detective: {
      title: 'GIẢI MÃ CUỘC TRÒ CHUYỆN', icon: '🕵️',
      intro: 'Bạn là người phân tích một hồ sơ trò chuyện. Hãy đọc kỹ từng tin nhắn, đánh dấu những hành vi vượt ranh giới, rồi chọn cách xử lý an toàn. Đừng vội kết luận chỉ vì lời khen, món quà, ảnh đại diện hay vì bạn đã quen người đó.',
      instructions: ['CHẠM VÀO TIN NHẮN CÓ DẤU HIỆU ĐÁNG LO', 'TÌM ĐỦ MANH MỐI TRONG MỖI HỒ SƠ', 'CHỌN CÁCH ỨNG PHÓ AN TOÀN'],
      hint: 'Tập trung vào điều người kia muốn bạn làm: giữ bí mật, chuyển sang nhắn riêng, cung cấp thông tin, gặp riêng, hoặc tiếp tay làm tổn thương người khác.',
      tip: 'Cẩm nang nhắc: nhận diện hành vi khiến mình không an toàn, không chỉ dựa vào việc người đó là người lạ hay người quen.',
      learningTitle: 'Nhận diện dụ dỗ · Ép buộc · Bắt nạt trực tuyến',
      learningText: 'Dấu hiệu cần để ý gồm yêu cầu giữ bí mật, hỏi quá nhiều thông tin riêng tư, ép gặp riêng, đe dọa, hoặc lôi kéo bạn phát tán nội dung làm tổn thương người khác.',
      learningTags: ['NHẬN DIỆN HÀNH VI','TÔN TRỌNG RANH GIỚI','KHÔNG LAN TRUYỀN']
    },
    studio: {
      title: 'PHÒNG BIÊN TẬP 5 GIÂY', icon: '📸',
      intro: 'Trước khi nội dung được đăng, bạn là người biên tập cuối cùng. Hãy ẩn thông tin riêng tư, kiểm tra sự đồng ý và dừng lại 5 giây. Nếu nội dung là tin nhắn riêng hoặc đã gây tổn thương, bạn cần biết khi nào phải hủy và cách sửa sai.',
      instructions: ['CHẠM VÀO CHI TIẾT CẦN ẨN / GỠ', 'THỰC HIỆN QUY TẮC 5 GIÂY', 'NẾU ĐÃ LỠ ĐĂNG: KHẮC PHỤC CÓ TRÁCH NHIỆM'],
      hint: 'Ảnh cá nhân, tên trường, địa chỉ, vị trí, số điện thoại và tin nhắn riêng đều cần được tôn trọng. Được gửi cho bạn không có nghĩa là bạn được tự do chia sẻ.',
      tip: 'Ba câu hỏi trước khi đăng: Có làm lộ riêng tư không? Người trong nội dung có đồng ý không? Nếu là mình, mình có muốn nội dung ấy được chia sẻ không?',
      learningTitle: 'Quyền riêng tư · Sự đồng ý · 5 giây trước khi đăng',
      learningText: 'Thực hành ẩn chi tiết nhận diện, không đăng lại nội dung riêng tư, và sửa sai nếu đã chia sẻ điều gây tổn thương.',
      learningTags: ['QUYỀN RIÊNG TƯ','SỰ ĐỒNG Ý','5 GIÂY SUY NGHĨ']
    },
    support: {
      title: 'TRẠM ĐỒNG HÀNH', icon: '🤝',
      intro: 'Một người bạn nhắn rằng họ đang gặp chuyện không ổn. Hãy chọn cách lắng nghe không đổ lỗi, không hứa giữ bí mật bằng mọi giá, rồi xây một mạng lưới hỗ trợ gồm người đáng tin cậy và một điểm tựa dự phòng.',
      instructions: ['CHỌN CÂU TRẢ LỜI BIẾT LẮNG NGHE', 'KẾT NỐI ÍT NHẤT 2 ĐIỂM TỰA', 'NHỚ TÌM NGƯỜI KHÁC NẾU CHƯA ĐƯỢC LẮNG NGHE'],
      hint: 'Bạn không cần tự giải quyết mọi chuyện. Hãy tin tưởng, tôn trọng, không lan truyền câu chuyện và cùng bạn tìm người có thể hỗ trợ.',
      tip: 'Tổng đài quốc gia bảo vệ trẻ em 111 miễn phí, hoạt động 24 giờ mỗi ngày. Nếu người đầu tiên chưa lắng nghe, hãy tìm một người khác.',
      learningTitle: 'Lắng nghe · Không đổ lỗi · Kết nối người hỗ trợ',
      learningText: 'Hỗ trợ một người bạn bắt đầu từ việc lắng nghe và tin tưởng. Tôn trọng riêng tư nhưng không giữ kín một chuyện đang đe dọa sự an toàn của bạn ấy.',
      learningTags: ['LẮNG NGHE','NGƯỜI LỚN ĐÁNG TIN','TỔNG ĐÀI 111']
    }
  };

  const GAME_DEBRIEFS = {
    runner: { title: 'Một kế hoạch an toàn cần đúng cả trình tự', text: 'Khi gặp nội dung khiến bạn sợ hãi hoặc bị ép buộc: dừng tương tác; không chuyển tiếp hay bình luận hùa theo; lưu thông tin cần thiết; báo cáo nội dung hoặc tài khoản; chia sẻ với cha mẹ, thầy cô, người chăm sóc hoặc người lớn đáng tin. Đừng tự đối đầu hay trả đũa.', tags: ['DỪNG','KHÔNG LAN TRUYỀN','LƯU','BÁO CÁO','CHIA SẺ'] },
    detective: { title: 'Nhìn vào hành vi, không chỉ nhìn danh tính', text: 'Một tài khoản có thể dùng tên hoặc ảnh đại diện không đúng sự thật; người quen cũng có thể có hành vi vượt ranh giới. Hãy chú ý yêu cầu giữ bí mật, thông tin riêng tư, gặp riêng, lời đe dọa và hành vi lôi kéo phát tán nội dung gây tổn thương. Nếu thấy không an toàn, bạn có quyền dừng và tìm hỗ trợ.', tags: ['DỤ DỖ','ÉP BUỘC','BẮT NẠT TRỰC TUYẾN'] },
    studio: { title: 'Được nhận không có nghĩa là được đăng', text: 'Thông tin riêng tư không mất quyền riêng tư chỉ vì đã được gửi cho bạn. Trước khi đăng, hãy hỏi mình có làm lộ điều riêng tư không, người trong nội dung có đồng ý không và mình có muốn điều tương tự được chia sẻ về mình không. Nếu chưa chắc, đừng đăng. Nếu đã lỡ chia sẻ gây tổn thương, hãy dừng lan truyền, gỡ nếu có thể, xin lỗi và tìm cách khắc phục.', tags: ['QUYỀN RIÊNG TƯ','SỰ ĐỒNG Ý','SỬA SAI CÓ TRÁCH NHIỆM'] },
    support: { title: 'Giúp đỡ bắt đầu từ lắng nghe', text: 'Đừng hỏi dồn hoặc trách móc người đang gặp chuyện. Hãy nói rằng bạn tin tưởng và sẵn sàng lắng nghe. Không phát tán câu chuyện; khi sự an toàn bị đe dọa, hãy cùng bạn ấy tìm người lớn đáng tin hoặc Tổng đài 111. Nếu người đầu tiên chưa lắng nghe, hãy tìm người khác.', tags: ['LẮNG NGHE KHÔNG ĐỔ LỖI','MẠNG LƯỚI HỖ TRỢ','111 · MIỄN PHÍ · 24/7'] }
  };

  let selectedGame = null;
  let game = null;
  const memoryStore = Object.create(null);
  let rafId = 0;
  let lastFrame = 0;
  let paused = false;

  function safeRead(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return Object.prototype.hasOwnProperty.call(memoryStore, key) ? memoryStore[key] : fallback;
      const value = JSON.parse(raw); memoryStore[key] = value; return value ?? fallback;
    } catch (_) { return Object.prototype.hasOwnProperty.call(memoryStore, key) ? memoryStore[key] : fallback; }
  }
  function safeWrite(key, value) {
    memoryStore[key] = value;
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (_) { return false; }
  }
  function formatTime(seconds) {
    const s = Math.max(0, Math.ceil(seconds));
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  }
  function roundedRect(c, x, y, w, h, r, fill, stroke) {
    c.beginPath(); c.roundRect(x, y, w, h, r);
    if (fill) { c.fillStyle = fill; c.fill(); }
    if (stroke) { c.strokeStyle = stroke; c.stroke(); }
  }
  function starPath(c, cx, cy, outer, inner, points = 5) {
    c.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const a = -Math.PI / 2 + i * Math.PI / points; const r = i % 2 === 0 ? outer : inner;
      const x = cx + Math.cos(a) * r; const y = cy + Math.sin(a) * r;
      if (i === 0) c.moveTo(x, y); else c.lineTo(x, y);
    }
    c.closePath();
  }
  function drawBackdrop(c, time, base = '#1a0c55', accent = '#3920a3') {
    const g = c.createLinearGradient(0, 0, W, H); g.addColorStop(0, base); g.addColorStop(1, accent);
    c.fillStyle = g; c.fillRect(0, 0, W, H); c.save();
    for (let i = 0; i < 46; i++) {
      const x = (i * 197 + (time * (7 + (i % 5) * 2))) % W, y = (i * 83) % 350, r = 1 + (i % 3) * .7;
      c.globalAlpha = .2 + .15 * Math.sin(time * 2 + i); c.fillStyle = i % 4 === 0 ? '#ffe88b' : '#d9d1ff';
      c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
    }
    c.restore();
  }
  function drawPill(c, text, x, y, fill = '#ffffff1c', color = '#fff') {
    c.font = '800 11px "Be Vietnam Pro", sans-serif'; const width = c.measureText(text).width + 24;
    roundedRect(c, x, y, width, 28, 14, fill); c.fillStyle = color; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(text, x + width / 2, y + 14);
  }
  function wrapText(c, text, x, y, maxWidth, lineHeight, maxLines = 3) {
    const words = text.split(' '); let line = '', lines = 0;
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (c.measureText(test).width > maxWidth && line) {
        c.fillText(line, x, y + lines * lineHeight); lines++; line = word;
        if (lines >= maxLines - 1) break;
      } else line = test;
    }
    if (lines < maxLines) c.fillText(line, x, y + lines * lineHeight);
  }
  function setHud(state) {
    $('#hudScore').textContent = String(Math.max(0, Math.floor(state.score || 0))).padStart(4, '0');
    $('#hudLevel').textContent = String(state.level || 1).padStart(2, '0');
    $('#hudTime').textContent = state.hudTime || formatTime(state.time || 0);
    $('#hudStatus').textContent = state.status || 'ĐANG CHƠI';
  }
  function showOverlay({ kicker, icon, title, text, instructions, button = 'BẮT ĐẦU NHIỆM VỤ ↗' }) {
    $('#overlayKicker').textContent = kicker; $('#overlayIcon').textContent = icon;
    $('#overlayTitle').textContent = title; $('#overlayText').textContent = text;
    $('#overlayInstructions').replaceChildren();
    (instructions || []).forEach((item) => { const span = document.createElement('span'); span.textContent = item; $('#overlayInstructions').append(span); });
    startButton.innerHTML = `${button.replace(' ↗', '')} <span>↗</span>`; overlay.classList.remove('hidden');
  }
  function showLearning({ kicker = 'KIẾN THỨC ĐI CÙNG GAME', title, text, tags = [], current = 'MỞ KHÓA TRONG LƯỢT CHƠI' }) {
    $('#learningKicker').textContent = kicker; $('#learningTitle').textContent = title;
    $('#learningText').textContent = text; $('#learningCurrent').textContent = current;
    const root = $('#learningTags'); root.replaceChildren();
    tags.forEach((tag) => { const chip = document.createElement('span'); chip.className = `learning-tag${/dừng|cảnh giác|không|báo cáo|nguy cơ|rò rỉ/i.test(tag) ? ' is-alert' : ''}`; chip.textContent = tag; root.append(chip); });
  }
  function renderControls(items) {
    touchControls.replaceChildren();
    items.forEach(([label, text, action]) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'touch-btn'; button.textContent = text; button.setAttribute('aria-label', label);
      button.addEventListener('pointerdown', (event) => { event.preventDefault(); if (game && !paused && !game.done) game.control?.(action); }); touchControls.append(button);
    });
  }
  function renderSokobanControls() {
    touchControls.replaceChildren();
    const keys = [['↖',''],['↑','up'],['↗',''],['←','left'],['↓','down'],['→','right']];
    keys.forEach(([text, action]) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'touch-btn'; button.textContent = text;
      button.disabled = !action; button.style.opacity = action ? '1' : '.25';
      if (action) button.addEventListener('pointerdown', (event) => { event.preventDefault(); if (game && !paused && !game.done) game.control?.(action); }); touchControls.append(button);
    });
    [['↶ HOÀN TÁC','undo'],['↻ CHƠI LẠI','reset']].forEach(([text, action]) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'touch-btn'; button.textContent = text;
      button.addEventListener('pointerdown', (event) => { event.preventDefault(); if (game && !paused && !game.done) game.control?.(action); }); touchControls.append(button);
    });
  }
  function openGame(key) {
    if (!GAME_INFO[key]) return;
    stopLoop(); selectedGame = key; game = null; paused = false;
    const info = GAME_INFO[key]; $('#modalTitle').textContent = info.title; $('#gameTip').textContent = info.tip; $('#controlHint').textContent = info.hint;
    showLearning({ kicker: 'KIẾN THỨC ĐI CÙNG GAME', title: info.learningTitle, text: info.learningText, tags: info.learningTags, current: 'SẼ MỞ KHÓA KHI CHƠI' });
    $('#pauseGame').textContent = 'Ⅱ'; pauseShade.classList.remove('show'); touchControls.replaceChildren();
    if (key === 'runner') renderControls([['LANE 1','↑ LÀN 1','lane0'],['LANE 2','S LÀN 2','lane1'],['LANE 3','↓ LÀN 3','lane2']]);
    const best = safeRead(STORE.scores, {});
    showOverlay({ kicker: `MISSION BRIEF / ${key.toUpperCase()}`, icon: info.icon, title: 'Sẵn sàng thử thách tư duy?', text: info.intro, instructions: [...info.instructions, ...(best[key] ? [`ĐIỂM CAO ${String(best[key]).padStart(4, '0')}`] : [])] });
    modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; drawAttractScreen(key);
  }
  function drawAttractScreen(key) {
    const c = ctx; drawBackdrop(c, 0, '#1b0c58', '#3920b2'); c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillStyle = '#ffffff12'; c.font = '900 120px "Be Vietnam Pro", sans-serif'; c.fillText('THINK', W / 2, 245);
    c.fillStyle = '#ffffffa0'; c.font = '800 12px "Be Vietnam Pro", sans-serif'; c.fillText(GAME_INFO[key].title, W / 2, 310);
    c.fillStyle = '#ffdf52'; c.font = '900 26px sans-serif'; c.fillText(GAME_INFO[key].icon, W / 2, 170);
  }
  function startSelectedGame() {
    stopLoop(); paused = false; pauseShade.classList.remove('show'); $('#pauseGame').textContent = 'Ⅱ'; overlay.classList.add('hidden');
    game = createGame(selectedGame); game.start?.(); lastFrame = 0; rafId = requestAnimationFrame(loop);
  }
  function loop(timestamp) {
    if (!game) return;
    const dt = lastFrame ? Math.min(.04, (timestamp - lastFrame) / 1000) : .016; lastFrame = timestamp;
    if (!paused && !game.done) game.update(dt); game.draw(ctx); setHud(game);
    if (game.done) { finishCurrentGame(); return; }
    rafId = requestAnimationFrame(loop);
  }
  function stopLoop() { if (rafId) cancelAnimationFrame(rafId); rafId = 0; }
  function finishCurrentGame() {
    stopLoop(); const scores = safeRead(STORE.scores, {}); const previous = Number(scores[selectedGame] || 0);
    const score = Math.floor(game.score || 0); const best = Math.max(previous, score); scores[selectedGame] = best; safeWrite(STORE.scores, scores);
    const played = new Set(safeRead(STORE.played, [])); played.add(selectedGame); safeWrite(STORE.played, [...played]); updateArcadeStats();
    const won = !!game.won; const debrief = GAME_DEBRIEFS[selectedGame];
    const message = (won
      ? `Bạn đã hoàn thành thử thách với ${score.toLocaleString('vi-VN')} điểm.${score >= previous && score > 0 ? ' Đây là thành tích tốt nhất mới!' : ` Điểm cao hiện tại: ${best.toLocaleString('vi-VN')}.`}`
      : `Bạn đạt ${score.toLocaleString('vi-VN')} điểm. Hãy xem lại các dữ kiện, hoàn tác khi cần và thử một chiến thuật khác.`) + (game.summary ? ` ${game.summary}` : '');
    showLearning({ kicker: 'TỔNG KẾT KIẾN THỨC SAU MÀN CHƠI', title: debrief.title, text: debrief.text, tags: debrief.tags, current: 'BÀI HỌC ĐÃ MỞ KHÓA' });
    showOverlay({ kicker: won ? 'MISSION CLEARED / WELL DONE' : 'MISSION REPORT', icon: won ? '🏆' : '↻', title: won ? 'NHIỆM VỤ HOÀN THÀNH!' : 'THỬ THÁCH KẾT THÚC', text: message, instructions: [`ĐIỂM LƯỢT NÀY ${String(score).padStart(4, '0')}`, `KỶ LỤC ${String(best).padStart(4, '0')}`, ...debrief.tags.slice(0, 2)], button: 'CHƠI LẠI ↗' });
  }
  function closeGame() { stopLoop(); game = null; paused = false; modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; pauseShade.classList.remove('show'); }
  function togglePause() { if (!game || game.done) return; paused = !paused; pauseShade.classList.toggle('show', paused); $('#pauseGame').textContent = paused ? '▶' : 'Ⅱ'; }
  function updateArcadeStats() {
    const played = new Set(safeRead(STORE.played, [])); const scores = safeRead(STORE.scores, {}); const best = Math.max(0, ...Object.values(scores).map(Number));
    $('#playedCount').textContent = String(played.size).padStart(2, '0'); $('#bestScore').textContent = String(best).padStart(4, '0');
    $('#progressLabel').textContent = `${played.size} / 4`; $('#progressFill').style.width = `${Math.min(100, played.size / 4 * 100)}%`;
  }

  // GAME 01 — a timed, three-lane strategy runner. The player evaluates complete response plans.
  function createRunner() {
    const cases = [
      { scenario: 'Một tài khoản mới quen liên tục đòi ảnh riêng và bảo bạn phải giữ bí mật.', correct: 1, options: [
        'Gửi trước để người đó không giận, rồi mới kể với bạn bè.',
        'DỪNG tương tác → không gửi thêm → chia sẻ với người lớn đáng tin.',
        'Chuyển tin nhắn vào nhóm để mọi người bình chọn xem có đáng lo không.'
      ], lesson: 'Yêu cầu gửi ảnh riêng, giữ bí mật hoặc gây áp lực là dấu hiệu cần cảnh giác. Không cần chứng minh người kia xấu mới được dừng tương tác.' },
      { scenario: 'Bạn nhận được ảnh chụp màn hình một cuộc trò chuyện riêng tư của bạn cùng lớp.', correct: 2, options: [
        'Đăng lên story để cảnh báo càng nhiều người càng tốt.',
        'Chỉnh ảnh thành meme để giảm căng thẳng trong nhóm.',
        'KHÔNG lan truyền → giữ thông tin cần thiết → báo cáo và tìm người hỗ trợ.'
      ], lesson: 'Không phát tán nội dung riêng tư dưới danh nghĩa cảnh báo. Chỉ giữ thông tin cần thiết để báo cáo và nhờ người có trách nhiệm hỗ trợ.' },
      { scenario: 'Một người đe dọa đăng thông tin của bạn nếu bạn không làm theo yêu cầu.', correct: 0, options: [
        'DỪNG làm theo → lưu tài khoản và tin nhắn → báo cáo → chia sẻ với người lớn.',
        'Đe dọa lại để người đó sợ và tự xóa nội dung.',
        'Gửi thêm thông tin để thương lượng cho xong chuyện.'
      ], lesson: 'Đe dọa không tạo ra nghĩa vụ phải làm theo. Đừng đối đầu hoặc trả đũa; hãy dừng, giữ thông tin cần thiết, báo cáo và tìm người hỗ trợ.' },
      { scenario: 'Một người bạn kể rằng bạn ấy bị chế giễu trong nhóm chat và sợ bị trách.', correct: 1, options: [
        'Hỏi bạn ấy đã làm gì khiến mọi người phản ứng như vậy.',
        'Lắng nghe không đổ lỗi → không chuyển tiếp → cùng tìm người lớn hỗ trợ.',
        'Gửi ảnh chụp cuộc trò chuyện sang nhóm khác để tìm người đứng về phía bạn.'
      ], lesson: 'Người bị tổn thương cần được lắng nghe, không bị đổ lỗi. Đừng hùa theo hoặc phát tán nội dung; hãy đồng hành để tìm sự hỗ trợ.' },
      { scenario: 'Bạn muốn đăng ảnh nhóm sau một buổi hoạt động ở trường.', correct: 2, options: [
        'Đăng ngay nếu ảnh vui và không có lời bình luận xấu.',
        'Che mặt một vài người rồi đăng mà không cần hỏi.',
        'DỪNG 5 giây → hỏi ý kiến người trong ảnh → kiểm tra dữ liệu riêng tư.'
      ], lesson: 'Trước khi đăng, hãy nghĩ về quyền riêng tư, sự đồng ý và tác động. Người trong ảnh có quyền không muốn hình ảnh của mình được chia sẻ.' }
    ];
    let caseIndex = 0, selectedLane = 1, gateX = 865, elapsed = 0, wait = 0, flash = 0, combo = 0;
    const laneY = [228, 338, 448];
    const state = {
      score: 0, level: 1, time: 80, hudTime: '01:20', status: 'CỔNG 1/5 · LÀN 2', lives: 3, done: false, won: false,
      correctCount: 0, totalCases: cases.length, summary: '',
      choose(lane) { selectedLane = Math.max(0, Math.min(2, lane)); this.status = `CỔNG ${Math.min(caseIndex + 1, cases.length)}/5 · LÀN ${selectedLane + 1}`; },
      resolve() {
        const item = cases[caseIndex]; const correct = selectedLane === item.correct;
        if (correct) { this.correctCount++; combo++; this.score += 220 + combo * 45; flash = .55; }
        else { this.lives--; combo = 0; flash = .3; }
        const choice = item.options[item.correct];
        showLearning({ kicker: correct ? `KẾ HOẠCH ĐÚNG · COMBO ${combo}` : 'SOI LẠI CHUỖI HÀNH ĐỘNG', title: correct ? 'Bạn đã chọn được kế hoạch an toàn' : 'Vì sao phương án này chưa an toàn?', text: `${item.lesson} Kế hoạch phù hợp: ${choice}`, tags: correct ? ['SUY LUẬN ĐÚNG','THỨ TỰ AN TOÀN'] : ['XEM LẠI HẬU QUẢ','5 BƯỚC XỬ LÝ'], current: `${this.correctCount}/${cases.length} KẾ HOẠCH ĐÚNG · ${this.lives} MẠNG` });
        wait = 1.25;
      },
      update(dt) {
        elapsed += dt; this.time = Math.max(0, 80 - elapsed); this.hudTime = formatTime(this.time); flash = Math.max(0, flash - dt);
        if (wait > 0) {
          wait -= dt;
          if (wait <= 0) {
            caseIndex++;
            if (this.lives <= 0) { this.done = true; this.won = false; this.summary = `Bạn xử lý đúng ${this.correctCount}/${cases.length} tình huống.`; }
            else if (caseIndex >= cases.length) { this.done = true; this.won = this.correctCount >= 4; this.score += this.won ? 550 + this.lives * 100 : 0; this.summary = `Bạn chọn đúng ${this.correctCount}/${cases.length} kế hoạch; còn ${this.lives} mạng.`; }
            else { gateX = 865; selectedLane = 1; }
          }
        } else {
          gateX -= (215 + elapsed * 1.4) * dt;
          if (gateX <= 180) this.resolve();
        }
        this.level = Math.min(5, caseIndex + 1); this.status = `CỔNG ${Math.min(caseIndex + 1, 5)}/5 · ♥ ${this.lives}`;
        if (this.time <= 0 && !this.done) { this.done = true; this.won = false; this.summary = `Bạn xử lý đúng ${this.correctCount}/${cases.length} kế hoạch.`; }
      },
      key(key) {
        const k = key.toLowerCase();
        if (k === 'a' || key === 'ArrowLeft' || key === 'ArrowUp' || key === '1') this.choose(0);
        if (k === 's' || key === ' ' || key === '2') this.choose(1);
        if (k === 'd' || key === 'ArrowRight' || key === 'ArrowDown' || key === '3') this.choose(2);
      },
      control(action) { if (action === 'lane0') this.choose(0); if (action === 'lane1') this.choose(1); if (action === 'lane2') this.choose(2); },
      pointer(x, y) { if (y < 280) this.choose(0); else if (y < 390) this.choose(1); else this.choose(2); },
      draw(c) {
        drawBackdrop(c, elapsed * .22, '#160d4a', '#5220a4');
        drawPill(c, 'STRATEGY RUN / CHỌN KẾ HOẠCH TRƯỚC VẠCH', 24, 18);
        const item = cases[Math.min(caseIndex, cases.length - 1)];
        roundedRect(c, 210, 55, 540, 105, 16, '#ffffff18', '#ffffff35');
        c.fillStyle = '#ffe16a'; c.font = '900 9px "Be Vietnam Pro", sans-serif'; c.textAlign = 'left'; c.fillText(`TÌNH HUỐNG ${Math.min(caseIndex + 1, 5)} / 5`, 232, 79);
        c.fillStyle = '#fff'; c.font = '800 15px "Be Vietnam Pro", sans-serif'; wrapText(c, item.scenario, 232, 105, 495, 22, 2);
        laneY.forEach((y, index) => {
          const active = index === selectedLane;
          roundedRect(c, 34, y - 47, 892, 94, 16, active ? '#ffffff1e' : '#ffffff0b', active ? '#ffe16a' : '#ffffff22');
          c.strokeStyle = active ? '#ffe16a99' : '#ffffff20'; c.lineWidth = active ? 3 : 1; c.setLineDash([10, 11]); c.beginPath(); c.moveTo(48, y + 39); c.lineTo(910, y + 39); c.stroke(); c.setLineDash([]);
          c.fillStyle = active ? '#ffe16a' : '#c6b9f4'; c.font = '900 10px "Be Vietnam Pro", sans-serif'; c.textAlign = 'left'; c.fillText(`LÀN ${index + 1}`, 55, y - 25);
          if (active) { c.fillStyle = '#ffe16a'; c.beginPath(); c.arc(154, y, 23, 0, Math.PI * 2); c.fill(); c.fillStyle = '#28105d'; c.font = '900 19px sans-serif'; c.textAlign = 'center'; c.fillText('➤', 154, y + 6); }
          const cardX = gateX, cardY = y - 39, cardW = 255, cardH = 78;
          c.save(); c.shadowColor = active ? '#ffe16a66' : '#8d78ff66'; c.shadowBlur = active ? 19 : 8;
          roundedRect(c, cardX, cardY, cardW, cardH, 13, index === item.correct && wait > .7 ? '#c8fff0' : '#f7f5ff', active ? '#ffe16a' : '#b3a5e9'); c.restore();
          c.fillStyle = '#7a65ba'; c.font = '900 8px "Be Vietnam Pro", sans-serif'; c.textAlign = 'left'; c.fillText(`KẾ HOẠCH ${String.fromCharCode(65 + index)}`, cardX + 13, cardY + 17);
          c.fillStyle = '#21164a'; c.font = '700 10px "Be Vietnam Pro", sans-serif'; wrapText(c, item.options[index], cardX + 13, cardY + 35, cardW - 25, 14, 3);
        });
        c.fillStyle = '#d8d0ff'; c.font = '800 9px "Be Vietnam Pro", sans-serif'; c.textAlign = 'center'; c.fillText('ĐỔI LÀN ĐỂ ĐƯA NHÂN VẬT VÀO ĐÚNG CỔNG', W / 2, 520);
        if (flash > 0) { c.fillStyle = `rgba(255,255,255,${flash * .16})`; c.fillRect(0, 0, W, H); }
      }
    };
    return state;
  }

  // GAME 02 — interactive conversation investigation: detect behaviours, not identities.
  function createDetectiveGame() {
    const cases = [
      {
        title: 'LỜI MỜI BẮT ĐẦU BẰNG SỰ QUAN TÂM', context: 'Bạn vừa gặp một người qua trò chơi trực tuyến.', clueCount: 3,
        messages: [
          { speaker: 'TÀI KHOẢN MỚI', text: 'Bạn chơi game hay ghê! Tớ tặng bạn một vật phẩm nhé.', clue: false, note: 'Lời khen hoặc món quà tự nó chưa đủ để kết luận. Hãy quan sát hành vi tiếp theo.' },
          { speaker: 'TÀI KHOẢN MỚI', text: 'Mình chuyển sang nhắn riêng ở ứng dụng khác nhé.', clue: true, note: 'Lời mời rời khỏi không gian trò chuyện ban đầu có thể là dấu hiệu cần thận trọng khi đi cùng các yêu cầu khác.' },
          { speaker: 'TÀI KHOẢN MỚI', text: 'Đừng kể ai nhé, đây là bí mật của hai chúng ta.', clue: true, note: 'Yêu cầu giữ bí mật để tiếp tục tương tác là tín hiệu cảnh giác.' },
          { speaker: 'TÀI KHOẢN MỚI', text: 'Bạn học trường nào? Thường tan học lúc mấy giờ?', clue: true, note: 'Hỏi trường học và lịch trình có thể làm lộ thông tin nhận diện, nơi ở hoặc thời gian di chuyển.' },
          { speaker: 'TÀI KHOẢN MỚI', text: 'Bạn thích chế độ chơi nào nhất?', clue: false, note: 'Đây là câu trò chuyện thông thường; cần đánh giá theo cả chuỗi hành vi, không gắn nhãn vội vàng.' }
        ],
        response: [
          'Tiếp tục trò chuyện để hỏi xem người đó có ý gì, rồi cung cấp thông tin để họ tin mình.',
          'Dừng tương tác, không cung cấp thêm thông tin, không gặp riêng và chia sẻ với người lớn đáng tin.',
          'Chụp toàn bộ cuộc trò chuyện rồi đăng lên nhóm để mọi người cùng nhận xét.'
        ], correctResponse: 1,
        lesson: 'Dụ dỗ có thể bắt đầu bằng lời khen, quan tâm hoặc quà tặng. Điều cần chú ý là khi người kia yêu cầu giữ bí mật, chuyển sang trò chuyện riêng, hỏi thông tin riêng tư hoặc thúc ép bạn làm điều không thoải mái. Bạn có quyền dừng lại và tìm người hỗ trợ.'
      },
      {
        title: 'ẢNH ĐẠI DIỆN KHÔNG PHẢI BẰNG CHỨNG', context: 'Một tài khoản nói rằng họ quen người thân của bạn.', clueCount: 3,
        messages: [
          { speaker: 'TÀI KHOẢN TỰ XƯNG NGƯỜI QUEN', text: 'Tớ biết anh của bạn. Tài khoản này mới nên không có nhiều bài đăng.', clue: false, note: 'Một lời tự giới thiệu chưa đủ để xác minh danh tính.' },
          { speaker: 'TÀI KHOẢN TỰ XƯNG NGƯỜI QUEN', text: 'Đừng gọi người thân để kiểm tra, cứ tin tớ đi.', clue: true, note: 'Ngăn bạn xác minh thông tin và thúc ép bạn tin ngay là hành vi cần cảnh giác.' },
          { speaker: 'TÀI KHOẢN TỰ XƯNG NGƯỜI QUEN', text: 'Gửi tớ địa chỉ trường và giờ tan học để tớ qua đón nhé.', clue: true, note: 'Đề nghị cung cấp địa chỉ trường và lịch trình có thể làm lộ vị trí của bạn.' },
          { speaker: 'TÀI KHOẢN TỰ XƯNG NGƯỜI QUEN', text: 'Gặp riêng sau giờ học nhé, đừng rủ người khác.', clue: true, note: 'Yêu cầu gặp riêng và không có người đi cùng là dấu hiệu cần dừng lại, không tự đi gặp.' },
          { speaker: 'TÀI KHOẢN TỰ XƯNG NGƯỜI QUEN', text: 'Bạn có muốn chơi cùng đội vào cuối tuần không?', clue: false, note: 'Lời mời chơi chung tự nó chưa phải dấu hiệu xâm hại; hãy xem xét các yêu cầu đi kèm.' }
        ],
        response: [
          'Gửi địa chỉ trường để người đó chứng minh rằng họ thật sự biết người thân của bạn.',
          'Đến điểm hẹn một mình để xác minh danh tính trực tiếp.',
          'Không chia sẻ lịch trình hoặc địa chỉ, không gặp riêng; tự xác minh với người thân và tìm người lớn hỗ trợ.'
        ], correctResponse: 2,
        lesson: 'Tên và ảnh đại diện trên mạng có thể không phản ánh danh tính thật. Đừng chỉ hỏi “người này là ai?”; hãy chú ý họ đang yêu cầu bạn làm gì. Không cung cấp thông tin riêng tư, không gặp riêng và hãy xác minh qua người thân hoặc người lớn đáng tin.'
      },
      {
        title: 'MỘT LẦN CHIA SẺ CÓ THỂ LÀM TỔN THƯƠNG LAN XA', context: 'Trong nhóm chat, một bạn cùng lớp đang bị chế giễu.', clueCount: 3,
        messages: [
          { speaker: 'THÀNH VIÊN NHÓM', text: 'Có người vừa gửi ảnh chế về bạn ấy vào nhóm.', clue: false, note: 'Đây là thông tin về sự việc; hãy quan sát những hành vi tiếp theo.' },
          { speaker: 'THÀNH VIÊN NHÓM', text: 'Chuyển tiếp sang nhóm lớp khác cho nhiều người xem đi.', clue: true, note: 'Kêu gọi chuyển tiếp sẽ khiến nội dung gây tổn thương lan rộng hơn.' },
          { speaker: 'THÀNH VIÊN NHÓM', text: 'Bình luận thêm cho vui, ai cũng đang cười mà.', clue: true, note: 'Cổ vũ bình luận hùa theo có thể làm người bị nhắm tới tổn thương thêm.' },
          { speaker: 'THÀNH VIÊN NHÓM', text: 'Bạn ấy bị đem ra chế giễu nhiều lần và bị loại khỏi nhóm.', clue: true, note: 'Việc liên tục nhắm tới, làm nhục hoặc cô lập một người không còn là trò đùa vô hại.' },
          { speaker: 'THÀNH VIÊN NHÓM', text: 'Tớ thấy chuyện này không ổn, không biết nên giúp thế nào.', clue: false, note: 'Đây là lời bày tỏ lo lắng; có thể bắt đầu bằng việc không lan truyền và tìm hỗ trợ.' }
        ],
        response: [
          'Không chuyển tiếp, không bình luận hùa theo; giữ thông tin cần thiết nếu cần báo cáo và cùng tìm người lớn hỗ trợ bạn ấy.',
          'Đăng lại ảnh để “cảnh báo” nhiều người hơn, kèm tên bạn bị nhắm tới.',
          'Im lặng và cười theo để tránh bị cả nhóm công kích.'
        ], correctResponse: 0,
        lesson: 'Bắt nạt trực tuyến không chỉ nằm ở người tạo nội dung. Người chứng kiến cũng có thể khiến sự việc dừng lại hoặc lan rộng. Đừng chuyển tiếp, đăng lại hay bình luận hùa theo; hãy tìm người lớn và hỗ trợ người bị tổn thương.'
      }
    ];
    let caseIndex = 0, phase = 'scan', selected = new Set(), elapsed = 0, feedback = '', feedbackTime = 0, mistakes = 0;
    const state = {
      score: 0, level: 1, time: 0, hudTime: '00:00', status: 'HỒ SƠ 1/3 · TÌM DẤU HIỆU', done: false, won: false, summary: '',
      current() { return cases[caseIndex]; },
      setupCase() {
        phase = 'scan'; selected = new Set(); feedback = ''; feedbackTime = 0; mistakes = 0;
        this.level = caseIndex + 1; this.status = `HỒ SƠ ${caseIndex + 1}/3 · TÌM ${this.current().clueCount} DẤU HIỆU`;
        showLearning({ kicker: `ĐIỀU TRA HỒ SƠ ${caseIndex + 1}/3`, title: 'Đọc hành vi, không đoán danh tính', text: 'Chọn những tin nhắn thể hiện yêu cầu vượt ranh giới, ép buộc, giữ bí mật, hỏi thông tin riêng tư hoặc tiếp tay gây tổn thương.', tags: ['ĐÁNH DẤU MANH MỐI','KIỂM TRA TOÀN BỘ CUỘC TRÒ CHUYỆN'], current: `HỒ SƠ ${caseIndex + 1}/3` });
      },
      submitClues() {
        const item = this.current(); const expected = item.messages.map((m, i) => m.clue ? i : -1).filter((i) => i >= 0);
        const missing = expected.filter((i) => !selected.has(i));
        const extra = [...selected].filter((i) => !expected.includes(i));
        if (missing.length || extra.length) {
          mistakes++;
          this.score = Math.max(0, this.score - 20);
          feedback = extra.length ? 'Có tin nhắn bạn đánh dấu chưa phải dấu hiệu rõ ràng. Hãy xem xét cả ngữ cảnh và hành vi đi kèm.' : 'Bạn còn bỏ sót manh mối. Hãy đọc lại các yêu cầu về bí mật, thông tin cá nhân, gặp riêng hoặc phát tán nội dung.';
          feedbackTime = 3.5; this.status = 'HỒ SƠ CHƯA ĐỦ DỮ KIỆN'; return;
        }
        this.score += 160; phase = 'respond'; this.status = 'ĐÃ TÌM ĐỦ MANH MỐI · CHỌN CÁCH XỬ LÝ';
        showLearning({ kicker: 'ĐÃ KHOANH VÙNG ĐƯỢC DẤU HIỆU', title: 'Bây giờ hãy chọn cách ứng phó', text: 'Nhận ra điều không ổn là bước đầu. Tiếp theo, hãy chọn cách giữ an toàn cho mình hoặc hỗ trợ người đang bị tổn thương.', tags: ['SUY LUẬN TỪ NGỮ CẢNH','CHỌN HÀNH ĐỘNG AN TOÀN'], current: `HỒ SƠ ${caseIndex + 1}/3 · +160 ĐIỂM` });
      },
      chooseResponse(index) {
        const item = this.current();
        if (index !== item.correctResponse) {
          mistakes++; this.score = Math.max(0, this.score - 35);
          feedback = 'Phương án này có thể làm lộ thêm thông tin, khiến nội dung lan rộng hoặc để bạn phải tự xử lý. Hãy chọn phương án bảo vệ an toàn và tìm hỗ trợ.';
          feedbackTime = 4; this.status = 'CÁCH XỬ LÝ CHƯA AN TOÀN'; return;
        }
        this.score += Math.max(120, 260 - mistakes * 35); phase = 'debrief'; this.status = 'ĐÃ XỬ LÝ HỒ SƠ';
        showLearning({ kicker: `HỒ SƠ ${caseIndex + 1}/3 · GIẢI MÃ THÀNH CÔNG`, title: 'Điều cần ghi nhớ', text: item.lesson, tags: ['NHẬN DIỆN','DỪNG KHI CẦN','TÌM NGƯỜI HỖ TRỢ'], current: `ĐÃ HOÀN THÀNH HỒ SƠ ${caseIndex + 1}/3` });
      },
      nextCase() {
        if (caseIndex < cases.length - 1) { caseIndex++; this.setupCase(); }
        else { this.done = true; this.won = true; this.score += 350; this.summary = `Bạn đã điều tra đủ ${cases.length} hồ sơ và thực hành chọn phương án ứng phó.`; }
      },
      update(dt) { elapsed += dt; this.time = elapsed; this.hudTime = formatTime(elapsed); feedbackTime = Math.max(0, feedbackTime - dt); },
      pointer(x, y) {
        if (phase === 'scan') {
          for (let i = 0; i < this.current().messages.length; i++) {
            const bx = 28, by = 119 + i * 66, bw = 625, bh = 55;
            if (x >= bx && x <= bx + bw && y >= by && y <= by + bh) {
              if (selected.has(i)) selected.delete(i); else selected.add(i);
              this.status = `ĐÃ ĐÁNH DẤU ${selected.size}/${this.current().clueCount} MANH MỐI`; feedback = ''; feedbackTime = 0; return;
            }
          }
          if (x >= 684 && x <= 932 && y >= 445 && y <= 509) this.submitClues();
        } else if (phase === 'respond') {
          for (let i = 0; i < this.current().response.length; i++) {
            const by = 150 + i * 105;
            if (x >= 52 && x <= 908 && y >= by && y <= by + 84) { this.chooseResponse(i); return; }
          }
        } else if (phase === 'debrief' && x >= 330 && x <= 630 && y >= 445 && y <= 510) this.nextCase();
      },
      draw(c) {
        drawBackdrop(c, elapsed * .12, '#160b50', '#3f1bac');
        const item = this.current();
        drawPill(c, `CHAT INVESTIGATION / HỒ SƠ ${caseIndex + 1} OF 3`, 24, 18);
        if (phase === 'scan') {
          roundedRect(c, 28, 58, 625, 48, 12, '#ffffff18', '#ffffff35');
          c.textAlign = 'left'; c.fillStyle = '#ffe16a'; c.font = '900 9px "Be Vietnam Pro", sans-serif'; c.fillText(item.title, 44, 77);
          c.fillStyle = '#eee8ff'; c.font = '600 10px "Be Vietnam Pro", sans-serif'; c.fillText(item.context, 44, 94);
          item.messages.forEach((m, i) => {
            const bx = 28, by = 119 + i * 66, chosen = selected.has(i);
            roundedRect(c, bx, by, 625, 55, 11, chosen ? '#ffe16a' : (i % 2 ? '#ffffffef' : '#ece8ff'), chosen ? '#fff4b2' : '#cfc5f3');
            c.fillStyle = chosen ? '#4a2d00' : '#6f5ab0'; c.font = '900 7px "Be Vietnam Pro", sans-serif'; c.textAlign = 'left'; c.fillText(m.speaker, bx + 13, by + 15);
            c.fillStyle = '#21164a'; c.font = '700 11px "Be Vietnam Pro", sans-serif'; wrapText(c, m.text, bx + 13, by + 34, 590, 14, 2);
            c.fillStyle = chosen ? '#5d3a00' : '#9a91b7'; c.font = '900 8px "Be Vietnam Pro", sans-serif'; c.textAlign = 'right'; c.fillText(chosen ? '✓ ĐÃ ĐÁNH DẤU' : 'CHẠM ĐỂ ĐÁNH DẤU', bx + 610, by + 16);
          });
          roundedRect(c, 676, 75, 256, 350, 17, '#20115f', '#8068cd');
          c.textAlign = 'left'; c.fillStyle = '#ffe16a'; c.font = '900 10px "Be Vietnam Pro", sans-serif'; c.fillText('BẢNG MANH MỐI', 696, 103);
          c.fillStyle = '#ffffff'; c.font = '900 34px "Be Vietnam Pro", sans-serif'; c.fillText(`${selected.size}/${item.clueCount}`, 696, 150);
          c.fillStyle = '#c9bff3'; c.font = '700 9px "Be Vietnam Pro", sans-serif'; c.fillText('TIN NHẮN ĐƯỢC CHỌN', 696, 171);
          for (let i = 0; i < item.clueCount; i++) {
            roundedRect(c, 696, 193 + i * 42, 214, 31, 8, i < selected.size ? '#ffe16a' : '#ffffff14', i < selected.size ? '#ffe16a' : '#ffffff28');
            c.fillStyle = i < selected.size ? '#392164' : '#cfc6f5'; c.font = '800 9px "Be Vietnam Pro", sans-serif'; c.fillText(i < selected.size ? `MANH MỐI ${i + 1} ✓` : `Ô TRỐNG ${i + 1}`, 709, 213 + i * 42);
          }
          c.fillStyle = '#e4dcff'; c.font = '600 9px "Be Vietnam Pro", sans-serif'; wrapText(c, 'Hãy chú ý hành vi và yêu cầu đi kèm, không chỉ dựa vào tên hoặc ảnh đại diện.', 696, 345, 210, 17, 4);
          roundedRect(c, 684, 445, 248, 62, 13, '#ffdf52', '#fff0a8');
          c.fillStyle = '#28115f'; c.font = '900 11px "Be Vietnam Pro", sans-serif'; c.textAlign = 'center'; c.fillText('KIỂM TRA HỒ SƠ  ↗', 808, 482);
          if (feedbackTime > 0) { roundedRect(c, 30, 468, 625, 43, 9, '#ff587566'); c.fillStyle = '#fff'; c.font = '700 9px "Be Vietnam Pro", sans-serif'; c.textAlign = 'left'; wrapText(c, feedback, 43, 485, 595, 12, 2); }
        } else if (phase === 'respond') {
          roundedRect(c, 30, 66, 900, 64, 14, '#ffffff18', '#ffffff38');
          c.fillStyle = '#ffe16a'; c.font = '900 11px "Be Vietnam Pro", sans-serif'; c.textAlign = 'left'; c.fillText('HỒ SƠ ĐÃ ĐƯỢC PHÂN TÍCH', 52, 91);
          c.fillStyle = '#fff'; c.font = '700 12px "Be Vietnam Pro", sans-serif'; c.fillText('Bạn sẽ làm gì tiếp theo?', 52, 113);
          item.response.forEach((answer, i) => {
            const by = 150 + i * 105;
            roundedRect(c, 52, by, 856, 84, 14, '#f6f2ff', '#d8cef5');
            c.fillStyle = '#7b63bd'; c.font = '900 10px "Be Vietnam Pro", sans-serif'; c.fillText(`PHƯƠNG ÁN ${String.fromCharCode(65 + i)}`, 72, by + 22);
            c.fillStyle = '#24174d'; c.font = '700 12px "Be Vietnam Pro", sans-serif'; wrapText(c, answer, 72, by + 44, 810, 17, 2);
          });
          if (feedbackTime > 0) { roundedRect(c, 80, 472, 800, 42, 10, '#ff5875'); c.fillStyle = '#fff'; c.font = '700 10px "Be Vietnam Pro", sans-serif'; c.textAlign = 'center'; wrapText(c, feedback, 100, 488, 760, 13, 2); }
        } else {
          roundedRect(c, 82, 65, 796, 375, 20, '#f7f3ff', '#fff');
          c.textAlign = 'center'; c.fillStyle = '#6e53bf'; c.font = '900 10px "Be Vietnam Pro", sans-serif'; c.fillText(`CASE CLEARED · ${caseIndex + 1}/3`, W / 2, 100);
          c.fillStyle = '#26105f'; c.font = '900 24px "Be Vietnam Pro", sans-serif'; wrapText(c, 'BẠN ĐÃ ĐỌC ĐÚNG DẤU HIỆU', W / 2, 145, 680, 31, 2);
          c.textAlign = 'left'; c.fillStyle = '#3b3159'; c.font = '600 13px "Be Vietnam Pro", sans-serif'; wrapText(c, item.lesson, 135, 225, 690, 23, 6);
          roundedRect(c, 330, 445, 300, 62, 13, '#ffdf52', '#fff0a8'); c.fillStyle = '#28115f'; c.textAlign = 'center'; c.font = '900 11px "Be Vietnam Pro", sans-serif'; c.fillText(caseIndex === 2 ? 'HOÀN TẤT ĐIỀU TRA  ✓' : 'HỒ SƠ TIẾP THEO  ↗', 480, 482);
        }
        c.fillStyle = '#e2d9ff'; c.font = '800 8px "Be Vietnam Pro", sans-serif'; c.textAlign = 'center'; c.fillText('NHÌN VÀO HÀNH VI · TÔN TRỌNG RANH GIỚI · TÌM HỖ TRỢ KHI CẦN', W / 2, 530);
      }
    };
    state.setupCase(); return state;
  }

  // GAME 03 — publication studio: redact private details, pause for the 5-second check, repair harm.
  function createStudioGame() {
    const cases = [
      {
        type: 'edit', title: 'ẢNH NHÓM SAU BUỔI HOẠT ĐỘNG',
        brief: 'Bạn muốn đăng một bức ảnh nhóm. Có một người chưa được hỏi ý kiến; tên trường và vị trí hiện tại cũng đang hiển thị.',
        items: [
          { label: 'KHUÔN MẶT BẠN CHƯA ĐỒNG Ý', note: 'Ẩn khuôn mặt khi chưa có sự đồng ý.', sensitive: true },
          { label: 'BẢNG TÊN TRƯỜNG', note: 'Che chi tiết có thể nhận diện nơi học.', sensitive: true },
          { label: 'VỊ TRÍ ĐANG GẮN', note: 'Gỡ vị trí có thể tiết lộ nơi bạn đang ở.', sensitive: true },
          { label: 'ÁNH SÁNG / KHUNG CẢNH', note: 'Không nhận diện cá nhân trong tình huống này.', sensitive: false }
        ],
        lesson: 'Trước khi đăng ảnh, hãy kiểm tra sự đồng ý và các chi tiết nhận diện. Che khuôn mặt khi người trong ảnh chưa đồng ý, che tên trường và gỡ vị trí nếu chúng làm lộ thông tin riêng tư. Nếu vẫn chưa chắc, đừng đăng.'
      },
      {
        type: 'private', title: 'ẢNH CHỤP MÀN HÌNH TIN NHẮN RIÊNG',
        brief: 'Một người bạn gửi tin nhắn riêng để nhờ bạn giúp đỡ. Bạn định đăng ảnh chụp màn hình lên trang cá nhân để hỏi ý kiến mọi người.',
        lesson: 'Được gửi cho bạn không có nghĩa là bạn được tự do chia sẻ. Tin nhắn riêng, câu chuyện hoặc bí mật một người chỉ kể cho bạn cần được tôn trọng. Che tên không biến một cuộc trò chuyện riêng thành nội dung công khai; nếu chưa có sự đồng ý, hãy hủy bài đăng.'
      },
      {
        type: 'repair', title: 'BẠN NHẬN RA BÀI ĐĂNG ĐÃ GÂY TỔN THƯƠNG',
        brief: 'Bạn đã đăng một ảnh chế khiến người khác buồn. Bạn nhận ra mình sai và cần chọn trình tự khắc phục.',
        actions: [
          { label: 'DỪNG bình luận, chia sẻ và lan truyền thêm', id: 'stop' },
          { label: 'GỠ nội dung nếu có thể', id: 'remove' },
          { label: 'XIN LỖI người bị ảnh hưởng, không biện minh hay đổ lỗi', id: 'apologize' },
          { label: 'TÌM người có trách nhiệm hỗ trợ nếu sự việc đã gây hại hoặc bạn chưa biết cách khắc phục', id: 'help' }
        ],
        lesson: 'Nhận ra mình sai là điểm bắt đầu để sửa. Hãy dừng việc lan truyền, gỡ nội dung nếu có thể, xin lỗi người bị ảnh hưởng mà không biện minh hay đổ lỗi. Nếu sự việc đã gây tổn hại hoặc bạn không biết xử lý, hãy tìm người có trách nhiệm cùng khắc phục.'
      }
    ];
    let caseIndex = 0, phase = 'edit', hidden = new Set(), pauseLeft = 0, elapsed = 0, repairIndex = 0, feedback = '', feedbackTime = 0, mistakes = 0;
    const repairOrder = ['stop', 'remove', 'apologize', 'help'];
    const state = {
      score: 0, level: 1, time: 0, hudTime: '00:00', status: 'BẢN NHÁP 1/3', done: false, won: false, summary: '',
      current() { return cases[caseIndex]; },
      setupCase() {
        const item = this.current(); phase = item.type === 'edit' ? 'edit' : item.type === 'private' ? 'private' : 'repair';
        hidden = new Set(); pauseLeft = 0; repairIndex = 0; feedback = ''; feedbackTime = 0; mistakes = 0;
        this.level = caseIndex + 1; this.status = `BẢN NHÁP ${caseIndex + 1}/3 · ${phase === 'repair' ? 'KHẮC PHỤC' : 'KIỂM TRA'}`;
        showLearning({ kicker: `STUDIO 5 GIÂY · TÌNH HUỐNG ${caseIndex + 1}/3`, title: 'Trước khi đăng, hãy nghĩ về người khác', text: item.brief, tags: ['QUYỀN RIÊNG TƯ','SỰ ĐỒNG Ý','TRÁCH NHIỆM KHI ĐĂNG'], current: `TÌNH HUỐNG ${caseIndex + 1}/3` });
      },
      finishCase(message) {
        phase = 'debrief'; this.status = 'ĐÃ XỬ LÝ BẢN NHÁP';
        showLearning({ kicker: `STUDIO 5 GIÂY · ${caseIndex + 1}/3`, title: 'Điều cần ghi nhớ', text: message || this.current().lesson, tags: ['DỪNG 5 GIÂY','TÔN TRỌNG SỰ ĐỒNG Ý','KHÔNG LAN TRUYỀN'], current: `ĐÃ HOÀN THÀNH ${caseIndex + 1}/3` });
      },
      nextCase() {
        if (caseIndex < cases.length - 1) { caseIndex++; this.setupCase(); }
        else { this.done = true; this.won = true; this.score += 350; this.summary = 'Bạn đã xử lý một bản nháp có dữ liệu riêng tư, quyết định không đăng tin nhắn riêng và thực hành sửa sai.'; }
      },
      update(dt) {
        elapsed += dt; this.time = elapsed; this.hudTime = formatTime(elapsed); feedbackTime = Math.max(0, feedbackTime - dt);
        if (phase === 'pause') { pauseLeft = Math.max(0, pauseLeft - dt); if (pauseLeft <= 0) { phase = 'publish'; this.status = 'ĐÃ DỪNG 5 GIÂY · KIỂM TRA LẦN CUỐI'; } }
      },
      pointer(x, y) {
        const item = this.current();
        if (phase === 'edit') {
          item.items.forEach((detail, i) => {
            const bx = 648, by = 137 + i * 69;
            if (x >= bx && x <= 930 && y >= by && y <= by + 55) {
              if (detail.sensitive) { if (hidden.has(i)) hidden.delete(i); else hidden.add(i); feedback = detail.note; feedbackTime = 2.8; }
              else { feedback = 'Chi tiết này không nhận diện cá nhân trong tình huống hiện tại. Bạn không cần che mọi thứ một cách máy móc; hãy đánh giá đúng dữ kiện.'; feedbackTime = 3.2; }
              return;
            }
          });
          if (x >= 660 && x <= 930 && y >= 432 && y <= 500) {
            const missing = item.items.some((d, i) => d.sensitive && !hidden.has(i));
            if (missing) { feedback = 'Vẫn còn chi tiết riêng tư hoặc chưa có sự đồng ý. Hãy ẩn chúng trước khi tiếp tục.'; feedbackTime = 3.5; this.status = 'CÒN CHI TIẾT CẦN ẨN'; }
            else { phase = 'pause'; pauseLeft = 5; this.status = 'TẠM DỪNG 5 GIÂY'; this.score += 150; }
          }
        } else if (phase === 'publish') {
          if (x >= 70 && x <= 470 && y >= 425 && y <= 505) { this.score += 220; this.finishCase('Bạn đã ẩn các chi tiết riêng tư và dành 5 giây để tự hỏi: có làm lộ thông tin của ai không, người trong nội dung có đồng ý không, và nếu là mình thì có muốn nội dung ấy được chia sẻ không.'); }
          else if (x >= 500 && x <= 900 && y >= 425 && y <= 505) { this.score += 180; this.finishCase('Nếu chưa chắc, không đăng là lựa chọn an toàn. Bạn có thể dừng lại thay vì cố đăng một nội dung khiến người khác không thoải mái.'); }
        } else if (phase === 'private') {
          if (x >= 65 && x <= 470 && y >= 390 && y <= 485) { mistakes++; this.score = Math.max(0, this.score - 50); feedback = 'Che tên chưa đủ. Nội dung cuộc trò chuyện vẫn là thông tin riêng tư được gửi cho bạn trong ngữ cảnh riêng.'; feedbackTime = 4; this.status = 'CHƯA TÔN TRỌNG QUYỀN RIÊNG TƯ'; }
          else if (x >= 500 && x <= 900 && y >= 390 && y <= 485) { this.score += 300; this.finishCase(); }
        } else if (phase === 'repair') {
          for (let i = 0; i < item.actions.length; i++) {
            const bx = 80, by = 160 + i * 72;
            if (x >= bx && x <= 880 && y >= by && y <= by + 58) {
              if (item.actions[i].id === repairOrder[repairIndex]) { repairIndex++; this.score += 90; this.status = `KHẮC PHỤC ${repairIndex}/4`; if (repairIndex === repairOrder.length) { this.score += 220; this.finishCase(); } }
              else { mistakes++; this.score = Math.max(0, this.score - 25); feedback = 'Thứ tự này có thể khiến nội dung tiếp tục lan rộng. Hãy bắt đầu bằng việc dừng tương tác và ngăn việc chia sẻ thêm.'; feedbackTime = 3.2; }
              return;
            }
          }
        } else if (phase === 'debrief' && x >= 330 && x <= 630 && y >= 445 && y <= 510) this.nextCase();
      },
      draw(c) {
        drawBackdrop(c, elapsed * .10, '#20104d', '#5723a8'); const item = this.current();
        drawPill(c, `PUBLISH LAB / CASE ${caseIndex + 1} OF 3`, 24, 18);
        if (phase === 'edit' || phase === 'pause') {
          roundedRect(c, 28, 65, 588, 420, 18, '#f8f6ff', '#ffffff');
          c.fillStyle = '#6b53b3'; c.font = '900 10px "Be Vietnam Pro", sans-serif'; c.textAlign = 'left'; c.fillText('BẢN XEM TRƯỚC BÀI ĐĂNG', 52, 92);
          roundedRect(c, 50, 112, 544, 300, 13, '#ded9f1', '#c6b8e9');
          const g = c.createLinearGradient(50, 112, 594, 412); g.addColorStop(0, '#b2a8ed'); g.addColorStop(.55, '#ffcaad'); g.addColorStop(1, '#9ec9d4');
          roundedRect(c, 61, 123, 522, 278, 10, g);
          c.fillStyle = '#fff6'; c.beginPath(); c.arc(175, 205, 42, 0, Math.PI * 2); c.fill(); c.beginPath(); c.arc(283, 218, 35, 0, Math.PI * 2); c.fill(); c.beginPath(); c.arc(390, 203, 43, 0, Math.PI * 2); c.fill();
          c.fillStyle = '#4b327a'; c.font = '900 10px "Be Vietnam Pro", sans-serif'; c.fillText('ẢNH NHÓM · BẢN DEMO', 80, 380);
          c.fillStyle = '#3a3155'; c.font = '600 9px "Be Vietnam Pro", sans-serif'; wrapText(c, item.brief, 50, 440, 540, 13, 3);
          roundedRect(c, 634, 65, 298, 420, 17, '#21115e', '#816ccf');
          c.fillStyle = '#ffe16a'; c.font = '900 10px "Be Vietnam Pro", sans-serif'; c.fillText('CHI TIẾT TRONG BẢN NHÁP', 654, 94);
          item.items.forEach((detail, i) => {
            const by = 137 + i * 69, isHidden = hidden.has(i);
            roundedRect(c, 650, by, 266, 55, 10, isHidden ? '#baf5db' : '#ffffff18', isHidden ? '#baf5db' : '#ffffff40');
            c.fillStyle = isHidden ? '#174a3a' : '#fff'; c.font = '900 8px "Be Vietnam Pro", sans-serif'; c.textAlign = 'left'; wrapText(c, detail.label, 663, by + 17, 238, 12, 2);
            c.fillStyle = isHidden ? '#176247' : (detail.sensitive ? '#ffb0bd' : '#d7d0ef'); c.font = '900 8px "Be Vietnam Pro", sans-serif'; c.textAlign = 'right'; c.fillText(isHidden ? 'ĐÃ ẨN ✓' : detail.sensitive ? 'CHẠM ĐỂ ẨN' : 'CÓ THỂ GIỮ', 901, by + 43);
          });
          roundedRect(c, 660, 432, 270, 58, 12, '#ffdf52', '#fff0ae'); c.fillStyle = '#28115f'; c.textAlign = 'center'; c.font = '900 10px "Be Vietnam Pro", sans-serif'; c.fillText(phase === 'pause' ? `DỪNG LẠI · ${Math.ceil(pauseLeft)} GIÂY` : 'DỪNG 5 GIÂY ĐỂ KIỂM TRA', 795, 467);
        } else if (phase === 'publish') {
          roundedRect(c, 54, 62, 852, 340, 18, '#f8f6ff', '#fff');
          c.fillStyle = '#6b53b3'; c.textAlign = 'center'; c.font = '900 11px "Be Vietnam Pro", sans-serif'; c.fillText('5 GIÂY TRƯỚC KHI BẤM “ĐĂNG”', W / 2, 95);
          const qs = ['Mình có đang làm lộ điều riêng tư của ai không?', 'Người trong nội dung có đồng ý không?', 'Nếu nội dung này nói về mình, mình có muốn nó được chia sẻ không?'];
          qs.forEach((q, i) => { roundedRect(c, 112, 122 + i * 78, 736, 60, 11, '#ece7fb', '#d3c8f0'); c.fillStyle = '#7b61c2'; c.font = '900 10px "Be Vietnam Pro", sans-serif'; c.textAlign = 'left'; c.fillText(`0${i + 1}`, 132, 158 + i * 78); c.fillStyle = '#2b204b'; c.font = '700 13px "Be Vietnam Pro", sans-serif'; c.fillText(q, 175, 158 + i * 78); });
          roundedRect(c, 70, 425, 400, 76, 13, '#a9f0d0', '#eafff7'); c.fillStyle = '#14533c'; c.textAlign = 'center'; c.font = '900 11px "Be Vietnam Pro", sans-serif'; c.fillText('ĐĂNG BẢN ĐÃ CHỈNH SỬA', 270, 468);
          roundedRect(c, 500, 425, 400, 76, 13, '#ffdf52', '#fff0a8'); c.fillStyle = '#28115f'; c.fillText('HỦY BẢN NHÁP', 700, 468);
        } else if (phase === 'private') {
          roundedRect(c, 50, 70, 570, 405, 17, '#f7f4ff', '#fff');
          c.fillStyle = '#7058b8'; c.font = '900 10px "Be Vietnam Pro", sans-serif'; c.textAlign = 'left'; c.fillText('ẢNH CHỤP MÀN HÌNH · ĐOẠN CHAT RIÊNG', 75, 101);
          roundedRect(c, 78, 125, 505, 82, 14, '#e4def4'); c.fillStyle = '#2e2250'; c.font = '700 12px "Be Vietnam Pro", sans-serif'; wrapText(c, '“Tớ đang gặp chuyện không ổn, cậu có thể nghe tớ nói một chút không?”', 98, 157, 460, 18, 3);
          roundedRect(c, 155, 231, 420, 95, 14, '#d8f5e8'); c.fillStyle = '#204e3f'; wrapText(c, '“Ừ, tớ sẽ lắng nghe. Cậu không cần kể hết ngay.”', 175, 264, 380, 18, 3);
          roundedRect(c, 78, 349, 505, 76, 12, '#eee9f9'); c.fillStyle = '#6d5c95'; c.font = '700 10px "Be Vietnam Pro", sans-serif'; wrapText(c, 'Đây là cuộc trò chuyện riêng được gửi để nhờ hỗ trợ, không phải nội dung được phép đăng công khai.', 98, 376, 460, 15, 3);
          roundedRect(c, 650, 70, 280, 405, 17, '#21115e', '#816ccf'); c.fillStyle = '#ffe16a'; c.font = '900 11px "Be Vietnam Pro", sans-serif'; c.fillText('BẠN LÀ NGƯỜI NHẬN TIN', 674, 105);
          c.fillStyle = '#fff'; c.font = '700 12px "Be Vietnam Pro", sans-serif'; wrapText(c, 'Bạn có quyền chia sẻ đoạn chat này chỉ vì nó đã được gửi cho bạn không?', 674, 146, 232, 22, 5);
          c.fillStyle = '#d6cef4'; c.font = '600 9px "Be Vietnam Pro", sans-serif'; wrapText(c, 'Hãy phân biệt việc lưu thông tin cần thiết để nhờ hỗ trợ với việc đăng lại cuộc trò chuyện riêng.', 674, 270, 230, 16, 5);
          roundedRect(c, 65, 390, 405, 95, 13, '#ff9aaa', '#ffdce3'); c.fillStyle = '#642339'; c.textAlign = 'center'; c.font = '900 10px "Be Vietnam Pro", sans-serif'; c.fillText('CHE TÊN RỒI ĐĂNG', 267, 438);
          roundedRect(c, 500, 390, 400, 95, 13, '#ffdf52', '#fff0a8'); c.fillStyle = '#28115f'; c.fillText('HỦY BẢN NHÁP', 700, 438);
        } else if (phase === 'repair') {
          roundedRect(c, 50, 68, 860, 78, 14, '#ffffff1d', '#ffffff44');
          c.fillStyle = '#ffe16a'; c.textAlign = 'left'; c.font = '900 10px "Be Vietnam Pro", sans-serif'; c.fillText('BÀI ĐĂNG ĐÃ GÂY TỔN THƯƠNG · CHỌN TRÌNH TỰ KHẮC PHỤC', 74, 98);
          c.fillStyle = '#f3edff'; c.font = '700 11px "Be Vietnam Pro", sans-serif'; wrapText(c, item.brief, 74, 122, 810, 15, 2);
          const order = [2, 0, 3, 1];
          order.forEach((idx, slot) => {
            const action = item.actions[idx], by = 160 + slot * 72, done = repairOrder.indexOf(action.id) < repairIndex;
            roundedRect(c, 80, by, 800, 58, 12, done ? '#baf5db' : '#f5f1ff', done ? '#eafff4' : '#d8cef5');
            c.fillStyle = done ? '#176247' : '#7058b8'; c.textAlign = 'left'; c.font = '900 9px "Be Vietnam Pro", sans-serif'; c.fillText(done ? '✓ ĐÃ THỰC HIỆN' : `THAO TÁC ${slot + 1}`, 100, by + 21);
            c.fillStyle = '#24184a'; c.font = '700 11px "Be Vietnam Pro", sans-serif'; wrapText(c, action.label, 236, by + 23, 615, 14, 2);
          });
          c.fillStyle = '#ffe16a'; c.textAlign = 'center'; c.font = '900 10px "Be Vietnam Pro", sans-serif'; c.fillText(`TIẾN ĐỘ KHẮC PHỤC ${repairIndex}/4`, W / 2, 480);
        } else {
          roundedRect(c, 82, 65, 796, 375, 20, '#f7f3ff', '#fff'); c.textAlign = 'center'; c.fillStyle = '#6e53bf'; c.font = '900 10px "Be Vietnam Pro", sans-serif'; c.fillText(`PUBLISH LAB · ${caseIndex + 1}/3`, W / 2, 100);
          c.fillStyle = '#26105f'; c.font = '900 24px "Be Vietnam Pro", sans-serif'; c.fillText('BẠN ĐÃ CHỌN CÓ TRÁCH NHIỆM', W / 2, 145);
          c.textAlign = 'left'; c.fillStyle = '#3b3159'; c.font = '600 13px "Be Vietnam Pro", sans-serif'; wrapText(c, item.lesson, 135, 205, 690, 22, 7);
          roundedRect(c, 330, 445, 300, 62, 13, '#ffdf52', '#fff0a8'); c.fillStyle = '#28115f'; c.textAlign = 'center'; c.font = '900 11px "Be Vietnam Pro", sans-serif'; c.fillText(caseIndex === 2 ? 'HOÀN TẤT PHÒNG BIÊN TẬP ✓' : 'TÌNH HUỐNG TIẾP THEO ↗', 480, 482);
        }
        if (feedbackTime > 0 && phase !== 'debrief') { roundedRect(c, 30, 500, 900, 30, 8, '#ff5875'); c.fillStyle = '#fff'; c.textAlign = 'center'; c.font = '700 8px "Be Vietnam Pro", sans-serif'; c.fillText(feedback, 45, 519, 870); }
      }
    };
    state.setupCase(); return state;
  }

  // GAME 04 — support network: practise listening without blame and connecting real support.
  function createSupportGame() {
    const cases = [
      {
        title: 'BẠN NHẮN: “TỚ SỢ, ĐỪNG KỂ AI NHÉ”', message: '“Một người quen qua game hỏi trường của tớ, muốn chuyển sang nhắn riêng và bảo phải giữ bí mật. Tớ thấy sợ.”',
        replies: [
          'Sao cậu lại tin người đó? Cậu phải tự biết chứ.',
          'Tớ tin cậu và sẵn sàng lắng nghe. Mình không lan truyền chuyện này; cùng tìm một người lớn cậu tin để được hỗ trợ nhé.',
          'Tớ hứa sẽ giữ bí mật tuyệt đối, dù có chuyện gì cũng không nói với ai.'
        ], correct: 1,
        lesson: 'Lắng nghe trước khi tìm cách giải quyết. Tôn trọng riêng tư không có nghĩa là giữ kín một chuyện đang đe dọa sự an toàn. Hãy cùng bạn tìm người có thể hỗ trợ; bạn không cần trở thành người tự giải quyết vấn đề.'
      },
      {
        title: 'BẠN BỊ CHẾ GIỄU TRONG NHÓM CHAT', message: '“Mọi người đang gửi ảnh chế về tớ sang các nhóm khác. Tớ không muốn đến lớp nữa.”',
        replies: [
          'Tớ nghe cậu. Cậu không đáng bị chế giễu. Mình không chia sẻ tiếp và cùng tìm thầy cô hoặc người lớn để giúp nhé.',
          'Gửi ảnh cho tớ để tớ đăng lại, như vậy mọi người sẽ biết chuyện.',
          'Cứ bỏ qua đi, chắc chỉ là đùa thôi.'
        ], correct: 0,
        lesson: 'Người đang bị công kích cần được tin tưởng và lắng nghe, không bị trách móc hoặc xem nhẹ. Đừng bình luận hùa theo hay chuyển tiếp nội dung; hãy giúp bạn tìm người lớn, thầy cô hoặc kênh báo cáo phù hợp.'
      },
      {
        title: 'NGƯỜI ĐẦU TIÊN CHƯA LẮNG NGHE', message: '“Tớ đã kể với một người lớn nhưng họ bảo tớ tự giải quyết. Có lẽ không ai giúp được đâu.”',
        replies: [
          'Nếu người đầu tiên chưa lắng nghe, điều đó không có nghĩa cậu không được giúp. Mình tìm một người lớn khác hoặc gọi 111 nhé.',
          'Vậy thì đừng kể với ai nữa, càng nói càng rắc rối.',
          'Cậu phải kể hết mọi chi tiết ngay thì người khác mới tin.'
        ], correct: 0,
        lesson: 'Nếu người đầu tiên bạn tìm đến chưa lắng nghe hoặc chưa hiểu, hãy tìm một người khác. Bạn không cần kể hết mọi chuyện mới có thể bắt đầu nhận hỗ trợ. Tổng đài 111 miễn phí, hoạt động 24 giờ mỗi ngày.'
      }
    ];
    const contacts = [
      { title: 'CHA MẸ / NGƯỜI THÂN', sub: 'Một người thân khiến bạn cảm thấy an toàn', kind: 'adult' },
      { title: 'THẦY CÔ / TƯ VẤN', sub: 'Giáo viên hoặc tư vấn học đường', kind: 'adult' },
      { title: 'NGƯỜI CHĂM SÓC', sub: 'Một người lớn đáng tin khác', kind: 'adult' },
      { title: 'BẠN BÈ TIN CẬY', sub: 'Có thể đồng hành cùng bạn đi tìm hỗ trợ', kind: 'peer' },
      { title: 'TỔNG ĐÀI 111', sub: 'Miễn phí · 24 giờ mỗi ngày', kind: 'hotline' }
    ];
    let caseIndex = 0, phase = 'reply', selectedContacts = [], elapsed = 0, feedback = '', feedbackTime = 0, mistakes = 0;
    const state = {
      score: 0, level: 1, time: 0, hudTime: '00:00', status: 'TÌNH HUỐNG 1/3 · LẮNG NGHE', done: false, won: false, summary: '',
      current() { return cases[caseIndex]; },
      setupCase() {
        phase = 'reply'; selectedContacts = []; feedback = ''; feedbackTime = 0; mistakes = 0; this.level = caseIndex + 1;
        this.status = `TÌNH HUỐNG ${caseIndex + 1}/3 · CHỌN CÁCH LẮNG NGHE`;
        showLearning({ kicker: `TRẠM ĐỒNG HÀNH · ${caseIndex + 1}/3`, title: 'Đừng vội trách móc', text: 'Hãy chọn câu trả lời để người đang gặp chuyện cảm thấy được tin tưởng, tôn trọng và không phải đối mặt một mình.', tags: ['LẮNG NGHE','KHÔNG ĐỔ LỖI','KHÔNG LAN TRUYỀN'], current: `TÌNH HUỐNG ${caseIndex + 1}/3` });
      },
      chooseReply(index) {
        if (index !== this.current().correct) {
          mistakes++; this.score = Math.max(0, this.score - 35);
          feedback = 'Câu trả lời này có thể khiến người đang gặp chuyện xấu hổ, bị trách móc hoặc tiếp tục im lặng. Hãy chọn cách lắng nghe và tôn trọng.';
          feedbackTime = 3.5; this.status = 'CÂU TRẢ LỜI CHƯA TẠO ĐIỂM TỰA'; return;
        }
        this.score += 150; phase = 'network'; this.status = 'ĐÃ LẮNG NGHE · XÂY MẠNG LƯỚI HỖ TRỢ';
        showLearning({ kicker: 'ĐIỂM TỰA ĐẦU TIÊN ĐÃ ĐƯỢC TẠO', title: 'Giờ hãy nối thêm người hỗ trợ', text: 'Chọn ít nhất hai điểm tựa khác nhau, trong đó có ít nhất một người lớn đáng tin hoặc Tổng đài 111. Bạn bè có thể đồng hành, nhưng không nên phải tự gánh việc bảo vệ bạn một mình.', tags: ['NGƯỜI LỚN ĐÁNG TIN','ĐIỂM TỰA DỰ PHÒNG','111 · MIỄN PHÍ · 24/7'], current: `TÌNH HUỐNG ${caseIndex + 1}/3` });
      },
      toggleContact(index) {
        if (selectedContacts.includes(index)) selectedContacts = selectedContacts.filter((n) => n !== index);
        else if (selectedContacts.length < 2) selectedContacts.push(index);
        else { feedback = 'Bạn đã chọn đủ hai điểm tựa. Bỏ chọn một điểm nếu muốn thay đổi.'; feedbackTime = 2.5; }
        this.status = `ĐIỂM TỰA ĐÃ NỐI ${selectedContacts.length}/2`;
        if (selectedContacts.length === 2) {
          const hasAdultOrHotline = selectedContacts.some((n) => contacts[n].kind === 'adult' || contacts[n].kind === 'hotline');
          if (hasAdultOrHotline) {
            this.score += 220; phase = 'debrief'; this.status = 'MẠNG LƯỚI HỖ TRỢ ĐÃ KẾT NỐI';
            showLearning({ kicker: `ĐÃ KẾT NỐI ĐIỂM TỰA · ${caseIndex + 1}/3`, title: 'Không cần tự giải quyết mọi chuyện', text: `${this.current().lesson} Bạn đã chọn: ${selectedContacts.map((n) => contacts[n].title).join(' + ')}.`, tags: ['CÓ NGƯỜI LẮNG NGHE','CÓ ĐIỂM TỰA DỰ PHÒNG','KHÔNG MỘT MÌNH'], current: `ĐÃ HOÀN THÀNH ${caseIndex + 1}/3` });
          } else {
            selectedContacts.pop(); feedback = 'Bạn bè có thể đồng hành, nhưng hãy kết nối thêm ít nhất một người lớn đáng tin hoặc Tổng đài 111.'; feedbackTime = 3.4;
          }
        }
      },
      nextCase() {
        if (caseIndex < cases.length - 1) { caseIndex++; this.setupCase(); }
        else { this.done = true; this.won = true; this.score += 350; this.summary = 'Bạn đã thực hành lắng nghe không đổ lỗi và xây dựng 3 mạng lưới hỗ trợ có điểm tựa dự phòng.'; }
      },
      update(dt) { elapsed += dt; this.time = elapsed; this.hudTime = formatTime(elapsed); feedbackTime = Math.max(0, feedbackTime - dt); },
      pointer(x, y) {
        if (phase === 'reply') {
          for (let i = 0; i < this.current().replies.length; i++) { const by = 215 + i * 89; if (x >= 60 && x <= 900 && y >= by && y <= by + 72) { this.chooseReply(i); return; } }
        } else if (phase === 'network') {
          const positions = [[42, 228], [229, 228], [416, 228], [603, 228], [790, 228]];
          positions.forEach(([bx, by], i) => { if (x >= bx && x <= bx + 145 && y >= by && y <= by + 130) this.toggleContact(i); });
          if (x >= 330 && x <= 630 && y >= 425 && y <= 500 && selectedContacts.length < 2) { feedback = 'Hãy chọn hai điểm tựa khác nhau. Ít nhất một điểm cần là người lớn đáng tin hoặc Tổng đài 111.'; feedbackTime = 3.2; }
        } else if (phase === 'debrief' && x >= 330 && x <= 630 && y >= 445 && y <= 510) this.nextCase();
      },
      draw(c) {
        drawBackdrop(c, elapsed * .08, '#15104c', '#3d2093'); const item = this.current();
        drawPill(c, `SUPPORT NETWORK / CASE ${caseIndex + 1} OF 3`, 24, 18);
        if (phase === 'reply') {
          roundedRect(c, 60, 70, 840, 122, 17, '#f6f2ff', '#fff');
          c.fillStyle = '#7058b8'; c.font = '900 9px "Be Vietnam Pro", sans-serif'; c.textAlign = 'left'; c.fillText('TIN NHẮN BẠN GỬI', 84, 98);
          c.fillStyle = '#24174d'; c.font = '800 16px "Be Vietnam Pro", sans-serif'; wrapText(c, item.message, 84, 133, 790, 22, 3);
          c.fillStyle = '#ffe16a'; c.textAlign = 'center'; c.font = '900 10px "Be Vietnam Pro", sans-serif'; c.fillText('BẠN SẼ TRẢ LỜI THẾ NÀO?', W / 2, 202);
          item.replies.forEach((reply, i) => {
            const by = 215 + i * 89; roundedRect(c, 60, by, 840, 72, 13, '#f6f2ff', '#d8cef5');
            c.fillStyle = '#755db8'; c.font = '900 10px "Be Vietnam Pro", sans-serif'; c.textAlign = 'left'; c.fillText(`LỜI ĐÁP ${String.fromCharCode(65 + i)}`, 82, by + 23);
            c.fillStyle = '#24184b'; c.font = '700 11px "Be Vietnam Pro", sans-serif'; wrapText(c, reply, 82, by + 45, 790, 15, 2);
          });
        } else if (phase === 'network') {
          roundedRect(c, 38, 66, 884, 105, 16, '#ffffff19', '#ffffff3d');
          c.fillStyle = '#ffe16a'; c.textAlign = 'left'; c.font = '900 10px "Be Vietnam Pro", sans-serif'; c.fillText('BẢN ĐỒ ĐIỂM TỰA', 62, 96);
          c.fillStyle = '#fff'; c.font = '700 12px "Be Vietnam Pro", sans-serif'; wrapText(c, 'Nối hai điểm tựa khác nhau. Có thể chọn bạn bè để đồng hành, nhưng mạng lưới phải có ít nhất một người lớn đáng tin hoặc Tổng đài 111.', 62, 124, 825, 18, 2);
          const positions = [[42, 228], [229, 228], [416, 228], [603, 228], [790, 228]];
          const sourceX = 480, sourceY = 190;
          selectedContacts.forEach((n, j) => { const [bx, by] = positions[n]; c.strokeStyle = j === 0 ? '#ffe16a' : '#76f0cf'; c.lineWidth = 4; c.beginPath(); c.moveTo(sourceX, sourceY); c.lineTo(bx + 72, by); c.stroke(); });
          positions.forEach(([bx, by], i) => {
            const contact = contacts[i], active = selectedContacts.includes(i), fill = active ? '#baf5db' : '#f4f0ff';
            roundedRect(c, bx, by, 145, 130, 14, fill, active ? '#eafff4' : '#d6ccf1');
            c.fillStyle = active ? '#1d664d' : '#6f57b5'; c.textAlign = 'center'; c.font = '900 9px "Be Vietnam Pro", sans-serif'; c.fillText(active ? '✓ ĐÃ NỐI' : `ĐIỂM TỰA ${i + 1}`, bx + 72, by + 24);
            c.fillStyle = active ? '#1d664d' : '#24174d'; c.font = '900 10px "Be Vietnam Pro", sans-serif'; wrapText(c, contact.title, bx + 72, by + 54, 125, 14, 3);
            c.fillStyle = active ? '#24634f' : '#82789e'; c.font = '600 8px "Be Vietnam Pro", sans-serif'; wrapText(c, contact.sub, bx + 72, by + 97, 125, 11, 3);
          });
          roundedRect(c, 330, 425, 300, 64, 12, '#ffdf52', '#fff0a8'); c.fillStyle = '#28115f'; c.textAlign = 'center'; c.font = '900 10px "Be Vietnam Pro", sans-serif'; c.fillText(`${selectedContacts.length}/2 ĐIỂM TỰA ĐÃ NỐI`, 480, 462);
        } else {
          roundedRect(c, 82, 65, 796, 375, 20, '#f7f3ff', '#fff'); c.textAlign = 'center'; c.fillStyle = '#6e53bf'; c.font = '900 10px "Be Vietnam Pro", sans-serif'; c.fillText(`SUPPORT NETWORK · ${caseIndex + 1}/3`, W / 2, 100);
          c.fillStyle = '#26105f'; c.font = '900 24px "Be Vietnam Pro", sans-serif'; c.fillText('BẠN ĐÃ GIÚP KẾT NỐI', W / 2, 145);
          c.textAlign = 'left'; c.fillStyle = '#3b3159'; c.font = '600 13px "Be Vietnam Pro", sans-serif'; wrapText(c, item.lesson, 135, 205, 690, 22, 6);
          c.fillStyle = '#7058b8'; c.font = '900 9px "Be Vietnam Pro", sans-serif'; c.fillText(`ĐIỂM TỰA: ${selectedContacts.map((n) => contacts[n].title).join('  +  ')}`, 135, 365);
          roundedRect(c, 330, 445, 300, 62, 13, '#ffdf52', '#fff0a8'); c.fillStyle = '#28115f'; c.textAlign = 'center'; c.font = '900 11px "Be Vietnam Pro", sans-serif'; c.fillText(caseIndex === 2 ? 'HOÀN TẤT TRẠM ĐỒNG HÀNH ✓' : 'TÌNH HUỐNG TIẾP THEO ↗', 480, 482);
        }
        if (feedbackTime > 0 && phase !== 'debrief') { roundedRect(c, 30, 500, 900, 30, 8, '#ff5875'); c.fillStyle = '#fff'; c.textAlign = 'center'; c.font = '700 8px "Be Vietnam Pro", sans-serif'; c.fillText(feedback, 45, 519, 870); }
        c.fillStyle = '#e2d9ff'; c.font = '800 8px "Be Vietnam Pro", sans-serif'; c.textAlign = 'center'; c.fillText('LẮNG NGHE · KHÔNG ĐỔ LỖI · CÙNG TÌM ĐIỂM TỰA', W / 2, 530);
      }
    };
    state.setupCase(); return state;
  }

  function createGame(key) {
    if (key === 'runner') return createRunner();
    if (key === 'detective') return createDetectiveGame();
    if (key === 'studio') return createStudioGame();
    if (key === 'support') return createSupportGame();
    return createRunner();
  }

  // Input routing.
  document.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('open')) return;
    if (event.key === 'Escape') { closeGame(); return; }
    if (event.key === ' ' || event.key.startsWith('Arrow')) event.preventDefault();
    if (game && !paused && !game.done) game.key?.(event.key);
  });
  canvas.addEventListener('pointerdown', (event) => {
    if (!game || paused || game.done) return;
    const rect=canvas.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width*W;const y=(event.clientY-rect.top)/rect.height*H;
    game.pointer?.(x,y,event);
  });
  canvas.addEventListener('contextmenu',(event)=>event.preventDefault());
  document.querySelectorAll('[data-game]').forEach((button) => button.addEventListener('click', () => openGame(button.dataset.game)));
  startButton.addEventListener('click', startSelectedGame); $('#closeGame').addEventListener('click', closeGame); $('#restartGame').addEventListener('click', startSelectedGame);
  $('#pauseGame').addEventListener('click', togglePause); $('#resumeGame').addEventListener('click', togglePause); document.querySelector('[data-close-modal]').addEventListener('click', closeGame);
  updateArcadeStats();

  // Bức tường Không Một Mình được quản lý bởi Firebase module trong index.html.

  // Scroll reveal.
  const revealItems=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){const observer=new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});revealItems.forEach((item)=>observer.observe(item));}
  else revealItems.forEach((item)=>item.classList.add('visible'));
})();
