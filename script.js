const todayBtn =
  document.getElementById(
    "todayBtn"
  );

todayBtn.addEventListener(
  "click",
  () => {

    const today =
      new Date();

    const weekdays = [
      "日",
      "月",
      "火",
      "水",
      "木",
      "金",
      "土"
    ];

    const year =
      today.getFullYear();

    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        today.getDate()
      ).padStart(2, "0");

    const weekday =
      weekdays[
        today.getDay()
      ];

    document.getElementById(
      "tournamentDate"
    ).value =
      `${year}/${month}/${day}(${weekday})`;

    saveSettings();
    updatePreview();

  }
);


const saveBtn =
  document.getElementById("saveBtn");

const deleteBtn =
  document.getElementById("deleteBtn");

const deckName =
  document.getElementById("deckName");

const recordArea =
  document.getElementById("recordArea");
const summaryArea =
  document.getElementById(
    "summaryArea"
  );
let records =
  JSON.parse(
    localStorage.getItem("records")
  ) || {

    yosen: [],
    honsen: []

  };

let yosenWin = 0;
let yosenLose = 0;

records.yosen.forEach(record => {

  if (record.result === "勝") {
    yosenWin++;
  } else {
    yosenLose++;
  }

});

let honsenWin = 0;
let honsenLose = 0;

function updateRecordView() {

  honsenWin = 0;
  honsenLose = 0;
  yosenWin = 0;
  yosenLose = 0;

  records.yosen.forEach(record => {

    if (record.result === "勝") {

      yosenWin++;

    } else {

      yosenLose++;

    }

  });

  records.honsen.forEach(record => {

    if (record.result === "勝") {

      honsenWin++;

    } else {

      honsenLose++;

    }

  });


const totalWin =
  yosenWin + honsenWin;

const totalLose =
  yosenLose + honsenLose;

summaryArea.innerHTML = `
  <div class="summary-card">

    <div>
      予選　 ${yosenWin}-${yosenLose}
    </div>
    
    <div>
      本戦　 ${honsenWin}-${honsenLose}
    </div>

    <div>
      総合　 ${totalWin}-${totalLose}
    </div>

  </div>
`;
  recordArea.innerHTML = "";

recordArea.innerHTML = `
  <h2>予選</h2>
`;
if (records.yosen.length === 0) {

  recordArea.innerHTML += `
    <p>
      まだ対戦が登録されていません
    </p>
  `;
}
records.yosen.forEach(
  (record, index) => {

    recordArea.innerHTML += `
      <div class="match">

        <div class="deck-name">
          ${index + 1}. ${record.deck}
        </div>

        <div class="tags">

          <span class="play-tag">
            ${record.play}
          </span>

          <span class="result-tag ${record.result}">
            ${record.result}
          </span>

        </div>

      </div>
    `;
  }
);

recordArea.innerHTML += `
  <h2>本戦</h2>
`;
if (records.honsen.length === 0) {

  recordArea.innerHTML += `
    <p>
      まだ対戦が登録されていません
    </p>
  `;
}
records.honsen.forEach(
  (record, index) => {

    recordArea.innerHTML += `
      <div class="match">

        <div class="deck-name">
          ${index + 1}. ${record.deck}
        </div>

        <div class="tags">

          <span class="play-tag">
            ${record.play}
          </span>

          <span class="result-tag ${record.result}">
            ${record.result}
          </span>

        </div>

      </div>
    `;
  }
);

}

saveBtn.addEventListener(
  "click",
  () => {

    const deck =
      deckName.value.trim();

    if (deck === "") {
      return;
    }

    const play =
      document.querySelector(
        'input[name="play"]:checked'
      ).value;

    const result =
      document.querySelector(
        'input[name="result"]:checked'
      ).value;

const phase =
  document.querySelector(
    'input[name="phase"]:checked'
  ).value;

if (phase === "予選") {

  records.yosen.push({
    deck: deck,
    play: play,
    result: result
  });

} else {

  records.honsen.push({
    deck: deck,
    play: play,
    result: result
  });

}

localStorage.setItem(
  "records",
  JSON.stringify(records)
);

updateRecordView();
updatePreview();

deckName.value = "";

  }
);

