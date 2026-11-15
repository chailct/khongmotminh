const games = {
      signals: {
        title: 'Đèn đỏ hay đèn xanh?',
        questions: [
          { tag:'Mật khẩu & mã xác thực', scenario:'Một tài khoản lạ nhắn: “Mình tặng bạn vật phẩm trong game. Gửi mã OTP để nhận nhé!”', prompt:'Bạn nên làm gì?', options:['Gửi mã vì chỉ dùng một lần.','Không gửi mã; dừng trò chuyện, chặn/báo cáo và hỏi người lớn tin cậy.','Gửi trước một nửa thông tin để kiểm tra.'], correct:1, explain:'Mã OTP, mật khẩu và mã khôi phục là thông tin riêng tư. Không chia sẻ chúng cho bất kỳ ai qua tin nhắn.' },
          { tag:'Thông tin cá nhân', scenario:'Một người mới quen trên mạng liên tục hỏi tên trường, địa chỉ nhà và lịch sinh hoạt của bạn.', prompt:'Đâu là cách an toàn hơn?', options:['Trả lời để chứng minh mình thân thiện.','Chỉ gửi địa chỉ trường, không gửi địa chỉ nhà.','Không chia sẻ thông tin riêng tư; dừng trao đổi nếu bị gây áp lực và kể với người lớn tin cậy.'], correct:2, explain:'Thông tin về nơi ở, trường học, vị trí và lịch trình có thể khiến bạn gặp rủi ro. Bạn có quyền từ chối trả lời.' },
          { tag:'Giữ bí mật bất thường', scenario:'Một người quen qua mạng nói: “Đừng kể với bố mẹ hay thầy cô. Chuyện này chỉ hai chúng ta biết thôi.”', prompt:'Bạn nhận ra tín hiệu nào?', options:['Đó có thể là dấu hiệu cảnh báo; hãy trao đổi với người lớn bạn tin tưởng.','Đây chắc chắn là bí mật dễ thương.','Nên chuyển sang ứng dụng khác để nói chuyện kín hơn.'], correct:0, explain:'Việc yêu cầu bạn giữ bí mật với tất cả người lớn, nhất là khi đi kèm áp lực hoặc đe dọa, là tín hiệu cần chú ý.' },
          { tag:'Áp lực và đe dọa', scenario:'Một người nhắn rằng bạn phải làm theo yêu cầu của họ, nếu không họ sẽ khiến bạn gặp rắc rối.', prompt:'Bước tiếp theo phù hợp là gì?', options:['Làm theo để họ không giận.','Dừng tương tác, giữ lại thông tin cần thiết, báo cáo và nhờ người lớn hỗ trợ.','Tự gặp người đó để giải quyết.'], correct:1, explain:'Bạn không có lỗi khi bị gây áp lực. Đừng làm theo yêu cầu; hãy tìm sự hỗ trợ từ người lớn đáng tin cậy.' },
          { tag:'Liên kết lạ', scenario:'Bạn nhận được đường link “nhận quà miễn phí” từ tài khoản không quen biết và trang web yêu cầu đăng nhập.', prompt:'Bạn nên làm gì trước?', options:['Bấm ngay vì quà có thể hết hạn.','Nhập thử mật khẩu cũ.','Không vội bấm; xác minh qua kênh chính thức và hỏi người lớn khi chưa chắc chắn.'], correct:2, explain:'Đường link giả có thể dẫn đến trang đánh cắp tài khoản. Hãy kiểm tra nguồn gửi và không nhập thông tin đăng nhập vào trang đáng ngờ.' }
        ]
      },
      messages: {
        title: 'Giải mã tin nhắn',
        questions: [
          { tag:'Tin nhắn ẩn danh', scenario:'“Mình biết bạn học trường nào đó. Gửi vị trí hiện tại để mình qua gặp nhé. Đừng nói ai.”', prompt:'Chi tiết nào đáng lo nhất?', options:['Người gửi hỏi thăm bạn.','Người lạ yêu cầu vị trí và bảo giữ bí mật.','Tin nhắn có dấu chấm câu.'], correct:1, explain:'Yêu cầu vị trí, gặp riêng và giữ bí mật từ người lạ là các dấu hiệu cảnh báo. Không gửi vị trí; hãy dừng liên hệ và báo người lớn tin cậy.' },
          { tag:'Quà tặng bất ngờ', scenario:'“Bạn nhận được phần thưởng! Nhấn vào link và nhập tài khoản cùng mã xác thực để nhận ngay.”', prompt:'Cách xử lý nào an toàn?', options:['Không mở link; kiểm tra thông tin qua trang hoặc kênh chính thức.','Nhập thông tin để giữ phần thưởng.','Chuyển link cho cả nhóm để mọi người cùng nhận.'], correct:0, explain:'Thông báo trúng thưởng kèm yêu cầu đăng nhập hoặc cung cấp mã xác thực có thể là chiêu lừa đảo. Đừng phát tán đường link chưa xác minh.' },
          { tag:'Bình luận gây tổn thương', scenario:'Trong nhóm lớp, có người đăng ảnh chụp màn hình cuộc trò chuyện riêng của một bạn và rủ mọi người chế giễu.', prompt:'Bạn nên phản hồi thế nào?', options:['Chia sẻ tiếp để hỏi ý kiến nhiều người.','Thả biểu tượng cười cho vui.','Không chia sẻ; đề nghị dừng phát tán và báo người lớn nếu việc này tiếp diễn.'], correct:2, explain:'Chia sẻ nội dung riêng tư khi chưa được đồng ý có thể làm người khác bị tổn thương. Đừng tiếp tay lan truyền.' },
          { tag:'Người quen đáng tin?', scenario:'Một tài khoản dùng ảnh đại diện giống bạn cùng lớp nhưng nhắn từ tài khoản mới và hỏi mượn tiền gấp.', prompt:'Việc nên làm trước khi phản hồi?', options:['Chuyển tiền ngay vì có ảnh quen.','Xác minh bằng cách liên hệ bạn ấy qua kênh đã biết từ trước.','Gửi số tài khoản của mình để bạn ấy trả sau.'], correct:1, explain:'Ảnh đại diện có thể bị sao chép. Hãy xác minh qua kênh liên lạc đáng tin cậy trước khi làm theo yêu cầu.' }
        ]
      },
      kindness: {
        title: 'Kết nối không tổn thương',
        questions: [
          { tag:'Tôn trọng quyền riêng tư', scenario:'Bạn muốn đăng ảnh một người bạn trong lớp lên mạng. Bạn ấy chưa biết bạn định đăng.', prompt:'Hành động nào thể hiện sự tôn trọng?', options:['Đăng trước rồi gắn thẻ sau.','Hỏi ý kiến bạn ấy và chỉ đăng khi bạn ấy đồng ý.','Gửi ảnh vào nhiều nhóm để xin bình chọn.'], correct:1, explain:'Hãy xin phép trước khi đăng hoặc chia sẻ hình ảnh, câu chuyện và thông tin của người khác.' },
          { tag:'Khi thấy bắt nạt', scenario:'Một bạn bị nhiều người trêu chọc trong phần bình luận. Bạn nhận ra bạn ấy đang rất buồn.', prompt:'Bạn có thể làm gì?', options:['Không hùa theo; động viên riêng, báo người lớn khi cần và dùng công cụ báo cáo.','Bình luận thêm để hòa vào đám đông.','Chụp lại và chia sẻ sang nhóm khác.'], correct:0, explain:'Một hành động nhỏ như không hùa theo, hỏi thăm và tìm hỗ trợ có thể giúp người bị tổn thương cảm thấy không đơn độc.' },
          { tag:'Chia sẻ có trách nhiệm', scenario:'Bạn nhận được ảnh chụp màn hình chuyện riêng của một người bạn. Người gửi nói “Đừng nói ai là mình gửi nhé”.', prompt:'Lựa chọn nào phù hợp?', options:['Chuyển tiếp nhưng che tên người gửi.','Đăng lên story để mọi người tự đánh giá.','Không phát tán; đề nghị người gửi xóa và hỏi người bị ảnh hưởng xem họ cần hỗ trợ gì.'], correct:2, explain:'Không phát tán nội dung riêng tư. Tôn trọng cảm xúc, quyền riêng tư và mong muốn của người bị ảnh hưởng.' },
          { tag:'Lắng nghe và hỗ trợ', scenario:'Một người bạn kể rằng họ đang bị làm phiền trên mạng và nhờ bạn giữ kín mọi chuyện.', prompt:'Cách hỗ trợ tốt nhất là gì?', options:['Hứa sẽ không nói với bất kỳ ai dù bạn ấy có nguy cơ.','Lắng nghe, không phán xét; cùng bạn ấy tìm một người lớn đáng tin cậy để hỗ trợ.','Bảo bạn ấy tự giải quyết vì đó là tài khoản của bạn ấy.'], correct:1, explain:'Hãy lắng nghe và không đổ lỗi. Khi có nguy cơ mất an toàn, cần kết nối với người lớn đáng tin cậy để được bảo vệ.' }
        ]
      }
    };

    const modal = document.getElementById('gameModal');
    const modalContent = document.getElementById('modalContent');
    const modalTitle = document.getElementById('modalTitle');
    const closeModalBtn = document.getElementById('closeModal');
    const overallProgress = document.getElementById('overallProgress');
    const progressCount = document.getElementById('progressCount');
    const completedGames = new Set();
    let activeGameCleanup = null;
    let currentGame = null;
    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    function updateProgress() {
      const count = completedGames.size;
      overallProgress.style.width = `${count / 9 * 100}%`;
      progressCount.textContent = `${count} / 9 trò đã chơi`;
    }

    function openModal() {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeModalBtn.focus();
    }
    function cleanupActiveGame() {
      if (typeof activeGameCleanup === 'function') {
        activeGameCleanup();
        activeGameCleanup = null;
      }
    }
    function closeModal() {
      cleanupActiveGame();
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

    document.querySelectorAll('[data-game]').forEach(card => card.addEventListener('click', () => startGame(card.dataset.game)));

    const extraGameTitles = {
      sortSignals: 'Trạm phân loại tín hiệu', memory: 'Lật thẻ trí nhớ',
      maze: 'Mê cung tìm điểm tựa', puzzle: 'Xếp ô thông điệp', reflex: 'Chạm nhanh – né bẫy'
    };
    function startGame(id) {
      cleanupActiveGame();
      currentGame = id;
      currentQuestion = 0;
      score = 0;
      answered = false;
      modalTitle.textContent = id === 'fiveSteps' ? '5 bước không một mình' : (extraGameTitles[id] || games[id].title);
      openModal();
      if (id === 'fiveSteps') renderFiveSteps();
      else if (id === 'sortSignals') renderSortSignals();
      else if (id === 'memory') renderMemoryGame();
      else if (id === 'maze') renderMazeGame();
      else if (id === 'puzzle') renderSlidingPuzzle();
      else if (id === 'reflex') renderReflexGame();
      else renderQuestion();
    }

    function renderQuestion() {
      const list = games[currentGame].questions;
      const q = list[currentQuestion];
      const pct = currentQuestion / list.length * 100;
      modalContent.innerHTML = `
        <div class="game-progress-top"><span>THỬ THÁCH ${String(currentQuestion+1).padStart(2,'0')} / ${list.length}</span><span>Điểm: ${score}</span></div>
        <div class="mini-track"><span style="width:${pct}%"></span></div>
        <span class="prompt-label">${q.tag}</span>
        <h3 class="prompt-title">${q.prompt}</h3>
        <div class="scenario-box"><div class="bubble">${q.scenario}</div><small>Hãy đọc kỹ tình huống trước khi chọn.</small></div>
        <div class="answer-list" id="answerList">${q.options.map((opt,i)=>`<button type="button" class="answer-btn" data-answer="${i}"><span class="answer-key">${String.fromCharCode(65+i)}</span><span>${opt}</span></button>`).join('')}</div>
        <div class="feedback" id="feedback" aria-live="polite"></div>
        <div class="modal-actions"><button type="button" class="quiet-btn" id="quitGame">Thoát trò chơi</button><button type="button" class="modal-next" id="nextQuestion" disabled>${currentQuestion === list.length-1 ? 'Xem kết quả' : 'Câu tiếp theo →'}</button></div>
      `;
      document.getElementById('quitGame').addEventListener('click', closeModal);
      document.getElementById('nextQuestion').addEventListener('click', nextQuestion);
      document.querySelectorAll('[data-answer]').forEach(btn => btn.addEventListener('click', () => chooseAnswer(Number(btn.dataset.answer))));
    }

    function chooseAnswer(choice) {
      if (answered) return;
      answered = true;
      const q = games[currentGame].questions[currentQuestion];
      const correct = choice === q.correct;
      if (correct) score += 20;
      document.querySelectorAll('[data-answer]').forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correct) btn.classList.add('correct');
        else if (i === choice) btn.classList.add('wrong');
      });
      const feedback = document.getElementById('feedback');
      feedback.className = `feedback show ${correct ? 'good' : 'try'}`;
      feedback.innerHTML = `<strong>${correct ? 'Chính xác! +20 điểm' : 'Mình cùng ghi nhớ nhé!'}</strong>${q.explain}`;
      document.getElementById('nextQuestion').disabled = false;
    }

    function nextQuestion() {
      if (!answered) return;
      currentQuestion++;
      if (currentQuestion < games[currentGame].questions.length) {
        answered = false;
        renderQuestion();
      } else finishGame(score, games[currentGame].questions.length * 20);
    }

    const fiveStepItems = [
      { title:'Dừng', detail:'Dừng tương tác, không làm theo yêu cầu gây áp lực.' },
      { title:'Không lan truyền', detail:'Không chuyển tiếp hay đăng lại nội dung gây tổn thương.' },
      { title:'Lưu bằng chứng', detail:'Nhờ người lớn hướng dẫn lưu thông tin cần thiết an toàn.' },
      { title:'Báo cáo', detail:'Báo cáo nội dung/tài khoản trên nền tảng và chặn khi cần.' },
      { title:'Chia sẻ', detail:'Nói với cha mẹ, thầy cô hoặc người lớn đáng tin cậy.' }
    ];
    let stepsDone = 0;
    function renderFiveSteps() {
      stepsDone = 0;
      const shuffled = [2,4,0,3,1];
      modalContent.innerHTML = `
        <div class="game-progress-top"><span>THỬ THÁCH GHI NHỚ</span><span id="stepCount">0 / 5 bước</span></div>
        <div class="mini-track"><span id="stepTrack" style="width:0%"></span></div>
        <span class="prompt-label">Sắp xếp đúng thứ tự</span>
        <h3 class="prompt-title">Khi gặp tình huống không an toàn, bước đầu tiên là gì?</h3>
        <p class="prompt-copy">Chọn từng bước theo đúng thứ tự. Nếu chọn nhầm, bạn có thể thử lại.</p>
        <div class="order-options" id="orderOptions">${shuffled.map(i=>`<button type="button" class="order-btn" data-step="${i}"><span class="order-index">?</span>${fiveStepItems[i].title}</button>`).join('')}</div>
        <div class="order-feedback" id="orderFeedback" aria-live="polite">Gợi ý: bình tĩnh và ngừng tương tác trước.</div>
        <div class="feedback" id="stepExplain"></div>
        <div class="modal-actions"><button type="button" class="quiet-btn" id="quitGame">Thoát trò chơi</button><button type="button" class="modal-next" id="finishSteps" disabled>Xem kết quả</button></div>
      `;
      document.getElementById('quitGame').addEventListener('click', closeModal);
      document.getElementById('finishSteps').addEventListener('click', () => finishGame(100,100));
      document.querySelectorAll('[data-step]').forEach(btn => btn.addEventListener('click', () => chooseStep(btn)));
    }
    function chooseStep(btn) {
      if (btn.disabled) return;
      const expected = stepsDone;
      const picked = Number(btn.dataset.step);
      const message = document.getElementById('orderFeedback');
      if (picked === expected) {
        stepsDone++;
        btn.disabled = true;
        btn.classList.add('done');
        btn.querySelector('.order-index').textContent = stepsDone;
        document.getElementById('stepCount').textContent = `${stepsDone} / 5 bước`;
        document.getElementById('stepTrack').style.width = `${stepsDone*20}%`;
        message.textContent = `Đúng rồi: ${fiveStepItems[picked].detail}`;
        if (stepsDone === 5) {
          const exp = document.getElementById('stepExplain');
          exp.className = 'feedback show good';
          exp.innerHTML = '<strong>Bạn đã nhớ đủ 5 bước!</strong>Dừng – Không lan truyền – Lưu bằng chứng – Báo cáo – Chia sẻ.';
          document.getElementById('finishSteps').disabled = false;
        }
      } else {
        message.textContent = 'Chưa đúng thứ tự. Thử nghĩ xem việc nào cần làm ngay trước tiên nhé!';
      }
    }


    // 05 — Drag and drop: classify digital safety signals.
    const sortSignalsData = [
      { id:'s1', icon:'🙋', text:'Bạn hỏi xin phép trước khi đăng ảnh của mình.', type:'safe', why:'Hỏi ý kiến trước khi đăng ảnh là tôn trọng quyền riêng tư.' },
      { id:'s2', icon:'🔐', text:'Tài khoản lạ yêu cầu gửi mã OTP để nhận quà.', type:'caution', why:'Mã OTP và mật khẩu cần được giữ bí mật.' },
      { id:'s3', icon:'🎁', text:'Đường link nhận quà yêu cầu nhập mật khẩu.', type:'caution', why:'Không nhập thông tin đăng nhập vào liên kết chưa xác minh.' },
      { id:'s4', icon:'🧑‍🏫', text:'Bạn tìm thầy cô tin cậy để nhờ hỗ trợ.', type:'safe', why:'Tìm người lớn đáng tin cậy là cách kết nối an toàn.' },
      { id:'s5', icon:'📍', text:'Người mới quen hỏi địa chỉ nhà và lịch trình.', type:'caution', why:'Không chia sẻ vị trí và lịch trình riêng tư với người lạ.' },
      { id:'s6', icon:'🛡️', text:'Bạn dùng chức năng báo cáo khi thấy nội dung gây hại.', type:'safe', why:'Báo cáo giúp nền tảng xem xét nội dung không phù hợp.' }
    ];
    function renderSortSignals() {
      let selectedId = null;
      let draggedId = null;
      let completed = new Set();
      let points = 0;
      let wrongTries = 0;
      let finishTimer = null;
      const shuffled = [...sortSignalsData].sort(() => Math.random() - .5);
      modalContent.innerHTML = `
        <div class="game-progress-top"><span>THỬ THÁCH KÉO – THẢ</span><span id="sortCount">0 / 6 thẻ</span></div>
        <div class="mini-track"><span id="sortTrack" style="width:0%"></span></div>
        <h3 class="prompt-title">Đưa mỗi tín hiệu về đúng khu vực!</h3>
        <p class="prompt-copy">Kéo thẻ vào ô phù hợp. Trên điện thoại, chạm một thẻ rồi chạm khu vực để phân loại.</p>
        <div class="sort-board">
          <div class="sort-cards" id="sortCards">${shuffled.map(item=>`<button type="button" class="sort-card" draggable="true" data-sort-id="${item.id}"><span class="sort-emoji">${item.icon}</span><span>${item.text}</span></button>`).join('')}</div>
          <div class="sort-bins">
            <button type="button" class="sort-bin" data-bin="safe">🟢 AN TOÀN<small>Hành vi tôn trọng và bảo vệ</small></button>
            <button type="button" class="sort-bin caution" data-bin="caution">🔴 CẦN CẢNH GIÁC<small>Yêu cầu có thể gây rủi ro</small></button>
          </div>
        </div>
        <div class="mini-feedback" id="sortFeedback" aria-live="polite">Chọn một thẻ để bắt đầu phân loại.</div>
        <div class="modal-actions"><button type="button" class="quiet-btn" id="quitGame">Thoát trò chơi</button><span class="small-note">Đúng: +10 điểm</span></div>
      `;
      const cardsNode = document.getElementById('sortCards');
      const feedback = document.getElementById('sortFeedback');
      function classify(id, type) {
        if (!id || completed.has(id)) return;
        const item = sortSignalsData.find(entry => entry.id === id);
        if (!item) return;
        if (item.type !== type) {
          wrongTries++;
          feedback.textContent = 'Chưa đúng rồi. Hãy đọc kỹ nội dung thẻ và thử lại nhé!';
          feedback.style.color = '#a82c28';
          return;
        }
        completed.add(id);
        points += 10;
        const card = cardsNode.querySelector(`[data-sort-id="${id}"]`);
        if (card) { card.classList.add('done'); card.disabled = true; card.draggable = false; }
        selectedId = null;
        document.querySelectorAll('.sort-card').forEach(node => node.classList.remove('selected'));
        document.getElementById('sortCount').textContent = `${completed.size} / 6 thẻ`;
        document.getElementById('sortTrack').style.width = `${completed.size / 6 * 100}%`;
        feedback.textContent = `Chính xác! ${item.why}`;
        feedback.style.color = '#176044';
        if (completed.size === sortSignalsData.length) {
          feedback.textContent = 'Hoàn thành! Bạn đã phân loại đủ 6 tín hiệu.';
          finishTimer = setTimeout(() => finishGame(points, 60), 550);
        }
      }
      cardsNode.querySelectorAll('.sort-card').forEach(card => {
        card.addEventListener('click', () => {
          if (card.disabled) return;
          selectedId = card.dataset.sortId;
          cardsNode.querySelectorAll('.sort-card').forEach(node => node.classList.toggle('selected', node === card));
          feedback.textContent = 'Đã chọn thẻ. Hãy chạm vào khu vực phân loại phù hợp.';
          feedback.style.color = '#6f6a81';
        });
        card.addEventListener('dragstart', event => {
          draggedId = card.dataset.sortId;
          event.dataTransfer.setData('text/plain', draggedId);
          event.dataTransfer.effectAllowed = 'move';
        });
      });
      document.querySelectorAll('[data-bin]').forEach(bin => {
        bin.addEventListener('click', () => classify(selectedId, bin.dataset.bin));
        bin.addEventListener('dragover', event => { event.preventDefault(); bin.classList.add('drag-over'); });
        bin.addEventListener('dragleave', () => bin.classList.remove('drag-over'));
        bin.addEventListener('drop', event => {
          event.preventDefault(); bin.classList.remove('drag-over');
          const id = event.dataTransfer.getData('text/plain') || draggedId;
          classify(id, bin.dataset.bin);
        });
      });
      document.getElementById('quitGame').addEventListener('click', closeModal);
      activeGameCleanup = () => { if (finishTimer) clearTimeout(finishTimer); };
    }

    // 06 — Memory matching game.
    function renderMemoryGame() {
      const pairs = [
        { key:'privacy', icon:'🔒', title:'Giữ riêng tư' },
        { key:'pause', icon:'🛑', title:'Dừng lại' },
        { key:'trusted', icon:'🧑‍🏫', title:'Người tin cậy' },
        { key:'report', icon:'📣', title:'Báo cáo' },
        { key:'listen', icon:'👂', title:'Lắng nghe' },
        { key:'kind', icon:'💜', title:'Tử tế' }
      ];
      const deck = [...pairs, ...pairs].map((item, index) => ({ ...item, uid:index })).sort(() => Math.random() - .5);
      let first = null, second = null, matches = 0, moves = 0, lock = false, pendingTimeout = null, finishTimer = null;
      modalContent.innerHTML = `
        <div class="game-progress-top"><span>THỬ THÁCH GHÉP CẶP</span><span id="memoryCount">0 / 6 cặp · 0 lượt</span></div>
        <div class="mini-track"><span id="memoryTrack" style="width:0%"></span></div>
        <h3 class="prompt-title">Tìm 6 cặp thẻ có ý nghĩa liên quan!</h3>
        <p class="prompt-copy">Chạm hai thẻ để lật. Ghi nhớ vị trí và ghép các kỹ năng tương ứng.</p>
        <div class="memory-grid" id="memoryGrid">${deck.map(card=>`<button type="button" class="memory-card" data-memory-id="${card.uid}" aria-label="Lật thẻ"><span class="memory-back">?</span><span class="memory-face"><b>${card.icon}</b><small>${card.title}</small></span></button>`).join('')}</div>
        <div class="mini-feedback" id="memoryFeedback" aria-live="polite">Mẹo: hãy ghi nhớ vị trí các biểu tượng vừa lật.</div>
        <div class="modal-actions"><button type="button" class="quiet-btn" id="quitGame">Thoát trò chơi</button><span class="small-note">Ghép đúng: +10 điểm</span></div>
      `;
      const grid = document.getElementById('memoryGrid');
      function reveal(card) {
        if (lock || card.classList.contains('flipped') || card.classList.contains('matched')) return;
        card.classList.add('flipped');
        if (!first) { first = card; return; }
        second = card;
        moves++;
        const a = deck.find(item => item.uid === Number(first.dataset.memoryId));
        const b = deck.find(item => item.uid === Number(second.dataset.memoryId));
        const feedback = document.getElementById('memoryFeedback');
        if (a.key === b.key) {
          first.classList.add('matched'); second.classList.add('matched');
          first.disabled = true; second.disabled = true;
          matches++;
          feedback.textContent = `Ghép đúng: ${a.title}. ${matches === 6 ? 'Bạn đã tìm đủ 6 cặp!' : 'Tiếp tục tìm cặp tiếp theo nhé.'}`;
          feedback.style.color = '#176044';
          document.getElementById('memoryCount').textContent = `${matches} / 6 cặp · ${moves} lượt`;
          document.getElementById('memoryTrack').style.width = `${matches / 6 * 100}%`;
          first = null; second = null;
          if (matches === 6) finishTimer = setTimeout(() => finishGame(60, 60), 550);
        } else {
          lock = true;
          feedback.textContent = 'Chưa trùng cặp. Cố gắng nhớ vị trí hai thẻ nhé!';
          feedback.style.color = '#815019';
          pendingTimeout = setTimeout(() => {
            first.classList.remove('flipped'); second.classList.remove('flipped');
            first = null; second = null; lock = false; pendingTimeout = null;
            document.getElementById('memoryCount').textContent = `${matches} / 6 cặp · ${moves} lượt`;
          }, 780);
        }
      }
      grid.querySelectorAll('.memory-card').forEach(card => card.addEventListener('click', () => reveal(card)));
      document.getElementById('quitGame').addEventListener('click', closeModal);
      activeGameCleanup = () => { if (pendingTimeout) clearTimeout(pendingTimeout); if (finishTimer) clearTimeout(finishTimer); };
    }

    // 07 — Maze controlled by arrow keys or on-screen directional buttons.
    const mazeMap = ['S..#...', '#..#.#.', '#....#.', '###.##.', '...#...', '.#.....', '.#####G'];
    function renderMazeGame() {
      let player = { row:0, col:0 }, moves = 0, finishTimer = null;
      modalContent.innerHTML = `
        <div class="game-progress-top"><span>THỬ THÁCH ĐIỀU HƯỚNG</span><span id="mazeMoves">0 bước</span></div>
        <div class="mini-track"><span id="mazeTrack" style="width:0%"></span></div>
        <h3 class="prompt-title">Tìm đường đến người bạn tin cậy!</h3>
        <p class="prompt-copy">Dùng phím mũi tên hoặc cụm nút bên dưới để di chuyển. Tránh các bức tường màu tím.</p>
        <div class="maze-wrap"><div class="maze-grid" id="mazeGrid" role="img" aria-label="Mê cung 7 nhân 7"></div>
          <div class="maze-controls" aria-label="Điều khiển mê cung">
            <button type="button" data-move="up" aria-label="Lên">↑</button><button type="button" data-move="left" aria-label="Trái">←</button><button type="button" data-move="down" aria-label="Xuống">↓</button><button type="button" data-move="right" aria-label="Phải">→</button>
          </div>
        </div>
        <div class="mini-feedback" id="mazeFeedback" aria-live="polite">🚩 Điểm xuất phát ở góc trên bên trái. Đích đến là 🤝.</div>
        <div class="modal-actions"><button type="button" class="quiet-btn" id="quitGame">Thoát trò chơi</button><span class="small-note">Đến đích để hoàn thành</span></div>
      `;
      const grid = document.getElementById('mazeGrid');
      function drawMaze() {
        grid.replaceChildren();
        mazeMap.forEach((row, r) => [...row].forEach((cell, c) => {
          const node = document.createElement('div');
          node.className = `maze-cell${cell === '#' ? ' wall' : ''}${cell === 'S' ? ' start' : ''}${cell === 'G' ? ' goal' : ''}`;
          if (player.row === r && player.col === c) { node.className += ' player'; node.textContent = '🙂'; }
          else if (cell === 'S') node.textContent = '🚩';
          else if (cell === 'G') node.textContent = '🤝';
          grid.appendChild(node);
        }));
      }
      function move(direction) {
        const delta = { up:[-1,0], down:[1,0], left:[0,-1], right:[0,1] }[direction];
        if (!delta) return;
        const nr = player.row + delta[0], nc = player.col + delta[1];
        if (nr < 0 || nc < 0 || nr >= 7 || nc >= 7 || mazeMap[nr][nc] === '#') {
          document.getElementById('mazeFeedback').textContent = 'Có tường chắn ở đó. Hãy thử hướng khác nhé!';
          return;
        }
        player = { row:nr, col:nc }; moves++;
        document.getElementById('mazeMoves').textContent = `${moves} bước`;
        document.getElementById('mazeTrack').style.width = `${Math.min(100, moves / 16 * 100)}%`;
        drawMaze();
        if (mazeMap[nr][nc] === 'G') {
          document.getElementById('mazeFeedback').textContent = 'Bạn đã tìm được điểm tựa! Nhờ người đáng tin cậy hỗ trợ là một lựa chọn dũng cảm.';
          finishTimer = setTimeout(() => finishGame(50, 50), 500);
        } else {
          document.getElementById('mazeFeedback').textContent = 'Đang đi đúng hướng. Nếu gặp chuyện khó, bạn không cần tự xử lý một mình.';
        }
      }
      drawMaze();
      document.querySelectorAll('[data-move]').forEach(btn => btn.addEventListener('click', () => move(btn.dataset.move)));
      const keyHandler = event => {
        if (!modal.classList.contains('open') || currentGame !== 'maze') return;
        const map = { ArrowUp:'up', ArrowDown:'down', ArrowLeft:'left', ArrowRight:'right' };
        if (map[event.key]) { event.preventDefault(); move(map[event.key]); }
      };
      document.addEventListener('keydown', keyHandler);
      document.getElementById('quitGame').addEventListener('click', closeModal);
      activeGameCleanup = () => { document.removeEventListener('keydown', keyHandler); if (finishTimer) clearTimeout(finishTimer); };
    }

    // 08 — Sliding word puzzle. The board is shuffled through legal moves, so it remains solvable.
    function renderSlidingPuzzle() {
      const solved = ['DỪNG','KHÔNG','LAN','LƯU','BẰNG','BÁO','CHIA','TÌM',''];
      let board = [...solved], moveCount = 0, finishTimer = null;
      let empty = 8, previousEmpty = -1;
      for (let i = 0; i < 42; i++) {
        const neighbors = [empty-3, empty+3, ...(empty%3 ? [empty-1] : []), ...(empty%3 !== 2 ? [empty+1] : [])]
          .filter(index => index >= 0 && index < 9 && index !== previousEmpty);
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];
        [board[empty], board[next]] = [board[next], board[empty]];
        previousEmpty = empty; empty = next;
      }
      modalContent.innerHTML = `
        <div class="game-progress-top"><span>THỬ THÁCH XẾP Ô</span><span id="puzzleMoves">0 lượt di chuyển</span></div>
        <div class="mini-track"><span id="puzzleTrack" style="width:0%"></span></div>
        <h3 class="prompt-title">Khôi phục thứ tự thông điệp!</h3>
        <p class="prompt-copy">Chạm vào ô nằm cạnh ô trống để trượt. Sắp xếp theo thứ tự đọc từ trái sang phải, từ trên xuống dưới.</p>
        <div class="puzzle-grid" id="puzzleGrid"></div>
        <div class="mini-feedback" id="puzzleFeedback" aria-live="polite">Thông điệp: DỪNG – KHÔNG LAN – LƯU BẰNG CHỨNG – BÁO CÁO – CHIA SẺ – TÌM HỖ TRỢ.</div>
        <div class="modal-actions"><button type="button" class="quiet-btn" id="quitGame">Thoát trò chơi</button><span class="small-note">Ít lượt di chuyển hơn là tốt hơn</span></div>
      `;
      const grid = document.getElementById('puzzleGrid');
      function drawPuzzle() {
        grid.innerHTML = board.map((tile, index) => `<button type="button" class="puzzle-tile${tile === '' ? ' empty' : ''}" data-tile="${index}" ${tile === '' ? 'disabled aria-label="Ô trống"' : ''}>${tile === '' ? '' : tile}</button>`).join('');
        grid.querySelectorAll('[data-tile]').forEach(btn => btn.addEventListener('click', () => slideTile(Number(btn.dataset.tile))));
      }
      function slideTile(index) {
        const adjacent = Math.abs(Math.floor(index/3) - Math.floor(empty/3)) + Math.abs(index%3 - empty%3) === 1;
        if (!adjacent || board[index] === '') return;
        [board[index], board[empty]] = [board[empty], board[index]];
        empty = index; moveCount++;
        document.getElementById('puzzleMoves').textContent = `${moveCount} lượt di chuyển`;
        drawPuzzle();
        const correct = board.every((value, i) => value === solved[i]);
        const placed = board.filter((value, i) => value === solved[i]).length;
        document.getElementById('puzzleTrack').style.width = `${placed/9*100}%`;
        if (correct) {
          document.getElementById('puzzleFeedback').textContent = 'Tuyệt vời! Bạn đã khôi phục thông điệp an toàn.';
          finishTimer = setTimeout(() => finishGame(80, 80), 500);
        }
      }
      drawPuzzle();
      document.getElementById('quitGame').addEventListener('click', closeModal);
      activeGameCleanup = () => { if (finishTimer) clearTimeout(finishTimer); };
    }

    // 09 — Fast reaction game: tap safe signals, leave suspicious prompts untouched.
    function renderReflexGame() {
      let seconds = 18, points = 0, hits = 0, mistakes = 0, current = null, currentIndex = -1, tokenTimer = null;
      const targets = [
        { icon:'🛡️', label:'HỎI NGƯỜI LỚN', safe:true },
        { icon:'💜', label:'TÔN TRỌNG', safe:true },
        { icon:'📣', label:'BÁO CÁO', safe:true },
        { icon:'🔐', label:'GỬI MÃ OTP', safe:false },
        { icon:'🎁', label:'LINK QUÀ LẠ', safe:false },
        { icon:'📍', label:'CHIA SẺ VỊ TRÍ', safe:false }
      ];
      modalContent.innerHTML = `
        <div class="game-progress-top"><span>THỬ THÁCH PHẢN XẠ</span><span class="game-clock">⏱ <span id="reflexClock">18</span> giây</span></div>
        <div class="mini-track"><span id="reflexTrack" style="width:0%"></span></div>
        <h3 class="prompt-title">Chạm tín hiệu tốt – né yêu cầu rủi ro!</h3>
        <p class="prompt-copy">Khi ô xanh xuất hiện, hãy chạm thật nhanh. Ô đỏ là bẫy — đừng chạm vào!</p>
        <div class="reflex-arena" id="reflexArena">${Array.from({length:9},(_,i)=>`<button type="button" class="reflex-pad" data-reflex-pad="${i}" disabled><span class="reflex-symbol">·</span>Đang chờ</button>`).join('')}</div>
        <div class="mini-feedback" id="reflexFeedback" aria-live="polite">Bắt đầu thôi! Chạm vào biểu tượng an toàn, bỏ qua biểu tượng đỏ.</div>
        <div class="game-progress-top"><span>Điểm: <b id="reflexPoints">0</b></span><span>Chạm đúng: <b id="reflexHits">0</b> · Nhầm: <b id="reflexMistakes">0</b></span></div>
        <div class="modal-actions"><button type="button" class="quiet-btn" id="quitGame">Thoát trò chơi</button><span class="small-note">Mỗi lần chạm đúng: +2 điểm</span></div>
      `;
      const pads = [...document.querySelectorAll('[data-reflex-pad]')];
      function pickTarget() {
        pads.forEach(pad => { pad.className = 'reflex-pad'; pad.innerHTML = '<span class="reflex-symbol">·</span>Đang chờ'; pad.disabled = true; });
        currentIndex = Math.floor(Math.random() * pads.length);
        current = targets[Math.floor(Math.random() * targets.length)];
        const pad = pads[currentIndex];
        pad.classList.add('active', current.safe ? 'safe' : 'risky');
        pad.innerHTML = `<span class="reflex-symbol">${current.icon}</span>${current.label}`;
        pad.disabled = false;
      }
      function tapPad(index) {
        if (!current || index !== currentIndex) return;
        const feedback = document.getElementById('reflexFeedback');
        if (current.safe) {
          points += 2; hits++;
          feedback.textContent = 'Chuẩn! Đây là một hành động an toàn.';
          feedback.style.color = '#176044';
        } else {
          points = Math.max(0, points - 2); mistakes++;
          feedback.textContent = 'Đó là tín hiệu cần cảnh giác. Hãy nhớ không gửi mã, mật khẩu hay vị trí.';
          feedback.style.color = '#a82c28';
        }
        document.getElementById('reflexPoints').textContent = points;
        document.getElementById('reflexHits').textContent = hits;
        document.getElementById('reflexMistakes').textContent = mistakes;
        current = null;
        pads[index].disabled = true;
        pads[index].classList.remove('active','safe','risky');
        pads[index].innerHTML = '<span class="reflex-symbol">✓</span>Đã chọn';
      }
      pads.forEach((pad,index) => pad.addEventListener('click', () => tapPad(index)));
      pickTarget();
      const spawnTimer = setInterval(pickTarget, 850);
      const clockTimer = setInterval(() => {
        seconds--;
        document.getElementById('reflexClock').textContent = seconds;
        document.getElementById('reflexTrack').style.width = `${(18-seconds)/18*100}%`;
        if (seconds <= 0) {
          clearInterval(spawnTimer); clearInterval(clockTimer);
          pads.forEach(pad => pad.disabled = true);
          const finalPoints = Math.min(points, 36);
          finishGame(finalPoints, 36);
        }
      }, 1000);
      document.getElementById('quitGame').addEventListener('click', closeModal);
      activeGameCleanup = () => { clearInterval(spawnTimer); clearInterval(clockTimer); if (tokenTimer) clearTimeout(tokenTimer); };
    }

    function finishGame(points, maxPoints) {
      cleanupActiveGame();
      completedGames.add(currentGame);
      updateProgress();
      const pct = Math.round(points / maxPoints * 100);
      const headline = pct >= 80 ? 'Bạn làm rất tốt!' : pct >= 50 ? 'Bạn đang tiến bộ!' : 'Mỗi lần thử là một lần học!';
      const message = currentGame === 'fiveSteps' || ['maze','sortSignals','memory','puzzle','reflex'].includes(currentGame)
        ? 'Hãy nhớ: khi gặp chuyện không an toàn, bạn không phải tự xử lý. Kết nối với người lớn tin cậy để được hỗ trợ.'
        : 'Điều quan trọng không phải là luôn chọn đúng ngay từ đầu, mà là hiểu vì sao một lựa chọn an toàn và biết tìm sự hỗ trợ khi cần.';
      modalContent.innerHTML = `
        <div class="result-screen">
          <div class="result-medal">${pct >= 80 ? '🏅' : '⭐'}</div>
          <h3>${headline}</h3>
          <p>${message}</p>
          <div class="result-score">${points} / ${maxPoints} điểm kỹ năng</div>
          <div class="modal-actions" style="justify-content:center; flex-wrap:wrap">
            <button type="button" class="quiet-btn" id="backToGames">Chọn trò khác</button>
            <button type="button" class="modal-next" id="replayGame">Chơi lại ↻</button>
          </div>
          <p class="small-note">Tiến độ chỉ được tính trong phiên chơi hiện tại; trang mẫu không yêu cầu đăng nhập hay thu thập thông tin cá nhân.</p>
        </div>
      `;
      document.getElementById('backToGames').addEventListener('click', closeModal);
      document.getElementById('replayGame').addEventListener('click', () => startGame(currentGame));
    }

    // Bức tường yêu thương: local demo by default; optional shared Supabase backend.
    // Set both values to enable shared posting. Keep the anon key protected by RLS policies.
    const WALL_CONFIG = {
      supabaseUrl: '',
      supabaseAnonKey: ''
    };
    const WALL_STORAGE_KEY = 'khong-mot-minh-wall-v1';
    const WALL_RATE_KEY = 'khong-mot-minh-wall-rate-v1';
    const WALL_MAX_CHARS = 240;
    const wallSeeds = [
      { id:'seed-1', message:'Bạn xứng đáng được tôn trọng, cả ngoài đời lẫn trên mạng.', category:'Lời động viên', seed:true },
      { id:'seed-2', message:'Một lời hỏi thăm đúng lúc cũng có thể làm ngày của ai đó tốt hơn.', category:'Lời động viên', seed:true },
      { id:'seed-3', message:'Đừng chia sẻ điều riêng tư của người khác khi chưa được đồng ý.', category:'Cam kết tử tế', seed:true },
      { id:'seed-4', message:'Nếu đang gặp chuyện khó, hãy tìm một người đáng tin để cùng tháo gỡ.', category:'Điều tích cực', seed:true },
      { id:'seed-5', message:'Mỗi người một khác biệt, và mọi người đều xứng đáng được lắng nghe.', category:'Điều tích cực', seed:true },
      { id:'seed-6', message:'Tử tế trên mạng cũng quan trọng như tử tế ngoài đời.', category:'Cam kết tử tế', seed:true }
    ];
    const wallForm = document.getElementById('wallForm');
    const wallMessage = document.getElementById('wallMessage');
    const wallCategory = document.getElementById('wallCategory');
    const wallCharCount = document.getElementById('wallCharCount');
    const wallStatus = document.getElementById('wallStatus');
    const wallSubmit = document.getElementById('wallSubmit');
    const wallMessagesNode = document.getElementById('wallMessages');
    const wallCountNode = document.getElementById('wallCount');
    const wallEmpty = document.getElementById('wallEmpty');
    const wallModeNode = document.getElementById('wallMode');
    const wallModeText = document.getElementById('wallModeText');
    const wallFootnote = document.getElementById('wallFootnote');
    const wallClear = document.getElementById('wallClear');
    const wallUsesCloud = Boolean(WALL_CONFIG.supabaseUrl && WALL_CONFIG.supabaseAnonKey);
    let wallApprovedMessages = [];

    function readLocalWall() {
      try {
        const parsed = JSON.parse(localStorage.getItem(WALL_STORAGE_KEY) || '[]');
        return Array.isArray(parsed) ? parsed.filter(item => item && typeof item.message === 'string') : [];
      } catch (error) {
        return [];
      }
    }

    function saveLocalWall(messages) {
      try {
        localStorage.setItem(WALL_STORAGE_KEY, JSON.stringify(messages.slice(0, 50)));
        return true;
      } catch (error) {
        return false;
      }
    }

    function showWallStatus(message, isError = false) {
      wallStatus.textContent = message;
      wallStatus.classList.add('show');
      wallStatus.classList.toggle('error', isError);
    }

    function validateWallMessage(raw) {
      const text = raw.trim().replace(/\s+/g, ' ');
      if (text.length < 8) return { error: 'Thông điệp cần có ít nhất 8 ký tự nhé.' };
      if (text.length > WALL_MAX_CHARS) return { error: 'Thông điệp dài tối đa 240 ký tự.' };
      const checks = [
        { pattern: /[\w.+-]+@[\w.-]+\.[A-Z]{2,}/i, message: 'Đừng đăng email hoặc thông tin liên hệ cá nhân nhé.' },
        { pattern: /(?:https?:\/\/|www\.|facebook\.com|instagram\.com|t\.me\/|zalo\.me\/)/i, message: 'Bức tường không nhận đường dẫn hoặc tài khoản mạng xã hội.' },
        { pattern: /(?:\+?84|0)(?:[\s().-]?\d){8,10}/, message: 'Đừng đăng số điện thoại hoặc thông tin liên hệ nhé.' },
        { pattern: /@[a-zA-Z0-9_.]{3,}/, message: 'Đừng đăng tên tài khoản hoặc thông tin nhận diện nhé.' },
        { pattern: /\b(đồ ngu|ngu ngốc|đồ khốn|cút đi|đánh mày|giết mày|đáng bị đánh)\b/i, message: 'Hãy thử viết lại bằng lời lẽ tôn trọng và không gây tổn thương nhé.' }
      ];
      for (const check of checks) if (check.pattern.test(text)) return { error: check.message };
      return { value: text };
    }

    function checkWallRateLimit() {
      if (wallUsesCloud) return true;
      const now = Date.now();
      let recent = [];
      try { recent = JSON.parse(localStorage.getItem(WALL_RATE_KEY) || '[]'); } catch (error) { recent = []; }
      if (!Array.isArray(recent)) recent = [];
      recent = recent.filter(timestamp => Number.isFinite(timestamp) && now - timestamp < 10 * 60 * 1000);
      if (recent.length >= 3) return false;
      recent.push(now);
      try { localStorage.setItem(WALL_RATE_KEY, JSON.stringify(recent)); } catch (error) { /* local demo still works for this session */ }
      return true;
    }

    function makeWallCard(item) {
      const article = document.createElement('article');
      article.className = 'wall-card';
      const quote = document.createElement('p');
      quote.textContent = item.message;
      const meta = document.createElement('div');
      meta.className = 'wall-card-meta';
      const category = document.createElement('span');
      category.textContent = item.category || 'Thông điệp tích cực';
      const author = document.createElement('span');
      author.textContent = item.seed ? 'GỢI Ý TỪ CHƯƠNG TRÌNH' : 'MỘT NGƯỜI BẠN';
      meta.append(category, author);
      article.append(quote, meta);
      return article;
    }

    function renderWall() {
      const ownMessages = wallUsesCloud ? wallApprovedMessages : readLocalWall();
      const allMessages = [...ownMessages, ...wallSeeds];
      wallMessagesNode.replaceChildren();
      allMessages.forEach(item => wallMessagesNode.appendChild(makeWallCard(item)));
      wallCountNode.textContent = String(allMessages.length);
      wallEmpty.style.display = allMessages.length ? 'none' : 'block';
    }

    async function loadSharedWall() {
      if (!wallUsesCloud) return;
      wallModeNode.textContent = '● TƯỜNG CHUNG';
      wallModeNode.style.background = '#e7f8f0';
      wallModeNode.style.color = '#176344';
      wallModeText.textContent = 'Thông điệp đã được duyệt từ cộng đồng';
      wallClear.hidden = true;
      wallFootnote.textContent = 'Thông điệp gửi lên sẽ ở trạng thái chờ duyệt và chỉ xuất hiện công khai sau khi người quản trị kiểm tra. Website không yêu cầu tên hoặc email người gửi.';
      renderWall();
      const baseUrl = WALL_CONFIG.supabaseUrl.replace(/\/$/, '');
      try {
        const response = await fetch(`${baseUrl}/rest/v1/kind_wall_messages?select=id,message,category,created_at&approved=eq.true&order=created_at.desc&limit=24`, {
          headers: { apikey: WALL_CONFIG.supabaseAnonKey, Authorization: `Bearer ${WALL_CONFIG.supabaseAnonKey}` }
        });
        if (!response.ok) throw new Error('Không thể tải thông điệp.');
        const rows = await response.json();
        wallApprovedMessages = Array.isArray(rows) ? rows.map(row => ({ id: row.id, message: row.message, category: row.category })) : [];
        renderWall();
      } catch (error) {
        showWallStatus('Chưa kết nối được bức tường chung. Bạn hãy thử tải lại trang sau nhé.', true);
      }
    }

    wallMessage.addEventListener('input', () => {
      wallCharCount.textContent = `${wallMessage.value.length} / ${WALL_MAX_CHARS}`;
    });

    wallForm.addEventListener('submit', async event => {
      event.preventDefault();
      wallStatus.classList.remove('show', 'error');
      const validation = validateWallMessage(wallMessage.value);
      if (validation.error) { showWallStatus(validation.error, true); return; }
      if (!document.getElementById('wallConsent').checked) {
        showWallStatus('Bạn cần xác nhận quy tắc an toàn trước khi gửi nhé.', true);
        return;
      }
      if (!checkWallRateLimit()) {
        showWallStatus('Bạn đã gửi 3 lời nhắn trong 10 phút. Hãy nghỉ một chút rồi quay lại nhé.', true);
        return;
      }
      const item = { id: `local-${Date.now()}`, message: validation.value, category: wallCategory.value, createdAt: new Date().toISOString() };
      wallSubmit.disabled = true;
      wallSubmit.textContent = 'Đang gửi…';
      try {
        if (wallUsesCloud) {
          const baseUrl = WALL_CONFIG.supabaseUrl.replace(/\/$/, '');
          const response = await fetch(`${baseUrl}/rest/v1/kind_wall_messages`, {
            method: 'POST',
            headers: {
              apikey: WALL_CONFIG.supabaseAnonKey,
              Authorization: `Bearer ${WALL_CONFIG.supabaseAnonKey}`,
              'Content-Type': 'application/json',
              Prefer: 'return=minimal'
            },
            body: JSON.stringify({ message: item.message, category: item.category, approved: false })
          });
          if (!response.ok) throw new Error('Không gửi được thông điệp.');
          wallForm.reset();
          wallCharCount.textContent = `0 / ${WALL_MAX_CHARS}`;
          showWallStatus('Cảm ơn bạn! Lời nhắn đã được gửi ẩn danh và sẽ xuất hiện sau khi được duyệt.');
        } else {
          const messages = readLocalWall();
          messages.unshift(item);
          if (!saveLocalWall(messages)) throw new Error('Trình duyệt không thể lưu lời nhắn.');
          wallForm.reset();
          wallCharCount.textContent = `0 / ${WALL_MAX_CHARS}`;
          renderWall();
          showWallStatus('Đã gửi! Lời nhắn của bạn xuất hiện trên bức tường của trình duyệt này.');
        }
      } catch (error) {
        showWallStatus(error.message || 'Có lỗi khi gửi. Vui lòng thử lại.', true);
      } finally {
        wallSubmit.disabled = false;
        wallSubmit.textContent = 'Gửi thông điệp ↗';
      }
    });

    wallClear.addEventListener('click', () => {
      if (wallUsesCloud) return;
      if (!readLocalWall().length) {
        showWallStatus('Bạn chưa có lời nhắn nào được lưu trên thiết bị này.');
        return;
      }
      if (window.confirm('Xóa tất cả lời nhắn đã gửi trên trình duyệt này?')) {
        saveLocalWall([]);
        renderWall();
        showWallStatus('Đã xóa các lời nhắn được lưu trên thiết bị này.');
      }
    });

    if (!wallUsesCloud) {
      wallModeText.textContent = 'Lời nhắn chỉ lưu trong trình duyệt này';
      wallModeNode.title = 'Chưa kết nối cơ sở dữ liệu chung';
      renderWall();
    } else {
      loadSharedWall();
    }

