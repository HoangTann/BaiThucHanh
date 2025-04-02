let users = [];
let computers = [];
let currentUser = null;

// Tải dữ liệu từ JSON
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        users = data.users;
        computers = data.computers;
    });

// Xử lý đăng nhập
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    currentUser = users.find(user => user.username === username && user.password === password);

    if (currentUser) {
        document.getElementById("menu").style.display = "block";
        document.getElementById("userName").innerText = currentUser.name;
        showMenu();
    } else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
}

// Hiển thị menu theo vai trò
function showMenu() {
    let options = "";
    if (currentUser.role === "player") {
        options = `
            <button onclick="playGame()">Chơi game</button>
            <button onclick="checkBalance()">Xem số dư</button>
            <button onclick="topUp()">Nạp tiền</button>
        `;
    } else if (currentUser.role === "employee") {
        options = `
            <button onclick="updateComputer()">Cập nhật máy</button>
            <button onclick="reportViolation()">Báo cáo vi phạm</button>
        `;
    } else if (currentUser.role === "admin") {
        options = `
            <button onclick="viewRevenue()">Xem doanh thu</button>
            <button onclick="viewComputers()">Xem tình trạng máy</button>
            <button onclick="viewViolations()">Xem báo cáo vi phạm</button>
        `;
    }
    document.getElementById("options").innerHTML = options;
}

// Chức năng cho người chơi
function playGame() {
    let time = prompt("Nhập số phút chơi:");
    let cost = time * 500; // 500 VND/phút
    if (currentUser.balance >= cost) {
        currentUser.balance -= cost;
        alert(`Bạn đã chơi ${time} phút. Số dư còn lại: ${currentUser.balance} VND`);
    } else {
        alert("Số dư không đủ!");
    }
}

function checkBalance() {
    alert(`Số dư hiện tại: ${currentUser.balance} VND`);
}

function topUp() {
    let amount = prompt("Nhập số tiền nạp:");
    currentUser.balance += parseInt(amount);
    alert(`Bạn đã nạp ${amount} VND. Số dư mới: ${currentUser.balance} VND`);
}

// Chức năng cho nhân viên
function updateComputer() {
    let id = prompt("Nhập ID máy cần cập nhật:");
    let status = prompt("Nhập trạng thái mới (Đang hoạt động, Bảo trì, Hư hỏng):");
    let computer = computers.find(c => c.id == id);
    if (computer) {
        computer.status = status;
        alert(`Máy ${id} đã cập nhật trạng thái: ${status}`);
    } else {
        alert("Không tìm thấy máy!");
    }
}

function reportViolation() {
    let username = prompt("Nhập tên đăng nhập vi phạm:");
    let reason = prompt("Nhập lý do vi phạm:");
    alert(`Báo cáo: ${username} - ${reason}`);
}

// Chức năng cho admin
function viewRevenue() {
    alert("Doanh thu hôm nay: 5.000.000 VND"); // Cần tích hợp tính toán thực tế
}

function viewComputers() {
    let status = prompt("Nhập trạng thái máy cần xem:");
    let filtered = computers.filter(c => c.status === status);
    let output = filtered.map(c => `Phòng ${c.room}, Máy ${c.id}, Trạng thái: ${c.status}`).join("\n");
    alert(output || "Không có máy nào trong trạng thái này!");
}

function viewViolations() {
    alert("Danh sách vi phạm: Chưa có dữ liệu!"); // Cần tích hợp lưu vi phạm
}