deleteBtn.addEventListener(
  "click",
  () => {

    if (
      records.yosen.length === 0 &&
      records.honsen.length === 0
    ) {
      return;
    }

    if (
      records.honsen.length > 0
    ) {

      records.honsen.pop();

    } else {

      records.yosen.pop();

    }

    localStorage.setItem(
      "records",
      JSON.stringify(records)
    );

    updateRecordView();
    updatePreview();

  }
);
const phaseRadios =
  document.querySelectorAll(
    'input[name="phase"]'
  );

let previousPhase =
  document.querySelector(
    'input[name="phase"]:checked'
  ).value;

phaseRadios.forEach(radio => {

  radio.addEventListener(
    "change",
    () => {

      const newPhase =
        radio.value;

      let message = "";

      if (
        previousPhase === "予選" &&
        newPhase === "本戦"
      ) {

        message =
          "本戦に進出しますか？";

      } else if (
        previousPhase === "本戦" &&
        newPhase === "予選"
      ) {

        message =
          "予選戦績入力に切り替えますか？";

      }

      if (
        !confirm(message)
      ) {

        document.querySelector(
          `input[name="phase"][value="${previousPhase}"]`
        ).checked = true;

        return;
      }

      previousPhase =
        newPhase;
saveSettings();
    }
  );

});
const addInfoBtn =
  document.getElementById(
    "addInfoBtn"
  );

const extraInfoArea =
  document.getElementById(
    "extraInfoArea"
  );

addInfoBtn.addEventListener(
  "click",
  () => {

    const input =
      document.createElement(
        "input"
      );

    input.type = "text";

    input.className =
      "extraInfo";

    input.placeholder =
      "項目を入力";

extraInfoArea.appendChild(
  input
);
saveSettings();
  }
);
const removeInfoBtn =
  document.getElementById(
    "removeInfoBtn"
  );

removeInfoBtn.addEventListener(
  "click",
  () => {

    const inputs =
      extraInfoArea.querySelectorAll(
        ".extraInfo"
      );

    if (inputs.length <= 1) {
      return;
    }

    const lastInput =
      inputs[inputs.length - 1];

lastInput.remove();

saveSettings();

}
);
const finalResult =
  document.getElementById(
    "finalResult"
  );

const customResult =
  document.getElementById(
    "customResult"
  );
const headerImageInput =
  document.getElementById(
    "headerImageInput"
  );

headerImageInput.addEventListener(
  "change",
  event => {

    const file =
      event.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

reader.onload = () => {

  const img =
    new Image();

  img.onload = () => {


    const canvas =
      document.createElement(
        "canvas"
      );

    const maxWidth = 1200;
const maxHeight = 2000;

let width =
  img.width;

let height =
  img.height;

const scale = Math.min(
  maxWidth / width,
  maxHeight / height,
  1
);

width =
  Math.round(width * scale);

height =
  Math.round(height * scale);
    canvas.width =
      width;

    canvas.height =
      height;

    const ctx =
      canvas.getContext(
        "2d"
      );

    ctx.drawImage(
      img,
      0,
      0,
      width,
      height
    );

    const compressedImage =
      canvas.toDataURL(
        "image/jpeg",
        0.8
      );

    try {

      localStorage.setItem(
        "headerImage",
        compressedImage
      );

      updatePreview();

    } catch {

      alert(
        "画像サイズが大きすぎるため読み込めませんでした。\n別の画像をお試しください。"
      );

    }

  };

  img.src =
    reader.result;

};

    reader.readAsDataURL(
      file
    );

  }
);
const removeHeaderImageBtn =
  document.getElementById(
    "removeHeaderImageBtn"
  );

removeHeaderImageBtn.addEventListener(
  "click",
  () => {

    localStorage.removeItem(
      "headerImage"
    );

    headerImageInput.value = "";


    updatePreview();

setTimeout(() => {
  resizePreview();
}, 50);
  }
);

