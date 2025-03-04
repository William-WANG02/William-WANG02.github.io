// 技能进度条动画
const initSkillBars = () => {
    const skills = {
        '财务分析': 90,
        '投资组合管理': 85,
        '风险评估': 88,
        '金融建模': 92,
        'Excel高级应用': 95,
        'Bloomberg Terminal': 85,
        'Wind金融终端': 88,
        'Python数据分析': 80
    };

    Object.entries(skills).forEach(([skill, level]) => {
        const skillElement = document.querySelector(`[data-skill="${skill}"]`);
        if (skillElement) {
            const progress = skillElement.querySelector('.skill-progress');
            progress.style.width = `${level}%`;
            
            // 添加数字显示
            const percentage = skillElement.querySelector('.skill-percentage');
            let currentValue = 0;
            const timer = setInterval(() => {
                if (currentValue >= level) {
                    clearInterval(timer);
                } else {
                    currentValue++;
                    percentage.textContent = `${currentValue}%`;
                }
            }, 20);
        }
    });
};

// 暗黑模式切换
const initDarkMode = () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');
    
    // 检查本地存储中的主题偏好
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    // 切换暗黑模式
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // 更新图标
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
};

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 页面加载动画
const fadeInElements = () => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 200);
    });
};

// 更新当前时间的函数
function updateTime() {
    const now = new Date();
    
    // 获取英文形式的日期
    const options = { 
        weekday: 'long',  // 完整的星期几名称
        month: 'long',    // 完整的月份名称
        day: 'numeric',   // 数字形式的日期
        year: 'numeric'   // 数字形式的年份
    };
    
    const dateString = now.toLocaleDateString('en-US', options);
    const timeString = now.toLocaleTimeString();
    
    // 组合日期和时间，使用 " - " 分隔
    const fullTimeString = dateString + ' - ' + timeString;
    
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = fullTimeString;
    }
}

// 初始化时间显示并设置定时器每秒更新
updateTime();
setInterval(updateTime, 1000);

// 添加淡入动画效果
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有带有fade-in类的元素
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // 创建一个Intersection Observer来检测元素是否在视口中
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 如果元素进入视口，添加visible类
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 元素已经显示，不再需要观察
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // 当元素有10%进入视口时触发
    });
    
    // 开始观察所有淡入元素
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

// 技能进度条动画
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const skillProgress = skillItem.querySelector('.skill-progress');
                const skillPercentage = skillItem.getAttribute('data-skill-percentage') || '85';
                const percentageDisplay = skillItem.querySelector('.skill-percentage');
                
                // 设置进度条宽度
                skillProgress.style.width = skillPercentage + '%';
                
                // 更新百分比显示
                if (percentageDisplay) {
                    let count = 0;
                    const target = parseInt(skillPercentage);
                    const interval = setInterval(() => {
                        if (count >= target) {
                            clearInterval(interval);
                        } else {
                            count += 1;
                            percentageDisplay.textContent = count + '%';
                        }
                    }, 20);
                }
                
                observer.unobserve(skillItem);
            }
        });
    }, {
        threshold: 0.1
    });
    
    skillItems.forEach(item => {
        observer.observe(item);
    });
});

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initSkillBars();
    initDarkMode();
    fadeInElements();
}); 
