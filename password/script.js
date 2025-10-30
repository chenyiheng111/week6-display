class PasswordGenerator {
    constructor() {
        this.passwordInput = document.getElementById('password');
        this.copyBtn = document.getElementById('copy');
        this.generateBtn = document.getElementById('generate');
        this.lengthSlider = document.getElementById('length');
        this.lengthValue = document.getElementById('length-value');
        this.strengthBar = document.getElementById('strength-bar-fill');
        this.strengthText = document.getElementById('strength-text');
        
        this.uppercaseCheck = document.getElementById('uppercase');
        this.lowercaseCheck = document.getElementById('lowercase');
        this.numbersCheck = document.getElementById('numbers');
        this.symbolsCheck = document.getElementById('symbols');
        
        this.initEventListeners();
        this.updateLengthDisplay();
    }
    
    initEventListeners() {
        this.generateBtn.addEventListener('click', () => this.generatePassword());
        this.copyBtn.addEventListener('click', () => this.copyPassword());
        this.lengthSlider.addEventListener('input', () => this.updateLengthDisplay());
        
        // 添加复选框变化事件监听
        [this.uppercaseCheck, this.lowercaseCheck, this.numbersCheck, this.symbolsCheck].forEach(checkbox => {
            checkbox.addEventListener('change', () => this.generatePassword());
        });
    }
    
    updateLengthDisplay() {
        this.lengthValue.textContent = this.lengthSlider.value;
        this.generatePassword(); // 长度改变时自动重新生成密码
    }
    
    generatePassword() {
        const length = parseInt(this.lengthSlider.value);
        const includeUppercase = this.uppercaseCheck.checked;
        const includeLowercase = this.lowercaseCheck.checked;
        const includeNumbers = this.numbersCheck.checked;
        const includeSymbols = this.symbolsCheck.checked;
        
        // 验证至少选择了一种字符类型
        if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
            alert('请至少选择一种字符类型！');
            return;
        }
        
        let charset = '';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        
        this.passwordInput.value = password;
        this.updateStrength(password);
    }
    
    updateStrength(password) {
        let strength = 0;
        const length = password.length;
        
        // 长度评分
        if (length >= 8) strength += 1;
        if (length >= 12) strength += 1;
        if (length >= 16) strength += 1;
        
        // 字符类型评分
        if (/[a-z]/.test(password)) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // 更新强度显示
        this.strengthBar.className = 'strength-bar-fill';
        
        if (strength <= 3) {
            this.strengthBar.classList.add('strength-weak');
            this.strengthText.textContent = '弱';
            this.strengthText.style.color = '#ff4757';
        } else if (strength <= 5) {
            this.strengthBar.classList.add('strength-medium');
            this.strengthText.textContent = '中';
            this.strengthText.style.color = '#ffa502';
        } else {
            this.strengthBar.classList.add('strength-strong');
            this.strengthText.textContent = '强';
            this.strengthText.style.color = '#2ed573';
        }
    }
    
    async copyPassword() {
        if (!this.passwordInput.value) {
            alert('请先生成密码！');
            return;
        }
        
        try {
            await navigator.clipboard.writeText(this.passwordInput.value);
            this.copyBtn.textContent = '已复制!';
            this.copyBtn.style.background = '#2ed573';
            
            setTimeout(() => {
                this.copyBtn.textContent = '复制';
                this.copyBtn.style.background = '#667eea';
            }, 2000);
        } catch (err) {
            // 降级方案
            this.passwordInput.select();
            document.execCommand('copy');
            this.copyBtn.textContent = '已复制!';
            this.copyBtn.style.background = '#2ed573';
            
            setTimeout(() => {
                this.copyBtn.textContent = '复制';
                this.copyBtn.style.background = '#667eea';
            }, 2000);
        }
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new PasswordGenerator();
});