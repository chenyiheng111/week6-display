document.addEventListener('DOMContentLoaded', function() {
    // 获取所有卡片元素
    const cards = document.querySelectorAll('.card');
    
    // 为每个卡片添加点击事件监听器
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const appName = this.getAttribute('data-app');
            
            // 添加点击动画效果
            this.style.transform = 'translateY(-10px) scale(0.98)';
            
            // 延迟跳转，让动画效果完成
            setTimeout(() => {
                // 根据应用名称跳转到对应的页面
                switch(appName) {
                    case 'form':
                        window.location.href = 'form/index.html';
                        break;
                    case 'password':
                        window.location.href = 'password/index.html';
                        break;
                    case 'quiz':
                        window.location.href = 'quiz/index.html';
                        break;
                    case 'recipe':
                        window.location.href = 'recipe/index.html';
                        break;
                    case 'TODO':
                        window.location.href = 'TODO/index.html';
                        break;
                    default:
                        console.log('未知的应用:', appName);
                }
            }, 150);
        });
        
        
    });
    
    // 添加页面加载动画
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        container.style.transition = 'all 0.8s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
    
    // 在卡片动画完成后添加类，允许hover效果正常工作
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.add('animation-complete');
        });
    }, 1000);
});