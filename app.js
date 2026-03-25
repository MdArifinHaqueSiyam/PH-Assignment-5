let issuesData = [];

const fetchAllIssues = async () => {
  toggleLoader(true);
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  issuesData = data.data;
  displayCards(issuesData);
};

const searchIssues = async (keyword) => {
  toggleLoader(true);
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${keyword}`,
  );
  const data = await res.json();
  displayCards(data.data);
};

const renderModalDetails = (issue) => {
  const modalBox = document.getElementById("modalContent");

  const updated = new Date(issue.updatedAt);
  const formatted = `${updated.getDate().toString().padStart(2, "0")}/${(
    updated.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${updated.getFullYear()}`;

  modalBox.innerHTML = `
  
 <div class="p-6">
      <h2 class="text-2xl font-bold text-slate-800">${issue.title}</h2>
      <div class="flex gap-2 mt-2 items-center">
  <span class="px-3 py-1 font-bold rounded-full text-white ${issue.status === "open" ? "bg-green-500" : "bg-purple-500"}">
    ${issue.status === "open" ? "Opened" : "Closed"}
  </span>

  <p class="text-sm text-slate-500">
    • ${issue.status === "open" ? "opened" : "closed"} by ${issue.author} • ${formatted}
  </p>
</div>
      
          <div class="flex flex-wrap gap-2  mt-4">
          ${issue.labels
            .map((tag, idx) => {
              if (idx === 0) {
                return `
        <span class="badge badge-outline bg-[#FECACA] border-red-200 text-red-400 text-[10px] font-bold px-2 py-1 uppercase">
          <i class="fa-solid fa-bug"></i> ${tag}
        </span>
      `;
              } else {
                return `
        <span class="badge badge-outline bg-[#FFF8DB] border-red-200 text-[#D97706] text-[10px] font-bold px-2 py-1 uppercase">
          <i class="fa-solid fa-life-ring"></i> ${tag}
        </span>
      `;
              }
            })
            .join("")}
  </div>
    </div>

    <div class="px-6 pb-6">
      <p class="text-slate-600 leading-relaxed">
        ${issue.description}
      </p>
    </div>

  <div class="bg-slate-50 p-6 flex justify-between items-center">
  <div>
    <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Assignee:</p>
    <p class="font-bold text-slate-800">${issue.author}</p>
  </div>

  <div class="text-right">
    <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Priority:</p>

    <span class="px-4 py-1 text-white text-xs font-bold rounded-full
    ${
      issue.priority === "high"
        ? "bg-red-500"
        : issue.priority === "medium"
          ? "bg-yellow-500"
          : "bg-green-500"
    }">
      ${issue.priority.toUpperCase()}
    </span>

  </div>
</div>

  `;
};

const openIssueModal = async (issueId) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`;
  const res = await fetch(url);
  const result = await res.json();

  renderModalDetails(result.data);

  document.getElementById("detailModal").showModal();
};

const displayCards = (issues) => {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";
  document.getElementById("issueCount").innerText = issues.length;

  issues.forEach((issue) => {
    const updated = new Date(issue.updatedAt);
    const formatted = `${updated.getDate().toString().padStart(2, "0")}/${(
      updated.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${updated.getFullYear()}`;

    const card = document.createElement("div");
    card.innerHTML = `
      <div onclick="openIssueModal(${issue.id})" class="bg-white rounded-xl border border-gray-100 h-[300px] shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
        <div class="${issue.status === "open" ? ` h-1.5 bg-green-500` : ` h-1.5 bg-[#A855F7]`} w-full"></div> 
        <div class="p-5">
            <div class="flex justify-between items-center mb-3">
                <div>
                  ${issue.status === "open" ? ` <img src="../assets/Open-Status.png" alt="">` : ` <img src="../assets/Closed- Status .png" alt="">`}  
                </div>
                
                <span
  class="badge badge-sm font-bold px-3 py-2 uppercase text-[10px]
  ${
    issue.priority === "high"
      ? "bg-red-100 text-red-500 border-red-100"
      : issue.priority === "medium"
        ? "bg-yellow-100 text-yellow-500 border-yellow-100"
        : "bg-green-100 text-green-500 border-green-100"
  }"
>
  ${issue.priority}
</span>
            </div>

            <h3 class="font-bold text-slate-800 text-sm mb-2 leading-tight">
                ${issue.title}
            </h3>
            <p class="text-xs text-slate-400 mb-4 line-clamp-2">
                ${issue.description}
            </p>

            <div class="flex flex-wrap gap-2 mb-6">
           ${issue.labels
             .map((tag, idx) => {
               if (idx === 0) {
                 return `
          <span class="badge badge-outline bg-[#FECACA] border-red-200 text-red-400 text-[10px] font-bold px-2 py-1 uppercase"> <i class="fa-solid fa-bug"></i>
            ${tag}
          </span>
        `;
               } else {
                 return `
          <span class="badge badge-outline bg-[#FFF8DB] border-red-200 text-[#D97706] text-[10px] font-bold px-2 py-1 uppercase"><i class="fa-solid fa-life-ring"></i>
            ${tag}
          </span>
        `;
               }
             })
             .join("")}
  </div>

            <div class="pt-4 border-t border-gray-200 flex flex-col gap-1">
                <p class="text-[11px] text-slate-400 font-medium">#${issue.id} by ${issue.author}</p>
                <p class="text-[11px] text-slate-400">${formatted}</p>
            </div>
        </div>
      </div>
    `;
    container.append(card);
  });

  toggleLoader(false);
};

const toggleLoader = (status) => {
  const loader = document.getElementById("loadingSpinner");
  if (status) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

const allBtn = document.getElementById("filterAll");
const openBtn = document.getElementById("filterOpen");
const closedBtn = document.getElementById("filterClosed");
const filterBtns = [allBtn, openBtn, closedBtn];

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("bg-[#6322FF]", "text-white"));
    btn.classList.add("bg-[#6322FF]", "text-white");
  });
});

document.getElementById("filterOpen").addEventListener("click", () => {
  toggleLoader(true);
  const openIssues = issuesData.filter((item) => item.status === "open");
  displayCards(openIssues);
});

document.getElementById("filterClosed").addEventListener("click", () => {
  toggleLoader(true);
  const closedIssues = issuesData.filter((item) => item.status === "closed");
  displayCards(closedIssues);
});

document.getElementById("filterAll").addEventListener("click", () => {
  toggleLoader(true);
  displayCards(issuesData);
});

document.getElementById("searchField").addEventListener("keyup", (e) => {
  const value = e.target.value;

  if (value === "") {
    displayCards(issuesData);
  } else {
    searchIssues(value);
  }
});

fetchAllIssues();