finalResult.addEventListener(
  "change",
  () => {

    if (
      finalResult.value ===
      "その他(自分で入力)"
    ) {

      customResult.style.display =
        "block";

    } else {

      customResult.style.display =
        "none";

    }

    updatePreview();

  }
);
function updatePreview() {

  const previewArea =
    document.getElementById(
      "previewArea"
    );

  const deck =
    document.getElementById(
      "myDeck"
    ).value;

  const tournament =
    document.getElementById(
      "tournamentName"
    ).value;

  const date =
    document.getElementById(
      "tournamentDate"
    ).value;
  
  const headerImage =
  localStorage.getItem(
    "headerImage"
  );
  
const extraInfos =
  document.querySelectorAll(
    ".extraInfo"
  );

let extraHtml = "";
  let headerImageHtml = "";

if (headerImage) {

  headerImageHtml = `
    <div class="preview-header-image-card">

      <img
        src="${headerImage}"
        alt=""
      >

    </div>
  `;

}

extraInfos.forEach(input => {

  if (
    input.value.trim() !== ""
  ) {

    extraHtml += `
      <div>
        ${input.value}
      </div>
    `;

  }

});
  let yosenWin = 0;
let yosenLose = 0;

records.yosen.forEach(record => {

  if (record.result === "勝") {

    yosenWin++;

  } else {

    yosenLose++;

  }

});
let resultText = "";
let resultClass = "";

const selectedResult =
  document.getElementById(
    "finalResult"
  ).value.trim();

let displayResult =
  selectedResult;

if (
  selectedResult ===
  "その他(自分で入力)"
) {

  displayResult =
    document.getElementById(
      "customResult"
    ).value.trim();

}

let rankSize = 60;

if (
  selectedResult ===
  "その他(自分で入力)"
) {

  rankSize =
    Math.max(
      26,
      60 - displayResult.length * 6
    );

}if (
  selectedResult === "予選敗退"
) {

  resultText =
    "予選敗退";

  resultClass =
    "status-lose";

} else if (
  records.honsen.length > 0
) {

  resultText =
    "本戦進出";

  resultClass =
    "status-win";

} else if (
  selectedResult &&
  selectedResult !== "未選択"
) {

  resultText = `
    <span class="result-label">
      最終順位
    </span>

<span
  class="result-rank status-win"
  style="font-size:${rankSize}px;"
>
  ${displayResult}
</span>
  `;

  resultClass = "";

} else {

  resultText =
    "予選進行中";

  resultClass =
    "status-progress";

}
let yosenHtml = "";

records.yosen.forEach(record => {

yosenHtml += `
 <div class="preview-match-row">

  <span class="preview-deck-name">
    ${record.deck}
  </span>

  <div class="preview-tags">

    <span class="preview-play-tag ${record.play}">
      ${record.play}
    </span>

    <span class="preview-result-tag ${record.result}">
      ${record.result}
    </span>

  </div>
</div>
`;

});
  let honsenHtml = "";
  let honsenWin = 0;
let honsenLose = 0;

records.honsen.forEach(record => {

 honsenHtml += `
  <div class="preview-match-row">

    <span class="preview-deck-name">
      ${record.deck}
    </span>

    <div class="preview-tags">

      <span class="preview-play-tag ${record.play}">
        ${record.play}
      </span>

      <span class="preview-result-tag ${record.result}">
        ${record.result}
      </span>

    </div>

  </div>
`;

});
const summaryArea =
  document.getElementById(
    "summaryArea"
  );
records.honsen.forEach(record => {

  if (record.result === "勝") {

    honsenWin++;

  } else {

    honsenLose++;

  }

});

const totalWin =
  yosenWin + honsenWin;

const totalLose =
  yosenLose + honsenLose;

let honsenResultText = `
  <span class="result-rank">
    本戦進行中
  </span>
`;

let honsenResultClass =
  "status-progress";

if (
  selectedResult !== "未選択" &&
  selectedResult !== "予選敗退"
) {

  honsenResultText = `
  <span class="result-label">
    最終順位
  </span>

<span
  class="result-rank status-win"
  style="font-size:${rankSize}px;"
>
  ${displayResult}
</span>
`;

honsenResultClass = "";

}
  let honsenCardHtml = "";
  if (
  records.honsen.length > 0
) {

  honsenCardHtml = `
    <div class="preview-match-card">

      <div class="preview-card-title">
        本戦
      </div>

      ${honsenHtml}

      <div class="preview-summary">

<span class="preview-score-label">
  総合戦績
  <span class="preview-score">
    ${totalWin}-${totalLose}
  </span>
</span>


<div class="preview-status ${honsenResultClass}">
  ${honsenResultText}
</div>

      </div>

    </div>
  `;

}
previewArea.innerHTML = `

  <div class="preview-header">

    <div class="preview-title">
      ${tournament || "大会名"}
    </div>

    <div class="preview-date">
      ${date || "開催日"}
    </div>

  </div>

  <div class="preview-info-card">

    ${extraHtml}

  </div>

  <div class="preview-deck-card">

    <div class="preview-label">
      使用デッキ
    </div>

    <div class="preview-deck">
      ${deck || "デッキ名"}
    </div>

  </div>
  ${headerImageHtml}
<div class="preview-match-card">

  <div class="preview-card-title">
    予選
  </div>

  ${yosenHtml}

<div class="preview-summary">

<span class="preview-score-label">
  予選戦績

  <span class="preview-score">
    ${yosenWin}-${yosenLose}
  </span>

</span>


  <span class="preview-status result-rank ${resultClass}">
  ${resultText}
</span>

</div>

</div>
${honsenCardHtml}

`;

requestAnimationFrame(() => {
  resizePreview();
});

}
updatePreview();
document
  .getElementById("myDeck")
  .addEventListener(
    "input",
    () => {

      saveSettings();
      updatePreview();

    }
  );