/* =========================================================
   MOTION PACK — reveal khi cuộn, hạt sáng, ripple và tilt nhẹ
   ========================================================= */
(() => {
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;
  const hero = document.querySelector('.hero');

  // Hạt sáng trang trí: vị trí cố định để hiệu ứng ổn định giữa các lần tải.
  if (hero && !reduceMotion && !hero.querySelector('.hero-sparkles')) {
    const sparkles = document.createElement('div');
    sparkles.className = 'hero-sparkles';
    sparkles.setAttribute('aria-hidden', 'true');
    const sparkPositions = [
      ['8%', '20%', '16px', '4.8s', '-.7s'],
      ['18%', '72%', '12px', '5.4s', '-2s'],
      ['38%', '13%', '18px', '4.4s', '-1.2s'],
      ['54%', '80%', '13px', '5.8s', '-3s'],
      ['72%', '18%', '15px', '4.9s', '-.2s'],
      ['88%', '66%', '20px', '6.2s', '-2.4s'],
      ['95%', '30%', '12px', '5.2s', '-1.7s'],
      ['46%', '48%', '11px', '4.6s', '-2.8s']
    ];
    sparkPositions.forEach(([x, y, size, duration, delay]) => {
      const spark = document.createElement('span');
      spark.className = 'hero-spark';
      spark.textContent = '✦';
      spark.style.setProperty('--spark-x', x);
      spark.style.setProperty('--spark-y', y);
      spark.style.setProperty('--spark-size', size);
      spark.style.setProperty('--spark-duration', duration);
      spark.style.setProperty('--spark-delay', delay);
      sparkles.appendChild(spark);
    });
    hero.prepend(sparkles);
  }

  // Đưa các khối vào hiệu ứng xuất hiện khi được cuộn tới.
  const revealTargets = [
    '.section-head', '.game-card', '.progress-inner', '.wall-form-card',
    '.wall-display', '.step-card', '.support-card', '.support-list'
  ];
  const revealNodes = document.querySelectorAll(revealTargets.join(','));
  revealNodes.forEach((node, index) => {
    node.classList.add('scroll-reveal');
    if (node.matches('.game-card, .step-card')) {
      node.style.setProperty('--reveal-delay', `${(index % 4) * 65}ms`);
    }
  });

  if (!reduceMotion && 'IntersectionObserver' in window) {
    body.classList.add('motion-ready');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealNodes.forEach(node => revealObserver.observe(node));
  } else {
    revealNodes.forEach(node => node.classList.add('is-visible'));
  }

  // Ripple cho các nút chính, không can thiệp thao tác bên trong game.
  document.addEventListener('click', event => {
    if (reduceMotion) return;
    const button = event.target.closest('.btn, .nav-cta, .wall-submit');
    if (!button || button.disabled) return;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'click-ripple';
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    if (getComputedStyle(button).position === 'static') button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  });

  // Nghiêng rất nhẹ thẻ game theo vị trí con trỏ trên máy tính.
  // Trên màn hình cảm ứng hoặc khi bật Reduce Motion, hiệu ứng này tự tắt.
  const canHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (canHover && !reduceMotion) {
    document.querySelectorAll('.game-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        if (event.pointerType !== 'mouse') return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(850px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
      card.addEventListener('blur', () => { card.style.transform = ''; });
    });
  }
})();
