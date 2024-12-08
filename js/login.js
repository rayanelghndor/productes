document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault(); // إيقاف الإجراء الافتراضي

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // التحقق من إدخال الحقول
  if (!username || !password) {
    alert('يرجى ملء جميع الحقول.');
    return;
  }

  // التحقق من بيانات المستخدم المخزنة محلياً
  const userData = JSON.parse(localStorage.getItem('data'));
  if (userData && username === userData.username && password === userData.password) {
    localStorage.setItem('currentUser', username);
    alert('تم تسجيل الدخول بنجاح!');
    window.location.href = 'index.html'; // توجيه المستخدم
    return;
  }

  // التحقق من API إذا لم يتم العثور على بيانات محلياً
  const checkAPIForUser = async () => {
    try {
      let response = await fetch('https://fakestoreapi.com/users');
      if (!response.ok) {
        throw new Error('خطأ في الاتصال بالخادم.');
      }
      let users = await response.json();

      // البحث عن تطابق بيانات المستخدم
      let userFound = users.find(user => user.username === username && user.password === password);
      if (userFound) {
        alert('تم تسجيل الدخول بنجاح عبر API!');
        localStorage.setItem('currentUser', username);
        window.location.href = 'index.html';
      } else {
        alert('اسم المستخدم أو كلمة المرور غير صحيحة.');
      }
    } catch (error) {
      alert('حدث خطأ: ' + error.message);
    }
  };

  checkAPIForUser(); // استدعاء الوظيفة للتحقق من API
});