document
  .getElementById("tournamentName")
  .addEventListener(
    "input",
    () => {

      saveSettings();
      updatePreview();

    }
  );
document.addEventListener(
  "input",
  (event) => {

if (
  event.target.classList.contains(
    "extraInfo"
  )
) {

  saveSettings();
  updatePreview();

}

  }
);
document
  .getElementById(
    "customResult"
  )
  .addEventListener(
    "input",
    () => {

      saveSettings();
      updatePreview();

    }
  );
function resizePreview() {

  const preview =
    document.getElementById(
      "previewArea"
    );

  const wrapper =
    document.querySelector(
      ".preview-wrapper"
    );

  const scale =
  Math.min(
    (wrapper.clientWidth -30)/ 950,
    1
  );

preview.style.transform =
  `scale(${scale})`;

preview.style.transformOrigin =
  "top left";

const scaledWidth =
  950 * scale;

preview.style.marginLeft =
  `${(wrapper.clientWidth - scaledWidth) / 2}px`;

wrapper.style.height =
  `${Math.ceil(
    preview.getBoundingClientRect().height
  ) + 25}px`;}

window.addEventListener(
  "resize",
  resizePreview
);

resizePreview();

const saveImageBtn =
  document.getElementById(
    "saveImageBtn"
  );

const resetBtn =
  document.getElementById(
    "resetBtn"
  );

loadSettings();
updateRecordView();
updatePreview();

document.getElementById(
  "previewArea"
).style.visibility = "visible";

