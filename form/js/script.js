// 简单“数据库”：存放已注册账户（刷新页面会清空，仅演示）
const userDB = [];

const form   = document.getElementById('registerForm');
const msgBox = document.getElementById('msg');

// 实时清除单个错误提示
document.querySelectorAll('input').forEach(inp => {
    inp.addEventListener('input', () => hideError(inp.id + 'Err'));
});

form.addEventListener('submit', e => {
    e.preventDefault();

    // 获取值
    const username  = form.username.value.trim();
    const email     = form.email.value.trim();
    const password  = form.password.value;
    const confirm   = form.confirmPwd.value;
    const phone     = form.phone.value.trim();
    const agree     = form.agree.checked;

    let ok = true;

    // 1. 用户名
    if (!/^[a-zA-Z0-9]{3,12}$/.test(username)) {
        showError('usernameErr', '3~12 位字母或数字');
        ok = false;
    } else if (userDB.some(u => u.username === username)) {
        showError('usernameErr', '用户名已存在');
        ok = false;
    }

    // 2. 邮箱
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('emailErr', '邮箱格式不正确');
        ok = false;
    }

    // 3. 密码
    if (password.length < 6) {
        showError('passwordErr', '至少 6 位');
        ok = false;
    }

    // 4. 确认密码
    if (password !== confirm) {
        showError('confirmPwdErr', '两次密码不一致');
        ok = false;
    }

    // 5. 协议
    if (!agree) {
        showError('agreeErr', '请勾选用户协议');
        ok = false;
    }

    if (!ok) return;

    // 写入“数据库”
    userDB.push({ username, email, password, phone });
    showMsg('注册成功！即将跳转登录页…', 'success');

    // 2 秒后去登录页
    setTimeout(() => {
        location.href = '../login/index.html';   // 登录页路径按实际调整
    }, 2000);
});

function showError(id, text) {
    document.getElementById(id).textContent = text;
}
function hideError(id) {
    document.getElementById(id).textContent = '';
}
function showMsg(text, type) {
    msgBox.textContent = text;
    msgBox.className = 'msg-box ' + type;
}