if (
  finalResult.value ===
  "その他(自分で入力)"
) {

  customResult.style.display =
    "block";

}
updatePreview();
saveImageBtn.addEventListener(
  "click",
  async () => {

    const preview =
      document.getElementById(
        "previewArea"
      );

    const canvas =
      await html2canvas(
        preview,
        {
          scale: 4
        }
      );

    canvas.toBlob(blob => {

      const file =
        new File(
          [blob],
          "cs-result.png",
          {
            type: "image/png"
          }
        );

      if (
        navigator.share &&
        navigator.canShare({
          files: [file]
        })
      ) {

        navigator.share({
          files: [file],
          title: "CS戦績"
        });

      } else {

        const link =
          document.createElement(
            "a"
          );

        link.download =
          "cs-result.png";

        link.href =
          canvas.toDataURL(
            "image/png"
          );

        link.click();

      }

    });

  }
);
function saveSettings() {

  localStorage.setItem(
    "myDeck",
    document.getElementById(
      "myDeck"
    ).value
  );

  localStorage.setItem(
    "tournamentName",
    document.getElementById(
      "tournamentName"
    ).value
  );

  localStorage.setItem(
    "tournamentDate",
    document.getElementById(
      "tournamentDate"
    ).value
  );

  localStorage.setItem(
    "currentPhase",
    document.querySelector(
      'input[name="phase"]:checked'
    ).value
  );
const extraInfos = [];

document
  .querySelectorAll(".extraInfo")
  .forEach(input => {

    extraInfos.push(
      input.value
    );

  });

localStorage.setItem(
  "extraInfos",
  JSON.stringify(
    extraInfos
  )
);
}
function loadSettings() {

  const myDeck =
    localStorage.getItem(
      "myDeck"
    );

  const tournamentName =
    localStorage.getItem(
      "tournamentName"
    );

  const tournamentDate =
    localStorage.getItem(
      "tournamentDate"
    );

  const currentPhase =
    localStorage.getItem(
      "currentPhase"
    );

  if (myDeck) {
    document.getElementById(
      "myDeck"
    ).value = myDeck;
  }

  if (tournamentName) {
    document.getElementById(
      "tournamentName"
    ).value = tournamentName;
  }

  if (tournamentDate) {
    document.getElementById(
      "tournamentDate"
    ).value = tournamentDate;
  }

  document.getElementById(
    "finalResult"
  ).value = "未選択";

  if (currentPhase) {

    const radio =
      document.querySelector(
        `input[name="phase"][value="${currentPhase}"]`
      );

    if (radio) {
      radio.checked = true;
      previousPhase =
        currentPhase;
    }

  }

  const savedExtraInfos =
    JSON.parse(
      localStorage.getItem(
        "extraInfos"
      )
    ) || [];

  if (
    savedExtraInfos.length > 0
  ) {

    extraInfoArea.innerHTML = "";

    savedExtraInfos.forEach(
      (value, index) => {

        const input =
          document.createElement(
            "input"
          );

        input.type = "text";
        input.className =
          "extraInfo";
input.placeholder =
  "項目を入力";

        input.value = value;

        extraInfoArea.appendChild(
          input
        );

      }
    );

  }


}
resetBtn.addEventListener(
  "click",
  () => {

    if (
      !confirm(
        "新しい大会の入力を始めますか？\n現在の入力内容はすべて削除されます。"
      )
    ) {
      return;
    }

    localStorage.clear();

    records = {
      yosen: [],
      honsen: []
    };
    document.querySelector(
  'input[name="phase"][value="予選"]'
).checked = true;

previousPhase = "予選";

    document.getElementById(
      "myDeck"
    ).value = "";
document.getElementById(
  "finalResult"
).value = "未選択";
    document.getElementById(
  "deckName"
).value = "";

document.getElementById(
  "tournamentName"
).value = "";

document.getElementById(
  "tournamentDate"
).value = "";

document.getElementById(
  "customResult"
).value = "";
    document.querySelector(
  'input[name="play"][value="先攻"]'
).checked = true;

document.querySelector(
  'input[name="result"][value="勝"]'
).checked = true;
    extraInfoArea.innerHTML = `
  <input
    type="text"
    class="extraInfo"
    placeholder="項目を入力"
  >
`;

    updateRecordView();
    updatePreview();
    resizePreview();
  }
);

console.log(`
戦績画像メーカー

このサイトはチャッピーの言いなりになったそこら辺のカードゲーマーが作りました。
ほぼ切り貼りしただけなので、値札シールを剥がした後みたいベッチョベチョ
暖かい目で見てください
`);
